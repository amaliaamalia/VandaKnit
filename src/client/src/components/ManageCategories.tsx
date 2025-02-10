import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../app/store';
import { createCategory, deleteCategory, fetchCategories, updateCategory } from '../features/admin/AdminCatalogSlice';

const ManageCategories = () => {
    const dispatch = useAppDispatch();
    const { categories, loading, error } = useSelector((state: RootState) => state.adminCatalog);
    const [newCategory, setNewCategory] = useState({ name: '' });

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCreate = () => {
        dispatch(createCategory(newCategory));
        setNewCategory({ name: '' });
    };

    const handleUpdate = (id: string) => {
        dispatch(updateCategory({ id, category: newCategory }));
        setNewCategory({ name: '' });
    };

    const handleDelete = (id: string) => {
        dispatch(deleteCategory(id));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Manage Categories</h1>
            <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Category Name"
            />
            <button onClick={handleCreate}>Create Category</button>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.name}
                        <button onClick={() => handleUpdate(category.id)}>Update</button>
                        <button onClick={() => handleDelete(category.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCategories;