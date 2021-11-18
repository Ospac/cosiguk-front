import './App.css';
import {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./routes/Home.js"
import BoardView from "./routes/BoardView.js"
import Post from "./routes/Post.js"
import PostView from "./routes/PostView.js"
import NavBar from "./components/NavBar.js"

function App() {
  
  return (
    <div className="App">
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/board" element={<BoardView/>}></Route>
        <Route path="/board/post" element={<Post/>}></Route>
        <Route path="/board/:id" element={<PostView/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
