const bcrypt=require("bcrypt");
const {PrismaClient}=require("@prisma/client");
const jwt=require("jsonwebtoken");


const prisma=new PrismaClient();

const registerUser=async (name,email,password)=>{
    const existingUser=await prisma.user.findUnique({
        where:{
            email:email
        }
    });

    if(existingUser){
        throw new Error("Email already registered");
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user= await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:hashedPassword
        }
    });

    return{
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
    }
};

const loginUser=async(email,password)=>{
    const user=await prisma.user.findUnique({
        where:{
            email:email
        }
    });

    if(!user){
        throw new Error("Invalid email or password");
    }

    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        throw new Error("Invalid email or password");
    }

    const token=jwt.sign({
        userId:user.id,
        role:user.role
    },
    process.env.JWT_SECRET,{
        expiresIn:"1d"
    }
);

    return{
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role,
        token:token
    };
};

module.exports={
    registerUser,
    loginUser
}