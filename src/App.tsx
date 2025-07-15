import { useEffect, useState } from "react";
import "./App.css";
import Profile from "./components/profile";
import api from "./services/api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        await api.get("/user/get/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication failed:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoginLoading(true);

    if (!email || !password) {
      alert("Por favor, preencha o e-mail e a senha.");
      setLoginLoading(false);
      return;
    }

    try {
      const response = await api.post(
        "/authenticate/user",
        { email, password }
      );

      const tokens = response?.data?.data?.tokens;

        if (!tokens || !tokens.accessToken || !tokens.refreshToken) {
          alert("Erro: tokens não foram retornados pela API.");
          console.error("Resposta da API:", response.data);
          return;
        }

      if (tokens.accessToken && tokens.refreshToken) {
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);

        setEmail("");
        setPassword("");
        setIsAuthenticated(true);

        alert("Login realizado com sucesso!");
      } else {
        alert("Falha no login: dados inválidos.");
      }
    } catch (error) {
      alert("Erro ao realizar login.");
      console.error("Erro:", error);
    } finally {
      setLoginLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
        Carregando...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Profile />;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e1e2f] rounded-2xl shadow-xl p-10 w-[90%] max-w-md flex flex-col gap-5 border border-[#2c2c3f]"
      >
        <h2 className="text-3xl font-semibold text-[#7065f0] text-center">
          Acesse sua conta
        </h2>

        <input
          type="email"
          placeholder="E-mail"
          className="bg-[#2b2b3c] border border-[#44445a] rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7065f0]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="bg-[#2b2b3c] border border-[#44445a] rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7065f0]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loginLoading}
          className={`rounded-md px-4 py-2 font-medium transition-all duration-300 ${
            loginLoading
              ? "bg-[#55557d] text-white cursor-not-allowed"
              : "bg-[#7065f0] hover:bg-[#5d52dc] text-white"
          }`}
        >
          {loginLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default App;
