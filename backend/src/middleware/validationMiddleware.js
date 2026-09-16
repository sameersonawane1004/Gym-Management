const{body,validationResult}=require("express-validator");

const registerValidation=[
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),


    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email"),

    body("password")
        .isLength({min:6})
        .withMessage("Password must be at least 6 characters")
];

const loginValidation=[
    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
];

const createMembershipPlanValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Plan name is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),

    body("price")
        .isFloat({ min: 0.01 })
        .withMessage("Price must be greater than 0"),

    body("durationInMonths")
        .isInt({ min: 1 })
        .withMessage("Duration must be at least 1 month")
];

const updateMembershipPlanValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Plan name is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),

    body("price")
        .isFloat({ min: 0.01 })
        .withMessage("Price must be greater than 0"),

    body("durationInMonths")
        .isInt({ min: 1 })
        .withMessage("Duration must be at least 1 month"),

    body("isActive")
        .isBoolean()
        .withMessage("isActive must be true or false")
];
const createMembershipValidation = [
    body("planId")
        .isInt({ min: 1 })
        .withMessage("Valid planId is required")
];

const validate=(req,res,next)=>{
    const error=validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({
            success:false,
            errors:error.array()
        });
    }

    next();
}

module.exports={
    registerValidation,
    validate,
    loginValidation,
    createMembershipPlanValidation,
    updateMembershipPlanValidation,
    createMembershipValidation
}