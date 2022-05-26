import { useState, useEffect } from "react";
import { RenderQuestion } from "./RenderQuestion";

interface QuestionProps { //se declara proprietatile parametrilor 
  questionNumber: number;
  onAnswer: (count: number) => void;//
}
/* Randomize array using Durstenfeld shuffle algorithm */
function shuffleArray(array: string[]) {
  const copyArray = [...array];
  for (var i = copyArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copyArray[i];
    copyArray[i] = copyArray[j];
    copyArray[j] = temp;
  }
  return copyArray;
}
export const Question = ({ onAnswer, questionNumber }: QuestionProps) => {

  const [question, setQuestion] = useState({ text: '', answers: [''], correctAnswer: '' });
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=1").then(response => response.json())
      .then(data => {
        const isBoolean = data.type === 'boolean'
        const parsedResponse = {
          text: data.results[0].question,
          correctAnswer: data.results[0].correct_answer,
          answers: isBoolean ? ['True', 'False'] : shuffleArray([...data.results[0].incorrect_answers, data.results[0].correct_answer])
        }
        setQuestion(parsedResponse);
      });
  }, [questionNumber])


  return (
  
      <RenderQuestion question={question} onAnswer={onAnswer} />
    
  );
}