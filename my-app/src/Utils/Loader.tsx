// @ts-nocheck
import React from "react";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";

const Loader = () => {
  return (
    <RotateFiLoader />
);
};

const Rotate = keyframes`
from{
transform: rotate(0deg)
}to{
transform: rotate(360deg)
}`;

const RotateFiLoader = styled(FiLoader)`
animation: ${Rotate} 2500ms linear infinite;
color: white;
text-shadow: 
    0 0 0.125em hsla(0,0%,100%,0.5),
    0 0 0.45em#0C77DF ;
width: 100px;
height: 100px;
background-color:black;
`
export default Loader;