

import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCollectionSchema, CreateCollectionSchemaType } from '@/schema/createCollection'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { CollectionColor, CollectionColorType } from '@/lib/constant/collectionColors'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { CreateCollectionAction } from '@/actions/collectionAction'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'


interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void;
}

const CreateCollectionSheet = ({ open, onOpenChange }: Props) => {
    const form = useForm<CreateCollectionSchemaType>({
        resolver: zodResolver(createCollectionSchema),
        defaultValues: {
            name: "",
            color: ""
        }
    })
    const router = useRouter()
    const onSubmit = async (data: CreateCollectionSchemaType) => {
        console.log(data)
        try {
            await CreateCollectionAction(data);


            toast.success('Collection created successfully!');
            handleOpenWrapper(false)
            router.refresh();

            form.reset();

        } catch (error) {
            toast.error('Failed to create collection');
        }
    }

    const handleOpenChange = (open: boolean) => {

        form.reset();

        onOpenChange(open);
    }

    const handleOpenWrapper = (open: boolean) => {

        form.reset();
        onOpenChange(open)

    }

    return (
        <Sheet open={open} onOpenChange={handleOpenWrapper}>
            <SheetContent className='p-4 w-full max-w-md'>
                <SheetHeader className='mb-6'>
                    <SheetTitle className='text-2xl font-bold text-gray-800 dark:text-white'>
                        Add New Collection
                    </SheetTitle>
                    <SheetDescription className='text-gray-600 dark:text-gray-400'>
                        Collections help you organize and group your tasks effectively
                    </SheetDescription>
                </SheetHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-gray-700 dark:text-gray-300 font-medium'>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Personal'
                                            {...field}
                                            className='border-gray-300 dark:border-gray-600 focus-visible:ring-2 focus-visible:ring-primary/50'
                                        />
                                    </FormControl>
                                    <FormDescription className='text-gray-500 dark:text-gray-400 text-sm'>
                                        Give your collection a descriptive name
                                    </FormDescription>
                                    <FormMessage className='text-red-500 text-sm' />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='color'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-gray-700 dark:text-gray-300 font-medium'>
                                        Color
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className={cn(
                                                `w-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary/50`,
                                                field.value && CollectionColor[field.value as CollectionColorType]
                                            )}>
                                                <SelectValue placeholder='Choose Color' />
                                            </SelectTrigger>
                                            <SelectContent className='border-gray-200 dark:border-gray-700 shadow-lg rounded-md'>
                                                {Object.keys(CollectionColor).map(color => (
                                                    <SelectItem
                                                        className={cn(
                                                            `w-full m-1 p-2 text-white rounded-md transition-colors hover:opacity-90`,
                                                            CollectionColor[color as CollectionColorType],
                                                            'focus:bg-opacity-90'
                                                        )}
                                                        value={color}
                                                        key={color}
                                                    >
                                                        {color}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='text-red-500 text-sm' />
                                </FormItem>
                            )}
                        />

                        <div className='flex justify-end pt-4 w-full'>
                            <Button
                                disabled={form.formState.isSubmitting}
                                type='submit'
                                className={cn(
                                    form.watch('color') && CollectionColor[form.getValues("color") as CollectionColorType]
                                )}
                            >{
                                    form.formState.isSubmitting && (
                                        <>
                                            <Loader2Icon className='h-4 w-4 animate-spin m-1'></Loader2Icon>

                                        </>
                                    )
                                }
                                Create Collection
                            </Button>
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

export default CreateCollectionSheet;