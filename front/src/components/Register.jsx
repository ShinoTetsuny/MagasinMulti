import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../lib/service";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook pour rediriger

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

      // Rediriger après un court délai
      setTimeout(() => {
        navigate("/dashboard"); // Utilisation de `navigate` pour la redirection
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
