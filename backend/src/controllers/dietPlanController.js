const dietPlanService = require("../services/dietPlanService");

const createDietPlan = async (req, res, next) => {
    try {
        const {
            age,
            gender,
            height,
            weight,
            activityLevel,
            goal,
            dietaryPreference,
            allergies,
        } = req.body;

        if (
            !age ||
            !gender ||
            !height ||
            !weight ||
            !activityLevel ||
            !goal ||
            !dietaryPreference
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        const dietPlan = await dietPlanService.createDietPlan(
            req.user.userId,
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "Diet plan generated successfully",
            data: dietPlan,
        });
    } catch (error) {
        next(error);
    }
};

const getMyDietPlans = async (req, res, next) => {
    try {
        const dietPlans = await dietPlanService.getMyDietPlans(
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            data: dietPlans,
        });
    } catch (error) {
        next(error);
    }
};

const deleteDietPlan = async (req, res, next) => {
    try {
        await dietPlanService.deleteDietPlan(
            req.user.userId,
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Diet plan deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createDietPlan,
    getMyDietPlans,
    deleteDietPlan,
};