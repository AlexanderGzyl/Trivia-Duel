// @ts-nocheck
import React from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../Context/AuthContext'
import styled from "styled-components";


const Signin = () => {
  const { googleSignIn} = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };



  return (
      <Wrapper  >
        <GoogleButton onClick={handleGoogleSignIn} />
      </Wrapper >
  );
};

const Wrapper = styled.div`
  margin-top:5vh;

`

export default Signin;

