import { SyntheticEvent, useEffect, useState } from "react";


interface Props {
  question: { answers: string[], text: string, correctAnswer: string };
  onAnswer: (count: number) => void
}
export const RenderQuestion = ({ question, onAnswer }: Props) => {
  const [count, setCount] = useState(10);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => {
        if (count === 0) {
          onAnswer(-1)
          setCount(10)
        }
        return count - 1
      })
    }, 1000)
    return () => clearInterval(interval);
  }, [onAnswer])

  const handleSubmit = (event: any) => {
    event.preventDefault()
    setCount(10);
    if (response === question.correctAnswer)
      onAnswer(1)
    else
      onAnswer(-1)
  }

  const handleChange = (event: any) => {
    setResponse(event.target.value)
  }


  return (
    <>
      <div>Question: {question.text}</div>
      {question.correctAnswer}
      <form onSubmit={handleSubmit}>
        {
          question.answers.map((answer, index) =>
            <div key={index}>
              <input
                name="question"
                type='radio'
                value={answer}
                checked={response === answer}
                onChange={handleChange} />
              {answer}
            </div>
          )
        }
        <button type="submit">Submit</button>
      </form>
      <p>Timer: {count}</p>
    </>
  )
}