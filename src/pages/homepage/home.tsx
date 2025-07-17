import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/signin");
  };

  return (
    
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-6">
      <Card className="max-w-xl w-full bg-[#1e1e2f] rounded-2xl shadow-xl p-10 flex flex-col gap-8 border border-[#2c2c3f]">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-[#7065f0]">Seja bem vindo!</CardTitle>
          <CardDescription>
            Selecione uma das opções
          </CardDescription>
          <CardAction>
            <Button variant="link" className="text-[#7065f0] cursor-pointer" onClick={handleRegister}>Cadastre-se</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer bg-[#7065f0] hover:bg-[#5d52dc]" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="outline" className="w-full cursor-not-allowed text-[#7065f0]">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>

  );
};

export default HomePage;
