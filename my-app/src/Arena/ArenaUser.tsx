// @ts-nocheck
import React, { useContext,useEffect,useState } from "react"
import styled from "styled-components";

const ArenaUser = ({arenaUser}) => {

return(
    <Button>{arenaUser}</Button>
)}

export default ArenaUser

//styles
const Button = styled.span`
@media (max-width: 768px){
    height:20vw;
    width:80vw;
    margin-bottom: 2%;
    }
    font-size:30px;
    height:10vh;
    width:30vw;
    color:white;
    margin-bottom: 2%;
`;