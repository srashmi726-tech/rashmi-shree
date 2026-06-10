import { Navigate, Routes, Route } from 'react-router-dom';

import Login from '../pages/auth/Login';
import Home from '../pages/buyer/Home';
import Shop from '../pages/buyer/Shop';
import Cart from '../pages/buyer/Cart';
import Wishlist from '../pages/buyer/Wishlist';
import Orders from '../pages/buyer/Orders';
import Settings from '../pages/buyer/Settings';
import Dashboard from '../pages/seller/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';
import NotFound from '../pages/common/NotFound';
import { getStoredSession } from '../services/auth';

function PrivateRoute({ children }) {
  const session = getStoredSession();

  return session?.ok ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/shop" element={<PrivateRoute><Shop /></PrivateRoute>} />
      <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
      <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
      <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      <Route path="/seller" element={<Dashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
