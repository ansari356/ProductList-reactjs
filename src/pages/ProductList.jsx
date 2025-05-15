import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

import axiosInstance from "../apis/config";
import { useNavigate } from "react-router-dom";
import '../styles/productlist.css';
// ProductsList Component

  // ProductsList Component
const ProductsList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;
  const navigate = useNavigate();



  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const skip = (page - 1) * limit;
        
  //       const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  //       if (!response.ok) throw new Error('Failed to fetch products');
  //       const data = await response.json();
  //       setProducts(data.products);
  //       setTotalPages(Math.ceil(data.total / limit));
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, [page]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const skip = (page - 1) * limit;

      const response = await axiosInstance.get('/products', {
        params: {
          limit: limit,
          skip: skip,
        },
      });

      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.total / limit));
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [page]);

  const handleViewProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="products-container">
      <h1 className="products-heading">Our Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <div className="product-item" key={product.id}>
            <ProductCard 
              product={product} 
              onAddToCart={addToCart} 
              onViewDetails={() => handleViewProduct(product.id)}
            />
          </div>
        ))}
      </div>
      
      <div className="pagination">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`pagination-button ${page === 1 ? 'disabled' : ''}`}
        >
          Previous
        </button>
        <div className="page-info">
          Page {page} of {totalPages}
        </div>
        <button 
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={`pagination-button ${page === totalPages ? 'disabled' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default ProductsList;
