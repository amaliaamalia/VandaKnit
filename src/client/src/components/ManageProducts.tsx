import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../app/store';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../features/admin/AdminCatalogSlice';

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
        <div>
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
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => handleUpdate(product.id)}>Update</button>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageProducts;