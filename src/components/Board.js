import PropTypes from 'prop-types';
import styles from './Board.module.css';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import EditHeader from './Editheader';
import {Link} from 'react-router-dom';

function Board({boardList}){

    const onRecommend = async(e) => {
        fetch(`/api/board/${e.currentTarget.value}/recommend`)
        .then((res) => res.json())
        .then((json) => {
            if(json.error !== undefined) alert(json.error);
            else {
                alert("추천 하였습니다.");
                window.location.replace("/board");
            }
        })
        .catch((error) => {console.log(error)});
    }
    const onDeprecate = async(e) => {
        fetch(`/api/board/${e.currentTarget.value}/deprecate`)
        .then((res) => res.json())
        .then((json) => {
            if(json.error !== undefined) alert(json.error)
            else alert("비 추천 하였습니다.");
        })
        .catch((error) => {console.log(error)});
    }
    return(
        <div>
        <Link to="./post"><EditHeader/></Link>
        {boardList.map((item)=>
        <Link key={item.id} to={`/board/${item.id}`}>
            <div className={styles.postContainer}>
                <div className={styles.postHeader}>
                    <div className={styles.postNickname}>{item.nickname.length > 9? item.nickname.slice(0,9) : item.nickname}</div>
                    <div className={styles.postDate}>{item.createdDate}</div>
                    <div className={styles.postViews}>{item.hit} views</div>
                </div>
                <div className={styles.postContents}>
                    <div className={styles.postTitle}>{item.title.length > 50? item.title.slice(0,50) : item.title}</div>
                    <div className={styles.postSummary}>{item.content.length > 68? item.content.slice(0,68) + "..." : (item.content)}</div>
                </div>
                <div className={styles.postFooter}>
                    <div className={styles.voting}>
                        <button value={item.id} className={styles.recommend} onClick={onRecommend}>
                            <Tooltip title="추천" arrow>{<ThumbUpAltIcon style={{ fill: 'rgba(0,0,0,0.45)' }}fontSize="10px" />}</Tooltip>
                        </button>
                        <button value={item.id} className={styles.deprecate} onClick={onDeprecate}>
                            <Tooltip title="비추천" arrow>{<ThumbDownAltIcon style={{ fill: 'rgba(0,0,0,0.45)' }} fontSize="10px"/>}</Tooltip>
                        </button>
                    </div>
                    <div className={styles.recommendStats}>
                        <Tooltip title="추천 수" arrow><KeyboardArrowUpIcon style={{ fill: 'rgba(0,0,0,0.45)'}}fontSize="small"/></Tooltip>
                        <div className={styles.recommendCnt}>{item.recommend} </div>
                    </div>
                    <div className={styles.commentStats}>
                        <Tooltip title="댓글 수" arrow><InsertCommentIcon  style={{ fill: 'rgba(0,0,0,0.45)' }} fontSize="6px"/></Tooltip>
                            <div className={styles.commentCnt}>{item.review_count}</div>
                    </div>
                </div>
            </div>
        </Link>
        )}
        </div>
    )
}
Board.propTypes = {
    boardList : PropTypes.array.isRequired
}
export default Board;
