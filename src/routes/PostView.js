import UseAsync from '../hooks/UseAsync.js';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post.js';
import styled from 'styled-components';

function PostView(){
    const PostViewContainer = styled.div`
        display: flex;
        flex-direction: column;
    `;
    const CommentCnt = styled.div`
        font-weight: 500;
        text-align: left;
    `;
    const CommentView = styled.div`
        display: flex;
        flex-direction: column;
        margin-top: 25px;
    `;
    const CommentWriteContainer = styled.div`\

    `;
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

    if(postLoading || commentLoading) return <div>Loading</div>;
    if(postError || commentError) return <div>error page</div>;
    if(!postData || !commentData) return <div>loading</div>


    const post = postData.data.result_data.account;
    const comments = commentData.data.result_data.data;

    return(
        <PostViewContainer>
            <Post postData={post} WhatFor="board"></Post>
            <CommentCnt>{comments.length} comments</CommentCnt>
            <CommentView>
                {comments.map((com) => <Post postData={com} WhatFor="chat"></Post>)}
                <CommentWriteContainer></CommentWriteContainer>
            </CommentView>
        </PostViewContainer>
        
    )
}
export default PostView;