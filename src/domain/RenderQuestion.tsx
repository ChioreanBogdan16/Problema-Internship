import { SyntheticEvent, useEffect, useState } from "react";


interface Props {
  question: { answers: string[], text: string, correctAnswer: string };
  onAnswer: (count: number) => void//returneaza void 
}
export const RenderQuestion = ({ question, onAnswer }: Props) => {
  const [count, setCount] = useState(10);
  const [response, setResponse] = useState('');
  const [previous, setPrevious] = useState('1');
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => {
        if (count === 0) {
          onAnswer(-1)
          setCount(10)
        }
        return count - 1
      })//timer  , daca ajunge la 0 se trimite raspuns la test (-1) si se reseteaza counterul 
    }, 1000)
    return () => clearInterval(interval);//se oreste la 0 
  }, [onAnswer]) //se executa useEffect de fiecare data cand se modifica onAnswer(cand se apasa pe submit)

  const handleSubmit = (event: any) => {  //cand se apasa pe submit saceasta functie este chemata ,
    event.preventDefault()
    console.log(response)
      if(response==='') return null;
      else  if(response===previous) return null;
    setPrevious(response)
    setCount(10);   //reseteaza counter pentru urmatoarea intrebare
    if (response === question.correctAnswer)//verifica daca raspunsul este corect 
      onAnswer(1)  //rasp corect +1 punct
    else 
      onAnswer(-1)   //rasp gresit -1 punct
  }

  const handleChange = (event: any) => {
    setResponse(event.target.value)
  }


  return (
    <>
  
      <div>Question: {question.text}</div>
  
      <form onSubmit={handleSubmit}>
        {
          question.answers.map((answer, index) =>
            <div key={index}>
              <input
                name="question"
                type='radio'
                value={answer}
                checked={response === answer} //se foloseste pentru a nu ramane selectat butonul tip radio de la o intrebare la alta 
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