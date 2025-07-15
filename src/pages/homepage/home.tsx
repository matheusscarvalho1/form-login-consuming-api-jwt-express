import { useNavigate } from "react-router";

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
      <div className="max-w-md w-full bg-[#1e1e2f] rounded-2xl shadow-xl p-10 flex flex-col gap-8 border border-[#2c2c3f]">
        <h1 className="text-4xl font-semibold text-[#7065f0] text-center">
          Sejam bem vindos a Homepage!
        </h1>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleLogin}
            className="cursor-pointer rounded-md px-6 py-3 font-medium bg-[#7065f0] hover:bg-[#5d52dc] text-white transition"
          >
            Já possui cadastro? Acesse agora!
          </button>
          <button
            onClick={handleRegister}
            className="cursor-pointer rounded-md px-6 py-3 font-medium bg-[#55557d] hover:bg-[#44446a] text-white transition"
          >
            Ainda não possui cadastro? Crie um agora mesmo!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
