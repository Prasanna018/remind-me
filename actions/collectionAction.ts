'use server'
import { prisma } from "@/lib/prisma";
import { CreateCollectionSchemaType } from "@/schema/createCollection";
import { currentUser } from "@clerk/nextjs/server";



export async function CreateCollectionAction(form: CreateCollectionSchemaType) {

    const user = await currentUser();
    if (!user) {
        throw new Error('User not found')
    }

    try {
        return await prisma.collection.create({
            data: {
                userId: user.id,
                name: form.name,
                color: form.color
            },


        })





    }
    catch {


    }

}

export async function deleteCollectionAction(id: number) {
    const user = await currentUser();

    if (!user) {
        throw new Error('User not found')
    }
    try {
        await prisma.collection.delete({
            where: {
                id: id,
                userId: user.id
            }
            ,

        })

    } catch (error) {

    }

}