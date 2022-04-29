// @ts-nocheck
import React from 'react';
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import styled from "styled-components";
import HomePage from './HomePage/HomePage';
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Trivia from './Trivia/Trivia'
import GlobalStyles from './GlobalStyles';
function App() {
  return (
    <>
    <Router>
      <GlobalStyles/>
      <AppWrapper>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/trivia" element={<Trivia/>} />
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
