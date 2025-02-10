import React, { useState } from 'react';
import '../styles/manageProducts.scss';

interface ManageProductCardProps {
  product: any;
  onUpdate: (id: string, updatedProduct: any) => void;
  onDelete: (id: string) => void;
}

const ManageProductCard: React.FC<ManageProductCardProps> = ({ product, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({ name: product.name, price: product.price });

  const handleSave = () => {
    onUpdate(product.id, updatedProduct);
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
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span>{product.name} - ${product.price}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(product.id)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default ManageProductCard;