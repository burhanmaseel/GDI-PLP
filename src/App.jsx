import { useState } from 'react';
import { useProductList } from './hooks/useProductList';
import './App.css';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';

function App() {
  const [page, setPage] = useState(1);

  const isCachedPage = page === 1;
  const limit = 16;

  const { products, total, loading, error } = useProductList(page, limit);

  let totalPages = Math.ceil(total / limit) || 1;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <header>
        <h1>GDI Dummy Products PLP</h1>

        <div className={`cache-badge ${isCachedPage ? 'visible' : ''}`}>
          <span className="cache-badge-text">Cached Page</span>
        </div>
      </header>

      <main className="app-content">
        <ProductList
          products={products || []}
          loading={loading}
          error={error}
        />
      </main>

      <footer className="app-footer">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          loading={loading}
          hasPrevious={page > 1}
          hasNext={page < totalPages}
        />
      </footer>
    </div>
  );
};

export default App;
