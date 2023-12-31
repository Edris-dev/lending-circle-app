import React, {useEffect, useState} from 'react'
import {
    Box,
    Button,

    Divider,
    Typography,
    Avatar,
    AvatarGroup,
    ListItem,
    ListItemText,
    TextField,
    ListItemAvatar } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import ParticipantModal from '../ParticipantModal';

import { useGroupRequestMutation } from '../../../Slices/circleApiSlice';
import { useNavigate } from "react-router-dom";
import { useRequestMemberMutation, useUserStatusMutation } from '../../../Slices/usersApiSlice';

import GroupData from './sections/GroupData'
import GroupHeader from './sections/GroupHeader';



function PendingPage(props){

    const {groupInfo, memberList} = props

    const [group,] = useState(groupInfo)
    const [members, ] = useState(memberList)
    const [groupRequest] = useGroupRequestMutation();


    const {userInfo} = useSelector((state) => state.auth)
    const [currStatus, setCurrStatus] = useState(null)
    const [disabled, setDisabled] = useState(currStatus === "Accepted")

    const [userStatus] = useUserStatusMutation()
    const [open,setOpen] = useState(false)

    const [userError, setUserError] = useState(false);
    const [soloEntry, setSoloEntry] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

    const [requestMember] = useRequestMemberMutation();

    console.log({members})

    const USER_ID = userInfo.id;

    console.log({group})



    const updateSoloEntry = (e) => {
      setSoloEntry(e.target.value);
      setUserError(false);

    }

    const checkUserValid = async (trimmedEntry) => {

      try {
        await requestMember({requestMember:trimmedEntry, userId:USER_ID, groupId: group.id}).unwrap();
        setSoloEntry("");
      } catch (error) {
        console.log({error})
        setErrorMessage(error.data)
        setUserError(true);

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

    const navigate = useNavigate();

    useEffect(() => {
      const findUserStatus = async () => {
        try{
          const userId = userInfo.id;
          const groupId = group.id;
          const res = await userStatus(({userId,groupId})).unwrap()
          setCurrStatus(res.status)
        }catch(err){
        }
      }
      //find if user joined/declined and show appropriate buttons
      findUserStatus()
    }, [])

    useEffect(() => {
      setDisabled(currStatus === "Accepted")
    }, [currStatus])

    const handleCircleStart = () => {
      //change circle status from pending to start


    }


    let theme = createTheme({
        typography: {
          fontFamily: [
            'Poppins',
            'MONOSPACE'
          ].join(','),
          fontWeight : 600,
          cardHeader:{
            fontSize: '28px',
            fontWeight: 700,
            color:'#525252',
            width: '100%',
          },
          cardStatus:{
            fontSize: '24px',
            fontWeight: 500,
            color: '#525252'
          }
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
          },
          MuiCard:{
            styleOverrides:{
              root:{
                border: '2px solid #E8E8E8',
                borderRadius: '6px',
                width:'320px',
              },
            },
          },
          MuiTypography:{
            defaultProps:{
              variantMapping:{
                cardTitle: 'h4'
              }
            }
          },
          MuiButton:{
            variants:[{
              props: {variant: 'contribute'},
              style: {
                backgroundColor: '#8BB2B2',
                width: '100%',
                height: '23px',
                color: '#FFF',
                borderRadius: '6px',
                '&:hover': {
                  color: '#8BB2B2',
                },
              }
            },
            {
              props: {variant: 'reject'},
              style: {
                backgroundColor: '#B28B8B',
                width: '50%',
                height: '23px',
                color: '#FFF',
                borderRadius: '6px',
                '&:hover': {
                  color: '#B28B8B',
                },
              }
            }]
          },
          MuiContainer:{
            styleOverrides:{
              root:{
                maxWidth:'100vw',
              }
            }
          }

        }
      });

    const numAccepted=  (members.filter((mem) => mem.status === "Accepted") )

    console.log({numAccepted})

    const sendDecision = async (decision) => {
      try{
        await groupRequest({id: groupInfo.id, userId: userInfo.id, decision:decision}).unwrap()
        navigate('/')

      }catch(err){
        console.log({err})
      }

    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ m : '3rem'}}>
              <GroupHeader group={group}/>
              <Divider  sx={{borderWidth:"2px", mb:3}}/>
              <GroupData group={group} />
                <ParticipantModal onClose={() => {setOpen(false)}} open={open} members={members} showStatus={true} />
                <Box>
                  <Box sx={{mt:4, mb:4}}>
                      <Typography sx={{color:'#525252', fontSize:'28px', fontWeight:700}} component="div" >Participants</Typography>
                      <Divider  sx={{borderWidth:"2px", mb:3}}/>
                      <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        {group.isPrivate ? null : (
                          <TextField
                          label="Add Members Here..."
                          value={soloEntry}
                          onChange={updateSoloEntry}
                          onKeyDown={handleKeyPress} //check to see if enter is clicked
                          sx={{width:'400px'}}
                          error={userError}
                          helperText={userError ? errorMessage : null}
                          />
                          )}
                        <Box>
                          <ListItem key="circle-members"
                          onClick={(members.length > 1) ? () => setOpen(true) : null}
                          sx={{border: '2px solid #E8E8E8', borderRadius:'15px', maxWidth: '320px', maxHeight: '60px', ml:'7px', cursor:'pointer'}}>
                            <ListItemAvatar>
                              <AvatarGroup max={3}>
                              {members.map((member) => {
                                  return (<Avatar src={member.User.displayImg}></Avatar>)
                                  }
                              )}
                                </AvatarGroup>
                            </ListItemAvatar>
                            <ListItemText primary="Member" secondary={"status"}/>
                          </ListItem>
                        </Box>
                      </Box>
                  </Box>
                  <Box>
                    {currStatus === "Admin" ?
                      (<Button
                        disabled={group.minMembers > (numAccepted.length + 1)}
                        sx={{width:350, height:40,backgroundColor:"#8BB2B2", borderRadius:"10px"}}
                        variant="contained"
                        onClick={() => handleCircleStart()}
                        >
                        Start
                      </Button>)
                    : (
                      <Box display={'flex'} justifyContent={'space-between'}>
                        <Button disabled={disabled} onClick={() => sendDecision('Accepted')} sx={{width:300, height:40,backgroundColor:"#8BB2B2", borderRadius:"10px"}} variant="contained" >
                            Accept
                        </Button>
                        <Button disabled={disabled} onClick={() => sendDecision('Declined')} sx={{width:300, height:40,backgroundColor:"#B28B8B", borderRadius:"10px"}} variant="contained" >
                            Decline
                        </Button>
                      </Box>)}
                  </Box>
                  </Box>
                  </Box>
        </ThemeProvider>

        );
}

export default PendingPage