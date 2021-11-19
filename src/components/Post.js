import PropTypes from 'prop-types';
import styled from 'styled-components';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

function Post({postData, WhatFor}){
    const PostContainer = styled.div`
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: white;
        box-shadow: 0 1px 6px rgb(32 33 36 / 10%);
        border: 1px solid rgba(70, 77, 82, 0.082);
        border-radius: 7px;
        width: 750px;
        margin-top: 12px;
    `;
    const PostHeader = styled.div`
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 16px;
        margin-left: 30px;
        margin-top: 10px;
    `;
    const PostNickname = styled.div`
        font-weight: bold;
        font-size: 12px;
    `;
    const PostDate = styled.div`
        font-weight: lighter;
        padding-right: 400px;
        font-size: 14px;
    `;
    const PostViews = styled.div`
        margin-right: 10px;
        font-weight: 200;
    `;
    const PostBody = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

    `;
    const PostTitle = styled.div`
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        margin-left: 30px;
        font-size: 15px;
    `;
    const PostSummary = styled(PostTitle)`
        font-size: 13px;
        font-weight: normal;
        padding-top: 3px;
    `;
    const PostFooter = styled.div`
        border-top: 1px solid #f6f6f6;
        display: flex;
        flex-direction: row;
        vertical-align: center;
        padding: 4px 3px 3px 3px;
        align-items: center;
        /* pointer-events: none; 
        cursor: default; */
    `;
    const Voting = styled.div`
        display: flex;
        flex-direction: row;
        border-right: 1px solid #f6f6f6;
        padding: 0px 10px 0px 25px;
        gap: 8px;
        align-items: center;
        button{
            background-color: unset;
            border: 0;
        }
    `;
    const RecommendStats = styled.div`
        display: flex;
        border-right: 1px solid #f6f6f6;
        padding : 0px 10px 0px 10px;
        gap: 2px;
        align-items: center;
    `;
    const Cnt = styled.div`
    font-size: 13px;
    font-weight: 300;
    `;
    const CommentStats = styled(RecommendStats)`
        justify-content: center;
        align-items: center;
        gap: 4px;
    `;

    const onRecommend = async(e) => {
        fetch(`/api/${WhatFor}/${e.currentTarget.value}/recommend`)
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
        fetch(`/api/${WhatFor}/${e.currentTarget.value}/deprecate`)
        .then((res) => res.json())
        .then((json) => {
            if(json.error !== undefined) alert(json.error)
            else alert("비 추천 하였습니다.");
        })
        .catch((error) => {console.log(error)});
    }
    return(
        <>
            <PostContainer>
                <PostHeader>
                    <PostNickname>{postData.nickname.length > 9? postData.nickname.slice(0,9) : postData.nickname}</PostNickname>
                    <PostDate>{postData.createdDate}</PostDate>
                    {postData.hit? <PostViews>{postData.hit} views</PostViews> : null }
                </PostHeader>
                <PostBody>
                    <PostTitle>{postData.title && postData.title.length > 50? postData.title.slice(0,50) : postData.title}</PostTitle>
                    <PostSummary>{postData.content && postData.content.length > 68? postData.content.slice(0,68) + "..." : (postData.content)}</PostSummary>
                </PostBody>
                <PostFooter>
                    <Voting>
                        <button value={postData.id}  onClick={onRecommend}>
                            <Tooltip title="추천" arrow>{<ThumbUpAltIcon style={{ fill: 'rgba(0,0,0,0.45)' }}fontSize="10px" />}</Tooltip>
                        </button>
                        <button value={postData.id}  onClick={onDeprecate}>
                            <Tooltip title="비추천" arrow>{<ThumbDownAltIcon style={{ fill: 'rgba(0,0,0,0.45)' }} fontSize="10px"/>}</Tooltip>
                        </button>
                    </Voting>
                    <RecommendStats>
                        <Tooltip title="추천 수" arrow><KeyboardArrowUpIcon style={{ fill: 'rgba(0,0,0,0.45)'}}fontSize="small"/></Tooltip>
                        <Cnt>{postData.recommend} </Cnt>
                    </RecommendStats>
                    <CommentStats>
                        <Tooltip title="댓글 수" arrow><InsertCommentIcon  style={{ fill: 'rgba(0,0,0,0.45)' }} fontSize="6px"/></Tooltip>
                            <Cnt>{postData.review_count}</Cnt>
                    </CommentStats>
                </PostFooter>
            </PostContainer>
        </>
    )
}
Post.propTypes = {
    postData : PropTypes.array.isRequired,
    WhatFor: PropTypes.string.isRequired
}
export default Post;
