// @ts-nocheck
import React, { useContext,useEffect,useState } from "react"
import styled from "styled-components";
import { QuizContext } from "../Context/QuizContext";
import { UserAuth } from '../Context/AuthContext'
import ArenaUser from "./ArenaUser";
import Loader from "../Utils/Loader";

const { v4: uuidv4 } = require('uuid');

const Arena = () => {
    //app contexts
    const {questions,time,score, setQuizID, quizID} = useContext(QuizContext);
    const {user} = UserAuth();
    //state
    const [arenaUsers, setArenaUsers] = useState([]);
    const [challenges,setChallenges] = useState([]);
    //fetch arena users and create quiz payload
    useEffect(() => {
        setQuizID(uuidv4())
        
        fetch(`/arena-users/${user.uid}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`Error! status: ${res.status}`);
            }
        })
        .then((data) => {
            setArenaUsers(data.data)
        })
        .catch((err) => {
            console.error('Error', err);
        })
    }, []);
    let data = {
        _id: quizID,
        quiz: questions,
        user: user.email,
        score:score,
        time:time
    };
    //handlers
    //post quiz to data base
    const challenge = () => {
        fetch('/add-quiz', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
    }
    //add challenger
    const addChallenge = (event:any) =>{
        let id = event.currentTarget.id;
        setChallenges(prev => [...prev, id])
        console.log(challenges)
    }
    let challengeData = {
        challengers:challenges,
        _id: quizID,
        quizID: quizID,
        user: user.email,
        completed:false
    };
    //submit challenges
    const submitChallenge = () => {
        fetch('/add-challenges', {
            method: 'PATCH',
            body: JSON.stringify(challengeData),
            headers: { "Content-Type": "application/json" },
        });
    }

    //submihandler
    const handleSubmit = () => {
        challenge();
        submitChallenge()

    }
    if(arenaUsers.length <= 0) {
        return (
            <LoaderWrapper>
                <Loader />
            </LoaderWrapper>
        )
    }
    return(
        <Wrapper>
            <Content>
                <ArenaUsers>
                {arenaUsers.map((arenaUser)=>{
                    return <Container key ={arenaUser["_id"]+"container"}>
                        <ArenaUser key ={arenaUser["_id"]} arenaUser = {arenaUser["email"]}></ArenaUser>
                        <Button onClick ={addChallenge} id ={arenaUser["_id"]} key ={arenaUser["_id"]+"button"} >Challenge</Button>
                        </Container>
                })}
                </ArenaUsers>
                <Button onClick ={handleSubmit}> Submit Challenge</Button>
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
    height:10vh;
    width:30vw;
    margin-bottom: 2%;
`;

const ArenaUsers = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;

`;

const Container = styled.div`
    
    
`

const LoaderWrapper = styled.div`
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
text-align: center;
`
export default Arena