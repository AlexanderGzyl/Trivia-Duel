// @ts-nocheck
import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Challenges from "./Challenges";
import Loader from "../Utils/Loader";
import bust from '../Assets/Picture1.svg'

const ProfilePage = () =>{
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState([]);
    
//get user info and quizzes by user

    useEffect(() => {
        fetch(`/user/${id}`).then((response) =>
        response.json().then((json) => {
            setUserInfo(json.data);
            
        })
        );
    }, []);
    // console.log(userInfo)
    // console.log(userInfo.challenges)
    //loading
    // if(loaded === true) {
    //     fetch(`/get-quizzes/${id}`).then((response) =>
    //     response.json().then((json) => {
    //         console.log(json.data);
    //     })
    //     );
    // }
    
    if(userInfo.challenges === undefined) {
        return (
            <LoaderWrapper>
                <Loader />
            </LoaderWrapper>
        )
    }
    return(
        <Wrapper>
            <Content>
                <Bio>
                <ProfileData>
                    <StyledImage src={bust} ></StyledImage>
                    <DuelContainer>
                    <DuelsWon>
                    <Number>{userInfo.wins}</Number>
                    <div>Duels Won</div>
                    </DuelsWon>
                    <DuelsLost>
                    <Number>{userInfo.losses}</Number>
                    <div>Duels Lost</div>
                    </DuelsLost>
                    </DuelContainer>
                </ProfileData>
                </Bio>
                <Title>Challenges</Title>
                <ChallengeContainer>
                <Challenges challenges ={userInfo.challenges} ></Challenges>
                </ChallengeContainer>
            </Content>
        </Wrapper>
    )


}
//styles

const Wrapper = styled.div`
display:inline-grid;
grid-row: 2;
overflow-y: auto;
overflow-x: hidden;
background-color: black;
`;


const Content = styled.div`
display:flex;
flex-direction:column;
align-items:center;

`;

const StyledImage = styled.img`
    border: #DF740C 0.05em  solid;
    text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#DF740C;
    box-shadow:
    0 0 0.4em 0 #DF740C,
    inset 0 0 0.4em 0 #DF740C;
    border-radius:50%;
`

const Bio = styled.div`
display:flex;
flex-direction:column;
color:white;
text-align:center;
align-items:center;
width:100vw;
`
const Title =styled.div`
    @media (min-width: 768px){
    margin:10vh 10vw 0 10vw;}
display:flex;
color:white;
text-decoration: underline solid white 0.05em ;
text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#0C77DF;
font-size:3em;
`

const DuelsWon = styled.div`
font-size:1.1em;
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
max-height:10vh;
margin:1vh;
text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#0C77DF;
`
const DuelsLost = styled.div`
font-size:1.1em;
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
max-height:10vh;
margin:1vh;
text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#0C77DF;
`
const DuelContainer = styled.div`
display:flex;
flex-direction:row; 
align-items:center;
`
const Number = styled.div`
max-height:10vh;
font-size:1.5em;
text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em #0C77DF;
`
const ProfileData = styled.div`
@media (min-width: 768px){
    margin:10vh 10vw 0 10vw;}
display:flex;
flex-direction:row;
align-items:center;
border: #DF740C 0.05em  solid;
    text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#DF740C;
    box-shadow:
    0 0 0.4em 0 #DF740C,
    inset 0 0 0.4em 0 #DF740C;
max-height:20vh;

`
const ChallengeContainer = styled.div`
@media (min-width: 768px){
    margin:10vh 10vw 0 10vw;}
display:flex;
border: #DF740C 0.05em  solid;
    text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#DF740C;
    box-shadow:
    0 0 0.4em 0 #DF740C,
    inset 0 0 0.4em 0 #DF740C;
@media (max-width: 768px){
    width:90vw}


`;
const LoaderWrapper = styled.div`
text-align: center;
display: flex;
justify-content: center;
align-items:center;
background-color:black;

`
export default ProfilePage