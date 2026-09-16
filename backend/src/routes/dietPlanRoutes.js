const express=require("express");
const authMiddleware=require("../middleware/authMiddleware");
const {createDietPlan,getMyDietPlans,deleteDietPlan}=require("../controllers/dietPlanController");

const router=express.Router();

router.post("/generate",authMiddleware,createDietPlan);
router.get("/my-plans",authMiddleware,getMyDietPlans);
router.delete("/:id",authMiddleware,deleteDietPlan);

module.exports=router;