// @ts-nocheck
import React from 'react';
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import styled from "styled-components";
import HomePage from './HomePage/HomePage';
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Trivia from './Trivia/Trivia'
import Signin from './SignIn/SignIn';
import GlobalStyles from './GlobalStyles';
import Protected from './SignIn/Protected';
import Arena from './Arena/Arena';
import ProfilePage from './Profile/ProfilePage';
import Challenge from './ChallengerTrivia/Challenge';


function App() {
  return (
    <>
    <Router>
      <GlobalStyles/>
      <AppWrapper>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/arena' element={<Protected><Arena /></Protected>} />
          <Route path="/trivia" element={<Protected><Trivia/></Protected>} />
          <Route path="/profile/:id" element={<Protected><ProfilePage/></Protected>} />
          <Route path="/challenge/:id" element={<Protected><Challenge/></Protected>} />
        </Routes>
      <Footer/>
      </AppWrapper>
    </Router>
  </>
  );
}
const AppWrapper = styled.div`
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  display: grid;
  grid-template-rows: 5em auto 5em;
`
export default App;
