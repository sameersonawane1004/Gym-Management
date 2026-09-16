const express= require("express");
const authRoutes=require("./routes/authRoutes");
const cors=require("cors");
const userRoutes=require("./routes/userRoutes");
const errorMiddleware=require("./middleware/errorMiddleware");
const membershipPlanRoutes=require("./routes/membershipPlanRoutes");
const membershipRoutes=require("./routes/membershipRoutes");
const paymentRoutes=require("./routes/paymentRoutes");
const dietPlanRoutes = require("./routes/dietPlanRoutes");
const adminRoutes=require("./routes/adminRoutes/adminRoutes");


const app=express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{

    res.json({
        message: "Smart Gym Backend is running"
    });
});

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/membership-plans",membershipPlanRoutes);
app.use("/api/memberships",membershipRoutes);
app.use("/api/payments",paymentRoutes)
app.use("/api/diet-plans",dietPlanRoutes);



app.use("/api/admin",adminRoutes);

app.use(errorMiddleware);

module.exports=app;