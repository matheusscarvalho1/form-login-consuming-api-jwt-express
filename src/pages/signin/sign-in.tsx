"use client"

 import { useState } from "react";
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
  // const [formData, setFormData] = useState<IRegisterData>({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   age: "",
  //   password: "",
  // });

   const [loading, setLoading] = useState(false);
  // const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  // const [generalError, setGeneralError] = useState<string | null>(null);
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);

   const navigate = useNavigate();


  const handleReturnToHomePage = () => {
    navigate("/");

  }

  
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: name === "age" ? (value === "" ? "" : Number(value)) : value,
  //   }));

  //   if (formErrors[name]) {
  //     setFormErrors((prev) => ({ ...prev, [name]: "" }));
  //   }
  // };


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setGeneralError(null);
  //   setSuccessMessage(null);

  //   if (!validate()) {
  //     setGeneralError("Por favor, corrija os erros acima antes de continuar.");
  //     return;
  //   }

  //   
  // };
 
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
  toast("Enviando dados..."); // ou use toast.loading() se estiver usando uma lib que suporte

  setLoading(true);

  try {
    await api.post("/user/create", data);
    console.log({ data });
    toast.success("Usuário criado com sucesso!");
  } catch (err: any) {
    const status = err?.response?.status;
    const message = err?.response?.data?.message;

    if (status === 400) {
      toast.error(message || "Erro nos dados enviados. Verifique os campos.");
      console.log(status, message)
    } else if (status === 409) {
      toast.error(message || "Usuário já existe.");
    } else {
      toast.error("Erro inesperado ao criar usuário.");
    }

    console.error(err);
  } finally {
    setLoading(false);
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
                    <FormLabel>Primeiro Nome</FormLabel>
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
                  <FormLabel>Sobrenome</FormLabel>
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
                  <FormLabel>Email</FormLabel>
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
                  <FormLabel>Idade</FormLabel>
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
                  <div className="flex gap-1">
                    <FormLabel>Senha</FormLabel>
                    <Tooltip>
                      <TooltipTrigger><InfoCircledIcon width={15} height={15}/></TooltipTrigger>
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
              <Button type="submit" className="w-full cursor-pointer bg-[#7065f0] hover:bg-[#5d52dc]">Submit</Button>
              <Button variant="outline" className="cursor-pointer text-black" onClick={handleReturnToHomePage}>Voltar</Button>
            </div>
           </form>
           
        </Form>
        </div>
      </section>
    </div>



  );
};

export default SignIn;
