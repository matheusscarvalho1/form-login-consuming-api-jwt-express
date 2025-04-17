import axios from "axios";
import { useEffect, useState } from "react";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

const Profile = () => {
  const [user, setUser] = useState<IUser | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("Token não encontrado. Faça login novamente.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<{ message: string; data: IUser }>(
          `http://localhost:8080/api/v1/user/get/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.data);
      } catch (error) {
        setError("Erro ao buscar informações do usuário.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
        Carregando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-red-400 font-medium text-center px-4">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 px-4">
      <h1 className="text-3xl font-bold text-[#e0e0ff] mb-6">
        Bem-vindo, {user?.firstName}
      </h1>

      <div className="bg-[#1e1e2f] border border-[#2c2c3f] shadow-lg rounded-2xl w-full max-w-md p-8 space-y-4 text-sm sm:text-base">
        <h2 className="font-semibold text-[#7065f0] text-2xl text-center">
          Dados do usuário
        </h2>
        <p className="text-[#bfbfd6]">
          <span className="font-semibold text-[#7065f0]">Nome:</span>{" "}
          {user?.firstName}
        </p>
        <p className="text-[#bfbfd6]">
          <span className="font-semibold text-[#7065f0]">Sobrenome:</span>{" "}
          {user?.lastName}
        </p>
        <p className="text-[#bfbfd6]">
          <span className="font-semibold text-[#7065f0]">Email:</span>{" "}
          {user?.email}
        </p>
        <p className="text-[#bfbfd6]">
          <span className="font-semibold text-[#7065f0]">Idade:</span>{" "}
          {user?.age}
        </p>
      </div>
    </div>
  );
};

export default Profile;
