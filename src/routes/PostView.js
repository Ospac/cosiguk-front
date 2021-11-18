import styles from './PostView.module.css'
import UseAsync from '../hooks/UseAsync.js'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { dividerClasses, Tooltip } from '@mui/material';
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
                // window.location.replace("/board");
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

    const onCRecommend = async(e) => {
        fetch(`/api/chat/${e.currentTarget.value}/recommend`)
        .then((res) => res.json())
        .then((json) => {
            if(json.error !== undefined) alert(json.error);
            else {
                alert("추천 하였습니다.");
            }
        })
        .catch((error) => {console.log(error)});
    }
    const onCDeprecate = async(e) => {
        fetch(`/api/chat/${e.currentTarget.value}/deprecate`)
        .then((res) => res.json())
        .then((json) => {
            if(json.error !== undefined) alert(json.error)
            else alert("비 추천 하였습니다.");
        })
        .catch((error) => {console.log(error)});
    }

    const params= useParams();
    const postId = params.id;
    const getPostData = async() => {
        const res = await axios.get(`/api/board/${postId}`)
        return res;
    }
    const getCommentData = async() => {
        const res = await axios.get(`/api/chat/${postId}/chatList`)
        return res;
    }
    const [postState, postRefetch] = UseAsync(getPostData, []);
    const [commentState, commentRefetch] = UseAsync(getCommentData, []);
    const {loading : postLoading, data : postData, error : postError} = postState;
    const {loading : commentLoading, data : commentData, error : commentError} = commentState;

    if(postLoading || commentLoading) return <div className={styles.loader}>Loading</div>;
    if(postError || commentError) return <div>error page</div>;
    if(!postData || !commentData) return <div>loading</div>


    const post = postData.data.result_data.account;
    const comments = commentData.data.result_data.data;
    return(
        <div className={styles.postViewContainer}>
        <div className={styles.postContainer}>
            <div className={styles.postHeader}>
                    <div className={styles.postNickname}>{post.nickname}</div>
                    <div className={styles.postDate}>{post.createDate}</div>
                    <div className={styles.postViews}>{post.hit} views</div>
            </div>
            <div className={styles.postBody}>
                <div className={styles.postTitle}>{post.title}</div>
                <div className={styles.postContent}>{post.content}</div>
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
                    <div className={styles.recommendCnt}>{post.recommend} </div>
                </div>
            </div>
        </div>
        <div className={styles.commentCnt}>{comments.length} comments</div>
        <div className={styles.commentView}>
            {comments.map((com) => 
                <div className={styles.commentContainer}>
                    <div className={styles.commentHeader}>
                        <div className={styles.commentNickname}>{com.nickname}</div>
                        <div className={styles.commentDate}>{com.createdDate}</div>
                    </div>
                    <div className={styles.commentContents}>
                        {com.content}
                    </div>
                    <div className={styles.commentFooter}>
                        <div className={styles.voting}>
                            <button value={com.id} className={styles.recommend} onClick={onCRecommend}>
                                <Tooltip title="추천" arrow>{<ThumbUpAltIcon style={{ fill: 'rgba(0,0,0,0.45)' }}fontSize="10px" />}</Tooltip>
                            </button>
                            <button value={com.id} className={styles.deprecate} onClick={onCDeprecate}>
                                <Tooltip title="비추천" arrow>{<ThumbDownAltIcon style={{ fill: 'rgba(0,0,0,0.45)' }} fontSize="10px"/>}</Tooltip>
                            </button>
                        </div>
                        <div className={styles.recommendStats}>
                            <Tooltip title="추천 수" arrow><KeyboardArrowUpIcon style={{ fill: 'rgba(0,0,0,0.45)'}}fontSize="small"/></Tooltip>
                            <div className={styles.recommendCnt}>{com.recommend} </div>
                        </div>
                    </div>
                    <div className={styles.commentWriteContainer}>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
            
        </div>
        </div>
        
    )
}
export default PostView;