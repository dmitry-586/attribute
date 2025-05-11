"use client"

import { useMutation } from "@tanstack/react-query"
import { m } from "motion/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import CustomInput from "./CustomInput"

interface IMessage {
	id: number
	text: string
	isOwn: boolean
	timestamp: number
}

export default function Chat() {
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const [messages, setMessages] = useState<IMessage[]>([])
	const [inputText, setInputText] = useState("")
	const [messageId, setMessageId] = useState(1)

	const { mutate: sendMessage } = useMutation({
		mutationFn: async (message: string) => {
			const response = await fetch("http://83.220.169.74/ask", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: message }),
			})
			return response.json()
		},
		onSuccess: (data) => {
			const botMessage: IMessage = {
				id: messageId + 1,
				text: data.response,
				isOwn: false,
				timestamp: Date.now(),
			}
			setMessages(prev => [...prev, botMessage])
			setMessageId(prev => prev + 2)
		},
		onError: () => {
			const errorMessage: IMessage = {
				id: messageId + 1,
				text: "Ошибка соединения с сервером",
				isOwn: false,
				timestamp: Date.now(),
			}
			setMessages(prev => [...prev, errorMessage])
			setMessageId(prev => prev + 2)
		},
	})

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	const handleSend = () => {
		if (!inputText.trim()) return

		const newMessage: IMessage = {
			id: messageId,
			text: inputText,
			isOwn: true,
			timestamp: Date.now(),
		}

		setMessages(prev => [...prev, newMessage])
		setInputText("")
		setMessageId(prev => prev + 1)
		sendMessage(inputText)
	}

	const formatTime = (timestamp: number) => {
		const date = new Date(timestamp)
		return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
	}

	return (
		<m.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="h-full flex flex-col"
		>
			<div className="flex gap-2 items-start mb-3">
				<h2 className="text-[32px]">Чат</h2>
				<Image src="/chatIcon.svg" alt="ChatIcon" width={24} height={24} />
			</div>

			<div className="flex-1 overflow-y-auto pr-2 scrollbar-hide space-y-3">
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
							} whitespace-pre-wrap break-words overflow-hidden`}
						>
							<p className="text-lg">{message.text}</p>
							<p className="text-xs mt-1 text-right text-[#DADADA]">
								{formatTime(message.timestamp)}
							</p>
						</div>
					</m.div>
				))}
				<div ref={messagesEndRef} />
			</div>

			<div className="sticky bottom-0">
				<CustomInput
					className="w-full mt-[10px]"
					placeholder="Введите сообщение..."
					value={inputText}
					onChange={e => setInputText(e.target.value)}
					onSend={handleSend}
				/>
			</div>
		</m.section>
	)
}
