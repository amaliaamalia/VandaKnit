import React, { useState } from 'react';
import { Category } from '../types/Category';
import '../styles/manageCategories.scss';

interface ManageCategoryCardProps {
  category: Category;
  onUpdate: (id: string, updatedCategory: Category) => void;
  onDelete: (id: string) => void;
}

const ManageCategoryCard: React.FC<ManageCategoryCardProps> = ({ category, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState({
    name: category.name,
  });

  const handleSave = () => {
    onUpdate(category.id, { ...category, ...updatedCategory });
    setIsEditing(false);
  };

  return (
    <li className="manage-category-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedCategory.name}
            onChange={(e) => setUpdatedCategory({ ...updatedCategory, name: e.target.value })}
          />
          <div className="action-buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="category-info">
            <span>{category.name}</span>
          </div>
          <div className="action-buttons">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(category.id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
};

export default ManageCategoryCard;