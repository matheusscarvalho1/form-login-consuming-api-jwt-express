import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate("/");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 px-4 gap-6">
      <div className="text-center space-y-2">
        <h1 className="text-7xl sm:text-8xl font-bold text-[#ff6b6b] animate-pulse">
          404
        </h1>
        <p className="text-xl sm:text-2xl font-semibold text-[#e0e0ff]">
          Página não encontrada
        </p>
        <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto">
          O endereço digitado não existe ou foi removido. Verifique o link ou volte para a página inicial.
        </p>
      </div>

      <Button
        className="cursor-pointer bg-[#7065f0] hover:bg-[#5d52dc]"
        onClick={handleHomePage}
      >
        Voltar para Home
      </Button>
    </div>
  );
};

export default NotFound;
