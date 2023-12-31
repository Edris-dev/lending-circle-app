
import { Modal } from "@mui/material"
import Participants from "../../Participants"

export default function ParticipantModal(props){
    const {members , open, onClose, showStatus, handleDelete} = props

     const memberInfo = showStatus ? members.map((member) => ({
            ...member.User,
            status:member.status,
            }))
            :  members;




     return (
        <Modal open={open} onClose={onClose} sx={{display:'flex', flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
            <Participants members={memberInfo} deleteMembers={handleDelete}/>
        </Modal>
     )



}