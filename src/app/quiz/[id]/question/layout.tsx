import { AnswerProvider } from '@/context/answerContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AnswerProvider>{children}</AnswerProvider>
}
