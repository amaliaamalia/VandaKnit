import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../app/store';
import { fetchOrders, setPage, setSortField, setSortOrder, selectOrders, selectOrderLoading, selectOrderError } from '../features/orders/OrderSlice';
import { Link } from 'react-router-dom';
import '../styles/orders.scss';

const Orders = () => {
  const dispatch = useAppDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectOrderLoading);
  const error = useSelector(selectOrderError);
  const { currentPage, sortField, sortOrder } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
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
    <div className="container orders">
      <h1>Orders</h1>
      <div className="sort-buttons">
        <button onClick={() => handleSortChange('status')}>
          Status {sortField === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => handleSortChange('total')}>
          Total {sortField === 'total' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <Link to={`/order/${order.id}`}>Order #{order.id}</Link> - Status: {order.status} - Total: ${order.total}
            </li>
          ))}
        </ul>
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

export default Orders;