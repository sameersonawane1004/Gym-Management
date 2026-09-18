const paymentManagementService = require("../../services/Admin/paymentManagementService");

const getAllPayments=async(req,res,next)=>{
    try{
        const payments = await paymentManagementService.getAllPayments();

        res.status(200).json({
            success:true,
            message:"Payments fetched successfully",
            data:payments
        });
    }catch(error){
        next(error);
    }
};

module.exports={
    getAllPayments
};