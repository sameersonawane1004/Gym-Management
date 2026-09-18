const membershipService=require("../services/membershipService");

const addMembership=async(req,res,next)=>{
    try{
        const userId=req.user.userId;
        const {planId}=req.body;

        const membership=await membershipService.addMembership(
            userId,
            Number(planId)
        );

        res.status(201).json({
            success:true,
            message:"Membership Added Properly",
            data:membership
        });
    }catch(error){
        next(error);
    }
};

const getMyMembership=async(req,res,next)=>{
    try{
        const userId=req.user.userId;

        const membership=await membershipService.getMyMembership(userId);

        if(!membership){
            return res.status(404).json({
                success:false,
                message:"Membership not found"
            });
        }

        res.status(200).json({
            success:true,
            message:"Membership fetched successfully",
            data:membership
        });
    }catch(error){
        next(error);
    }
};

const getAllMemberships = async(req,res,next)=>{
    try{
        const memberships=await membershipService.getAllMemberships();
        res.status(200).json({
            success:true,
            message:"Memberships fetched successfully",
            data:memberships
        });
    }catch(error){
        next(error);
    }
};

module.exports={
    addMembership,
    getMyMembership,
    getAllMemberships
}