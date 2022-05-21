// @ts-nocheck
import React, { useContext,useEffect,useState } from "react"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Challenges = ({challenges}) => {
    const navigate = useNavigate()
    
    //handler
    function handleNav(challenge) {
        let id = challenge["quizID"]
        navigate(`/challenge/${id}`)
        // console.log(challenge["quizID"])
    }
    function handleBubble(event) {
        event.stopPropagation();
        event.preventDefault();
    }
    function handleSubmit(event,challenge) {
        handleBubble(event);
        handleNav(challenge);
    }

    const displayChallenges = challenges.map((challenge)=>{
        //preprocessing
        let text = challenge["user"];
        const user = text.split("@")[0];
        
        
        return(
            <Info key={challenge["_id"]}>
                <ChallengeText>{user} has challenged you to a {challenge["category"]} quiz</ChallengeText>
                <Button  onClick={ (event)=>handleSubmit(event,challenge)}>Accept</Button>
            </Info>
        )
    })
    
return(
    <ArenaUsers>{displayChallenges}</ArenaUsers>
)}

export default Challenges

//styles

const Info = styled.div`
display:flex;
flex-direction:row;
text-align:left;
margin:2vh 0;
color:white;

justify-content: space-evenly;
`
const Button = styled.button`
@media (max-width: 768px){
    width:40%;
    margin-bottom: 2%;
    font-size:20px;
    }
    font-size:30px;
    height:10vh;
    width:30%;
    margin-bottom: 2%;
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
`;

const ChallengeText = styled.div`
@media (max-width: 768px){
    width:30%;
    margin-bottom: 2%;
    font-size:20px;
    }
    max-width:40%;
    font-size:1.3em;

`