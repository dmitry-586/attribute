import { m } from "motion/react"
import Image from "next/image"
import { itemVariants } from "./Header"

interface ICustomInput {
	className?: string
	placeholder: string
}

export default function CustomInput({ className, placeholder }: ICustomInput) {
	return (
		<m.div
			variants={itemVariants}
			className={`flex items-center w-[920px] h-[60px] rounded-full bg-[#404040] pr-[10px] shadow-outset border-[2px] border-transparent focus-within:border-[#62929E] transition-colors duration-300 ${className}`}
		>
			<input
				type="text"
				className="placeholder:text-[#BCBCBC] w-full h-full px-10 outline-none text-[22px] bg-transparent"
				placeholder={placeholder}
			/>
			<m.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="rounded-full size-10 bg-[#1F9C8F] flex justify-center items-center cursor-pointer"
			>
				<Image src="/inputArrow.svg" alt="arrow" width={24} height={24} />
			</m.button>
		</m.div>
	)
}
