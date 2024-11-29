function Login() {
    return (
      <form className="flex flex-col gap-2">
        <input type="text" placeholder="Username" className="p-2 rounded-md border"/>
        <input type="email" placeholder="Email" className="p-2 rounded-md border"/>
        <input type="password" placeholder="Password" className="p-2 rounded-md border"/>
        <button className="bg-blue-500 p-2 text-white rounded-md my-4">Se connecter</button>
      </form>
    );
  }
  
  export default Login;
  