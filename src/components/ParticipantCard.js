
import {Avatar, ListItem, ListItemAvatar,ListItemText, IconButton} from "@mui/material";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
function ParticipantCard(props){

    const {memberInfo, handleDelete, status} = props;

    console.log({handleDelete})


    return(
        <ListItem key={memberInfo.firstName} sx={{margin: '5px',border: '2px solid #E8E8E8', borderRadius:'15px'}}>
            <ListItemAvatar>
                <Avatar src={memberInfo.displayImg}/>
            </ListItemAvatar>
            <ListItemText
                primary={`${memberInfo.firstName} `}
                secondary={status ? status : null }

            />
            {handleDelete ?
            <IconButton edge="end">
                <ClearOutlinedIcon onClick={() => handleDelete(memberInfo.username)}/>
            </IconButton>
            : null
            }


        </ListItem>

    );

}

export default ParticipantCard;