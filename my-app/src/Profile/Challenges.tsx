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
        
        return(
            <div key={challenge["_id"]}>
                <span>{challenge["user"]}</span>
                <Button  onClick={ (event)=>handleSubmit(event,challenge)}>Accept</Button>
            </div>
        )
    })
    
return(
    <ArenaUsers>{displayChallenges}</ArenaUsers>
)}

export default Challenges

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
    background-color:red;
    margin-bottom: 2%;
`;
const ArenaUsers = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;

`;