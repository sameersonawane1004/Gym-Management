const {PrismaClient}=require("@prisma/client");

const prisma=new PrismaClient();

const getAllMembers=async() =>{
    const members =await prisma.user.findMany({
        where:{
            role: "USER",
        },
        select:{
            id:true,
            name:true,
            email:true,
            role:true,
            createdAt:true,
            memberships:{
                select:{
                id:true,
                status:true,
                startDate:true,
                endDate:true,
                plan:{
                    select:{
                        name:true,
                    },
                },
            },
        },
    },
    orderBy:{
        createdAt:"desc",
    },
});
    return members;
};

const getMemberById=async(memberId)=>{
    const member=await prisma.user.findFirst({
        where:{
            id:Number(memberId),
            role:"USER",
        },
         select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      memberships: {
        select: {
          id: true,
          status: true,
          startDate: true,
          endDate: true,
          plan: {
            select: {
              id: true,
              name: true,
              price: true,
              durationInMonths: true,
            },
          },
        },
      },
      payments: {
        select: {
          id: true,
          amount: true,
          gatewayId: true,
          status: true,
          paymentDate: true,
        },
        orderBy: {
          paymentDate: "desc",
        },
      },
    },
    });

    if(!member){
        throw new Error("Member not found");
    }

    return member;
};

const deleteMember=async(memberId)=>{

    const id=Number(memberId);
    const member=await prisma.user.findFirst({
        where:{
            id,
            role:"USER",
        },
    });

    if(!member){
        throw new Error("Member not found");
    }

    await prisma.$transaction(async (tx)=>{
        //delete payments related to this member
        await tx.payment.deleteMany({
            where:{
                userId:id,
            },
        });

        //delete memberships to this member
        await tx.membership.deleteMany({
            where:{
                userId:id,
            },
        });

        //delete diet plan
        await tx.dietPlan.deleteMany({
            where:{
                userId:id,
            },
        });

        //delete user
        await tx.user.delete({
            where:{
                id,
            },
        });
    });

    return {
        id:member.id,
        name:member.name,
        email:member.email,
    };
};

module.exports={
    getAllMembers,
    getMemberById,
    deleteMember,
};