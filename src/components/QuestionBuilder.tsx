import { Check, GripVertical, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { RadioGroup } from "./ui/radio-group"
import { RadioGroupItem } from "@radix-ui/react-radio-group"
import { Input } from "./ui/input"








interface Question {
  id: string
  question: string
  options: string[]
  answer: string
}

interface QuestionBuilderProps {
  question: Question
  questionNumber: number
  onUpdate: (updatedQuestion: Question) => void
  onDelete: () => void
}

const QuestionBuilder = ({
  question,
  questionNumber,
  onUpdate,
  onDelete,
}: QuestionBuilderProps) => {
  const updateOption = (index: number, value: string) => {
    const newOptions = [...question.options]
    newOptions[index] = value
    onUpdate({...question ,options: newOptions })
  }

  const addOption = () => {
    onUpdate({...question ,options: [...question.options, ''] })
  }

  const removeOption = (index: number) => {
    if (question.options.length <= 2) 
        return

    const newOptions = question.options.filter((_, i) => i !== index)
    onUpdate({...question, options: newOptions })

    if (question.answer === question.options[index]) {
      onUpdate({ ...question,answer: '' })
    }
  }

  return (
    <Card className="border-indigo-900/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-indigo-900 flex items-center">
            <GripVertical className="h-5 w-5 mr-2 text-gray-400" />
            Question {questionNumber}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <Label htmlFor={`question-${question.id}`}>Question Text *</Label>
          <textarea
            id={`question-${question.id}`}
            placeholder="Enter your question here..."
            value={question.question}
            onChange={(e) =>
              onUpdate({ ...question, question: e.target.value })
            }
            className="mt-1 min-h-[80px] w-full"
          />
        </div>

        <div>
          <Label>Answer Options *</Label>
          <div className="mt-2 space-y-3">
            <RadioGroup
              value={question.answer}
              onValueChange={(value) =>
                onUpdate({ ...question, answer: value })
              }
            >
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
                >
                  <RadioGroupItem
                    value={option}
                    id={`option-${question.id}-${index}`}
                    disabled={!option.trim()}
                  />
                  <div className="flex-1 flex items-center space-x-2">
                    <Label
                      htmlFor={`option-${question.id}-${index}`}
                      className="font-medium text-indigo-900"
                    >
                      {question.answer === option ? (
                        <Check className="text-green-600 w-4 h-4 mr-1" />
                      ) : (
                        `${String.fromCharCode(65 + index)}.`
                      )}
                      
                    </Label>
                    <Input
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="flex-1"
                    />
                    {question.options.length > 2 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeOption(index)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>

            {question.options.length < 5 && (
              <Button
                variant="outline"
                size="sm"
                onClick={addOption}
                className="border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white"
              >
                Add Option
              </Button>
            )}
          </div>

          {!question.answer && (
            <p className="text-sm text-red-600 mt-2">
              Please select the correct answer by clicking the radio button next
              to it.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default QuestionBuilder