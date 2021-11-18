import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@mui/material';

function EditHeader(){
    return(
        <div>
            <Tooltip title="글쓰기" arrow>
                <Fab color="secondary" 
                    aria-label="write" 
                    size="small"
                    color="white">
                    <EditIcon />
                </Fab>
            </Tooltip>            
        </div>
    )
}
export default EditHeader;