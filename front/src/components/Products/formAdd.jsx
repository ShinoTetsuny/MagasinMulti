import { useState, useEffect } from "react";
import { getAllCategory, createProducts } from "../../lib/service";

function FormAddProducts() {
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        name: "",
        owner: localStorage.getItem("token"),
        description: "",
        price: 0,
        stock: 0,
        category: "",
    });

    // Fonction pour charger les catégories
    const handleCategory = async () => {
        try {
            const resp = await getAllCategory();
            console.log(resp);
            setCategories(resp.data);
        } catch (error) {
            console.error("Erreur lors du chargement des catégories", error);
        }
    };

    // Fonction pour gérer les changements dans les champs du formulaire
    const handleChangeProduct = (e) => {
        const { name, value } = e.target;

        // Conversion en nombre pour les champs stock et price
        if (name === "price" || name === "stock") {
            setProduct({
                ...product,
                [name]: value ? Number(value) : 0,  // Convertir ou remettre à 0 si vide
            });
        } else {
            setProduct({
                ...product,
                [name]: value,
            });
        }
    };

    // Fonction pour soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Convertir stock et price en nombre si ce n'est pas déjà fait
        const validatedProduct = {
            ...product,
            price: Number(product.price),
            stock: Number(product.stock),
        };
    
        console.log("Produit validé avant soumission : ", validatedProduct);
        
        try {
            const resp = await createProducts(validatedProduct);
            console.log("Produit créé :", resp);
            // Réinitialiser le formulaire ou donner un retour utilisateur ici
        } catch (error) {
            console.error("Erreur lors de la création du produit", error);
        }
    };
    

    useEffect(() => {
        handleCategory();
    }, []);

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
            <div className="mb-4">
                <label htmlFor="productName" className="block text-gray-700 font-bold">
                    Product Name
                </label>
                <input
                    type="text"
                    id="productName"
                    name="name"
                    value={product.name}
                    onChange={handleChangeProduct}
                    className="w-full mt-2 p-2 border rounded"
                    placeholder="Enter product name"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold">
                    Product description
                </label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChangeProduct}
                    className="w-full mt-2 p-2 border rounded"
                    placeholder="Enter product description"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 font-bold">
                    Product Price
                </label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChangeProduct}
                    id="price"
                    className="w-full mt-2 p-2 border rounded"
                    placeholder="Enter product price"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="stock" className="block text-gray-700 font-bold">
                    Product Stock
                </label>
                <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChangeProduct}
                    id="stock"
                    className="w-full mt-2 p-2 border rounded"
                    placeholder="Enter product stock"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-bold">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={handleChangeProduct}
                    className="w-full mt-2 p-2 border rounded"
                >
                    <option value="">Select a category</option>
                    {categories && categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Add Product
            </button>
        </form>
    );
}

export default FormAddProducts;
