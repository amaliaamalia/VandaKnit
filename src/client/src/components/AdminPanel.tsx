import ManageProducts from './ManageProducts';
import ManageCategories from './ManageCategories';
import '../styles/adminPanel.scss';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="admin-section">
        <ManageCategories />
      </div>
      <div className="admin-section">
        <ManageProducts />
      </div>
    </div>
  );
};

export default AdminPanel;