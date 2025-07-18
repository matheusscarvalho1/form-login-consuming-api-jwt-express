"use client"

 //import { useState } from "react";
// import api from "../../services/api";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { toast } from "sonner"
import { useNavigate } from "react-router";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button";
import api from "@/services/api";


const SignIn = () => {

   //const [loading, setLoading] = useState(false);
  
   const navigate = useNavigate();


  const handleHomePage = () => {
    navigate("/");

  }

  const handleLoginPage = () => {
    navigate("/login")
  }


 
  const formSchema = z.object({
    firstName: z.string().trim().min(2, {
      error: 'É obrigatório inserir seu nome'
    }),
    lastName: z.string().trim().min(2, {
      error: 'É obrigatório inserir seu sobrenome'
    }),
    email: z.email({
      error: 'É obrigatório inserir seu e-mail válido'
    }),
    age: z.number().min(2, {
      error: 'É obrigatório inserir sua idade'
    }),
    password: z.string().min(6, {
      error: "A senha deve ter no mínimo 6 caracteres"
    })
    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
    .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
    .regex(/[^A-Za-z0-9]/, { message: "A senha deve conter pelo menos um caractere especial" }),
  });


type FormSchema = z.infer<typeof formSchema>

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      firstName: "",
      lastName: "",
      email: "",
      age: 0,
      password: "",
    }
  })


const onSubmit = async (data: FormSchema) => {
  //setLoading(true);

  try {
    await api.post("/user/create", data);

    toast.success("Usuário criado com sucesso!");

    setTimeout(() => {
      handleLoginPage();
    }, 3000)
  
  } catch (err: any) {
    const status = err?.response?.status;
    const message = err?.response?.data?.message;

    if (status === 400) {
      return toast.error(message || "Erro nos dados enviados. Verifique os campos.");
     
    } else if (status === 409) {
      return toast.error(message || "Usuário já existe.");
    } else {
      console.error(err);
      //setLoading(false);
      return toast.error("Erro inesperado ao criar usuário.");
    }

    
  } finally {
    //setLoading(false);
  }

  
};

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-gray-100">
      <section className="bg-[#1e1e2f] border border-[#2c2c3f] rounded-3xl shadow-lg max-w-md w-full p-8">
         <h1 className="text-2xl font-semibold text-[#7065f0] text-center">
          Criar Conta
        </h1>
        <div className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-[#7065f0]">Primeiro Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o seu nome" {...field}
                        className="bg-[#2b2b3c] border border-[#44445a] rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7065f0]"
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-[#7065f0]">Sobrenome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu sobrenome" {...field}
                    className="bg-[#2b2b3c] border border-[#44445a] rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7065f0]" />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-[#7065f0]">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu e-mail" {...field}
                    className="bg-[#2b2b3c] border border-[#44445a] rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7065f0]" />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-[#7065f0]">Idade</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Digite sua idade" {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    className="bg-[#2b2b3c] border border-[#44445a] rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7065f0]" />
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
                  <div className="flex justify-between">
                    <FormLabel className="font-semibold text-[#7065f0]">Senha</FormLabel>
                    <Tooltip>
                      <TooltipTrigger><InfoCircledIcon className="font-bold text-[#7065f0]" width={15} height={15}/></TooltipTrigger>
                      <TooltipContent>
                        <p>A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractér especial e um número</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="Crie uma senha segura" {...field}
                    className="bg-[#2b2b3c] border border-[#44445a] rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7065f0]" />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full cursor-pointer bg-[#7065f0] hover:bg-[#5d52dc]">Cadastrar</Button>
              <Button className="w-full cursor-pointer bg-[#7065f0] hover:bg-[#5d52dc]" onClick={handleLoginPage}>Já possui uma conta ? Faça seu login</Button>
              <Button variant="outline" className="cursor-pointer text-black" onClick={handleHomePage}>Voltar</Button>
            </div>
           </form>
        </Form>
      </div>
    </section>
  </div>



  );
};

export default SignIn;
