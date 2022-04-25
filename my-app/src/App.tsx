// @ts-nocheck
import React from 'react';
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import styled from "styled-components";
import HomePage from './HomePage/HomePage';


function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
        </Routes>
    </Router>
  </>
  );
}
const AppWrapper = styled.div`
  
`
export default App;
