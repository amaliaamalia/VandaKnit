import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../app/store';
import { createCategory, deleteCategory, fetchCategories, setCategoryPage, updateCategory } from '../features/admin/AdminCatalogSlice';
import '../styles/manageCategories.scss';
import { Category } from '../types/Category';
import ManageCategoryCard from './ManageCategoryCard';

const ManageCategories = () => {
  const dispatch = useAppDispatch();
  const { categories, currentCategoryPage, totalCategories, pageSize } = useSelector((state: RootState) => state.adminCatalog);
  const [newCategory, setNewCategory] = useState<Category>({ id: '', name: '' });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, currentCategoryPage]);

  const handleCreate = () => {
    dispatch(createCategory(newCategory));
    setNewCategory({ id: '', name: '' });
  };

  const handleUpdate = (id: string, updatedCategory: Category) => {
    dispatch(updateCategory({ id, category: updatedCategory }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCategory(id));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setCategoryPage(newPage));
  };

  const totalPages = Math.ceil(totalCategories / pageSize);

  return (
    <div className="manage-categories">
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
          <ManageCategoryCard
            key={category.id}
            category={category}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentCategoryPage - 1)} disabled={currentCategoryPage === 1}>
          Previous
        </button>
        <span>Page {currentCategoryPage}</span>
        <button onClick={() => handlePageChange(currentCategoryPage + 1)} disabled={currentCategoryPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageCategories;