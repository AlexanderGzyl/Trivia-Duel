// @ts-nocheck
import React from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';
import { IoMdLogOut } from 'react-icons/io';


//Header should have login logic with nav to profile page
const LogOut = () =>{
    const {user, logOut} = UserAuth()
    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <Wrapper>
            <StyledButton2 onClick = {handleSignOut}><IoMdLogOut/></StyledButton2>
            <StyledButton onClick = {handleSignOut}>Logout</StyledButton>
        </Wrapper>

    )

}

const Wrapper = styled.div`
padding-right:5vw;
display:flex;
align-items:center;
`;
const StyledButton = styled.button`
@media (max-width: 768px){
      display: none;}
    
    font-size:20px;
    background-color:black;
    color:#DF740C;
    cursor:pointer;
    text-decoration:none;
    border: #DF740C 0.05em solid;
    border-radius: 0.25em;
    height:35px;
    padding: 0 1vw;
    &:hover, :focus{
    outline:0;
    text-decoration:none;
    border: #DF740C 0.05em solid;
    text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#DF740C;
    box-shadow:
    0 0 0.4em 0 #DF740C,
    inset 0 0 0.4em 0 #DF740C;
    position:relative;
    &:before{
        content:'';
        position:absolute;
        background: #DF740C;
        height:20%;
        width:100%;
        top:120%;
        left:0;
        transform: perspective(1em) rotateX(40deg);
        filter: blur(0.3em);
        opacity:0.7;
    }
    }

`;
const StyledButton2 = styled.button`
@media (min-width: 768px){
    display: none;}

    font-size:20px;
    background-color:black;
    color:#DF740C;
    cursor:pointer;
    text-decoration:none;
    border: #DF740C 0.05em solid;
    border-radius: 0.25em;
    height:35px;
    padding: 0 1vw;
    &:hover, :focus{
    outline:0;
    text-decoration:none;
    border: #DF740C 0.05em solid;
    text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#DF740C;
    box-shadow:
    0 0 0.4em 0 #DF740C,
    inset 0 0 0.4em 0 #DF740C;
    position:relative;
    &:before{
        content:'';
        position:absolute;
        background: #DF740C;
        height:20%;
        width:100%;
        top:120%;
        left:0;
        transform: perspective(1em) rotateX(40deg);
        filter: blur(0.3em);
        opacity:0.7;
    }
    }

`;



export default LogOut