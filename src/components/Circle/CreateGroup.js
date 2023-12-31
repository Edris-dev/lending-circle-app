import { TextField,
  Box,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
   OutlinedInput,
   Divider,
   Typography,
   Checkbox,
   Tooltip,
   FormControlLabel,
   IconButton,
   Avatar,
   AvatarGroup,
   ListItem,
   ListItemText,
   ListItemAvatar } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useGroupMutation } from "../Slices/circleApiSlice.js";
import { useValidateMutation } from "../Slices/usersApiSlice.js";
import ParticipantModal from "./CirclePage/ParticipantModal.js";

const descriptionPlaceholder = "Write a little description about your group...(e.g Me and friends want to help each other invest)"
const today = dayjs();

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'MONOSPACE'
    ].join(','),
    fontWeight : 600,
  },
  palette:{
    text: {
      primary: '#525252'
    }
  },
  components:{
    MuiInput:{
      styleOverrides:{
        underline:{
          '&:before':{
            borderBottomWidth: '2px'
          }
        }
      }
    },
    MuiOutlinedInput:{
      styleOverrides:{
        notchedOutline: {
          borderWidth: '3px',
          borderColor: '#E8E8E8',
          borderRadius: '10px'
        }
      }
    }
  }
});


function CreateGroup() {

  const {userInfo} = useSelector((state) => (state.auth));

  console.log({userInfo})
  const [group] = useGroupMutation();
  const [validate] = useValidateMutation();
  const navigate = useNavigate();

  const [groupTitle, setGroupTitle] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [members, setMembers] = useState([]);
  const [soloEntry, setSoloEntry] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userError, setUserError] = useState(false);
  const [dueDate, setDueDate] = useState(today)
  const [open,setOpen] = useState(false)


  const [minMembers,setMinMembers] = useState(3)
  const [maxMembers,setMaxMembers] = useState(10)
  const [isPrivate, setIsPrivate] = useState(false)





  const updateTitle = (e) => {
    setGroupTitle(e.target.value);
  };

  const updateDescription = (e) => {
    setGroupDescription(e.target.value);
  };

  const updateContribution = (e) => {
    setMonthlyContribution(e.target.value);
  };

  const updateSoloEntry = (e) => {
    setSoloEntry(e.target.value);
    setUserError(false);

  }

  const checkUserValid = async (trimmedEntry) => {

    try {
      const response = await validate(trimmedEntry).unwrap();

      if (members.some((mem) => mem.username === response.username)) {
        setUserError(true);
        setErrorMessage("User already in list!");
      }else{
        setMembers([...members, response]);
        setSoloEntry("");
      }
    } catch (error) {
      if (error.status === 404) {
        setUserError(true);
        setErrorMessage("User does not exist!");
      }
    }


  }

  const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          const trimmedEntry = soloEntry.trim();

          if (trimmedEntry) {
              checkUserValid(trimmedEntry);
          }
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form-level validation
    if (!groupTitle || !groupDescription || !monthlyContribution || members.length === 0 || !dueDate) {
        setError(true);
        return;
    }

    //send new group data
    const circle = {
      title:groupTitle,
      description:groupDescription,
      monthlyContribution,
      nextPayout: dueDate,
      adminId:userInfo.id,
      memberUserIDs:members,
      minMembers,
      maxMembers,
      isPrivate,
    };


    try{
      const res = await group({ circle }).unwrap();
       navigate(`/circles/${res.id}`)
    } catch(e) {
      console.log({ e });
    }

};



  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{ m : '3rem'}}
      >
        <Box >
          <TextField
            sx={{ mb:2,input: { fontSize: '1.2rem', fontWeight: 600 } }}
            required
            error={error && !groupTitle}
            helperText={(error && !groupTitle) ? "Title is required!" : null}
            variant="standard"
            label="Circle Name"
            value={groupTitle}
            onChange={updateTitle} />
        </Box>
        <Box sx={{mt:2}}>
        <FormControl sx={{ mb:3}}
            helperText={(error && !groupDescription) ? "Please add a quick description for the purpose of this circle!" : null}
            fullWidth={{ m:1}} >
              <InputLabel htmlFor="circle-description">Description</InputLabel>
              <OutlinedInput
                  id="circle-description"
                  label="Description"
                  value={groupDescription}
                  onChange={updateDescription}
                  error={error && !groupDescription}
                  placeholder={descriptionPlaceholder}
              />
          </FormControl>
        </Box>

        <Box sx={{mt:4, mb:4}}>
          <Typography fontWeight={900} variant="h5" component="div" >Group Details</Typography>
          <Divider  sx={{borderWidth:"2px", mb:3}}/>
          <Box sx={{display:"flex", alignItems:"center", justifyContent: "space-between", mb:2}}>
            <Typography fontWeight={400} variant="h6" component="div" >Monthly Amount</Typography>
            <FormControl sx={{p:1}} helperText={(error && !monthlyContribution) ? "Please enter  a monthly amount" : null} >
                  <InputLabel htmlFor="circle-amount">Monthly Contribution</InputLabel>
                  <OutlinedInput
                      id="circle-amount"
                      label="Monthly Contribution"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      endAdornment={<InputAdornment position="end">/month</InputAdornment>}
                      value={monthlyContribution}
                      onChange={updateContribution}
                      error={error && !monthlyContribution}
                      sx={{width:'250px'}}
                  />
              </FormControl>
          </Box>
          <Box sx={{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
            <Typography fontWeight={400} variant="h6" component="div" >First Payment</Typography>
                <DatePicker
                  label="Due Date"
                  disablePast
                  onChange={(dueDate) => setDueDate(dueDate)}
                  value={dueDate}
                  />
          </Box>
          <Box sx={{display:"flex", alignItems:"center", justifyContent: "space-between", mt:2}}>
            <Typography fontWeight={400} variant="h6" component="div" >Min/Max Participants </Typography>
            <FormControl sx={{p:1, width:'250px', display: 'flex',flexDirection:'row', justifyContent:'space-between'}}  >
                  <TextField
                      id="min-members"
                      label="Min"
                      value={minMembers}
                      onChange={(e) => setMinMembers(e.target.value)}
                      sx={{width:'75px'}}
                  />
                  <TextField
                      id="max-members"
                      label="Max"
                      value={maxMembers}
                      onChange={(e) => setMaxMembers(e.target.value)}
                      sx={{width:'75px'}}

                  />
              </FormControl>
          </Box>
          <Box sx={{display:"flex", alignItems:"center", justifyContent: "space-between", mt:2}}>
            <Typography fontWeight={400} variant="h6" component="div" >Min/Max Pool Amount </Typography>
            <FormControl sx={{p:1, width:'250px', display: 'flex',flexDirection:'row', justifyContent:'space-between'}}  >
                  <OutlinedInput
                      id="min-amount"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      disabled={true}
                      value={minMembers * monthlyContribution}
                      sx={{width:'75px'}}
                  />

                  <OutlinedInput
                      id="max-amount"
                      disabled={true}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      value={maxMembers * monthlyContribution}
                      onChange={(e) => setMaxMembers(e.target.value)}
                      sx={{width:'75px'}}

                  />
              </FormControl>
          </Box>
        </Box>

        <Box sx={{mt:4, mb:4}}>
        <Typography fontWeight={900} variant="h5" component="div" >Participants</Typography>
          <Divider  sx={{borderWidth:"2px", mb:1}}/>

          <Box sx={{ mb:1,display:'flex', flexDirection:'row', alignItems:'flex-start', justifyContent:'flex-start'}}>
              <FormControlLabel
              sx={{marginRight:'0px'}}
              control={<Checkbox onChange={() => setIsPrivate(!isPrivate)} checked={isPrivate}/>}
              label="Make Group Private"
              labelPlacement="end"
              />
              <Tooltip title="Only Admin will be able to add users">
                <IconButton sx={{backgroundColor:'lightgray', padding:'0px'}}>
                  <QuestionMarkIcon sx={{maxWidth:'16px'}}/>
                </IconButton>
              </Tooltip>
          </Box>
          <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
          <TextField
              label="Add Members Here..."
              value={soloEntry}
              onChange={updateSoloEntry}
              onKeyDown={handleKeyPress} //check to see if enter is clicked
              error={userError || (error && members.length === 0)}
              helperText={userError ? errorMessage : (error && members.length === 0 ? "Please add atleast 1 member" : null)}
              sx={{width:'400px'}}
            />
            {members.length >=1 ?
              <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <ListItem
                onClick={() => setOpen(true)}
                sx={{backgroundColor:'lightgray', border: '2px solid #E8E8E8', borderRadius:'15px', maxWidth: '320px', maxHeight: '60px', ml:'7px', cursor:'pointer'}}>
                  <ListItemAvatar>
                    <AvatarGroup max={3}>
                    {members.map((member) => {
                        return (<Avatar src={member.displayImg}></Avatar>)
                        }
                    )}
                    </AvatarGroup>
                </ListItemAvatar>
                    <ListItemText
                        primary="Added Members"
                    />
                </ListItem>
              </Box>
            : null}
          </Box>
            <ParticipantModal onClose={() => setOpen(false)} open={open} members={members} showStatus={false} handleDelete={setMembers} />
        </Box>
            <Button sx={{width:350, height:40,backgroundColor:"#8BB2B2", borderRadius:"10px"}} variant="contained" onClick={handleSubmit}>
              Start!
            </Button>

      </Box>
    </ThemeProvider>

    );

}

export default CreateGroup;
