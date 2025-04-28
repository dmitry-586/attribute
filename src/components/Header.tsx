import { m } from "motion/react"
import Image from "next/image"
import CustomInput from "./CustomInput"

const containerVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
}
export default function Header() {
	const categories = ["Квартиры", "Спортзалы", "Медицина", "Одежда"]

	return (
		<m.header
			initial="hidden"
			animate="visible"
			variants={containerVariants}
			className="flex flex-col justify-center items-center"
		>
			<m.h1
				variants={itemVariants}
				className="text-[42px] font-medium text-center"
			>
				Добро пожаловать, мы поможем вам с выбором!
			</m.h1>
			<CustomInput
				className="mt-[20px]"
				placeholder="Выберите или напишите категорию для обсуждения.."
			/>
			<m.section variants={containerVariants} className="mt-5 flex gap-[30px]">
				<m.button
					variants={itemVariants}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="rounded-full size-[40px] bg-[#1F9C8F] flex justify-center items-center cursor-pointer"
				>
					<Image src="/history.svg" alt="icon" width={28} height={28} />
				</m.button>

				<m.div variants={containerVariants} className="flex gap-10">
					{categories.map(category => (
						<m.button
							key={category}
							variants={itemVariants}
							whileHover={{ scale: 1.02, backgroundColor: "#1F9C8F" }}
							whileTap={{ scale: 0.98 }}
							transition={{ type: "spring", stiffness: 300 }}
							className="w-[180px] h-[40px] bg-[#62929E] rounded-[20px] text-[18px] cursor-pointer"
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
				className="w-full h-[1px] bg-white mt-5 mb-3"
			/>
		</m.header>
	)
}
