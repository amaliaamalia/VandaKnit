import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../app/store';
import { fetchCategories, fetchProducts, setPage, setSortField, setSortOrder } from '../features/catalog/CatalogSlice';
import ProductCard from './ProductCard';
import '../styles/catalog.scss'; // Import the catalog styles

const Catalog = () => {
  const dispatch = useAppDispatch();
  const { categories, products, loading, error, currentPage, pageSize, sortField, sortOrder } = useSelector((state: RootState) => state.catalog);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch, currentPage, sortField, sortOrder]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleSortChange = (field: string) => {
    const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSortField(field));
    dispatch(setSortOrder(newSortOrder));
  };

  return (
    <div className="catalog">
      <h1>Catalog</h1>
      <h2>Categories</h2>
      {error && <div>Error: {error}</div>}
      {!error && (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      )}
      <h2>Products</h2>
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
          {products.map((product) => (
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

export default Catalog;