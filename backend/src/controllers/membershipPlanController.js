 const membershipPlanService=require("../services/membershipPlanService");
//user side -active plan
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

 // Admin side - all plans
const getAllAdminMembershipPlans = async (req, res, next) => {
    try {
        const plans = await membershipPlanService.getAllMembershipPlans();

        res.status(200).json({
            success: true,
            message: "All membership plans fetched successfully",
            data: plans
        });
    } catch (error) {
        next(error);
    }
};
//create plan
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

 //update plan
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

 // Delete plan
const deleteMembershipPlan = async (req, res, next) => {
    try {
        const { id } = req.params;

        const plan = await membershipPlanService.deleteMembershipPlan(
            Number(id)
        );

        res.status(200).json({
            success: true,
            message: "Membership plan deleted successfully",
            data: plan
        });
    } catch (error) {
        next(error);
    }
};


 module.exports={
    getAllMembershipPlans,
    getAllAdminMembershipPlans,
    createMembershipPlan,
    updateMembershipPlan,
    deleteMembershipPlan,
 };