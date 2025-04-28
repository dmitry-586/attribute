"use client"

import { m } from "motion/react"
import Image from "next/image"

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

const containerVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
}

export default function Home() {
	const categories = ["Квартиры", "Спортзалы", "Медицина", "Одежда"]

	return (
		<>
			<m.span
				className="ellipse"
				initial="hidden"
				animate={["visible", "glow"]}
				variants={ellipseVariants}
			/>
			<m.main
				initial="hidden"
				animate="visible"
				variants={containerVariants}
				className="py-[60px] flex flex-col justify-center items-center max-w-[1000px] mx-auto relative z-10"
			>
				<m.h1
					variants={itemVariants}
					className="text-[42px] font-medium text-center"
				>
					Добро пожаловать, мы поможем вам с выбором!
				</m.h1>

				<m.div
					variants={itemVariants}
					className="flex items-center rounded-full bg-[#404040] pr-[10px] mt-[50px] shadow-outset border-[2px] border-transparent focus-within:border-[#62929E] transition-colors duration-300"
				>
					<input
						type="text"
						className="placeholder:text-[#BCBCBC] w-[920px] h-[60px] px-10 outline-none text-[22px] bg-transparent"
						placeholder="Выберите или напишите категорию для обсуждения..."
					/>
					<m.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="rounded-full size-10 bg-[#1F9C8F] flex justify-center items-center cursor-pointer"
					>
						<Image src="/inputArrow.svg" alt="arrow" width={24} height={24} />
					</m.button>
				</m.div>

				<m.section
					variants={containerVariants}
					className="mt-10 flex gap-[30px]"
				>
					<m.button
						variants={itemVariants}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="rounded-full size-[50px] bg-[#1F9C8F] flex justify-center items-center cursor-pointer"
					>
						<Image src="/history.svg" alt="icon" width={32} height={32} />
					</m.button>

					<m.div variants={containerVariants} className="flex gap-10">
						{categories.map(category => (
							<m.button
								key={category}
								variants={itemVariants}
								whileHover={{ scale: 1.02, backgroundColor: "#1F9C8F" }}
								whileTap={{ scale: 0.98 }}
								transition={{ type: "spring", stiffness: 300 }}
								className="w-[200px] h-[50px] bg-[#62929E] rounded-[20px] text-[20px] cursor-pointer"
							>
								{category}
							</m.button>
						))}
					</m.div>
				</m.section>

				<m.span
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ duration: 0.5 }}
					className="w-full h-[1px] bg-white mt-10 mb-[20px]"
				/>
			</m.main>
		</>
	)
}
