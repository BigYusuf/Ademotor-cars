import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const RegisterPage = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const redirect = props.location.search
      ? props.location.search.split('=')[1]
      : '/';
  
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;
  
    const dispatch = useDispatch();
    const submitHandler = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert('Password and confirm password are not match');
      } else {
        dispatch(register(name, email, password));
      }
    };
    useEffect(() => {
      if (userInfo) {
        props.history.push(redirect);
      }
    }, [props.history, redirect, userInfo]);
   
    return (
        <div>
            
<div className="form-container">


<form action="" className="form" onSubmit={submitHandler}>
    <h3>Create Account</h3>
    {loading && <LoadingBox></LoadingBox>}
    {error && <MessageBox variant="danger">{error}</MessageBox>}
    <input type="text" placeholder="Enter Names" className="box" required onChange={(e) => setName(e.target.value)} ></input>
    <input type="email" placeholder="email" className="box" required onChange={(e) => setEmail(e.target.value)}></input>
    <input type="password" placeholder="password" className="box" required onChange={(e) => setPassword(e.target.value)}></input>
    <input type="confirmpassword" placeholder="confirm password" className="box" required onChange={(e) => setConfirmPassword(e.target.value)}></input>
    <button type="submit" className="btn">Register</button>
   
    <p> already have an account <Link to="/login">login</Link> </p>
</form>

</div>

        </div>
    )
}

export default RegisterPage;
