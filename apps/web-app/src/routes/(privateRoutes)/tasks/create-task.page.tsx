import { CreateTaskForm } from "@/components/forms/create-task.form";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

export const CreateTaskPage = () => {
  return (
    <div className="space-y-4 pb-12">
      <header>
        <Button
          variant="link"
          color="muted"
          className="font-normal px-0!"
          asChild
        >
          <Link to="/tasks">
            <ArrowLeftIcon /> Voltar
          </Link>
        </Button>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Criar tarefa
        </h1>
        <p className="text-muted-foreground text-sm">
          Preencha todos os campos abaixo para criar uma nova tarefa.
        </p>
      </header>

      <CreateTaskForm />
    </div>
  );
};
