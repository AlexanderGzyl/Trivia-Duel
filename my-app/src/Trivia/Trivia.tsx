// @ts-nocheck
import React from 'react';
import {useLocation} from 'react-router-dom';
import styled from "styled-components";

const Trivia = () =>{
    const location = useLocation();


    return(
<Wrapper>{location.state}</Wrapper>
    )

}

const Wrapper = styled.div`
grid-row: 2;
overflow-y: auto;
`;

export default Trivia