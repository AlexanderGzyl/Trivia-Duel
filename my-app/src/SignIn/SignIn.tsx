// @ts-nocheck
import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";


const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };



  return (
    
      
      <div >
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
      
  );
};

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

export default Signin;

