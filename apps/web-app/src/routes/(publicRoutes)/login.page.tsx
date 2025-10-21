import { LoginForm } from "@/components/forms/login.form";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const LoginPage = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <header className="w-full text-start">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
            Tarefas
          </h1>
          <p className="text-muted-foreground text-sm">Entre com sua conta.</p>
        </header>
        <LoginForm />
        <footer className="text-center">
          <p className="text-muted-foreground text-sm">
            Não possui uma conta?
            <Button className="px-1" variant="link" asChild>
              <Link to="/register">Registre-se aqui.</Link>
            </Button>
          </p>
        </footer>
      </div>
    </section>
  );
};
