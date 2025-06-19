'use server'
import { prisma } from "@/lib/prisma";
import { createTaskSchemaType } from "@/schema/createTask";
import { currentUser } from "@clerk/nextjs/server";

export async function createTaskAction(form: createTaskSchemaType) {

    const user = await currentUser();
    if (!user) {
        throw new Error("User not found")


    }

    try {
        const collectionId = form.collectionId
        return await prisma.task.create({
            data: {
                userId: user.id,
                content: form.content,
                expiresAt: form.expiresAt,

                Collection: {
                    connect: {
                        id: collectionId
                    }
                }
            }
        })
    } catch (error) {

    }

}


export async function updateTaskStatus(id: number) {


    const user = await currentUser();
    if (!user) {
        throw new Error("user not found")
    }

    try {
        return await prisma.task.update({
            where: {
                id: id,
                userId: user.id
            },
            data: {
                done: true
            }
        })
    } catch (error) {

    }


}