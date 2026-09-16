const {PrismaClient}=require("@prisma/client");

const prisma=new PrismaClient();

const getMemberShipPlans=async()=>{
    const plans=await prisma.membershipPlan.findMany({
        where:{
            isActive:true
        },
        orderBy:{
            price:"asc"
        }
    });
    return plans;
};

const createMembershipPlan=async(name,description,price,durationInMonths)=>{
    const plan=await prisma.membershipPlan.create({
        data:{
            name,
            description,
            price,
            durationInMonths
        }
    });
    return plan;
}

const updateMembershipPlan=async(
    id,
    name,
    description,
    price,
    durationInMonths,
    isActive
)=>{
    const plan=await prisma.membershipPlan.update({
        where:{
            id:id
        },
        data:{
            name,
            description,
            price,
            durationInMonths,
            isActive
        }
    });
    return plan;
}
module.exports={
    getMemberShipPlans,
    createMembershipPlan,
    updateMembershipPlan
}