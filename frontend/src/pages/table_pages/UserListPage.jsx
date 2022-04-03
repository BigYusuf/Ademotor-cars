import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import { Link } from 'react-router-dom';
import MessageBox from '../../components/MessageBox';
import Table from '../../components/Table';
import './listPages.css'
import { USER_DETAILS_RESET } from '../../constants/userConstants';

export default function UserListPage(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = userDelete;


const customerTableHead = ['ID', 'NAME', 'EMAIL', 'IS SELLER', 'IS ADMIN', 'ACTIONS']

const renderHead = (user, index) => <th key={index}>{user}</th>

const renderBody = (user, index) => (
  <tr className="table__row" key={index}>
  <td className="table__data" data-label="ID">{user._id}</td>
  <td className="table__data" data-label="NAME">{user.name}</td>
  <td className="table__data" data-label="EMAIL">{user.email}</td>
  <td className="table__data" data-label="SELLER">{user.isSeller ? 'YES' : ' NO'}</td>
  <td className="table__data" data-label="ADMIN">{user.isAdmin ? 'YES' : 'NO'}</td>
  <td className="table__data" data-label="ACTIONS">
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
    <div className="list__container">
    <Link to='/'>
            <button type="button" className="btn"> Go back</button>
      </Link> 
      <h1 className="list__title">Users</h1>
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
