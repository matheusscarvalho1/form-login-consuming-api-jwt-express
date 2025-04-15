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

        // A resposta agora está sendo tratada corretamente.
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
    return <div className="text-white text-center">Carregando...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-800 text-white">
      <h1 className="text-2xl font-bold">Bem-vindo {user?.firstName}</h1>
      <div className="flex flex-col gap-4 w-[500px] mt-5">
        <p>Nome: {user?.firstName}</p>
        <p>Sobrenome: {user?.lastName}</p>
        <p>Email: {user?.email}</p>
        <p>Idade: {user?.age}</p>
      </div>
    </div>
  );
};

export default Profile;
