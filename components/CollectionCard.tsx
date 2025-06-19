'use client'
import { Collection, Task } from '@prisma/client'
import React, { useMemo, useState, useTransition } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { CollectionColor, CollectionColorType } from '@/lib/constant/collectionColors'
import { ArrowDown, ArrowUp, Plus, Trash } from 'lucide-react'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTrigger,
    AlertDialogTitle,
    AlertDialogDescription
} from './ui/alert-dialog'
import { deleteCollectionAction } from '@/actions/collectionAction'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import CreateTaskDialog from './CreateTaskDialog'
import TaskCard from './TaskCard'

interface Props {
    collection: Collection & {
        tasks: Task[]
    }
}

const CollectionCard = ({ collection }: Props) => {
    const [open, setOpen] = useState(false)
    const tasks = collection.tasks;

    const router = useRouter()
    const [isLoading, startTransition] = useTransition();
    const [showModel, setShowModel] = useState(false);
    const removeCollection = async () => {


        try {
            await deleteCollectionAction(collection.id)
            toast.success('Collection deleted')
            router.refresh()
        } catch (error) {
            console.log(error)
            toast.error("Can't delete the Collection")

        }
    }
    const taskDone = useMemo(() => {
        return collection.tasks.filter(task => task.done).length;
    }, [collection.tasks])


    const totalTasks = collection.tasks.length;
    const progress = totalTasks === 0 ? 0 : (taskDone / totalTasks) * 100
    return (

        <>
            <CreateTaskDialog
                open={showModel}
                setOpen={setShowModel}
                collection={collection}

            ></CreateTaskDialog>
            <Collapsible open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger asChild>
                    <Button
                        className={cn(`flex w-full justify-between p-6`, CollectionColor[collection.color as CollectionColorType])}
                    >
                        <span className='text-white font-bold flex items-center justify-between'>
                            {collection.name}
                        </span>
                        {!open ? <ArrowDown className='h-6 w-6' /> : <ArrowUp className='h-6 w-6' />}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className='flex rounded-b-md shadow-sm dark:bg-neutral-950 flex-col'>
                    {tasks.length === 0 ? (
                        <div className="p-4">No task found</div>
                    ) : (
                        <>
                            <Progress className='text-white rounded-none bg-white' color='white' value={progress} />
                            <div>
                                {tasks.map((task) => (
                                    <TaskCard key={task.id} task={task}></TaskCard>
                                ))}
                            </div>
                            <Separator />
                        </>
                    )}
                    {/* Footer (always visible, even when no tasks) */}
                    <footer className='h-[40px] px-4 p-[3px] text-xs text-neutral-500 flex justify-between items-center'>
                        <p>Created at {collection.createdAt.toLocaleDateString('en-US')}</p>
                        {isLoading ? (
                            <span className='font-bold'>Deleting..</span>
                        ) : (
                            <div>
                                <Button
                                    onClick={() => setShowModel(true)}
                                    size={'icon'}
                                    variant={'ghost'}
                                >
                                    <Plus />
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button size={'icon'} variant={'destructive'}>
                                            <Trash />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogTitle>Delete Collection</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete {collection.name}? This action cannot be undone.
                                        </AlertDialogDescription>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => startTransition(removeCollection)}
                                            >
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )}
                    </footer>
                </CollapsibleContent>
            </Collapsible>
        </>
    )
}

export default CollectionCard