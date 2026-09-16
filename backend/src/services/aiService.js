const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateDietPlan = async (userData) => {
    const {
        age,
        gender,
        height,
        weight,
        activityLevel,
        goal,
        dietaryPreference,
        allergies,
    } = userData;

    const prompt = `
Create a general wellness-oriented diet plan for a gym member.

Member information:
- Age: ${age}
- Gender: ${gender}
- Height: ${height} cm
- Weight: ${weight} kg
- Activity level: ${activityLevel}
- Fitness goal: ${goal}
- Dietary preference: ${dietaryPreference}
- Allergies or foods to avoid: ${allergies || "None"}

Provide:
1. Daily calorie guidance as an approximate range
2. Recommended protein, carbohydrate, and fat guidance
3. Breakfast
4. Mid-morning snack
5. Lunch
6. Evening snack
7. Dinner
8. Hydration guidance
9. General fitness and nutrition tips

Keep the plan practical and balanced.

Do not recommend extreme calorie restriction,
unsafe fasting, supplements as a requirement,
or treatment for medical conditions.

Clearly state that this is general wellness guidance
and not medical advice.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    return response.text;
};

module.exports = {
    generateDietPlan,
};