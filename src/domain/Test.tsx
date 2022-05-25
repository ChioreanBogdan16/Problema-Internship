import { useState } from 'react';
import { Question } from './Question';

export const Test = () => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [count, setCount] = useState(0);
    const [countCorrect, setCountCorrect] = useState(0);
    const handleAnswer = (receivedCount: number) => {
        setQuestionNumber(questionNumber + 1);
        setCount(count + receivedCount)
        if (receivedCount > 0) {
            setCountCorrect(countCorrect + 1);
        }
    }

    return (
        <div>
            {count >= 0 ?
                <>
                    <div>Score: {count}</div>
                    <Question questionNumber={questionNumber}
                        onAnswer={handleAnswer}
                    />
                </>
                : (
                    <>
                        <p>Felicitari!</p>
                        <p>Ai raspuns corect la {countCorrect} intrebari din {questionNumber} :) !</p>
                    </>
                )
            }

        </div>
    );
}