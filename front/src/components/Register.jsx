function Register() {
  return (
    <form className="flex flex-col gap-2">
      <input type="text" placeholder="Username" className="p-2 rounded-md"/>
      <input type="email" placeholder="Email" className="p-2 rounded-md"/>
      <input type="password" placeholder="Password" className="p-2 rounded-md"/>
      <button className="bg-blue-500 p-2 text-white rounded-md my-4">S'inscrire</button>
    </form>
  );
}

export default Register;
