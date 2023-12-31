import * as React from 'react';
import {
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function CircleCards({
    id,
    title,
    monthlyAmount,
   // participants,
    isPending = false
}) {
    const navigate = useNavigate();
    const handleCardClick = () => {
      navigate(`/circles/${id}`)
    }


  return (
    <Card
      variant="outlined"
      onClick={() => handleCardClick()}
    >
      <Box
        sx={{
          display: 'grid',
          gap:1,
          gridTemplateColumns: '1fr 2fr',
          justifyItems: 'center',
          alignItems: 'center',
        }}
      >
          <Box sx={{width:'100%', display:'flex', justifyContent:'space-evenly'}}>
            <AvatarGroup max={1} size="sm" sx={{ '--Avatar-size': '20px', justifySelf:'center', marginTop: '5%' }}>
                {/*participants.accepted.map((member) => {
                     return(
                          <Avatar src={member.img} />
                      )
                  }) */}
              </AvatarGroup>
          </Box>
          <Box sx={{maxWidth: '100%',marginTop:'11px', marginRight:'13px', display: 'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography variant="cardTitle" sx={{justifySelf:'center', alignSelf:'center'}}>
              ${monthlyAmount}
              <Typography> /month </Typography>
            </Typography>
            <Typography variant="cardDate" sx={{justifySelf:'center', alignSelf:'center'}}>
                  Due: Jan 19, 2005
            </Typography>
          </Box>

          <Box sx={{maxWidth:'135px' }}>
            <Typography variant="cardTitle" sx={{overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis', marginLeft: '10px', justifyContent:'start'}}>{title}</Typography>
          </Box>

        <Box sx={{width:'100%'}}>
          {!isPending ?
          (
            <CardActions>

              <Button variant='contribute'>
              Contribute
              </Button>
            </CardActions>
          )
          : (
            <CardActions>
              <Button variant='contribute' sx={{width:'50%'}}>
                  Join
              </Button>
              <Button variant='reject' sx={{width:'50%'}}>
                Decline
              </Button>
            </CardActions>
          )}

        </Box>
      </Box>
    </Card>
  );
}
