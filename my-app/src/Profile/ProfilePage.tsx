// @ts-nocheck
import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Challenges from "./Challenges";
import Loader from "../Utils/Loader";
import { FaRegUserCircle} from 'react-icons/fa';
import bust from '../Assets/Picture1.svg'

const ProfilePage = () =>{
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState([]);
    const [loaded, setLoaded] = useState(false);
//get user info and quizzes by user
console.log(typeof id)
    useEffect(() => {
        fetch(`/user/${id}`).then((response) =>
        response.json().then((json) => {
            setUserInfo(json.data);
            setLoaded(true)
        })
        );
    }, []);
    console.log(userInfo)
    console.log(userInfo.challenges)
    //loading
    // if(loaded === true) {
    //     fetch(`/get-quizzes/${id}`).then((response) =>
    //     response.json().then((json) => {
    //         console.log(json.data);
    //     })
    //     );
    // }
    const iconStyle = {fontSize: "30vw"};
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
                    <img src={bust} ></img>
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
                <span>yyyyyyyyyyyyyyyyyyyyyyyy</span>
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
background-color:red;
font-size:3em;
`

const DuelsWon = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
max-height:10vh;
margin:1vh;
`
const DuelsLost = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
max-height:10vh;
margin:1vh;
`
const DuelContainer = styled.div`
display:flex;
flex-direction:row; 
align-items:center;
`
const Number = styled.div`
max-height:10vh;
`
const ProfileData = styled.div`
@media (min-width: 768px){
    margin:10vh 10vw 0 10vw;}
display:flex;
flex-direction:row;
align-items:center;

max-height:20vh;

`
const ChallengeContainer = styled.div`
@media (min-width: 768px){
    margin:10vh 10vw 0 10vw;}
display:flex;
background-color:red;
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