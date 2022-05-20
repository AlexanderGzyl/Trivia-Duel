// @ts-nocheck
import React, { createContext, useState} from "react";


export const QuizContext = createContext()
const QuizProvider = ({children}) => {
    const [quizID, setQuizID] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState([]);
    const [category, setCategory] = useState([]);


return(
    <QuizContext.Provider 
    value ={{quizID, 
            setQuizID,
            questions,
            setQuestions,
            score,
            setScore,
            time,
            setTime,
            category,
            setCategory
            }}>
        {children}
    </QuizContext.Provider>
)


}

export default QuizProvider