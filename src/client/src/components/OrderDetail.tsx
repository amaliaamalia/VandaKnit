import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../app/store';
import { fetchOrderById, submitOrder, selectOrder, selectOrderLoading, selectOrderError } from '../features/orders/OrderSlice';
import '../styles/orderDetail.scss';

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const dispatch = useAppDispatch();
  const order = useSelector(selectOrder);
  const loading = useSelector(selectOrderLoading);
  const error = useSelector(selectOrderError);

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [payment, setPayment] = useState({
    paymentMethod: '',
    transactionId: '',
  });

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const handleSubmitOrder = () => {
    if (order) {
      const submitOrderRequest = {
        orderId: order.id,
        shippingAddress,
        payment,
      };
      dispatch(submitOrder(submitOrderRequest));
    }
  };

  return (
    <div className="container order-detail">
      <h1>Order Detail</h1>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        order && (
          <>
            <h2>Order #{order.id}</h2>
            <p>Status: {order.status}</p>
            <p>Total: ${order.total}</p>
            <h3>Order Items</h3>
            <ul>
              {order.orderItems.map(item => (
                <li key={item.productId}>
                  {item.product.name} - ${item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            {order.status === 'Pending' && (
              <div className="submit-order">
                <h3>Submit Order</h3>
                <div className="form-group">
                  <label>Street</label>
                  <input
                    type="text"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <input
                    type="text"
                    value={payment.paymentMethod}
                    onChange={(e) => setPayment({ ...payment, paymentMethod: e.target.value })}
                  />
                </div>
                <button onClick={handleSubmitOrder} disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            )}
          </>
        )
      )}
    </div>
  );
};

export default OrderDetail;