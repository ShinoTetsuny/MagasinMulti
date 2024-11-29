import { useNavigate } from "react-router-dom";
import { login } from "../lib/service";
import { useState } from "react";
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await login(user); // Appel à votre service d'inscription
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
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        className="p-2 rounded-md border"
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
        className="p-2 rounded-md border"
      />
      {message && <p className="text-green-500">{message}</p>}
      <button className="bg-blue-500 p-2 text-white rounded-md my-4">
        Se connecter
      </button>
    </form>
  );
}

export default Login;
