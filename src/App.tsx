import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/authenticate/user",
        { email, password }
      );

      const accessToken = response.data.data.tokens.accessToken;
      const refreshToken = response.data.data.tokens.refreshToken;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setEmail("");
      setPassword("");
      alert(`Welcome ${response.data.data.user.name}!`);
    } catch (error) {
      alert("Login failed!");
      console.error(error);
    }
    // chamar a minha rota de /login
    // armazenar os tokens no local storage
  };
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center bg-slate-800">
        <form className="flex flex-col gap-4 w-[500px]" onSubmit={handleSubmit}>
          <input
            className="bg-slate-700 text-white border border-gray-500 p-2"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-slate-700 text-white border border-gray-500 p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-slate-700 text-white border border-gray-500 p-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
