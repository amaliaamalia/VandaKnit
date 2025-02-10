import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../app/store';
import { fetchCategoryById, fetchProductsByCategory, setPage, setSortField, setSortOrder } from '../features/catalog/CatalogSlice';
import ProductCard from './ProductCard';
import { Product } from '../types/Product';
import '../styles/catalog.scss';

const CategoryProducts = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const dispatch = useAppDispatch();
  const { category, products, error, currentPage, sortField, sortOrder } = useSelector((state: RootState) => state.catalog);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategoryById(categoryId));
      dispatch(fetchProductsByCategory({ categoryId, page: currentPage, pageSize: 10, orderBy: sortField, sortOrder }));
    }
  }, [dispatch, categoryId, currentPage, sortField, sortOrder]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleSortChange = (field: string) => {
    const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSortField(field));
    dispatch(setSortOrder(newSortOrder));
  };

  return (
    <div className="container catalog">
      {category && <h1>{category.name}</h1>}
      <div className="sort-buttons">
        <button onClick={() => handleSortChange('name')}>
          Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => handleSortChange('price')}>
          Price {sortField === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>
      {error && <div>Error: {error}</div>}
      {!error && (
        <div className="product-list">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryProducts;