const express=require("express");

const authMiddleware=require("../middleware/authMiddleware");
const adminMiddleware=require("../middleware/adminMiddleware");
const {addMembership,getMyMembership,getAllMemberships}=require("../controllers/membershipController");
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
);

router.get("/admin/all",
    authMiddleware,
    adminMiddleware,
    getAllMemberships,
);

module.exports=router;