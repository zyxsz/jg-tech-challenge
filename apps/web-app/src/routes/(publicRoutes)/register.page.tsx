import { RegisterForm } from "@/components/forms/register.form";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const RegisterPage = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <header className="w-full text-start">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
            Tarefas
          </h1>
          <p className="text-muted-foreground text-sm">Crie sua conta.</p>
        </header>
        <RegisterForm />
        <footer className="text-center">
          <p className="text-muted-foreground text-sm">
            Já possui uma conta?
            <Button className="px-1" variant="link" asChild>
              <Link to="/login">Logue-se aqui.</Link>
            </Button>
          </p>
        </footer>
      </div>
    </section>
  );
};
