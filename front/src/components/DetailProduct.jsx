import React from 'react';

const DetailProduct = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        {/* Contenu du modal */}
        <h2 className="text-xl font-bold mb-4">{product.name}</h2>
        <div className="text-gray-600 space-y-2">
          <p>
            <span className="font-semibold">Catégorie :</span>{' '}
            {product.category?.name || 'Non spécifiée'}
          </p>
          <p>
            <span className="font-semibold">Propriétaire :</span>{' '}
            {product.owner?.username || 'Inconnu'}
          </p>
          <p>
            <span className="font-semibold">Prix :</span> ${product.price}
          </p>
          <p>
            <span className="font-semibold">Description :</span>{' '}
            {product.description || 'Aucune description disponible.'}
          </p>
        </div>

        {/* Bouton pour fermer */}
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default DetailProduct;
