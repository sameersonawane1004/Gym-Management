const express=require("express");

const authMiddleware=require("../middleware/authMiddleware");
const {addMembership,getMyMembership}=require("../controllers/membershipController");
const {
    createMembershipValidation,
    validate
} = require("../middleware/validationMiddleware");

const router=express.Router();

router.post("/add",
    authMiddleware,
    createMembershipValidation,
    validate,
    addMembership
);

router.get("/my-memberships",
    authMiddleware,
    getMyMembership
)

module.exports=router;