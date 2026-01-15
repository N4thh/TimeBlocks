import { NextRequest} from "next/server";
import { badRequest , created, success} from "@/lib/helper/response";
import prisma from "@/lib/prisma";


//add part 
export async function POST(req: NextRequest) {
    try{
  
        const body = await req.json(); 
        const {title, hours, barId} = body;

        if(!title || !hours){ 
            return badRequest("All fields is required!");
        }

        const findBar = await prisma.bar.findUnique(
            {where: {id: barId}}
        )
        if(!findBar){
            return badRequest('Bar not found');
        }
         
        const newParts = await prisma.part.create({
            data:
            {
                title,
                hours,
                barId
            },
        });

        //return
        return created({
            title: newParts.title, 
            hours: newParts.hours,
            barId: newParts.barId
        })
    }catch(err){ 
        console.error(err); 
        return Response.json(
            {error: 'Internal server error'}, 
            {status: 500}
        );
    }
}
//get all part -> theo bar 
export async function GET(req: NextRequest) {
    try{
        const { searchParams} = new URL(req.url);
        const barId = Number(searchParams.get("barId")); 
        
        const bar = await prisma.bar.findUnique({
            where: {id: barId}
        }); 

        if(!bar){ 
            return badRequest("Bar not found");
        }

        const findPart = await prisma.part.findMany(
            {
                where: {barId: barId},
                orderBy: {createdAt: 'asc'}
            }      
        );

        return success(findPart, "Get all parts successfully!")

    }catch(err){
        console.error(err); 
        return Response.json(
            {error: "Internal sever error"}, 
            {status: 500}
        )
    }
}