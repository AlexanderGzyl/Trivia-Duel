// @ts-nocheck
import React, { useContext,useEffect,useState } from "react"
import styled from "styled-components";

const ArenaUser = ({arenaUser}) => {
    let username = arenaUser.split("@")[0];
return(
    <ChallengeText>{username}</ChallengeText>
)}

export default ArenaUser

//styles
const ChallengeText = styled.div`
@media (max-width: 768px){
    width:30%;
    }
    width:40%;
    font-size:1.1em;
    text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#0C77DF;
    color:white;
    padding-top:6vh;

`