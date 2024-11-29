import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { searchProducts, deleteProduct } from '../lib/service';
import DetailProduct from './DetailProduct';

const SearchProduct = ({ filterMode, predefinedFilters }) => {
    const [filters, setFilters] = useState(predefinedFilters || {});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // État pour le modal
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Décoder le token JWT pour récupérer l'utilisateur
    const getUserFromToken = () => {
        const token = localStorage.getItem('token'); // Assurez-vous que le token est bien stocké dans le localStorage
        if (!token) return null;

        try {
            const decoded = jwtDecode(token);
            console.log(decoded)
            return decoded?.id || null; // Adaptez en fonction de votre payload JWT
        } catch (error) {
            console.error('Invalid token:', error);
            return null;
        }
    };

    // Récupérer les produits
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            let currentFilters = { ...filters };

            // Si le mode est "byOwner", filtrer par le propriétaire actuel
            if (filterMode === 'byOwner') {
                const currentUser = getUserFromToken();
                if (!currentUser) {
                    setError('Aucun produit trouvé pour votre compte.');
                    setLoading(false);
                    return;
                }
                currentFilters.owner = currentUser;
            }

            const data = await searchProducts(currentFilters);
            console.log(data.data)
            setProducts(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
  
    const handleDelete = async (id) => {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    return (
        <div className="p-6">
            {/* Titre basé sur le mode */}
            <div className="mb-6">
                {filterMode !== 'byCategory' && filterMode !== 'byOwner' && (
                    <h2 className="text-xl font-bold mb-4">Tous les produits</h2>
                )}
                {filterMode === 'byCategory' && products.length > 0 && (
                    <h2 className="text-xl font-bold mb-4">Produits dans {products[0].category?.name}</h2>
                )}
                {filterMode === 'byOwner' && (
                    <h2 className="text-xl font-bold mb-4">Mes produits</h2>
                )}
            </div>

            {/* Filtres */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Filtres</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filterMode !== 'byCategory' && (
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Catégorie
                            </label>
                            <input
                                type="text"
                                id="category"
                                value={filters.category || ''}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nom du produit
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={filters.name || ''}
                            onChange={(e) => handleFilterChange('name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                            Prix minimum
                        </label>
                        <input
                            type="number"
                            id="minPrice"
                            value={filters.minPrice || ''}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                            Prix maximum
                        </label>
                        <input
                            type="number"
                            id="maxPrice"
                            value={filters.maxPrice || ''}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                <button
                    onClick={fetchProducts}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700"
                >
                    Rechercher
                </button>
            </div>

            {/* Liste des produits */}
            <div className="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading && <p className="text-center text-gray-500">Chargement...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && products.length === 0 && filterMode !== "byOwner" && (
                    <p className="text-center text-gray-500">Aucun produit trouvé.</p>
                )}
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center"
                    >
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-gray-500 mt-2">
                            Catégorie : {product.category?.name || 'N/A'}
                        </p>
                        <p className="text-gray-500 mt-2">
                            Propriétaire : {product.owner?.username || 'N/A'}
                        </p>
                        <p className="text-gray-500 mt-2">Prix : ${product.price}</p>
                        <button
                            onClick={() => openModal(product)}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Voir les détails
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <DetailProduct
                isOpen={isModalOpen}
                onClose={closeModal}
                product={selectedProduct}
            />
        </div>
    );
};

export default SearchProduct;
