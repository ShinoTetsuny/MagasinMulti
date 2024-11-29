import axios from "axios";
import { jwtDecode } from "jwt-decode";
const api = axios.create({
  baseURL: "http://localhost:5000",
});
export async function register(data) {
  try {
    const resp = await api.post("/auth/register", {
      username: data.username,
      email: data.email,
      password: data.password,
    });
    return resp;
  } catch (error) {
    return error;
  }
}

export async function login(data) {
  try {
    const resp = await api.post("/auth/login", {
      email: data.email,
      password: data.password,
    });
    return resp;
  } catch (error) {
    return error;
  }
}

export async function getAllUsers() {
  try {
    const resp = api.get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return resp;
  } catch (error) {
    return error;
  }
}

export async function deleteUser(id) {
  try {
    const resp = await api.delete(`user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return resp;
  } catch (error) {
    return error;
  }
}

export async function updateUser(id, data) {
  try {
    const resp = await api.put(
      `user/${id}`,
      {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
}
export async function createCategory(data) {
  try {
    const resp = await api.post(
      "/category",
      {
        name: data.name,
        description: data.description,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
}
export async function createProducts(data) {
  console.log(data.stock)
  const token = data.owner
  if(token){
    const decoded = jwtDecode(token);
    data.owner = decoded.id
  }
  try {
    const resp = await api.post(
      "/product",
      {
        owner: data.owner,
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: data.category,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
}


export async function getAllCategory(){
  try {
    const resp = await api.get('/category', {
      headers : {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    return resp
  } catch (error) {
    return error
  }
}

export async function deleteCategory(id){
  try {
    const resp = await api.delete(`/category/${id}`, {
      headers : {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    return resp
  } catch (error) {
    return error
  }
}