'use client'

import Navbar from "@/components/Navbar"
import QuestionBuilder from "@/components/QuestionBuilder"
import QuizGenerator from "@/components/QuizGenerator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import axios from "axios"
import { Loader2, Plus, Save, Sparkles, Wand2 } from "lucide-react"

import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

type Question = {
    id:string,
    question:string,
    options:string[],
    answer:string
}

type QuizData = {
    title:string,
    description:string,
    totalMarks:number,
    createdBy:string,
    questions:Question[]

}


const Page = () => {

    const router = useRouter()
    const {data:session} =  useSession()

    const [isSubmitting,setIsSubmitting] = useState(false)
    const [showGenerator, setShowGenerator] = useState(false)
    const [userEmail,setUserEmail] = useState('')
    const [quizData, setQuizData] = useState<QuizData>({
        title: '',
        description: '',
        totalMarks:0,
        createdBy:session?.user.email || '' ,
        questions: [],
    })

    useEffect(()=>{
        setUserEmail(session?.user.email || '')
        
    },[session])

    useEffect(()=>{
        setQuizData((prev) => ({...prev,createdBy:userEmail}))
    },[userEmail])
    useEffect(() => {
      setQuizData((prev) => ({
        ...prev,
        totalMarks: prev.questions.length * 4,
      }))
    }, [quizData.questions.length])

    useEffect(()=>{
      console.log(quizData.totalMarks)
    },[quizData])
    const handleSignOut = () => {
        signOut()
        toast.success('User SIgn-out Succesfuly')
    }

    const addQuestion = () => {
        const newQuestion: Question = {
        id:'',
        question: '',
        options: ['', '', '', ''],
        answer: '',
        }

    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }))
  }

  const updateQuestion = (
    questionId: string,
    updatedQuestion:Question
  ) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, ...updatedQuestion } : q
      ),
    }))
  }

  const deleteQuestion = (questionId: string) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }))
  }

  const handleGeneratedQuestions = (generatedQuestions: Question[]) => {
    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, ...generatedQuestions],
    }))

    toast.success('Questions Generated Successfully')

    setShowGenerator(false)
  }

  const handleSaveQuiz = async () => {
    setIsSubmitting(true)
    
    if (!quizData.title.trim()) {
      setIsSubmitting(false)
      toast.error('title required')
      return
    }

    if (quizData.questions.length === 0) {
      setIsSubmitting(false)
      toast.error('No Questions Added')
      return
    }

    quizData.questions.forEach((question) => {
      if (!question.question.trim()) {
        setIsSubmitting(false)
        toast.error('Questions must be filled')
        return
    }

      if (question.options.some((option) => !option.trim())) {
        setIsSubmitting(false)
        toast.error('options must be filled')
        return
      }

      if (!question.answer) {
        setIsSubmitting(false)
        toast.error('correct answer must be filled')
        return
      }
    })
    const data = await axios.post('/api/createQuiz',quizData)

    console.log(data)

    router.replace('/dashboard')
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-100/10 to-teal-100">
      <Navbar isLoggedIn onSignOut={handleSignOut} />

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">
            Create New Quiz
          </h1>
          <p className="text-gray-400">
            Build an engaging quiz for your audience
          </p>
        </div>

        <Card className="border-teal-100/10 mb-8">
          <CardHeader>
            <CardTitle className="text-indigo-900">Quiz Information</CardTitle>
            <CardDescription>Basic details about your quiz</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Quiz Title *</Label>
              <Input
                id="title"
                placeholder="Enter quiz title..."
                value={quizData.title}
                onChange={(e) =>
                  setQuizData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                placeholder="Describe what this quiz covers..."
                value={quizData.description}
                onChange={(e) =>
                  setQuizData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="mt-1 min-h-[100px] w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* AI Quiz Generator Section */}
        <Dialog
          open={showGenerator}
          onOpenChange={setShowGenerator}
          modal={true}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-indigo-900 flex items-center">
              <Wand2 className="h-5 w-5 mr-2" />
              AI Quiz Generator
              </DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <QuizGenerator
              userEmail={userEmail}
              onQuestionsGenerated={handleGeneratedQuestions}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Questions Section */}
        <Card className="border-teal-100/10 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-indigo-900">
                  Questions ({quizData.questions.length})
                </CardTitle>
                <CardDescription>
                  Add and manage your quiz questions
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowGenerator(!showGenerator)}
                  variant="outline"
                  className="border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {showGenerator ? 'Hide Generator' : 'AI Generator'}
                </Button>
                <Button
                  onClick={addQuestion}
                  className="bg-indigo-900 hover:bg-indigo-900/90 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {quizData.questions.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg mb-4">No questions added yet</p>
                <p className="text-sm mb-6">
                  Use the AI Generator or manually add questions
                </p>
                <div className="flex justify-center space-x-3">
                  <Button
                    onClick={() => setShowGenerator(true)}
                    variant="outline"
                    className="border-teal-700 text-teal-700 hover:bg-teal-700/90 hover:text-white"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate with AI
                  </Button>
                  <Button
                    onClick={addQuestion}
                    variant="outline"
                    className="border-indigo-900 text-indigo-900 hover:bg-indigo-900 hover:text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Manually
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {quizData.questions.map((question, index) => (
                  <QuestionBuilder
                    key={question.id}
                    question={question}
                    questionNumber={index + 1}
                    onUpdate={(updatedQuestion) =>
                      updateQuestion(question.id, updatedQuestion)
                    }
                    onDelete={() => deleteQuestion(question.id)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => router.replace('/dashboard')}
            className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white"
          >
            Cancel
          </Button>

          <div className="flex space-x-4">

            <Button
              onClick={handleSaveQuiz}
              disabled={ !quizData.title || !quizData.description || isSubmitting}
              className="bg-indigo-900 hover:bg-indigo-700 text-white flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Quiz</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page