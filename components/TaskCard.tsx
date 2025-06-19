import { Task } from '@prisma/client'
import React, { useTransition } from 'react'
import { Checkbox } from './ui/checkbox'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { updateTaskStatus } from '@/actions/createTaskAction'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Trash2, Edit, AlarmClock } from 'lucide-react'

const getExpirationColor = (expiresAt: Date) => {
    const hoursLeft = (expiresAt.getTime() - Date.now()) / 1000 / 60 / 60;

    if (hoursLeft <= 0) return 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200'
    if (hoursLeft <= 24) return 'bg-orange-100 dark:bg-orange-900/30 border-orange-500 text-orange-800 dark:text-orange-200'
    if (hoursLeft <= 72) return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500 text-yellow-800 dark:text-yellow-200'
    return 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200'
}

const TaskCard = ({ task }: { task: Task }) => {
    const [isLoading, startTransition] = useTransition();
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "flex items-start gap-4 p-4 rounded-lg border transition-all",
                "hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-neutral-800/50",
                task.done ? "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700",
                isLoading && "opacity-70 pointer-events-none"
            )}
        >
            <div className="flex items-center h-10">
                <Checkbox
                    disabled={task.done || isLoading}
                    onCheckedChange={() => {
                        startTransition(async () => {
                            await updateTaskStatus(task.id)
                            router.refresh()
                        })
                    }}
                    checked={task.done ?? undefined}
                    id={task.id.toString()}
                    className="h-5 w-5 rounded-md border-2 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                />
            </div>

            <div className="flex-1 space-y-1">
                <label
                    htmlFor={task.id.toString()}
                    className={cn(
                        "block text-lg font-medium leading-none cursor-pointer",
                        task.done && "line-through text-gray-500 dark:text-gray-400"
                    )}
                >
                    {task.content}
                </label>

                {task.expiresAt && (
                    <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium",
                        getExpirationColor(task.expiresAt)
                    )}>
                        <AlarmClock className="h-3 w-3" />
                        {format(task.expiresAt, "MMM dd, yyyy")}
                        {new Date(task.expiresAt) < new Date() && (
                            <span className="ml-1">(Overdue)</span>
                        )}
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                    disabled={isLoading}
                >
                    <Edit className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                    disabled={isLoading}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </motion.div>
    )
}

export default TaskCard