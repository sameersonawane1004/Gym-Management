 const membershipPlanService=require("../services/membershipPlanService");

 const getAllMembershipPlans=async(req,res,next)=>{
    try{
        const plans=await membershipPlanService.getMemberShipPlans();

        res.status(200).json({
            success:true,
            message:"Membership Plans fetched successfully",
            data:plans
        });
    }catch(error){
        next(error);
    }
 };

 const createMembershipPlan=async(req,res,next)=>{
    try{
        const{
            name,
            description,
            price,
            durationInMonths
        }=req.body;

        const plan=await membershipPlanService.createMembershipPlan(name,description,price,durationInMonths);

        res.status(201).json({
            success:true,
            message:"Membership Plan created successfully",
            data:plan
        });
    }catch(error){
        next(error);
    }
 };

 const updateMembershipPlan=async(req,res,next)=>{
    try{
        const {id}=req.params;

        const{
            name,
            description,
            price,
            durationInMonths,
            isActive
        }=req.body;

        const plan= await membershipPlanService.updateMembershipPlan(
            Number(id),
            name,
            description,
            price,
            durationInMonths,
            isActive
        );

        res.status(200).json({
            success:true,
            message:"Membership plan updated successfully",
            data:plan
        });
    }catch(error){
        next(error);
    }
 };

 module.exports={
    getAllMembershipPlans,
    createMembershipPlan,
    updateMembershipPlan
 };