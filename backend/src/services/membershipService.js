const {PrismaClient} = require("@prisma/client");

const prisma=new PrismaClient();

const addMembership=async(userId,planId)=>{

    const existingMembership=await prisma.membership.findFirst({
        where:{
            userId:userId,
            status:"ACTIVE",
            endDate:{
                gt:new Date()
            }
        }
    });

    if(existingMembership){
        throw new Error("User already has an active membership");
    }
    const plan=await prisma.membershipPlan.findUnique({
        where:{
            id:planId
        }
    });

    if(!plan){
        throw new Error("Membership plan not found");
    }

    if(!plan.isActive){
        throw new Error("Membership plan is not active!");
    }

    const startDate=new Date();
    const endDate=new Date(startDate);
    endDate.setMonth(endDate.getMonth()+plan.durationInMonths);

    const membership=await prisma.membership.create({
        data:{
            userId,
            planId,
            startDate,
            endDate
        }
    });
    return membership;
};

const getMyMembership=async(userId)=>{
    const membership=await prisma.membership.findFirst({
        where:{
            userId:userId
        },
        include:{
            plan:true
        },
        orderBy:{
            createdAt:"desc"
        }
    });
    return membership;
}

const getAllMemberships=async()=>{
    const memberships=await prisma.membership.findMany({
        include:{
            user:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            },
            plan:{
                select:{
                    id:true,
                    name:true,
                    price:true,
                    durationInMonths:true
                }
            }
        },
        orderBy:{
            createdAt:"desc"
        }
    });
    return memberships;
}
module.exports={
    addMembership,
    getMyMembership,
    getAllMemberships,
}
