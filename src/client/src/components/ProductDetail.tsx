import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../app/store';
import { fetchProductDetail, selectProductDetail } from '../features/catalog/ProductDetailSlice';
import '../styles/productDetail.scss';
import { addToBasket } from '../features/basket/BasketSlice';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();
  const { product, loading } = useSelector(selectProductDetail);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetail(productId));
    }
  }, [dispatch, productId]);

  if (!product) {
    return loading ? null : <div className="product-not-found">Product not found</div>;
  }

  const handleAddToBasket = () => {
    dispatch(addToBasket(product));
  };

  const stockStatus = product?.inventory > 0 ? 'In Stock' : 'Out of Stock';
  const stockClass = product?.inventory > 0 ? 'in-stock' : 'out-of-stock';

  return (
    <div className="product-detail">
      {product && (
        <>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p className={stockClass}>{stockStatus}</p>
          <button onClick={handleAddToBasket} disabled={product.inventory === 0}>Add to Cart</button>
        </>
      )}
    </div>
  );
};

export default ProductDetail;