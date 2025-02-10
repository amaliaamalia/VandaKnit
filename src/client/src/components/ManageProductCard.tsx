import React, { useState } from 'react';
import { Product } from '../types/Product';
import { Category } from '../types/Category';
import '../styles/manageProducts.scss';

interface ManageProductCardProps {
  product: Product;
  categories: Category[];
  onUpdate: (id: string, updatedProduct: Product) => void;
  onDelete: (id: string) => void;
}

const ManageProductCard: React.FC<ManageProductCardProps> = ({ product, categories, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    inventory: product.inventory,
    categoryId: product.categoryId,
  });

  const handleSave = () => {
    onUpdate(product.id, { ...product, ...updatedProduct });
    setIsEditing(false);
  };

  return (
    <li className="manage-product-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedProduct.name}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
          />
          <input
            type="number"
            value={updatedProduct.price}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: parseFloat(e.target.value) })}
          />
          <input
            type="text"
            value={updatedProduct.description}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
          />
          <input
            type="number"
            value={updatedProduct.inventory}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, inventory: parseInt(e.target.value) })}
          />
          <select
            value={updatedProduct.categoryId}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, categoryId: e.target.value })}
          >
            <option value="">No category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="action-buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="product-info">
            <span>{product.name} - ${product.price} - {product.description} - Inventory: {product.inventory} - Category: {categories.find(c => c.id === product.categoryId)?.name ?? 'No category'}</span>
          </div>
          <div className="action-buttons">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(product.id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
};

export default ManageProductCard;