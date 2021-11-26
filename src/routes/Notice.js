import UseAsync from '../hooks/UseAsync.js';
import axios from 'axios';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Post from '../components/Post.js';

const NoticeBoardContainer = styled.div`

`;
async function getNoticeData() {
    const response =  await axios.get('/api/notice/noticeList')
    return response.data;
}

function Notice(){
const [state, refetch] = UseAsync(getNoticeData, []);
const {loading, data, error} = state;
if(loading) return <div>Loading</div>;
if(error) return <div>error page</div>;
if(!data) return <div>loading</div>

const noticeBoardData = data.result_data.data;

return(
    <>
    <NoticeBoardContainer>
        {noticeBoardData.map((item)=>
        <Link key={item.id} to={`/notice/${item.id}`}>
            <Post postData={item} WhatFor="board"/>         
        </Link>
        )}      
    </NoticeBoardContainer>
    </>
    )
}

export default Notice;