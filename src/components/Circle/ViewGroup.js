import { useSelector } from "react-redux";
import { useState, useEffect} from "react";
import { useMyCirclesMutation } from "../Slices/usersApiSlice";
import {  Box, Container } from "@mui/material";

import CircleSection from "./CircleSection";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles';


let defaultTheme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'MONOSPACE'
    ].join(','),
    fontWeight : 600,
    cardTitle:{
      fontSize: '28px',
      fontWeight: 700,
      color:'#BFBFDA',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardDate:{
      fontSize: '16px',
      fontWeight: 600,
      color:'#BFBFDA',
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
          cursor: 'pointer'
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

defaultTheme = responsiveFontSizes(defaultTheme);

const USER_STATUS = ['Admin','Active', 'Pending']

/*

Like the home page, will use my userId to check all the Groups associated w me
*/

function ViewGroup() {

  const [pendingCircle, setPendingCircle] = useState([]);
  const [activeCircle, setActiveCircle] = useState([]);
  const [adminCircle, setAdminCircle] = useState([]);


  const {userInfo} = useSelector((state) => (state.auth));
  const [myCircles] = useMyCirclesMutation();

  useEffect(() =>{
      const myGroups = async () => {
          try {
              let res = await myCircles(parseInt(userInfo.id))
              setAdminCircle(res.data.AdminCircles);
              setPendingCircle(res.data.PendingCircles);
              setActiveCircle(res.data.AcceptedCircles);

          } catch(err){
              console.log({err})
          }
      }
      myGroups();

  },[])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <Box marginTop={'3%'}>
        {USER_STATUS.map((status) => (
          <CircleSection
            title={status}
            data={(status === 'Admin' ? adminCircle : (status === 'Active' ? activeCircle : pendingCircle))}
            isPending={(status === 'Pending') ? true : false}
          />
        ))}
        </Box>


      </Container>
    </ThemeProvider>

    );

}

export default ViewGroup;
