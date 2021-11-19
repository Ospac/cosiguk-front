import styles from "./Post.module.css";
import {useState} from "react";
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {TextField, Typography} from '@mui/material';


function Publish () {

    const [newPost, setNewPost] = useState({ title:"", nickname:"", password:"",content:""});
    async function onPublish(event){
        event.preventDefault();
       
        const body = {
            nickname: newPost.nickname,
            password: newPost.password,
            title: newPost.title,
            content: newPost.content
        };
        var formBody = [];
        for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            body: formBody
        };
        
        await fetch('/api/board/boardAdd', requestOptions)
            .then((response)=> response.json())
            .then((json) => {
                console.log(json); 
                console.log(requestOptions)})
            .catch((error) => {
                console.log(error);
            });
        
    }
    const handleChange = (e) => {
        setNewPost(prevObject => ({...prevObject, [e.target.name]: e.target.value}));
    }
    return(
        <div className={styles.postContainer}>
            <div className={styles.postHeader}>
                글쓰기
            </div>
            <form onSubmit={onPublish} className={styles.postContents}>
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
            </form>
            <div className={styles.postFooter}>
            </div>
        </div>
    )
}
export default Publish;