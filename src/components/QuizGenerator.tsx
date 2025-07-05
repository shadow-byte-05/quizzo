import { Loader2, Wand2 } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import axios from "axios"




interface Question {
    id: string
    question: string
    options: string[]
    answer: string
    explanation?: string
}

interface QuizGeneratorProps {
    userEmail:string
  onQuestionsGenerated: (questions: Question[]) => void
}

const QuizGenerator = ({ userEmail,onQuestionsGenerated }: QuizGeneratorProps) => {
  const [topic, setTopic] = useState('')
  const [content, setContent] = useState('')
  const [questionCount, setQuestionCount] = useState('5')

  const [isGenerating, setIsGenerating] = useState(false)

  const generateQuestions = async () => {
    if (!topic.trim()) {
      return
    }
    setIsGenerating(true)

    const data = await axios.post('/api/ai-generate-quiz', {
      topicName: topic,
      noOfQuestion: questionCount,
      createdBy: userEmail,
    })
    console.log(data)



    onQuestionsGenerated(data.data.questions)
    setIsGenerating(false)
    setTopic('')
    setContent('')
  }

  return (
    <Card className="border-teal-100 bg-gradient-to-br from-teal-100/5 to-lime-100/5">

      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="topic">Topic or Subject</Label>
          <Input
            id="topic"
            placeholder="e.g., JavaScript Fundamentals, World History, Biology..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="questionCount"
              className="text-sm font-medium text-gray-700"
            >
              Number of Questions
            </Label>
            <Select value={questionCount} onValueChange={setQuestionCount}>
              <SelectTrigger id="questionCount" className="mt-1 w-full">
                <SelectValue placeholder="Select number of questions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 Questions</SelectItem>
                <SelectItem value="5">5 Questions</SelectItem>
                <SelectItem value="10">10 Questions</SelectItem>
                <SelectItem value="15">15 Questions</SelectItem>
                <SelectItem value="20">20 Questions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={generateQuestions}
          disabled={(!topic.trim() && !content.trim()) || isGenerating}
          className="w-full bg-teal-700 hover:bg-teal-600 text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Questions...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Questions
            </>
          )}
        </Button>

        <p className="text-xs text-gray-400 text-center">
          Generated questions will be added to your quiz. You can edit them
          afterwards.
        </p>
      </CardContent>
    </Card>
  )
}

export default QuizGenerator