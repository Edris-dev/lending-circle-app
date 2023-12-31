import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useGroupInfoMutation } from '../../Slices/circleApiSlice'
import { Box, Button, FormControl, InputLabel, InputAdornment, OutlinedInput, Divider, Typography, Avatar, AvatarGroup } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';

import PendingPage from './PendingPage/PendingPage'


function CirclePage(){

    const [group,setGroup] = useState(null)
    const [members, setMembers] = useState([])

    const {groupId : routeGroupId} = useParams()

    const [groupInfo] = useGroupInfoMutation();

    useEffect(() => {
        const groupFetch = async () => {
            try{
                let res = await groupInfo(routeGroupId)
                setGroup(res.data.group)
                setMembers(res.data.members)
            }catch (err){
                console.log({err})
            }
        }
        groupFetch();

    },[])

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

      if (!group) {
        return <p>Loading...</p>; // You can replace this with your loading component
      }else if(group.status === "pending"){
        return <PendingPage groupInfo={group} memberList={members} />

      }else if (group.staus === "ACTIVE"){
        //show active page
      }




    return (
        <ThemeProvider theme={theme}>
            <Box
            sx={{ m : '3rem'}}
          >
                <Box>
                    <Typography
                        variant="cardHeader"
                        label="Circle Name"
                            >
                        {group.title}
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
                <Divider  sx={{borderWidth:"2px", mb:3}}/>

                <Box sx={{display:"flex", alignItems:"center", justifyContent: "space-between", mb:2}}>
                    <Typography fontWeight={400} variant="h6" component="div" >Monthly Amount</Typography>
                    <FormControl sx={{p:1}}  >
                        <InputLabel htmlFor="circle-amount">Monthly Contribution</InputLabel>
                        <OutlinedInput
                            id="circle-amount"
                            label="Monthly Contribution"
                            value={group.monthlyContribution}
                            disabled
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            endAdornment={<InputAdornment position="end">/month</InputAdornment>}
                        />
                    </FormControl>
                </Box>

                <Box sx={{mt:4, mb:4}}>
                    <Typography sx={{color:'#525252', fontSize:'28px', fontWeight:700}} component="div" >Participants</Typography>
                    <Divider  sx={{borderWidth:"2px", mb:3}}/>
                    {/*Here will output and show upcoming payee and those who still havent paid */}
                    {group.payee
                    ? <Box>
                        <Avatar alt={group.payee.name} src={group.payee.displayImg}></Avatar>
                        <Typography>{group.payee.name} </Typography>
                      </Box>
                    : null
                    }
                    { group.pending
                        ? <Box>
                            <AvatarGroup max={3}>
                                {group.pending.map((pendingMem) => {
                                    return (<Avatar src={pendingMem.displayImg}></Avatar>)
                                    }
                                )}
                            </AvatarGroup>
                            <Typography> Pending</Typography>
                         </Box>
                        : null
                    }
                    {group.paid
                    ? <Box>
                            <AvatarGroup max={3}>
                            {group.paid.map((paidMem) => {
                                return (<Avatar src={paidMem.displayImg}></Avatar>)
                                }
                            )}
                            </AvatarGroup>
                        <Typography> Paid</Typography>
                    </Box>
                    : null
                    }

                </Box>
                <Button sx={{width:350, height:40,backgroundColor:"#8BB2B2", borderRadius:"10px"}} variant="contained" >
                    Make Payment
                </Button>

            </Box>
        </ThemeProvider>

        );
}

export default CirclePage