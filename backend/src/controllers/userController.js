const {PrismaClient}=require("@prisma/client");

const prisma=new PrismaClient();

const getProfile=async(req,res)=>{
    try{
        const userId=req.user.userId;
        const user=await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                id:true,
                name:true,
                email:true,
                role:true,
                createdAt:true,
            }
        });

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        return res.status(200).json({
            success:true,
            message:"Profile fetched successfully",
            user:user
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Failed to fetch profile"
        });
    }
};

const updateProfile =async(req,res)=>{
    try{
        const userId=req.user.userId;

        const {name}=req.body;

        if(!name || name.trim()===""){
            return res.status(400).json({
                success:false,
                message:"Name is required"
            });
        }

        const user=await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                name:name.trim()
            },
            select:{
                id:true,
                name:true,
                email:true,
                role:true,
                createdAt:true
            }
        });

        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            user:user
        });
    }catch(error){
        console.error("Update profile error: ",error);
        return res.status(500).json({
            success:false,
            message:"Failed to update profile"
        });
    }
};

module.exports={
    getProfile,
    updateProfile
};