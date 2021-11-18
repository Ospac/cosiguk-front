import styles from './PostView.module.css'
import UseAsync from '../hooks/UseAsync.js'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

function PostView(){
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

    const params= useParams();
    const postId = params.id;
    const getPostView = async() => {
        const res = await axios.get(`/api/board/${postId}`)
        return res;
    }
    const [state, refetch] = UseAsync(getPostView, []);
    const {loading, data, error} = state;
    if(loading) return <div className={styles.loader}>Loading</div>;
    if(error) return <div>error page</div>;
    if(!data) return <div>loading</div>

    const postData = data.data.result_data.account
    return(
        <div className={styles.postContainer}>
            <div className={styles.postHeader}>
                    <div className={styles.postNickname}>{postData.nickname}</div>
                    <div className={styles.postDate}>{postData.createDate}</div>
                    <div className={styles.postViews}>{postData.hit} views</div>
            </div>
            <div className={styles.postBody}>
                <div className={styles.postTitle}>{postData.title}</div>
                <div className={styles.postContent}>{postData.content}</div>
            </div>
            <div className={styles.postFooter}>
                <div className={styles.voting}>
                    <button value={postId} className={styles.recommend} onClick={onRecommend}>
                        <Tooltip title="추천" arrow>{<ThumbUpAltIcon style={{ fill: 'rgba(0,0,0,0.45)' }}fontSize="10px" />}</Tooltip>
                    </button>
                    <button value={postId} className={styles.deprecate} onClick={onDeprecate}>
                        <Tooltip title="비추천" arrow>{<ThumbDownAltIcon style={{ fill: 'rgba(0,0,0,0.45)' }} fontSize="10px"/>}</Tooltip>
                    </button>
                </div>
                <div className={styles.recommendStats}>
                    <Tooltip title="추천 수" arrow><KeyboardArrowUpIcon style={{ fill: 'rgba(0,0,0,0.45)'}}fontSize="small"/></Tooltip>
                    <div className={styles.recommendCnt}>{postData.recommend} </div>
                </div>
            </div>
            <div className={styles.commentContainer}>
                <div className={styles.commentCnt}></div>
                <div></div>
            </div>
        </div>
    )
}
export default PostView;