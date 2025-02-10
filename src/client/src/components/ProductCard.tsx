import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import { addToBasket } from '../features/basket/BasketSlice';
import '../styles/product.scss';
import { useAppDispatch } from '../app/store';

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();

  const handleAddToBasket = () => {
    dispatch(addToBasket(product));
  };

  const stockStatus = product.inventory > 0 ? 'In Stock' : 'Out of Stock';
  const stockClass = product.inventory > 0 ? 'in-stock' : 'out-of-stock';

  return (
    <div className="product-card">
      <h3>
        <Link to={`/product/${product.id}`}>{product.name}</Link>
      </h3>
      <p>${product.price}</p>
      <p className={stockClass}>{stockStatus}</p>
      <button onClick={handleAddToBasket} disabled={product.inventory === 0}>Add to Basket</button>
    </div>
  );
};

export default ProductCard;