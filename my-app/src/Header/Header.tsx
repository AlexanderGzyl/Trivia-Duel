// @ts-nocheck
import React from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';
import LogOut from './LogOut';
import { FaRegUserCircle} from 'react-icons/fa';




const Header = () =>{
    const {user} = UserAuth()
    return(
<Wrapper>
    
    {user?.displayName ? 
    <HeaderContent>
        <ProfileContainer>
        <StyledLink3 to ={`/profile/${user.uid}`}><FaRegUserCircle/></StyledLink3>
        <StyledLink2 to ={`/profile/${user.uid}`}>{user?.displayName}</StyledLink2>
        </ProfileContainer>
        <StyledLink to ={'/'}><Logo>
            <span>Trivia</span>
            <span>Trivia</span>
        </Logo>
        </StyledLink>
    <LogOut/>
    </HeaderContent>:
    <TitleContainer >
        <StyledLink to ={'/'}><Logo>
            <span>Trivia</span>
            <span>Trivia</span>
        </Logo>
        </StyledLink>
    </TitleContainer >
    }
    
</Wrapper>
    )

}

const Wrapper = styled.div`
grid-row: 1;
color:white;  
background-color: black;
`;

const HeaderContent = styled.div`
    max-width:100%;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    &:after {
    content:"";
    background: -webkit-linear-gradient(left, #00FFE4 0%, #0C969A 14%, #243863 28%, #450D44 42%, #740030 56%, #B0151E 70%, #F1570D 84%);
    height:2px;
    width: 100vw;
    position: absolute;
    top: 70px;
}
`
const Logo = styled.h1`

position: relative;
  font-size: 3.7em;
  margin: 0;
  transform: skew(-15deg);
  letter-spacing: 0.03em;
  
  &:after {
    content: '';
    position: absolute;
    top: -0.1em;
    right: 0.05em;
    width: 0.4em;
    height: 0.4em;
    background: 
      radial-gradient(white 3%, rgba(white, 0.3) 15%, rgba(white, 0.05) 60%, transparent 80%),
      radial-gradient(rgba(white, 0.2) 50%, transparent 60%) 50% 50% / 5% 100%,
      radial-gradient(rgba(white, 0.2) 50%, transparent 60%) 50% 50% / 70% 5%;
    background-repeat: no-repeat;
  }
  
  span:first-child {
    display: block;
    text-shadow: 0 0 0.1em #00FFE4, 0 0 0.2em black,  0 0 5em #00FFE4;
    -webkit-text-stroke: 0.06em rgba(black, 0.5);
  }
  
  span:last-child {
    position: absolute;
    left: 0;
    top: 0;
    background-image: linear-gradient(#00FFE4 0%, #0C969A 14%, #243863 28%, #450D44 42%, #740030 56%, #B0151E 70%, #F1570D 84%);
    -webkit-text-stroke: 0.01em #94a0b9;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`
const StyledLink = styled(Link)`
text-decoration:none;
color:white;
font-size:20px;
`;
const StyledLink2 = styled(Link)`
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
    padding: 0.5vw 1vw 0 1vw;
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
const StyledLink3 = styled(Link)`
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

const ProfileContainer = styled.div`
padding-left:5vw;
display:flex;
align-items:center;
`
const TitleContainer = styled.div`
display:flex;
align-items:center;
justify-content:center;
&:after {
    content:"";
    background: -webkit-linear-gradient(left,#00FFE4 0%, #0C969A 14%, #243863 28%, #450D44 42%, #740030 56%, #B0151E 70%, #F1570D 84%);
    height:2px;
    width: 100vw;
    position: absolute;
    top: 70px;}
`


export default Header