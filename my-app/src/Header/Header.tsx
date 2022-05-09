// @ts-nocheck
import React from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';


//Header should have login logic with nav to profile page
const Header = () =>{
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
    
    {user?.displayName ? <button onClick = {handleSignOut}>Logout</button>:
    <Link to ='/signin'>Login</Link>}
    <p>Welcome {user?.displayName}</p>
</Wrapper>
    )

}

const Wrapper = styled.div`
grid-row: 1;
color:white;  
background-color: Black;
`;

export default Header