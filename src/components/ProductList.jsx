import ProductCard from './ProductCard'

/**
 * Product List component to display a list of products
 * @param {object} props
 * @param {Array} props.products - Array of product objects to display
 * @param {boolean} props.loading - Indicates if the products are currently loading
 * @param {string|null} props.error - Error message if there was an error loading products
 */
const ProductList = ({ products, loading, error }) => {
  if (loading) {
    return <div className="product-list loading">Products Loading!</div>;
  }

  if (error) {
    return <div className="product-list error">Error loading products: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="product-list empty">No products found!</div>;
  }

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
