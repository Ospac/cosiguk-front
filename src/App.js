import './App.css';
import {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import styled from 'styled-components';
import Home from "./routes/Home.js"
import BoardView from "./routes/BoardView.js"
import Publish from "./routes/Publish.js"
import PostView from "./routes/PostView.js"
import Notice from "./routes/Notice.js"
import NavBar from "./components/NavBar.js"
import SubNavBar from './components/SubNavBar';

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  padding-bottom: 100px;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
function App() {  
  return (
    <AppContainer>
      <Router>
        <NavBar/>
        <BodyContainer>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/board" element={<BoardView/>}></Route>
            <Route path="/board/post" element={<Publish/>}></Route>
            <Route path="/board/:id" element={<PostView boardName="board"/>}></Route>
            <Route path="/notice" element={<Notice/>}></Route>
            <Route path="/notice/:id" element={<PostView boardName="notice"/>}></Route>
          </Routes>
        </BodyContainer>
        <SubNavBar/>
      </Router>
    </AppContainer>
  );
}

export default App;
