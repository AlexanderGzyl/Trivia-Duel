// @ts-nocheck
import React from 'react';
import styled from "styled-components";

//Footer will have navigation to the HomePage for easy access on mobile
const Footer = () =>{

//conditionally render footer button based on window.location

    return(
<Wrapper>{window.location.href}</Wrapper>
    )

}

const Wrapper = styled.div`
grid-row: 3;
color:white;
background-color: Black;
`;

export default Footer