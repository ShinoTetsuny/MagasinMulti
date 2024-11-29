import "./App.css";
import { UserPen, User } from "lucide-react";
import {NavLink} from "react-router-dom"
function App() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <section className="flex min-h-screen gap-10">
        <div className="flex w-1/2 justify-center items-center">
          <NavLink to={"/admin"} className="shadow-md w-20 h-20 rounded-md flex flex-col gap-2 justify-center items-center hover:bg-slate-50 cursor-pointer">
            <UserPen size={40} color="black" />
            <span>Admin</span>
          </NavLink>
        </div>
        <div className="flex w-1/2 justify-center items-center">
          <NavLink to={"/user"} className="shadow-md w-20 h-20 rounded-md flex flex-col gap-2 justify-center items-center hover:bg-slate-50 cursor-pointer">
            <User size={40} color="black" />
            <span>User</span>
          </NavLink>
        </div>
      </section>
    </main>
  );
}

export default App;
