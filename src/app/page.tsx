"use client"

import Chat from "@/components/Chat"
import Header from "@/components/Header"
import { m } from "motion/react"

const ellipseVariants = {
	hidden: {
		opacity: 0,
		scale: 0.5,
		x: -100,
		y: -100,
		rotate: -30,
	},
	visible: {
		opacity: 1,
		scale: 1,
		x: 0,
		y: 0,
		rotate: 0,
		transition: {
			type: "spring",
			stiffness: 120,
			damping: 15,
			duration: 1.2,
		},
	},
	glow: {
		boxShadow: [
			"5px 5px 20px 5px rgba(31, 156, 143, 0.7)",
			"10px 10px 30px 15px rgba(31, 156, 143, 0.5)",
			"5px 5px 20px 5px rgba(31, 156, 143, 0.7)",
		],
		y: [0, 7, 0],
		transition: {
			duration: 3.5,
			repeat: Infinity,
			ease: "easeInOut",
		},
	},
}

export default function Home() {
	return (
		<>
			<m.span
				className="ellipse"
				initial="hidden"
				animate={["visible", "glow"]}
				variants={ellipseVariants}
			/>
			<main className="py-[20px] max-w-[1000px] mx-auto relative z-10 h-screen flex flex-col">
				<Header />
				<div className="flex-1 min-h-0">
					<Chat />
				</div>
			</main>
		</>
	)
}
