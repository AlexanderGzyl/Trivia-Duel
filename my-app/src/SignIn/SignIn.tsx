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


  useEffect(() => {
    if (user != null) {
      //check if user exists and/or create user
      //user data
      navigate('/');
    }
  }, [user]);

  return (
    <Wrapper>
      <Content>
      <h1 className='text-center text-3xl font-bold py-8'>Sign in</h1>
      <div className='max-w-[240px] m-auto py-4'>
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
      </Content>
    </Wrapper>
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

