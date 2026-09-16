const express=require("express");
const authMiddleware=require("../middleware/authMiddleware");
const adminMiddleware=require("../middleware/adminMiddleware");

const {getAllMembershipPlans,createMembershipPlan,updateMembershipPlan} =require("../controllers/membershipPlanController");
const {createMembershipPlanValidation,validate,updateMembershipPlanValidation}=require("../middleware/validationMiddleware");

const router=express.Router();

router.get("/",getAllMembershipPlans);

router.post("/create",
    authMiddleware,
    adminMiddleware,
    createMembershipPlanValidation,
    validate,
    createMembershipPlan
);

router.put("/update/:id",
    authMiddleware,
    adminMiddleware,
    updateMembershipPlanValidation,
    validate,
    updateMembershipPlan
);

module.exports=router;