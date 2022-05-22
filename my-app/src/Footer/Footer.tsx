// @ts-nocheck
import React from 'react';
import styled from "styled-components";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";





const Footer = () =>{
    return(
        <Wrapper>
            <FooterContent>
            <AiFillInstagram size={33}  />
            <AiFillFacebook size={33} />
            <AiFillTwitterCircle size={33} />
            
            </FooterContent>
        </Wrapper>
    )

}
//styles
const Wrapper = styled.div`
grid-row: 3;
color:white;
background-color: black;
`;

const FooterContent = styled.div`
    display:flex;
    justify-content:flex-start;
    padding-top:45px;
    font-size:13px;
`


export default Footer