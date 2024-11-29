import { useEffect, useState } from "react";
import Category from "../components/Category/category";
import { getAllCategory } from "../lib/service";
import FormCat from "../components/Category/formAdd";
import SearchProduct from "../components/SearchProduct";

function UserDashBoard() {
  const [activeTab, setActiveTab] = useState("products"); // Onglet actif
  const [categories, setCategories] = useState([]);
  const handleCategory = async () => {
    try {
      const resp = await getAllCategory();
      console.log(resp);
      setCategories(resp.data);
    } catch (error) {
      return error;
    }
  };
  const handleNewCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };
  const handleDeleteCategory = (id) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category._id !== id)
    );
  };
  useEffect(() => {
    handleCategory();
  }, []);
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <nav>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "products" ? "bg-blue-800" : "hover:bg-blue-700"
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
            <button
              className={`ml-2 px-4 py-2 rounded ${
                activeTab === "addProduct" ? "bg-blue-800" : "hover:bg-blue-700"
              }`}
              onClick={() => setActiveTab("addProduct")}
            >
              Add Product
            </button>
            <button
              className={`ml-2 px-4 py-2 rounded ${
                activeTab === "categories" ? "bg-blue-800" : "hover:bg-blue-700"
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
          <SearchProduct filterMode={""}/>
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
                {categories &&
                  categories.map((category) => (
                    <Category
                      key={category._id}
                      data={category}
                      onDeleteCategory={handleDeleteCategory}
                    />
                  ))}
              </ul>
              <FormCat onNewCategory={handleNewCategory} />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default UserDashBoard;
