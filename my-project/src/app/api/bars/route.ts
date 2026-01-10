import { NextRequest, NextResponse } from "next/server";
import { badRequest , created, success} from "@/lib/helper/response";
import prisma from "@/lib/prisma";
import { title } from "process";

export async function POST(req: NextRequest ){
    try{
        const body = await req.json(); 
        const {title, totalHours} = body; 

        if(!title || !totalHours) { 
            return badRequest("All fields is required!");
        }

        const newBar = await prisma.bar.create({
            data:
            { 
                title,
                totalHours
            },
        })

        return created({
            title: newBar.title,
            totalHours: newBar.totalHours
        });

    }catch(err){
        console.error(" ", err);
        return NextResponse.json(
            {error: "Internal error"},
            {status: 500}
        ); 
    }
}

export async function GET() {
    try{
        const startOfToday = new Date();
        startOfToday.setHours(0,0,0,0); 

        const endOfToday = new Date();
        endOfToday.setHours(23,59,59,999);

        const getBar = await prisma.bar.findMany({
            where:
            {
                createdAt:{
                gte: startOfToday,                  //greater than or equal
                lte: endOfToday                     //less than or equal
                }
            }
        });

        return success(getBar ,"Get all TimeBlock successful!")

    }catch(err){ 
        console.error(" ", err); 
        return NextResponse.json(
            {error: "Internal error"},
            {status: 500}
        );
    }
}