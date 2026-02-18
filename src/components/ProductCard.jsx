
/**
 * Product Card component to display product details
 * @param {object} props
 * @param {object} props.product - The product object containing details to display
 */
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-description">
          {product.description || ''}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
