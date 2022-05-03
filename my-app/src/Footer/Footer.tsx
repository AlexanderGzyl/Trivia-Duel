// @ts-nocheck
import React from 'react';
import styled from "styled-components";
import {useLocation} from 'react-router-dom';

//Footer will have navigation to the HomePage for easy access on mobile
const Footer = () =>{
    const location = useLocation();
//conditionally render footer button based on pathname

    return(
<Wrapper>{location.pathname}</Wrapper>
    )

}

const Wrapper = styled.div`
grid-row: 3;
color:white;
background-color: Black;
`;

export default Footer