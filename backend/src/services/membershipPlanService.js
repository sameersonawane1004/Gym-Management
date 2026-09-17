const {PrismaClient}=require("@prisma/client");

const prisma=new PrismaClient();

//user side-only active plans
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

//admin side-get all plans
const getAllMembershipPlans=async()=>{
    const plans=await prisma.membershipPlan.findMany({
        orderBy:{
            createdAt:"desc"
        }
    });
    return plans;
};

//create plan
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
//update plan
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
//delete plan
const deleteMembershipPlan=async(id)=>{
    const planId=Number(id);

    const plan=await prisma.membershipPlan.findUnique({
        where:{

            id:planId
        },
        include:{
            memberships:true
        }
    });

    if(!plan){
        throw new Error("Membership plan not found");
    }

    //Dont delete a plan that is already used

    if(plan.memberships.length>0){
        throw new Error(
            "Cannot delete this plan because it has membership records"
        );
    }

    await prisma.membershipPlan.delete({
        where:{
            id:planId
        }
    });
    return plan;
}
module.exports={
    getMemberShipPlans,
    getAllMembershipPlans,
    createMembershipPlan,
    updateMembershipPlan,
    deleteMembershipPlan
}
