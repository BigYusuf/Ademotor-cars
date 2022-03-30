import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import Table from '../components/table/Table';
import './style2.css'
import { USER_DETAILS_RESET } from '../constants/userConstants';

export default function UserListPage(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = userDelete;


const customerTableHead = ['ID', 'NAME', 'EMAIL', 'IS SELLER', 'IS ADMIN', 'ACTIONS']

const renderHead = (user, index) => <th key={index}>{user}</th>

const renderBody = (user, index) => (
  <tr key={index}>
  <td>{user._id}</td>
  <td>{user.name}</td>
  <td>{user.email}</td>
  <td>{user.isSeller ? 'YES' : ' NO'}</td>
  <td>{user.isAdmin ? 'YES' : 'NO'}</td>
  <td>
    <i type="" className="fas fa-pen" onClick={() => props.history.push(`/user/${user._id}/edit`)}></i>
    <i type="" className="fas fa-trash" onClick={() => deleteHandler(user)}></i>
  </td>
</tr>
)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div>
    <Link to='/'>
            <button type="button" className="btn"> Go back</button>
      </Link> 
      <h1>Users</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
          <Table
              limit='10'
              headData={customerTableHead}
              renderHead={(user, index) => renderHead(user, index)}
              bodyData={users}
              renderBody={(user, index) => renderBody(user, index)}
          />
      )}
    </div>
  );
}
