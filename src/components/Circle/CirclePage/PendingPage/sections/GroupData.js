import {
    Box,
    FormControl,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    Typography,
    TextField,
     } from "@mui/material";


function GroupData({group}){

    return(
        <>
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
            <Box sx={{display:"flex", alignItems:"center", justifyContent: "space-between", mt:2}}>
                <Typography fontWeight={400} variant="h6" component="div" >Min/Max Participants </Typography>
                <FormControl sx={{p:1, width:'250px', display: 'flex',flexDirection:'row', justifyContent:'space-between'}}  >
                    <TextField
                        disabled={true}
                        id="min-members"
                        label="Min"
                        value={group.minMembers}
                        sx={{width:'75px'}}
                    />
                    <TextField
                        disabled={true}
                        id="max-members"
                        label="Max"
                        value={group.maxMembers}
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
                    value={group.minMembers * group.monthlyContribution}
                    sx={{width:'75px'}}
                />

                <OutlinedInput
                    id="max-amount"
                    disabled={true}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    value={group.maxMembers * group.monthlyContribution}
                    sx={{width:'75px'}}

                />
                </FormControl>
            </Box>
        </>

    );
}

export default GroupData