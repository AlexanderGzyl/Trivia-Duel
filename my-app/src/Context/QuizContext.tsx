// @ts-nocheck
import React, { createContext, useState} from "react";


export const QuizContext = createContext()
const QuizProvider = ({children}) => {
    const [category, setCategory] = useState([]);

return(
    <QuizContext.Provider value ={{category, setCategory}}>
        {children}
    </QuizContext.Provider>
)


}

export default QuizProvider