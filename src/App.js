import './App.css';
import {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./routes/Home.js"
import BoardView from "./routes/BoardView.js"
import Publish from "./routes/Publish.js"
import PostView from "./routes/PostView.js"
import Notice from "./routes/Notice.js"
import NavBar from "./components/NavBar.js"

function App() {
  
  return (
    <div className="App">
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/board" element={<BoardView/>}></Route>
        <Route path="/board/post" element={<Publish/>}></Route>
        <Route path="/board/:id" element={<PostView/>}></Route>
        <Route path="/notice" element={<Notice/>}></Route>
        <Route path="/notice/:id" element={<PostView/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
