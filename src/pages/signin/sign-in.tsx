import { useState } from "react";
import api from "../../services/api";

interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  age: number | "";
  password: string;
}

const SignIn = () => {
  const [formData, setFormData] = useState<IRegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? (value === "" ? "" : Number(value)) : value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = "Primeiro nome é obrigatório.";
    if (!formData.lastName.trim()) errors.lastName = "Sobrenome é obrigatório.";
    if (!formData.email.trim()) errors.email = "Email é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email inválido.";
    if (formData.age === "") errors.age = "Idade é obrigatória.";
    else if (formData.age <= 0) errors.age = "Idade deve ser maior que zero.";
    if (!formData.password) errors.password = "Senha é obrigatória.";
    else if (formData.password.length < 6) errors.password = "Senha deve ter ao menos 6 caracteres.";

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setSuccessMessage(null);

    if (!validate()) {
      setGeneralError("Por favor, corrija os erros acima antes de continuar.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/user/register", formData);

      setSuccessMessage("Cadastro realizado com sucesso! Agora você pode fazer login.");
      setFormData({ firstName: "", lastName: "", email: "", age: "", password: "" });
      setFormErrors({});
    } catch (err) {
      setGeneralError("Erro ao cadastrar. Por favor, tente novamente mais tarde.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-gray-100">
      <section className="bg-[#1e1e2f] border border-[#2c2c3f] rounded-3xl shadow-lg max-w-md w-full p-8">
        <h1 className="text-3xl font-semibold text-center mb-6 text-[#e0e0ff]">
          Criar Conta
        </h1>

        {generalError && (
          <p
            role="alert"
            className="mb-4 text-center text-red-500 font-medium"
          >
            {generalError}
          </p>
        )}

        {successMessage && (
          <p
            role="status"
            className="mb-4 text-center text-green-400 font-medium"
          >
            {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Primeiro Nome */}
          <div className="mb-5">
            <label
              htmlFor="firstName"
              className="block mb-1 font-semibold text-gray-300"
            >
              Primeiro Nome <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleChange}
              aria-invalid={!!formErrors.firstName}
              aria-describedby="firstName-error"
              className={`w-full rounded-lg bg-[#2c2c3f] border px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7065f0] ${
                formErrors.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-transparent"
              }`}
              placeholder="Digite seu primeiro nome"
            />
            {formErrors.firstName && (
              <p
                id="firstName-error"
                className="mt-1 text-red-500 text-sm"
                role="alert"
              >
                {formErrors.firstName}
              </p>
            )}
          </div>

          {/* Sobrenome */}
          <div className="mb-5">
            <label
              htmlFor="lastName"
              className="block mb-1 font-semibold text-gray-300"
            >
              Sobrenome <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
              aria-invalid={!!formErrors.lastName}
              aria-describedby="lastName-error"
              className={`w-full rounded-lg bg-[#2c2c3f] border px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7065f0] ${
                formErrors.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-transparent"
              }`}
              placeholder="Digite seu sobrenome"
            />
            {formErrors.lastName && (
              <p
                id="lastName-error"
                className="mt-1 text-red-500 text-sm"
                role="alert"
              >
                {formErrors.lastName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-gray-300"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!formErrors.email}
              aria-describedby="email-error"
              className={`w-full rounded-lg bg-[#2c2c3f] border px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7065f0] ${
                formErrors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-transparent"
              }`}
              placeholder="Digite seu email"
            />
            {formErrors.email && (
              <p
                id="email-error"
                className="mt-1 text-red-500 text-sm"
                role="alert"
              >
                {formErrors.email}
              </p>
            )}
          </div>

          {/* Idade */}
          <div className="mb-5">
            <label
              htmlFor="age"
              className="block mb-1 font-semibold text-gray-300"
            >
              Idade <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min={1}
              max={120}
              value={formData.age === "" ? "" : formData.age}
              onChange={handleChange}
              aria-invalid={!!formErrors.age}
              aria-describedby="age-error"
              className={`w-full rounded-lg bg-[#2c2c3f] border px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7065f0] ${
                formErrors.age
                  ? "border-red-500 focus:ring-red-500"
                  : "border-transparent"
              }`}
              placeholder="Digite sua idade"
            />
            {formErrors.age && (
              <p
                id="age-error"
                className="mt-1 text-red-500 text-sm"
                role="alert"
              >
                {formErrors.age}
              </p>
            )}
          </div>

          {/* Senha */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-1 font-semibold text-gray-300"
            >
              Senha <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={!!formErrors.password}
              aria-describedby="password-error"
              className={`w-full rounded-lg bg-[#2c2c3f] border px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7065f0] ${
                formErrors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-transparent"
              }`}
              placeholder="Crie uma senha segura"
            />
            {formErrors.password && (
              <p
                id="password-error"
                className="mt-1 text-red-500 text-sm"
                role="alert"
              >
                {formErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#7065f0] py-3 font-semibold hover:bg-[#5a54d1] focus:outline-none focus:ring-4 focus:ring-[#5849c2] disabled:opacity-50 transition"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
