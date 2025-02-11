import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../app/store';
import { clearBasket, removeFromBasket, selectBasket } from '../features/basket/BasketSlice';
import { createOrder } from '../features/orders/OrderSlice';
import { useAuth } from '../hooks/useAuth';
import '../styles/basket.scss';
import { getUserIdFromToken } from '../utils/tokenUtils';
import { useNavigate } from 'react-router-dom';

const Basket = () => {
  const dispatch = useAppDispatch();
  const { items } = useSelector(selectBasket);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleRemoveFromBasket = (productId: string) => {
    dispatch(removeFromBasket(productId));
  };

  const handleClearBasket = () => {
    dispatch(clearBasket());
  };

  const handleCreateOrder = async () => {
    const userId = getUserIdFromToken(token);
    if (userId) {
      const createOrderRequest = {
        userId,
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      };
      const result = await dispatch(createOrder(createOrderRequest));
      if (createOrder.fulfilled.match(result)) {
        navigate('/orders');
      } else {
        setError(result.payload as string || 'Failed to create order. Please try again.');
      }
    }
  };

  return (
    <div className="container basket">
      <h1>Basket</h1>
      {error && <div className="error">{error}</div>}
      {items.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.product.id}>
              <span>{item.product.name} - ${item.product.price} x {item.quantity}</span>
              <button onClick={() => handleRemoveFromBasket(item.product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      {items.length > 0 && token && (
        <div className="basket-actions">
          <button onClick={handleClearBasket}>Clear Basket</button>
          <button onClick={handleCreateOrder}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Basket;