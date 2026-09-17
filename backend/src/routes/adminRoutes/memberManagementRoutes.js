const express= require("express");

const authMiddleware = require("../../middleware/authMiddleware");
const adminMiddleware= require("../../middleware/adminMiddleware");
const memberManagementController=require("../../controllers/admin/memberManagementController");

const router=express.Router();

router.get("/",
    authMiddleware,
    adminMiddleware,
    memberManagementController.getAllMembers
);

router.get("/:id",
    authMiddleware,
    adminMiddleware,
    memberManagementController.getMemberById
);

router.delete("/:id",
    authMiddleware,
    adminMiddleware,
    memberManagementController.deleteMember
);

module.exports=router;