/*
Will create a list of participants yuo can send a request too
MEMBERS:
- Photo/Display - If user doesnt uplload one we use a default one
- User: First & Last name
- Username
*/
import { List} from "@mui/material";
import ParticipantCard from "./ParticipantCard";
function Participants(props){

    const {members, deleteMembers} = props;
    const handleDelete = (name) =>{
        const updatedList = members.filter((members) => members.username !== name);
        deleteMembers(updatedList);
    }

    return(
        <List sx={{ display:'flex',flexDirection:'column', alignItems:'center', padding:'35px',  width: '40vw', bgcolor: 'background.paper', borderRadius:'25px' }}>
            {members.map((member) => (
                <ParticipantCard status={member.status ? member.status : null} memberInfo={member} handleDelete={deleteMembers ? handleDelete : null} />
            ))}
        </List>

    );

}

export default Participants;