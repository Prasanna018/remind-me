'use client'
import { useUser } from '@clerk/nextjs';

import { motion } from 'motion/react';


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

        </div>
    )
}

export default WelcomeMessage