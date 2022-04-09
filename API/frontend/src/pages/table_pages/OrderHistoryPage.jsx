import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrderMine } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Table from '../../components/Table';
import './listPages.css';

export default function OrderHistoryPage(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();

  const customerTableHead = ['UNIQUE ID', 'DATE', 'TOTAL', 'PAID', 'DELIVERED', 'ACTIONS']

  const renderHead = (order, index) => <th key={index}>{order}</th>

  const renderBody = (order, index) => (
    <tr key={index}>
      <td className="table__data" data-label="UNIQUE ID">{order._id}</td>
      <td className="table__data" data-label="DATE">{order.createdAt.substring(0, 10)}</td>
      <td className="table__data" data-label="TOTAL">{order.totalPrice.toFixed(2)}</td>
      <td className="table__data" data-label="PAID">{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
      <td className="table__data" data-label="DELIVERED">
        {order.isDelivered
          ? order.deliveredAt.substring(0, 10)
          : 'No'}
      </td>
      <td className="table__data" data-label="ACTIONS">
        <button type="button" className="list__small_btn"
          onClick={() => { props.history.push(`/order/${order._id}`);
          }}
        >Details
        </button>
      </td>
    </tr>
)

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div className="list__container">
      <Link to='/'>
            <button type="button" className="btn"> Go back</button>
      </Link> 
      <h1 className="list__title">Order History</h1>
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
