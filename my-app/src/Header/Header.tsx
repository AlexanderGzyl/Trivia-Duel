// @ts-nocheck
import React from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';
import LogOut from './LogOut';


//Header should have login logic with nav to profile page
const Header = () =>{
    const {user, logOut} = UserAuth()
  
    return(
<Wrapper>
    
    {user?.displayName ? 
    <HeaderContent>
    <LogOut/>
    </HeaderContent>:
    null}
    
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
    
    
`


export default Header