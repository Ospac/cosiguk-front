import styles from "./Post.module.css";
import styled from 'styled-components';
import axios from 'axios';
import {useState} from "react";
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {TextField, Typography} from '@mui/material';

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const PostHeader = styled.div`
    width: 750px;
    height: 80px;
    font-weight: bold;
    font-size: 35px;
`;
const PostContents = styled.form`
    display: flex;
    flex-direction: column;
    width: 750px;
`;
function Publish () {

    const [newPost, setNewPost] = useState({ title:"", nickname:"", password:"",content:""});
    async function onPublish(event){
        event.preventDefault();        

        const params = new URLSearchParams();
        params.append('nickname', newPost.nickname);
        params.append('password', newPost.password);
        params.append('title', newPost.title);
        params.append('content', newPost.content);
        const config = {headers : {'Content-Type': 'application/x-www-form-urlencoded'}}

        await axios.post("/api/board/boardAdd", params, config)
        .then((json) => {
            console.log(json);
        }).catch((error) => {
            console.log(error);
        });
        
    }
    const handleChange = (e) => {
        setNewPost(prevObject => ({...prevObject, [e.target.name]: e.target.value}));
    }
    return(
        <PostContainer>
            <PostHeader>
                글쓰기
            </PostHeader>
            <PostContents onSubmit={onPublish}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection:'column' }}>
                    <div>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5}} />
                    <TextField
                        required
                        id="outlined-required"
                        value={newPost.nickname || ''}
                        onChange={handleChange}
                        label="닉네임"
                        name="nickname"
                        helperText="10자 이하로 입력해주세요"
                        inputProps={{ 
                            maxLength: 10,
                            style: { backgroundColor: "white"},
                            className: styles.postNickname,
                        }}
                        size=""
                        type="text"
                        />
                    <TextField
                        sx={{fill: 'white'}}
                        required
                        value={newPost.password || ''}
                        onChange={handleChange}
                        id="outlined-required"
                        name="password"
                        label="비밀번호"
                        type="password"
                        helperText="게시글 삭제와 수정에 이용됩니다."
                        inputProps={{maxLength: 20, style: { backgroundColor: "white"}}}
                        size=""
                        />
                    </div>
                     <Typography componet="h2" variant="h5" gutterBottom>
                    Textarea
                    </Typography>
                    <TextField
                        label="제목"
                        name="title"
                        value={newPost.title || ''}
                        onChange={handleChange}
                        variant="filled"
                        required
                        inputProps={{style: { width: "700px", backgroundColor: "white"}}}
                    />
                    <TextField
                        label="내용"
                        name="content"
                        value={newPost.content || ''}
                        onChange={handleChange}
                        variant="filled"
                        multiline
                        required
                        rows={10}
                        inputProps={{style:{width: "700px", backgroundColor: "white"}}}/>
                    </Box>
                <button>등록</button>
            </PostContents>
            <div className={styles.postFooter}>
            </div>
        </PostContainer>
    )
}
export default Publish;