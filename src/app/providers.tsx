"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { LazyMotion, domAnimation } from "motion/react"
import { useState } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        {children}
      </LazyMotion>
    </QueryClientProvider>
  )
}