const express=require("express");

const authMiddleware=require("../../middleware/authMiddleware");
const adminMiddleware=require("../../middleware/adminMiddleware");

const paymentManagementController = require("../../controllers/admin/paymentManagementController");

const router=express.Router();

router.get("/",
    authMiddleware,
    adminMiddleware,
    paymentManagementController.getAllPayments,
);

module.exports=router;