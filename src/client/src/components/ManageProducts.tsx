import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../app/store';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../features/admin/AdminCatalogSlice';
import ManageProductCard from './ManageProductCard';
import '../styles/manageProducts.scss';

const ManageProducts = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useSelector((state: RootState) => state.adminCatalog);
    const [newProduct, setNewProduct] = useState({ name: '', price: 0 });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleCreate = () => {
        dispatch(createProduct(newProduct));
        setNewProduct({ name: '', price: 0 });
    };

    const handleUpdate = (id: string) => {
        dispatch(updateProduct({ id, product: newProduct }));
        setNewProduct({ name: '', price: 0 });
    };

    const handleDelete = (id: string) => {
        dispatch(deleteProduct(id));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
            <button onClick={handleCreate}>Create Product</button>
            <ul>
                {products.map((product) => (
                    <ManageProductCard
                        key={product.id}
                        product={product}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ManageProducts;