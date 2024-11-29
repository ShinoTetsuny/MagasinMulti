import { useState } from "react";
import { createCategory } from "../../lib/service";

function FormCat({ onNewCategory }) {
  const [category, setCategory] = useState({ name: "", description: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await createCategory(category); // Appel API
      setMessage("Category created successfully!");
      onNewCategory(resp.data); // Mise à jour de la liste des catégories
      setCategory({ name: "", description: "" }); // Réinitialiser le formulaire
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={category.name}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        placeholder="Add a new category"
      />
      <input
        type="text"
        name="description"
        value={category.description}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        placeholder="Add a description"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Category
      </button>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </form>
  );
}

export default FormCat;
