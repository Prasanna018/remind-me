'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ModeToggle'
import { Button } from './ui/button'
import { motion, Variants } from 'motion/react'

const Navbar = () => {
    // Animation variants with proper typing
    const fadeIn: Variants = {
        hidden: {
            x: 20,
            opacity: 0,
        },
        show: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    const slideIn: Variants = {
        hidden: {
            y: -80,
            opacity: 0,
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 0.25,
                ease: 'easeOut',
            },
        },
    };

    const navItemsVariants: Variants = {
        hidden: { x: -20, opacity: 0 },
        show: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 0.5,
                ease: 'easeOut',
            }
        }
    };

    return (
        <motion.nav
            initial="hidden"
            animate="show"
            variants={slideIn}
            className='flex items-center w-full px-4 sm:px-8 md:px-12 h-16 justify-between border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50'
        >
            {/* Logo with animation */}
            <motion.div variants={fadeIn}>
                <Link href={'/'} className='flex items-center gap-2'>
                    <span className='bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text text-2xl font-bold tracking-tighter'>
                        Remind Me
                    </span>
                </Link>
            </motion.div>

            {/* Navigation items */}
            <motion.div
                variants={navItemsVariants}
                className='flex items-center gap-x-2 sm:gap-x-4'
            >
                <SignedIn>
                    <UserButton
                        appearance={{
                            elements: {
                                userButtonAvatarBox: 'w-9 h-9',
                                userButtonPopoverCard: 'bg-background border',
                                userButtonPopoverActionButtonText: 'text-foreground',
                                userButtonPopoverFooter: 'hidden'
                            }
                        }}
                    />
                </SignedIn>

                <SignedOut>
                    <Button
                        asChild
                        variant="outline"
                        className='hidden sm:inline-flex'
                    >
                        <SignUpButton />
                    </Button>
                    <Button asChild className='bg-gradient-to-r from-yellow-500 to-pink-500'>
                        <SignInButton />
                    </Button>
                </SignedOut>

                <ModeToggle />
            </motion.div>
        </motion.nav>
    )
}

export default Navbar