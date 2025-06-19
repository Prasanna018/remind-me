import { Collection } from '@prisma/client'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { cn } from '@/lib/utils'
import { CollectionColor, CollectionColorType } from '@/lib/constant/collectionColors'
import { useForm } from 'react-hook-form'
import { createTaskSchema, createTaskSchemaType } from '@/schema/createTask'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from './ui/form'
import { CreateCollectionSchemaType } from '@/schema/createCollection'
import { Textarea } from './ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar } from './ui/calendar'
import { Button } from './ui/button'
import { Calendar1, CalendarHeartIcon, Loader2Icon } from 'lucide-react'
import { format } from 'date-fns'
import { createTaskAction } from '@/actions/createTaskAction'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


interface Props {
    open: boolean,
    setOpen: (open: boolean) => void
    collection: Collection
}
const CreateTaskDialog = ({ open, setOpen, collection }: Props) => {
    const form = useForm<createTaskSchemaType>({
        defaultValues: {
            collectionId: collection.id
        },
        resolver: zodResolver(createTaskSchema)
    })
    const router = useRouter();

    const handleOpenWrapper = (value: boolean) => {
        setOpen(value)
    }

    const onSubmit = async (data: createTaskSchemaType) => {
        console.log(data)
        try {
            await createTaskAction(data)
            toast.success('Task Created')
            handleOpenWrapper(false)
            router.refresh();

            form.reset();
        } catch (error) {
            toast.error('Error in task creation')

        }

    }
    return (
        <Dialog open={open} onOpenChange={handleOpenWrapper}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Task to <span
                        className={cn(`bg-clip-text text-transparent p-1`, CollectionColor[collection.color as CollectionColorType])}
                    >{collection.name}</span>Collection</DialogTitle>
                    <DialogDescription>
                        Add Task
                    </DialogDescription>
                </DialogHeader>
                <div className='w-full'>
                    <Form {...form}>

                        <form className='flex flex-col space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='content'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={5}
                                                placeholder='content'
                                                {...field}

                                            ></Textarea>
                                        </FormControl>
                                    </FormItem>
                                )}

                            >

                            </FormField>

                            <FormField
                                control={form.control}
                                name='expiresAt'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Expires At</FormLabel>
                                        <FormDescription>when should the task exprires?</FormDescription>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={'outline'}
                                                        className=''
                                                    >
                                                        <Calendar1 className='mr-2 w-4 h-4'></Calendar1>
                                                        {field.value ? format(field.value, 'PPP') : <span>No expiry</span>}

                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <Calendar
                                                        mode='single'
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                    ></Calendar>
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                    </FormItem>
                                )}

                            >

                            </FormField>


                        </form>
                    </Form>

                </div>
                <DialogFooter>
                    <Button
                        className={cn(CollectionColor[collection.color as CollectionColorType])}
                        disabled={form.formState.isSubmitting}
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        {
                            form.formState.isSubmitting && <Loader2Icon className='animate-spin w-5 h-5'></Loader2Icon>
                        }
                        Confirm
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default CreateTaskDialog
