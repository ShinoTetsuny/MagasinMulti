import React, { useState, useEffect } from 'react';
import { searchProducts } from '../lib/service';

const ProductList = ({ filterMode, predefinedFilters }) => {
  // État pour les filtres
  const [filters, setFilters] = useState(predefinedFilters || {});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger les produits
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchProducts(filters);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Charger les produits à chaque changement de filtres
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  // Gérer les changements dans les filtres
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <div>
      <h1>Product List</h1>

      {/* Filtres */}
      <div className="filters">
        {filterMode !== 'byCategory' && (
          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={filters.category || ''}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            />
          </div>
        )}

        {filterMode !== 'byOwner' && (
          <div>
            <label htmlFor="owner">Owner:</label>
            <input
              type="text"
              id="owner"
              value={filters.owner || ''}
              onChange={(e) => handleFilterChange('owner', e.target.value)}
            />
          </div>
        )}

        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={filters.name || ''}
            onChange={(e) => handleFilterChange('name', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="minPrice">Min Price:</label>
          <input
            type="number"
            id="minPrice"
            value={filters.minPrice || ''}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            type="number"
            id="maxPrice"
            value={filters.maxPrice || ''}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
          />
        </div>

        <button onClick={fetchProducts}>Search</button>
      </div>

      {/* Liste des produits */}
      <div className="product-list">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {products.length === 0 && !loading && <p>No products found.</p>}
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h2>{product.name}</h2>
              <p>Category: {product.category?.name || 'N/A'}</p>
              <p>Owner: {product.owner?.username || 'N/A'}</p>
              <p>Price: ${product.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
