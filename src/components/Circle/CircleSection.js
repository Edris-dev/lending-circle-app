import CircleCards from "./Cards/CircleCards.js";
import {  Box, Grid, Divider, Typography } from "@mui/material";

function CircleSection({title, data, isPending}) {

  return (
      <Box marginTop={'3%'}>
        <Typography sx={{marginLeft:'15px'}} variant="cardStatus"  >
          {title}
        </Typography>
        <Divider  sx={{borderWidth:"2px", mb:2}}/>
        <Grid container direction="row"
          justifyContent="start"
          spacing={5}
          sx={{ flexGrow: 1 }}
          >
        {
          data && data.map((circleData) => {
            return(
              <Grid item key={circleData.id} >
                <CircleCards
                  key={circleData.id}
                  id={circleData.id}
                  title={circleData.title}
                  description={circleData.description}
                  monthlyAmount={circleData.monthlyContribution}
                //  participants={circleData.participants}
                  isPending={isPending}
                />
              </Grid>

            )
          })
        }
        </Grid>

      </Box>
    );

}

export default CircleSection;
