import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../../actions/orderActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Table from '../../components/table/Table';

export default function OrderHistoryPage(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();

  const customerTableHead = ['ID', 'DATE', 'TOTAL', 'PAID', 'DELIVERED', 'ACTIONS']

  const renderHead = (order, index) => <th key={index}>{order}</th>

  const renderBody = (order, index) => (
    <tr key={index}>
      <td>{order._id}</td>
      <td>{order.createdAt.substring(0, 10)}</td>
      <td>{order.totalPrice.toFixed(2)}</td>
      <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
      <td>
        {order.isDelivered
          ? order.deliveredAt.substring(0, 10)
          : 'No'}
      </td>
      <td>
        <button
          type="button"
          className="small"
          onClick={() => {
            props.history.push(`/order/${order._id}`);
          }}
        >
          Details
        </button>
      </td>
    </tr>
)

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div>
      <h1>Order History</h1>
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