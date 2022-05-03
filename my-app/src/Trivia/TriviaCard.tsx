// @ts-nocheck
import React from "react";
import styled from "styled-components";


const TriviaCard = ({answers, userAnswer, callback,question}) => {
    return(
    <Wrapper>
      <Content>
    <Question>{question}</Question>
    <div>
      {answers.map((answer) => (
          
        <ButtonWrapper
          key={answer}
        >
          <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
              {answer}
          </button>
        </ButtonWrapper>
        
      ))}
    </div>
    </Content>
    </Wrapper>
    )
}
const Content = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
`;
const Wrapper = styled.div`
grid-row: 2;
overflow-y: auto;
`;
const ButtonWrapper = styled.div`
    width: 100%;
    height: 40px;
    grid-row: 2;
    overflow-y: auto;
`
const Question = styled.div`
    height:20vw;
    width:80vw;
    margin-bottom: 2%;
`


export default TriviaCard;