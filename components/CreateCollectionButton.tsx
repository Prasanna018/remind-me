'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { PlusCircle } from 'lucide-react'
import CreateCollectionSheet from './CreateCollectionSheet'

const CreateCollectionButton = () => {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
        setOpen(open)
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className="group relative overflow-hidden w-full mt-2 cursor-pointer"
            >
                {/* Gradient background animation */}
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                    <PlusCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
                    <span className="font-medium tracking-wide">Create Collection</span>
                </span>

                {/* Glow effect */}
                <span className="absolute -inset-1 bg-blue-400/30 blur-md group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
            </Button>
            <CreateCollectionSheet open={open} onOpenChange={handleOpenChange} />
        </>
    )
}

export default CreateCollectionButton;