import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import { deleteOrder, listOrders } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { ORDER_DELETE_RESET } from '../../constants/orderConstants';
import './listPages.css';

export default function OrderListPage(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = orderDelete;
  const dispatch = useDispatch();

  const customerTableHead = ['ID', 'USER', 'DATE', 'TOTAL', 'PAID', 'DELIVERED', 'ACTIONS']
  
  const renderHead = (order, index) => <th key={index}>{order}</th>

  const renderBody = (order, index) => (
    <tr key={index}>
      <td>{order._id}</td>
      <td>{order.user.name}</td>
      <td>{order.createdAt.substring(0, 10)}</td>
      <td>{order.totalPrice.toFixed(2)}</td>
      <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
      <td>
        {order.isDelivered
          ? order.deliveredAt.substring(0, 10)
          : 'No'}
      </td>
      <td>
        <button type="button" className="list__small_btn" onClick={() => {
            props.history.push(`/order/${order._id}`);
          }}
        >Details
        </button>
        <button type="button" className="list__small_btn" onClick={() => deleteHandler(order)}
        >Delete
        </button>
      </td>
    </tr>
)
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders());
  }, [dispatch, successDelete]);
  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id));
    }
  };
  return (
    <div className="list__container">
      <Link to='/'>
            <button type="button" className="btn"> Go back</button>
      </Link> 
      <h1 className="list__title">Orders</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table
              limit='10'
              headData={customerTableHead}
              renderHead={(order, index) => renderHead(order, index)}
              bodyData={orders}
              renderBody={(order, index) => renderBody(order, index)}
          />
      )}
    </div>
  );
}
