// @ts-nocheck
import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Challenges from "./Challenges";
import Loader from "../Utils/Loader";
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
                <Challenges challenges ={userInfo.challenges} ></Challenges>
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
const LoaderWrapper = styled.div`
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
text-align: center;
`
const Chak = styled.div`
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
`;
export default ProfilePage