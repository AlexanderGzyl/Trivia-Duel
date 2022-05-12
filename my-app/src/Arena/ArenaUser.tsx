// @ts-nocheck
import React, { useContext,useEffect,useState } from "react"
import styled from "styled-components";

const ArenaUser = ({arenaUser}) => {

return(
    
    <Button>{arenaUser}</Button>
    


)}

export default ArenaUser

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
const Button = styled.button`
@media (max-width: 768px){
    height:20vw;
    width:80vw;
    margin-bottom: 2%;
    }
    font-size:30px;
    height:10vw;
    width:30vw;
    
    margin-bottom: 2%;
`;