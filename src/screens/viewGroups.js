import { useSelector } from "react-redux";
import { useState, useEffect} from "react";
import { useMyCirclesMutation } from "../components/Slices/usersApiSlice";

function ViewGroups(){

    const [circles, setCircle] = useState([])
    const {userInfo} = useSelector((state) => (state.auth));
    const [myCircles] = useMyCirclesMutation();

    useEffect(() =>{
        const myGroups = async () => {
            try {
                let res = await myCircles(userInfo.id)
                setCircle(res)
            } catch(err){
                console.log({err})
            }
        }
        myGroups()


    },[userInfo,myCircles])

}

export default ViewGroups;