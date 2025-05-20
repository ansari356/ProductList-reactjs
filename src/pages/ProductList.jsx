import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

import axiosInstance from "../apis/config";
import { useNavigate } from "react-router-dom";
import '../styles/productlist.css';

  // ProductsList Component
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // mean we are initializing the loading state to true 
  // and we are setting the loading state to false when the data is fetched
  // and we are using the loading state to show the loading spinner
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
      // mean we are calculating the skip value based on the current page and limit
      // and we are using the skip value to fetch the products from the API
      // and we are using the limit value to fetch the products from the API
      // and we are using the page value to fetch the products from the API

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
