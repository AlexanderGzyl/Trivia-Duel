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
    const {questions, setQuestions,setTime,setScore,setCategory} = useContext(QuizContext);
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
        setTime((endTime-startTime)/1000)
        
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
        <NextButton onClick={nextQuestion}>
            Next Question
        </NextButton>
        ) : null}
{gameOver && !loading && userAnswers.length === 5 ? (
<Button onClick ={Result}>
    Enter the Arena
</Button>) : null}
</Content>
</Wrapper>
    )

}

const Wrapper = styled.div`
grid-row: 2;
overflow-y: auto;
overflow-x: hidden;
background-color: black;
`;
const Content = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
justify-content:center;

`;
const Button = styled.button`
font-size:1.7em;
    height:20vw;
    width:40vw;
    background-color:black;
    color:#DF740C ;
    cursor:pointer;
    text-decoration:none;
    margin-bottom: 5vh;
    border: #DF740C  0.05em solid;
    border-radius: 0.25em;
    &:hover, :focus{
    outline:0;
    text-decoration:none;
    border: #DF740C  0.125em solid;
    text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#DF740C ;
    box-shadow:
    0 0 0.3em 0 #DF740C ,
    inset 0 0 0.3em 0 #DF740C  ;
    position:relative;
    &:before{
        content:'';
        position:absolute;
        background: #DF740C ;
        height:20%;
        width:100%;
        top:116%;
        left:0;
        transform: perspective(1em) rotateX(40deg);
        filter: blur(0.3em);
        opacity:0.7;
    }
    }
`;

const NextButton = styled.button`
    font-size:1.7em;
    height:10vh;
    width:40vw;
    background-color:black;
    color:#0C77DF ;
    cursor:pointer;
    text-decoration:none;
    margin-bottom: 5vh;
    border: #0C77DF  0.05em solid;
    border-radius: 0.25em;
    &:hover, :focus{
    outline:0;
    text-decoration:none;
    border: #0C77DF 0.125em solid;
    text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#0C77DF ;
    box-shadow:
    0 0 0.3em 0 #0C77DF ,
    inset 0 0 0.3em 0 #0C77DF  ;
    }

`
export default Trivia