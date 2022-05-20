// @ts-nocheck
import React from 'react';
import styled from "styled-components";
import {useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';

//Footer will have navigation to the HomePage for easy access on mobile
const Footer = () =>{
    const location = useLocation();
//either conditionally render or reset quiz context on click

    return(
        <Wrapper>
            <StyledLink to ={"/"}>HOME</StyledLink>
        </Wrapper>
    )

}

const Wrapper = styled.div`
grid-row: 3;
color:white;
background-color: black;
`;
const StyledLink = styled(Link)`
text-decoration: none;
color:orange;
max-height:50%;
max-width:50%;
background-color:blue;
`;

export default Footer