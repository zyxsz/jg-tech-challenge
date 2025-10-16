import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTransition } from "react";
import { AuthService } from "@/api/services/auth.service";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { ArrowRightIcon } from "lucide-react";

const formSchema = z
  .object({
    email: z.email(),
    username: z.string().min(3).max(32),
    password: z.string().min(5).max(128),
    confirmPassword: z.string().min(5).max(128),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não combinam",
    path: ["confirmPassword"],
  });

export const RegisterForm = () => {
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    startSubmitTransition(async () => {
      await AuthService.registerUser(data)
        .then((response) => {
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);

          toast.success("Cadastro realizado com sucesso, redirecionando...");

          navigate({ to: "/", reloadDocument: true });
        })
        .catch((error) => {
          const message =
            error.response?.data?.message ||
            error?.message ||
            "Não foi possível realizar o seu cadastro.";

          toast.error(message);
        });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-xl space-y-4 bg-card rounded-md border border-border p-4"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de usuário</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: example" {...field} />
                </FormControl>
                <FormMessage />
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
                  <Input placeholder="Ex: example@tasks.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: *******" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: *******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex items-center justify-end gap-4">
          <Button className="w-full" type="submit" disabled={isSubmitPending}>
            Cadastrar {isSubmitPending ? <Spinner /> : <ArrowRightIcon />}
          </Button>
        </div>
      </form>
    </Form>
  );
};
