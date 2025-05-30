import React from 'react';
import "../styles/productcard.css";
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
const ProductCard = ( props ) => {
  const { product, onViewDetails } = props;
  
  const dispatch = useDispatch();




  return (
    <div className="product-card">
      <div className="product-image-wrapper" onClick={onViewDetails}>
        <span className={`stock-badge ${product.stock === 0 ? 'out-of-stock' : 'in-stock'}`}>
          {product.stock === 0 ? 'Out of stock' : 'In stock'}
        </span>
        <img src={product.thumbnail} alt={product.title} className="product-image" />
      </div>
      <h3 className="product-title" onClick={onViewDetails}>{product.title}</h3>
      <div className="product-rating">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`star-icon ${i < Math.round(product.rating) ? 'filled' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="rating-value">({product.rating})</span>
      </div>
      <p className="product-description">{product.description.substring(0, 60)}...</p>
      <div className="product-footer">
        <span className="product-price">${product.price}</span>
        <button 
          onClick={() => dispatch(addToCart(product))
          } 
          // why product not product.id ? 
          // because product is an object and id is a property of the object
          // and we are passing the whole object to the addToCart function
          // so we can access the id property inside the addToCart function
          // and we are not passing the id property directly
          // because we need the whole object to add to the cart
          disabled={product.stock === 0}
          className={`add-to-cart ${product.stock === 0 ? 'disabled' : ''}`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
