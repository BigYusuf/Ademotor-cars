import React, {memo} from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom'

const AdminRoute = ({component: Component, ...rest}) => {
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    return (
        <Route {...rest}
        render = {(props) => userInfo && userInfo.isAdmin
        ? (<Component {...props}></Component>)
        : (<Redirect to= "/login"/>)}>
            
        </Route>
    );
}

export default memo(AdminRoute)
