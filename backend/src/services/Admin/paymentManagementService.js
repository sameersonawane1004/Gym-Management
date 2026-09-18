const {PrismaClient}=require("@prisma/client");

const prisma = new PrismaClient();

const getAllPayments=async () =>{
    const payments = await prisma.payment.findMany({
        include:{
            user:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            },
            membership:{
                include:{
                    plan:{
                        select:{
                            id:true,
                            name:true,
                            price:true,
                            durationInMonths:true
                        }
                    }
                }
            }
        },
        orderBy:{
            paymentDate:"desc"
        }
    });
    return payments;
}

module.exports={
    getAllPayments
};