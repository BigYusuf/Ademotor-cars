import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const LoginPage = (props) => {
    const [email, setEmail] =useState('');
    const [password, setPassword] =useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error} = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    };
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div>
            
            <div className="form-container">

             <Link to="/"><span id="close-form" className="fas fa-times"></span></Link>
            <form action="" onSubmit={submitHandler}>
                <h3>user login</h3>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <input type="email" placeholder="email" required onChange={(e) => setEmail(e.target.value)} className="box"></input>
                <input type="password" placeholder="password" required onChange={(e) => setPassword(e.target.value)} className="box"></input>
                <p> forget your password <Link to="#">click here</Link> </p>
                <input type="submit" value="login" className="btn"></input>
                <p>or login with</p>
                <div className="buttons">
                    <Link to="#" className="btn"> google </Link>
                    <Link to="#" className="btn"> facebook </Link>
                </div>
                <p> don't have an account?{' '} <Link to={`/register?redirect=${redirect}`}>create one</Link> </p>
            </form>
            </div>

        </div>
    )
}

export default LoginPage
