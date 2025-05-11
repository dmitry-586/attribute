import Image from "next/image"
import { useEffect, useRef } from "react"

interface CustomInputProps {
	className?: string
	placeholder: string
	value?: string
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	onSend: () => void
}

export default function CustomInput({
	className,
	placeholder,
	value = "",
	onChange,
	onSend,
}: CustomInputProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const LINE_HEIGHT = 28

	useEffect(() => {
		adjustHeight()
	}, [value])

	const adjustHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto"
			const newHeight = Math.min(textareaRef.current.scrollHeight, 200)
			textareaRef.current.style.height = `${Math.max(newHeight, LINE_HEIGHT)}px`
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange(e)
		adjustHeight()
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault()
			handleSend()
		}
	}

	const handleSend = () => {
		onSend()
		setTimeout(() => {
			if (textareaRef.current) {
				textareaRef.current.style.height = `${LINE_HEIGHT}px`
			}
		}, 0)
	}

	return (
		<div
			className={`flex items-center w-[920px] bg-[#404040] pr-[10px] rounded-3xl ${className}`}
		>
			<div className="flex-1 relative h-full py-3 pl-5 pr-2">
				<textarea
					ref={textareaRef}
					className="placeholder:text-[#BCBCBC] w-full outline-none text-[22px] resize-none overflow-y-auto scrollbar-hide align-middle leading-[115%]"
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					rows={1}
				/>
			</div>

			<button
				className="rounded-full size-10 bg-[#1F9C8F] flex justify-center items-center cursor-pointer shrink-0 ml-2"
				onClick={handleSend}
			>
				<Image
					src="/inputArrow.svg"
					alt="arrow"
					width={24}
					height={24}
					className="ml-[1px]"
				/>
			</button>
		</div>
	)
}
