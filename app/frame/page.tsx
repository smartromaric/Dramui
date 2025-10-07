"use client"
import { motion, useScroll } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const Frame = () => {

    return (
        <div className="relative flex h-screen bg-white/10 justify-center items-center">
            {/* <ScrollBar /> */}
            {/* <LayoutAnimation /> */}
            <motion.div
                initial={{ filter: "blur(10px)" }}
                whileTap={{ filter: "blur(0px)" }}
                transition={{ duration: 2 }}
            >
                <Image src="vercel.svg" alt="logo" width={100} height={100} />
            </motion.div>

            <motion.div
                initial={{ maskImage: "linear-gradient(to right, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)" }}
                whileTap={{ maskImage: "linear-gradient(to left, rgba(255,0,0,1) 90%, rgba(255,0,0,0) 100%)" }}
                transition={{ duration: 2 }}
            >
                <motion.div
                className="size-10 bg-red-500 w-full h-full"
  initial={{ height: 0 }}
  animate={{ height: "100%" }}
/>
            
                <Image src="vercel.svg" alt="logo" width={100} height={100} />
            </motion.div>
        </div>
    )
}

export default Frame;




const ScrollBar = () => {
    const { scrollYProgress } = useScroll();
    return (
        <div className="relative">
            <motion.div
                className="fixed top-0 left-0 right-0 h-2 bg-red-500 origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            <div className="min-h-screen p-8">
                <div className="max-w-2xl mx-auto space-y-8">
                    {[...Array(10)].map((_, i) => (
                        <p key={i} className="text-black">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero repellendus,
                            at in hic excepturi rerum placeat mollitia culpa rem accusantium ab accusamus
                            animi sit est a nam omnis veritatis earum. Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Corporis dolorum laboriosam quisquam at reiciendis obcaecati.
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

const LayoutAnimation = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col items-center gap-8 p-8">
            {/* Button to trigger layout change */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Toggle Layout
            </motion.button>

            {/* Container with layout animation */}
            <motion.div
                layout
                className="flex flex-wrap gap-4 justify-center"
                transition={{
                    layout: { duration: 0.3 }
                }}
            >
                {/* Animated cards */}
                {[1, 2, 3, 4].map((item) => (
                    <motion.div
                        key={item}
                        layout
                        className={`
              rounded-xl p-6 
              ${isOpen ? 'w-full' : 'w-[200px]'}
              bg-gradient-to-br from-gray-100 to-gray-200
            `}
                        transition={{
                            layout: { duration: 0.3 },
                            delay: item * 0.1
                        }}
                    >
                        <motion.h3
                            layout="position"
                            className="text-xl font-bold mb-2"
                        >
                            Card {item}
                        </motion.h3>

                        <motion.p
                            layout="position"
                            className="text-gray-600"
                        >
                            {isOpen ? 'This is expanded content that shows when the card is open. It demonstrates how Framer Motion smoothly animates layout changes.' : 'Click to expand...'}
                        </motion.p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Example of shared layout animations */}
            <motion.div
                layout
                className="w-full max-w-2xl bg-gray-50 p-6 rounded-xl"
            >
                <motion.div
                    layout="position"
                    className="flex items-center gap-4 mb-4"
                >
                    <motion.div
                        layout
                        className="w-12 h-12 rounded-full bg-gray-300"
                    />
                    <motion.h2
                        layout="position"
                        className="text-xl font-bold"
                    >
                        Shared Layout Example
                    </motion.h2>
                </motion.div>

                <motion.div
                    layout="position"
                    className="space-y-2"
                >
                    <motion.p layout>
                        This demonstrates how multiple elements can animate together smoothly
                        when their layout changes, maintaining their relative positions.
                    </motion.p>
                    {isOpen && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            Additional content that appears when expanded, showing how new elements
                            can be integrated into layout animations.
                        </motion.p>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};
