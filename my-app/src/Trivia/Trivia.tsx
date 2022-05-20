// @ts-nocheck
import React, { useState,useContext } from "react"
import {useLocation} from 'react-router-dom';
import styled from "styled-components";
import { fetchQuizQuestions } from "./FetchQuestions";
import TriviaCard from "./TriviaCard"
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../Context/QuizContext";

//add start button
//start button disappears and begins the timer
//fetch the quiz data on render
const Trivia = () =>{
    const {questions, setQuestions,setTime,score,setScore,setCategory} = useContext(QuizContext);
    const navigate = useNavigate()
    //states
    //states trigger rerender
    //use reducers?memo?break up state and functions
    const [loading, setLoading] = useState(false);
    const [gameOver, setGameOver] = useState(true);
    const [userAnswers,setUserAnswers] = useState([]);
    const [questionNumber,setQuestionNumber] = useState(0);
    const [clicked,setClicked] = useState(false);
    const [startTime,setStartTime] = useState([]);
    const [endTime,setEndtime] = useState([])
    //constants
    //get selected Trivia category from homepage
    const location = useLocation();

    //functions
    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);
        setTime(0)
        setScore(0)
        //fetch questions
        const newQuestions = await fetchQuizQuestions(location.state);
        setCategory(location.state)
        setQuestions(newQuestions);
        setUserAnswers([])
        setQuestionNumber(0)
        setStartTime(new Date());
        setLoading(false);
        setClicked(true)
    }

    const checkAnswer = (event) =>{
        if (!gameOver) {
            //users answer
            const answer = event.currentTarget.value
            //check answer against the correct value
            const correct = questions[questionNumber].correctAnswer === answer;
            if (correct){setScore(prev => Number(prev)+1 );}
            //save user answer
            const answerObject = {
                question: questions[questionNumber].question,
                answer,
                correct,
                correctAnswer: questions[questionNumber].correctAnswer,
            };
            setUserAnswers(prev => [...prev, answerObject]);
        }
    }

    const nextQuestion = () => {
        //move to next question
        const nextQuestion = questionNumber+ 1;
        if (nextQuestion === 5){
            setGameOver(true)
            setEndtime( new Date());
        }else{
            setQuestionNumber(nextQuestion)
        }
    }

    const Result = () => {
        console.log(userAnswers)
        setTime((endTime-startTime)/1000)
        console.log(score)
        //navigate to arena
        navigate("/arena")
        //put setTime in quizcontext
    }

    return(
<Wrapper>
    <Content>
    {clicked === false ? (
    <Button onClick = {startTrivia}>Start</Button>): null}
    {loading && <p>Loading Questions ...</p> }
    {!loading && !gameOver && (
    <TriviaCard
    answers={questions[questionNumber].answer}
    userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
    question={questions[questionNumber].question}
    callback={checkAnswer}
    />
    )}

{!gameOver && !loading && userAnswers.length === questionNumber + 1 ? (
        <button onClick={nextQuestion}>
            Next Question
        </button>
        ) : null}
{gameOver && !loading && userAnswers.length === 5 ? (
<Button onClick ={Result}>
    enter arena
</Button>) : null}
</Content>
</Wrapper>
    )

}

const Wrapper = styled.div`
grid-row: 2;
overflow-y: auto;
`;
const Content = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
`;
const Button = styled.button`
@media (max-width: 768px){
    height:20vw;
    width:80vw;
    margin-bottom: 2%;
    }
    font-size:30px;
    height:20vw;
    width:50vw;
    
    margin-bottom: 2%;
`;
export default Trivia