// @ts-nocheck
import React, { useContext,useEffect } from "react"
import styled from "styled-components";
import { QuizContext } from "../Context/QuizContext";
import { UserAuth } from '../Context/AuthContext'
const { v4: uuidv4 } = require('uuid');
const Arena = () => {
    const {questions,time,score, setQuizID, quizID} = useContext(QuizContext);
    const {user} = UserAuth();
    useEffect(() => {
        setQuizID(uuidv4())
    }, []);
    let data = {
        _id: quizID,
        quiz: questions,
        user: user.email,
        score:score,
        time:time
    };
    
    const challenge = () => {
        fetch('/add-quiz', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
    }
    return(
        <Wrapper>
            <Content>
                <Button onClick ={challenge}> Submit Challenge</Button>
            </Content>
        </Wrapper>
    )

}
//styles
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
export default Arena