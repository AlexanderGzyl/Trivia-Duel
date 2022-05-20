// @ts-nocheck
import React from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';


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
            <StyledLink to ={`/profile/${user.uid}`}>{user?.displayName}</StyledLink>
            <StyledButton onClick = {handleSignOut}>Logout</StyledButton>
        </Wrapper>

    )

}

const Wrapper = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
line-height: 2.5;
padding:0 10%;
`;
const StyledButton = styled.button`
background-color:#FFC6A9;
max-height:50%;
max-width:60%;
`;

const StyledLink = styled(Link)`
text-decoration: none;
color:#FFC6A9;
max-height:50%;
max-width:50%;


`;


export default LogOut