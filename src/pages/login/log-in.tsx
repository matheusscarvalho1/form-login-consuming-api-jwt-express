"use client"

import { useEffect, useState } from "react";
import Profile from "../profile/profile";
import api from "../../services/api";
import { useNavigate } from "react-router";
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProgressLoading from "../components/loading/loading";

function LogIn() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formSchema = z.object({
      email: z.email({
        error: 'É obrigatório inserir seu e-mail válido'
      }),
      password: z.string().min(6, {
        error: "A senha deve ter no mínimo 6 caracteres"
      })
    });

    type FormSchema = z.infer<typeof formSchema>

    const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues:{
        email: "",
        password: "",
      }
    })

  const handleHomePage = () => {
    navigate("/");

  }

   const handleSignIn = () => {
    navigate("/signin");

  }

  useEffect(() => {
    const init = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        await api.get("/api/v1/user/get/profile", {
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


  if (loading) {
    return (
      <ProgressLoading />
    );
  }

      const onSubmit = async (data: FormSchema) => {
        setLoading(true);

        try {
          const response = await api.post("/authenticate/user", data);

          const { accessToken, refreshToken } = response.data.data.tokens
        

          if(!accessToken && refreshToken) {
            toast.error("Tokens não retornado pela API.")
          }

          localStorage.setItem("accessToken", accessToken)
          localStorage.setItem("refreshToken", refreshToken)

          toast.success(`${response.data.message}`);
          setIsAuthenticated(true);
     
          
        } catch (err: any) {

          const status = err?.response?.status;
          const message = err?.response?.data?.message;

          if (status === 400) {
            setLoading(false);
            return toast.error(message || "Erro nos dados enviados. Verifique os campos, caso não.");
          
          } else if (status === 401) {
            setLoading(false);
            return toast.error(message || "Credenciais inválidas, por favor, verifique novamente!");
          } else {
            setLoading(false);
            return toast.error("Erro inesperado ao criar usuário.");
          }

        } finally {
          setLoading(false);
        }

      }

       if (isAuthenticated) {
          return <Profile />;
        }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <section className="bg-[#1e1e2f] border border-[#2c2c3f] rounded-3xl shadow-lg max-w-md w-full p-8">
        <h1 className="text-2xl font-semibold text-[#7065f0] text-center">
          Acesse sua conta
        </h1>
        <div className="mt-5">
          <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-[#7065f0]">E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o seu e-mail" {...field}
                        className="bg-[#2b2b3c] border border-[#44445a] rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7065f0]" 
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-semibold text-[#7065f0]">Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Insira sua senha" {...field}
                    className="bg-[#2b2b3c] border border-[#44445a] rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7065f0]" />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full cursor-pointer bg-[#7065f0] hover:bg-[#5d52dc]">Logar</Button>
              <Button className="w-full cursor-pointer bg-[#7065f0] hover:bg-[#5d52dc]" onClick={handleSignIn}>Não possui uma conta ? Registre-se agora</Button>
              <Button variant="outline" className="cursor-pointer text-black" onClick={handleHomePage}>Voltar</Button>
            </div>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
}

export default LogIn;
