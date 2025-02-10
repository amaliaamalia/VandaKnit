import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../app/store';
import { createProduct, deleteProduct, fetchProducts, setProductPage, updateProduct } from '../features/admin/AdminCatalogSlice';
import { fetchCategories } from '../features/catalog/CatalogSlice';
import '../styles/manageProducts.scss';
import { Product } from '../types/Product';
import ManageProductCard from './ManageProductCard';

const ManageProducts = () => {
  const dispatch = useAppDispatch();
  const { products, currentProductPage, pageSize, totalProducts } = useSelector((state: RootState) => state.adminCatalog);
  const { categories } = useSelector((state: RootState) => state.catalog);
  const [newProduct, setNewProduct] = useState<Product>({ id: '', name: '', price: 0, description: '', inventory: 0, categoryId: '' });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch, currentProductPage]);

  const handleCreate = () => {
    dispatch(createProduct(newProduct));
    setNewProduct({ id: '', name: '', price: 0, description: '', inventory: 0, categoryId: '' });
  };

  const handleUpdate = (id: string, updatedProduct: Product) => {
    dispatch(updateProduct({ id, product: updatedProduct }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setProductPage(newPage));
  };

  const totalPages = Math.ceil(totalProducts / pageSize);

  return (
    <div className="manage-products">
      <h1>Manage Products</h1>
      <input
        type="text"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        placeholder="Product Name"
      />
      <input
        type="number"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        placeholder="Product Price"
      />
      <input
        type="text"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        placeholder="Product Description"
      />
      <input
        type="number"
        value={newProduct.inventory}
        onChange={(e) => setNewProduct({ ...newProduct, inventory: parseInt(e.target.value) })}
        placeholder="Product Inventory"
      />
      <select
        value={newProduct.categoryId}
        onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
      >
        <option value="">No category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={handleCreate}>Add</button>
      <ul>
        {products && products.map((product: Product) => (
          <ManageProductCard
            key={product.id}
            product={product}
            categories={categories}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentProductPage - 1)} disabled={currentProductPage === 1}>
          Previous
        </button>
        <span>Page {currentProductPage}</span>
        <button onClick={() => handlePageChange(currentProductPage + 1)} disabled={currentProductPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageProducts;