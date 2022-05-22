// @ts-nocheck
import React, { useContext,useEffect,useState } from "react"
import styled from "styled-components";
import { QuizContext } from "../Context/QuizContext";
import { UserAuth } from '../Context/AuthContext'
import ArenaUser from "./ArenaUser";
import Loader from "../Utils/Loader";
import { useNavigate } from "react-router-dom";

const { v4: uuidv4 } = require('uuid');

const Arena = () => {
    //app contexts
    const {questions,time,score, setQuizID, quizID,category} = useContext(QuizContext);
    const {user} = UserAuth();
    //state
    const [arenaUsers, setArenaUsers] = useState([]);
    const [challenges,setChallenges] = useState([]);
    const navigate = useNavigate()
    //fetch arena users from mongodb and create quiz payload
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
    //quiz information payload
    let data = {
        _id: quizID,
        quiz: questions,
        userID: user.uid,
        user: user.email,
        score:score,
        time:time
    };
    
    //post quiz to data base
    const challenge = () => {
        fetch('/add-quiz', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
    }
    //add challengers
    const addChallenge = (event:any) =>{
        let id = event.currentTarget.id;
        setChallenges(prev => [...prev, id])
    }
    //challengers information payload
    let challengeData = {
        challengers:challenges,
        _id: quizID,
        quizID: quizID,
        user: user.email,
        completed:false,
        category:category,
        
    };
    //submit challenges to mongoDB 
    const submitChallenge = () => {
        fetch('/add-challenges', {
            method: 'PATCH',
            body: JSON.stringify(challengeData),
            headers: { "Content-Type": "application/json" },
        });
    }

    //submit handler
    const handleSubmit = () => {
        challenge();
        submitChallenge()
        navigate("/")
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
            <Title>Challengers</Title>
                <ArenaUsers>
                {arenaUsers.map((arenaUser)=>{
                    return <Container key ={arenaUser["_id"]+"container"}>
                        <ArenaUser key ={arenaUser["_id"]} arenaUser = {arenaUser["email"]}></ArenaUser>
                        <Button  onClick ={addChallenge} id ={arenaUser["_id"]} key ={arenaUser["_id"]+"button"} >Challenge</Button>
                        </Container>
                })}
                </ArenaUsers>
                <SubmitButton onClick ={handleSubmit}> Submit Challenges</SubmitButton>
            </Content>
        </Wrapper>
    )

}
//styles
const Wrapper = styled.div`
grid-row: 2;
overflow-y: auto;
background-color:black;
`;
const Content = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
justify-content:center;

`;

const Button = styled.button`
@media (max-width: 768px){
    height:10vh;
    width:40vw;
    }
    font-size:1.1em;
    height:10vh;
    width:20vw;
    background-color:black;
    color:#DF740C;
    cursor:pointer;
    text-decoration:none;
    border: #DF740C 0.05em solid;
    border-radius: 0.25em;
    &:hover, :focus{
    outline:0;
    text-decoration:none;
    border: #DF740C 0.05em  solid;
    text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#DF740C;
    box-shadow:
    0 0 0.4em 0 #DF740C,
    inset 0 0 0.4em 0 #DF740C;
    }

`;

const ArenaUsers = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
justify-content:center;
border: #DF740C 0.05em  solid;
    text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#DF740C;
    box-shadow:
    0 0 0.4em 0 #DF740C,
    inset 0 0 0.4em 0 #DF740C;
`;

const Container = styled.div`
@media (max-width: 768px){
    width:90vw;
    }
display:flex;
flex-direction:row;
height:15vh;
width:50vw;
justify-content:space-around;
align-items:center;
border-bottom: #232b2b 0.05em solid;
box-shadow: 0 0.3em 2px -2px #DF740C;
    
`

const LoaderWrapper = styled.div`
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
text-align: center;
background-color:black;
`
const Title =styled.div`
    @media (min-width: 768px){
    margin:5vh 0 0 0;}
display:flex;
color:white;
text-decoration: underline solid white 0.05em ;
text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#0C77DF;
font-size:3em;
`;

const SubmitButton = styled.button`
@media (max-width: 768px){
    height:20vh;
    width:80vw;
    }
    font-size:1.7em;
    height:10vh;
    width:40vw;
    margin-top:5vh;
    background-color:black;
    color:#0C77DF;
    cursor:pointer;
    text-decoration:none;
    border: #0C77DF 0.05em solid;
    border-radius: 0.25em;
    &:hover, :focus{
    outline:0;
    text-decoration:none;
    border: #0C77DF 0.05em  solid;
    text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#0C77DF;
    box-shadow:
    0 0 0.4em 0 #0C77DF,
    inset 0 0 0.4em 0 #0C77DF;
    }

`;
export default Arena