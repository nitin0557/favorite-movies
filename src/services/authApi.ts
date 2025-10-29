const BASE_URL = "https://movies-backend-vert.vercel.app/api/auth";

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("name", data.token);
      localStorage.setItem("role", data.role || "User");
    }

    return data;
  } catch (err: any) {
    console.error("Login error:", err);
    throw new Error(err.message || "Unable to login");
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return res.json();
  } catch (err: any) {
    console.error("Register error:", err);
    throw new Error(err.message || "Unable to register");
  }
};
