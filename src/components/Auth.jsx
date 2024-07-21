// components/Auth.jsx
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = ({ onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const mockUsers = [
    { name: 'Test User', email: 'test@example.com', password: 'password123' },
  ];

  const handleLogin = (email, password) => {
    const foundUser = mockUsers.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      onAuthSuccess(foundUser);
      onClose();
    } else {
      setError('Invalid email or password');
    }
  };

  const handleRegister = (name, email, password) => {
    const existingUser = mockUsers.find((user) => user.email === email);
    if (existingUser) {
      setError('Email already in use');
    } else {
      const newUser = { name, email, password };
      mockUsers.push(newUser);
      onAuthSuccess(newUser);
      onClose();
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? 'Login' : 'Register'}
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {isLogin ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <RegisterForm onRegister={handleRegister} />
      )}
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:underline"
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default Auth;