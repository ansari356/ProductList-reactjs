import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../apis/config";
import "../styles/productdetails.css";

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          navigate('/not-found');
        } else {
          setError(err.message || 'Failed to fetch product details');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductDetails();
  }, [id, navigate]);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  if (loading) return <div className="text-center">Loading product details...</div>;
  if (error) return <div className="text-center error">Error: {error}</div>;
  if (!product) return <div className="text-center">Product not found</div>;

  return (
    <div className="product-details-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Products
      </button>

      <div className="product-details-content">
        <div className="product-images">
          <div className="main-image">
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div className="thumbnail-grid">
            {product.images.slice(0, 4).map((img, i) => (
              <div className="thumb-wrapper" key={i}>
                <img src={img} alt={`${product.title} ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.title}</h1>
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`star ${i < Math.round(product.rating) ? 'filled' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="rating-count">({product.rating})</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-pricing">
            <span className="price">${product.price}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="old-price">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
                <span className="discount">{product.discountPercentage.toFixed(0)}% OFF</span>
              </>
            )}
          </div>

          <div className={`stock-status ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
          </div>

          <div className="quantity-control">
            <span>Quantity:</span>
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>

          <div className="action-buttons">
            <button
              onClick={() => addToCart({ ...product, quantity })}
              className="btn add-to-cart"
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>
            <button className="btn buy-now">Buy Now</button>
          </div>

          <div className="product-meta">
            <div className="meta-tag">Category: {product.category}</div>
            <div className="meta-tag">Brand: {product.brand}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
