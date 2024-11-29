import Register from "../components/Register";
import Login from "../components/Login";
function Admin() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <section className="flex justify-between min-h-screen w-full">
        <div className="w-1/2 min-h-screen flex flex-col justify-center items-center  bg-slate-100">
        <h3 className="text-3xl my-4">S'inscrire</h3>
        <Register />
        </div>
        <div className="flex w-1/2 flex-col min-h-screen justify-center items-center">
          <h3 className="text-3xl my-4">Se connecter</h3>
          <Login />
        </div>
      </section>
    </main>
  );
}

export default Admin;
