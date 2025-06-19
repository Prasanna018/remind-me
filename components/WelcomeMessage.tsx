'use client'
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server'
import { motion } from 'motion/react';
import { Button } from './ui/button';

const WelcomeMessage = () => {
    const { user } = useUser()

    return user && (
        <div className="max-w-3xl mx-auto text-center p-6">
            {user && user.firstName && user.lastName && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-2"
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-muted-foreground"
                    >
                        Welcome back,
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 bg-clip-text text-transparent"
                    >
                        {user.firstName}{" "}{user.lastName}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-muted-foreground mt-4"
                    >
                        Ready to pick up where you left off?
                    </motion.p>
                </motion.div>
            )
            }
            {/* <div className='hidden md:visible'>
                {
                    !user && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent"
                            >
                                Never Forget What Matters
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                            >
                                Stay on top of your tasks and reminders with our intuitive platform
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex gap-4 justify-center"
                            >
                                <Button asChild variant="outline" className="px-8">
                                    <SignUpButton>Get Started</SignUpButton>
                                </Button>
                                <Button asChild className="px-8 bg-gradient-to-r from-yellow-500 to-pink-500">
                                    <SignInButton>Sign In</SignInButton>
                                </Button>
                            </motion.div>
                        </motion.div>
                    )
                }
            </div> */}

        </div>
    )
}

export default WelcomeMessage