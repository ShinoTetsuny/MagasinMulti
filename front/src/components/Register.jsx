import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importer `useLocation`
import { register } from "../lib/service";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook pour rediriger
  const location = useLocation(); // Hook pour obtenir l'URL actuelle

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await register(user); // Appel à votre service d'inscription
      setMessage(resp.data.message);
      localStorage.setItem("token", resp.data.token);

      // Déterminer la redirection en fonction de l'URL actuelle
      setTimeout(() => {
        if (location.pathname.includes("admin")) {
          navigate("/dashboard"); // Redirige vers le tableau de bord administrateur
        } else {
          navigate("/user-dashboard"); // Redirige vers le tableau de bord utilisateur
        }
      }, 1000);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        className="p-2 rounded-md"
        name="username"
        value={user.username}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        className="p-2 rounded-md"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="p-2 rounded-md"
        value={user.password}
        onChange={handleChange}
      />
      {message && <p className="text-green-600 text-center">{message}</p>}
      <button className="bg-blue-500 p-2 text-white rounded-md my-4">
        S'inscrire
      </button>
    </form>
  );
}

export default Register;
