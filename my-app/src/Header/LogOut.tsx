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
            <Link to ={`/profile/${user.uid}`}>Profile</Link>
            <button onClick = {handleSignOut}>Logout</button>
        </Wrapper>

    )

}

const Wrapper = styled.div`

`;

export default LogOut