import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'

import React from 'react'
import CreateCollectionButton from './CreateCollectionButton';
import CollectionCard from './CollectionCard';

const CollectionList = async () => {
    const user = await currentUser();
    const collections = await prisma.collection?.findMany({
        include: {
            tasks: true

        }
        ,
        where: { userId: user?.id },
        orderBy: {
            createdAt: 'desc'
        }




    })

    if (collections.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-3 px-4 text-center">

                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    It looks like you don't have any collections yet. Create one to get started!
                </p>
                {/* <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                    Create Collection
                </button> */}
                <CreateCollectionButton></CreateCollectionButton>
            </div>
        );
    }
    return (
        <div>
            <div>

                <CreateCollectionButton></CreateCollectionButton>
            </div>
            <div className='flex flex-col gap-4 mt-6'>
                {
                    collections && collections?.map((collection) => (
                        <CollectionCard key={collection.id} collection={collection}></CollectionCard>
                    ))
                }
            </div>

        </div>
    )
}

export default CollectionList
