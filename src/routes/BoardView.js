import axios from 'axios';
import styles from "./BoardView.module.css";
import Board from "../components/Board.js";
import UseAsync from "../hooks/UseAsync.js";
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
  return(
        <>
          <div className={styles.boardContainer}>
            <Board boardList={data.result_data.data}/>                
          </div>
        </>
        )
}
export default BoardView;