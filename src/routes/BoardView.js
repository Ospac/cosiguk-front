import axios from 'axios';
import styles from "./BoardView.module.css";
import Post from "../components/Post.js";
import UseAsync from "../hooks/UseAsync.js";
import {Link} from 'react-router-dom';
import EditHeader from '../components/Editheader';

async function getBoardData() {
  const response = await axios.get("/api/board/boardList")
  return response.data;
}

function BoardView(){
  const [state, refetch] = UseAsync(getBoardData, []);
  const {loading, data, error} = state;
  if(loading) return <div className={styles.loader}>Loading</div>;
  if(error) return <div>error page</div>;
  if(!data) return <div>loading</div>
  const boardDataList = data.result_data.data;
  
  return(
        <>
          <div className={styles.boardContainer}>
            <Link to="./post"><EditHeader/></Link>
            {boardDataList.map((item)=>
              <Link key={item.id} to={`/board/${item.id}`}>
                <Post postData={item} WhatFor="board"/>         
              </Link>
            )}      
          </div>
        </>
        )
}
export default BoardView;