const { PrismaClient } = require("@prisma/client");
const { generateDietPlan } = require("./aiService");

const prisma = new PrismaClient();

const createDietPlan = async (userId, dietData) => {
    const {
        age,
        gender,
        height,
        weight,
        activityLevel,
        goal,
        dietaryPreference,
        allergies,
    } = dietData;

    const planContent = await generateDietPlan({
        age,
        gender,
        height,
        weight,
        activityLevel,
        goal,
        dietaryPreference,
        allergies,
    });

    const inputs = JSON.stringify({
        age,
        gender,
        height,
        weight,
        activityLevel,
        dietaryPreference,
        allergies: allergies || "",
    });

    const dietPlan = await prisma.dietPlan.create({
        data: {
            userId: userId,
            goal,
            inputs,
            planContent,
        },
    });

    return dietPlan;
};

const getMyDietPlans = async (userId) => {
    const dietPlans = await prisma.dietPlan.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return dietPlans;
};

const deleteDietPlan = async (userId, dietPlanId) => {
    const dietPlan = await prisma.dietPlan.findFirst({
        where: {
            id: Number(dietPlanId),
            userId: userId,
        },
    });

    if (!dietPlan) {
        const error = new Error("Diet plan not found");
        error.statusCode = 404;
        throw error;
    }

    await prisma.dietPlan.delete({
        where: {
            id: dietPlan.id,
        },
    });

    return true;
};

module.exports = {
    createDietPlan,
    getMyDietPlans,
    deleteDietPlan,
};