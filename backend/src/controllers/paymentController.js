const razorpay = require("../services/paymentService");
const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");

const prisma = new PrismaClient();

const createOrder = async (req, res, next) => {
  try {
    const { planId } = req.body;

    const plan = await prisma.membershipPlan.findUnique({
      where: {
        id: Number(planId),
      },
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Membership plan not found",
      });
    }

    if (!plan.isActive) {
      return res.status(400).json({
        success: false,
        message: "Membership plan is not active",
      });
    }
    const amount = Math.round(Number(plan.price) * 100);

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({
      success: true,
      message: "Razorpay order created successfully",
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        planId: plan.id,
        planName: plan.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !planId
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details are required",
      });
    }
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
    const plan = await prisma.membershipPlan.findUnique({
      where: {
        id: Number(planId),
      },
    });

    if (!plan || !plan.isActive) {
      return res.status(400).json({
        success: false,
        message: "Membership plan is not available",
      });
    }

    const existingPayment = await prisma.payment.findUnique({
      where: {
        gatewayId: razorpay_payment_id,
      },
    });

    if (existingPayment) {
      return res.status(200).json({
        success: true,
        message: "Payment already verified",
        data: existingPayment,
      });
    }

    const existingMembership = await prisma.membership.findFirst({
      where: {
        userId,
        status: "ACTIVE",
        endDate: {
          gt: new Date(),
        },
      },
    });

    if (existingMembership) {
      return res.status(400).json({
        success: false,
        message: "User already has an active membership",
      });
    }

    const startDate = new Date();

    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + plan.durationInMonths);

    const result = await prisma.$transaction(async (tx) => {
      const membership = await tx.membership.create({
        data: {
          userId,
          planId: plan.id,
          startDate,
          endDate,
          status: "ACTIVE",
        },
      });
      const payment = await tx.payment.create({
        data: {
          userId,
          membershipId: membership.id,
          amount: plan.price,
          gatewayId: razorpay_payment_id,
          status: "SUCCESS",
          paymentDate: new Date(),
        },
      });

      return {
        membership,
        payment,
      };
    });
    res.status(200).json({
      success: true,
      message: "Payment verified and membership activated",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMyPayments = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const payments = await prisma.payment.findMany({
      where: {
        userId,
      },
      include: {
        membership: {
          include: {
            plan: true,
          },
        },
      },
      orderBy: {
        paymentDate: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Payment history fetched successfully",
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getMyPayments,
};
