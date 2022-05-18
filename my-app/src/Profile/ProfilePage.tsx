// @ts-nocheck
import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const ProfilePage = () =>{
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState([]);
    const [loaded, setLoaded] = useState(false);
//get user info and quizzes by user
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
    return(
        <Wrapper>
            <Content>
            
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
export default ProfilePage