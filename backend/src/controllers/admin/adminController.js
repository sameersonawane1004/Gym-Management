const adminService=require("../../services/Admin/adminService");

const getDashboardStats=async(req,res,next)=>{
    try{
        const stats=await adminService.getDashboardStats();

        res.status(200).json({
            success:true,
            message:"Admin Dashboard statistics fetched successfully",
            data:stats,
        });
    }catch(error){
        next(error);
    }
};

module.exports={
    getDashboardStats,
};