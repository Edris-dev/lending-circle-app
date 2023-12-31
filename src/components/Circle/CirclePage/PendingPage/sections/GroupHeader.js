import {
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    Typography,
    Divider
     } from "@mui/material";
import dayjs from 'dayjs';


function GroupHeader({group}){

    return(
        <>
        <Box>
            <Typography variant="cardHeader" label="Circle Name" >
                    Pending Page  {group.title}
            </Typography>
        </Box>
        <Divider  sx={{borderWidth:"2px", mb:3}}/>
        <Box>
            <FormControl sx={{ mb:3}} fullWidth={{ m:1}} >
                <InputLabel htmlFor="circle-description">Description</InputLabel>
                <OutlinedInput
                    id="circle-description"
                    label="Description"
                    value={group.description}
                    disabled
                    sx={{color:'#fff'}}
                />
            </FormControl>
        </Box>
        <Box sx={{display:'flex', justifyContent:'flex-start', alignItems:'baseline'}}>
            <Typography
                sx={{color:'#525252', fontSize:'28px', fontWeight:700}}
                label="Payment Due Date"
                disabled >
                {`Upcoming Payment: `}
            </Typography>
            <Typography sx={{ml:1,color:'#525252', fontSize:'20px', fontWeight:600}}>{dayjs(group.dueDate).format('MMM D, YYYY')}</Typography>
        </Box>
        </>

    );
}

export default GroupHeader