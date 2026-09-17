const {PrismaClient}=require("@prisma/client");
const prisma=new PrismaClient();

const getDashboardStats=async()=>{
    const[
        totalMembers,
        totalMemberships,
        totalPlans,
        totalPayments,
    ]=await Promise.all([
        prisma.user.count({
            where:{
                role:"USER",
            },
        }),

        prisma.membership.count(),
        prisma.membershipPlan.count(),
        prisma.payment.count(),
    ]);

    return {
        totalMembers,
        totalMemberships,
        totalPlans,
        totalPayments,
    };
};

module.exports={
    getDashboardStats,
};