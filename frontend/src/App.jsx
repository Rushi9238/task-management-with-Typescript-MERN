// import React, { lazy, Suspense } from "react";
// import { Routes, Route } from "react-router-dom";
// import Loading from "./components/Loading";
// function App() {
//   return (
//     <>
//       <div className="app">
//        <Suspense fallback={<Loading/>}>
//        <h1>My Shop</h1>
//        </Suspense>
//       </div>
//     </>
//   );
// }

// export default App;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { loginSuccess } from './store/slices/authSlice';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicRoute from './components/layout/PublicRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskDashboard from './components/TaskDashboard';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    const stored = localStorage.getItem('taskmaster_auth') ? JSON.parse(localStorage.getItem('taskmaster_auth')) : null;
    console.log("stored",stored)
    if (stored) {
      try {
        // const parsed = JSON.parse(stored);
        dispatch(loginSuccess(stored));
      } catch (e) {
        console.log('Failed to parse stored auth data', e);
        // localStorage.removeItem('taskmaster_auth');
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public routes - redirect to dashboard if already authenticated */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } 
        />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <TaskDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          } 
        />
        
        {/* Default route */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              user?.role === 'admin' ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

// Admin Route component to check user role
const AdminRoute = ({ children }) => {
  const { user } = useSelector(state => state.auth);
  console.log("users",user)
  
  return user?.role === 'admin' ? children : <Navigate to="/dashboard" replace />;
};
