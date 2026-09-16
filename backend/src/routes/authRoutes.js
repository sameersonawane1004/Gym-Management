const express=require("express");
const authMiddleware=require("../middleware/authMiddleware");

const router=express.Router();

const {register,login}=require("../controllers/authController");

const {
    registerValidation,
    validate,
    loginValidation
}=require("../middleware/validationMiddleware");

router.post("/register",
    registerValidation,
    validate,
    register
);

router.post("/login",
    loginValidation,
    validate,
    login
);

router.get("/test", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Authentication successful",
        user: req.user
    });
});

module.exports=router;