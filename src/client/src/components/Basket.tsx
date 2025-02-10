import { useDispatch, useSelector } from 'react-redux';
import { removeFromBasket, clearBasket, selectBasket } from '../features/basket/BasketSlice';
import '../styles/basket.scss';

const Basket = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectBasket);

  const handleRemoveFromBasket = (productId: string) => {
    dispatch(removeFromBasket(productId));
  };

  const handleClearBasket = () => {
    dispatch(clearBasket());
  };

  return (
    <div className="container basket">
      <h1>Basket</h1>
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
      {items.length > 0 && (
        <div className="basket-actions">
          <button onClick={handleClearBasket}>Clear Basket</button>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Basket;