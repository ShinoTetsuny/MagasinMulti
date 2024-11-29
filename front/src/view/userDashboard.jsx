import { useState } from "react";

function UserDashBoard() {
  const [activeTab, setActiveTab] = useState("products"); // Onglet actif

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <nav>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "products"
                  ? "bg-blue-800"
                  : "hover:bg-blue-700"
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
            <button
              className={`ml-2 px-4 py-2 rounded ${
                activeTab === "addProduct"
                  ? "bg-blue-800"
                  : "hover:bg-blue-700"
              }`}
              onClick={() => setActiveTab("addProduct")}
            >
              Add Product
            </button>
            <button
              className={`ml-2 px-4 py-2 rounded ${
                activeTab === "categories"
                  ? "bg-blue-800"
                  : "hover:bg-blue-700"
              }`}
              onClick={() => setActiveTab("categories")}
            >
              Categories
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Produits */}
        {activeTab === "products" && (
          <section>
            <h2 className="text-xl font-bold mb-4">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Placeholder pour les produits */}
              {[1, 2, 3, 4].map((product) => (
                <div
                  key={product}
                  className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
                >
                  <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
                  <h3 className="text-lg font-bold">Product {product}</h3>
                  <p className="text-gray-500 mt-2">$20.00</p>
                  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Ajouter un produit */}
        {activeTab === "addProduct" && (
          <section>
            <h2 className="text-xl font-bold mb-4">Add a New Product</h2>
            <form className="bg-white shadow rounded-lg p-6">
              <div className="mb-4">
                <label
                  htmlFor="productName"
                  className="block text-gray-700 font-bold"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  className="w-full mt-2 p-2 border rounded"
                  placeholder="Enter product name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productPrice"
                  className="block text-gray-700 font-bold"
                >
                  Product Price
                </label>
                <input
                  type="number"
                  id="productPrice"
                  className="w-full mt-2 p-2 border rounded"
                  placeholder="Enter product price"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productCategory"
                  className="block text-gray-700 font-bold"
                >
                  Category
                </label>
                <select
                  id="productCategory"
                  className="w-full mt-2 p-2 border rounded"
                >
                  <option>Select a category</option>
                  <option>Category 1</option>
                  <option>Category 2</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Product
              </button>
            </form>
          </section>
        )}

        {/* Gérer les catégories */}
        {activeTab === "categories" && (
          <section>
            <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
            <div className="bg-white shadow rounded-lg p-6">
              <ul className="list-disc pl-4">
                <li className="mb-2 flex justify-between">
                  <span>Category 1</span>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </li>
                <li className="mb-2 flex justify-between">
                  <span>Category 2</span>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </li>
              </ul>
              <form className="mt-6">
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Add a new category"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Category
                </button>
              </form>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default UserDashBoard;
