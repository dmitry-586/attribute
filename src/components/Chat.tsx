"use client"

import { m } from "motion/react"
import Image from "next/image"
import { useEffect, useRef } from "react"
import CustomInput from "./CustomInput"

export default function Chat() {
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	// Временные данные для примера
	const messages = [
		{ id: 1, text: "Привет! Как дела?", isOwn: false },
		{ id: 2, text: "Привет! Всё отлично, спасибо!", isOwn: true },
		{ id: 3, text: "Чем занимаешься?", isOwn: false },
		{ id: 4, text: "Разрабатываю чат на Next.js", isOwn: true },
		{ id: 5, text: "Как тебе этот интерфейс?", isOwn: false },
		{ id: 6, text: "Выглядит отлично!", isOwn: true },
		{ id: 7, text: "Скролл теперь работает плавно", isOwn: true },
		{ id: 8, text: "Это именно то, что нужно!", isOwn: false },
	]

	// Автопрокрутка при изменении сообщений
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	return (
		<m.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="h-full flex flex-col"
		>
			{/* Заголовок чата */}
			<div className="flex gap-2 items-start mb-3">
				<h2 className="text-[32px]">Чат</h2>
				<Image src="/chatIcon.svg" alt="ChatIcon" width={24} height={24} />
			</div>

			<div
				ref={containerRef}
				className="flex-1 overflow-y-auto pr-2 scrollbar-hide space-y-3"
			>
				{messages.map(message => (
					<m.div
						key={message.id}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.2 }}
						className={`flex ${
							message.isOwn ? "justify-end" : "justify-start"
						}`}
					>
						<div
							className={`max-w-[75%] rounded-[20px] px-4 py-3 ${
								message.isOwn
									? "bg-[#1f9c909c] text-white rounded-br-none"
									: "bg-[#404040] text-white rounded-bl-none"
							}`}
						>
							<p className="text-lg">{message.text}</p>
							<p className={`text-xs mt-1 text-right text-[#DADADA]`}>12:30</p>
						</div>
					</m.div>
				))}
				<div ref={messagesEndRef} />
			</div>

			<div className="sticky bottom-0">
				<CustomInput
					className="w-full mt-[10px]"
					placeholder="Выберите вариант сверху или напишите свой здесь..."
				/>
			</div>
		</m.section>
	)
}
