const memberManagementService=require("../../services/Admin/memberManagementService");

const getAllMembers=async(req,res,next)=>{
    try{
        const members=await memberManagementService.getAllMembers();

        res.status(200).json({
            success:true,
            message:"Members fetch successfully",
            data:members,
        });
    }catch(error){
        next(error);
    }
};

const getMemberById=async(req,res,next)=>{
    try{
        const member=await memberManagementService.getMemberById(
            req.params.id
        );

        res.status(200).json({
            success:true,
            message:"Member fetched successfully",
            data:member,
        });
    }catch(error){
        next(error);
    }
};

const deleteMember=async(req,res,next)=>{
    try{
        const member=await memberManagementService.deleteMember(
            req.params.id
        );

        res.status(200).json({
            success:true,
            message:"Member deleted successfully",
            data:member,
        });
    }catch(error){
        next(error);
    }
};

module.exports={
    getAllMembers,
    getMemberById,
    deleteMember,
};