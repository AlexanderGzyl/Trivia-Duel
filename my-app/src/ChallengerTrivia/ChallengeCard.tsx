// @ts-nocheck
import React from "react";
import styled from "styled-components";


const ChallengeCard = ({answers, userAnswer, callback,question}) => {
    return(
    
      <Content>
    <Question>{question}</Question>
    
      {answers.map((answer) => (
          
        <ButtonWrapper
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
          key={answer}
        >
          <AnswerButton disabled={userAnswer ? true : false} value={answer} onClick={callback}>
              {answer}
          </AnswerButton>
        </ButtonWrapper>
        
      ))}
    
    </Content>
    
    )
}
const Content = styled.div`
display:flex;
flex-direction:column;
align-items:center;
`;

const ButtonWrapper = styled.div`
@media (min-width: 768px){
    max-width:50vw;}
    max-height:10vh;
    max-width:90vw;
    margin-bottom: 2vh;
    & :disabled {
      cursor: not-allowed;
      border: ${({ correct, userClicked }) =>
      correct
        ? 'green  0.1em solid;'
        : !correct && userClicked
        ? 'red  0.1em solid;'
        : '#DF740C  0.05em solid;'};
    }
`
const Question = styled.div`
@media (min-width: 768px){
  height:5vw;}
    font-size:1.3em;
    height:20vw;
    color:white;
    margin:1vh 0 0 2vh;
`
const AnswerButton = styled.button`
@media (min-width: 768px){
    max-width:50vw;}
    font-size:1.7em;
    height:10vh;
    width:90vw;
    background-color:black;
    color:#DF740C ;
    cursor:pointer;
    text-decoration:none;
    border: #DF740C  0.05em solid;
    border-radius: 0.25em;
    
`


export default ChallengeCard;