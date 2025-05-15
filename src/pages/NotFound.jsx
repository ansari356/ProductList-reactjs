import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <button 
        onClick={() => navigate('/')}
        className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
      >
        Go Back Home
      </button>
    </div>
  );
};


