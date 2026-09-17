const express=require("express");
const authMiddleware=require("../middleware/authMiddleware");
const adminMiddleware=require("../middleware/adminMiddleware");

const {getAllMembershipPlans,getAllAdminMembershipPlans,createMembershipPlan,updateMembershipPlan,deleteMembershipPlan} =require("../controllers/membershipPlanController");
const {createMembershipPlanValidation,validate,updateMembershipPlanValidation}=require("../middleware/validationMiddleware");

const router=express.Router();

//user side -active plans only
router.get("/",
    getAllMembershipPlans);

//admin side -all plans
router.get("/admin",
    authMiddleware,
    adminMiddleware,
    getAllAdminMembershipPlans
)


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
router.delete(
    "/delete/:id",
    authMiddleware,
    adminMiddleware,
    deleteMembershipPlan
);
module.exports=router;