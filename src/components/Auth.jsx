// components/Auth.jsx
import React, { useState } from 'react';

const Auth = ({ onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mockUsers = [
    { name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { name: 'Test User', email: 'test@example.com', password: 'password123', role: 'user' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleLogin = () => {
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

  const handleRegister = () => {
    const existingUser = mockUsers.find((user) => user.email === email);
    if (existingUser) {
      setError('Email already in use');
    } else {
      const newUser = { name, email, password, role: 'user' };
      mockUsers.push(newUser);
      onAuthSuccess(newUser);
      onClose();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? 'Login' : 'Register'}
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
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