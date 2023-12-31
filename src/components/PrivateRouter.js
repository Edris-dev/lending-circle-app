import {Navigate, Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRouter(){
    const {userInfo} = useSelector((state) => (state.auth))

    return userInfo ? <Outlet/> :
    <Navigate to='signin' replace />;
}

export default PrivateRouter;