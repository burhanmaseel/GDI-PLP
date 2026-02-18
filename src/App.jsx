import { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';

function App() {
  const [page, setPage] = useState(1);

  const isCachedPage = page === 1;

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
          products={[
            { name: 'Product 1', price: 19.99, image: '' },
            { name: 'Product 2', price: 29.99, image: '' },
            { name: 'Product 3', price: 39.99, image: '' },
            { name: 'Product 4', price: 49.99, image: '' },
            { name: 'Product 5', price: 59.99, image: '' },
          ]}
          loading={false}
          error={null}
        />
      </main>

      <footer className="app-footer">
        <Pagination
          currentPage={page}
          totalPages={5}
          onPageChange={handlePageChange}
          loading={false}
          hasPrevious={page > 1}
          hasNext={page < 5}
        />
      </footer>
    </div>
  );
};

export default App;
