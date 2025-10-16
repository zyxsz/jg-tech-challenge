import { TasksService } from "@/api/services/tasks.service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { queryClient } from "@/providers";
import { Link2Icon } from "lucide-react";
import { useTransition, type ComponentProps } from "react";
import { toast } from "sonner";

interface Props extends ComponentProps<typeof Button> {
  taskId: string;
}

export const TaskAssignmentButton = ({ taskId, ...rest }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      await TasksService.createAssignment(taskId)
        .then(async () => {
          toast.success("Tarefa associada com sucesso!");
          await queryClient.invalidateQueries({
            queryKey: ["tasks", taskId],
            exact: false,
          });
        })
        .catch((error) => {
          const message =
            error.response?.data?.message ||
            error?.message ||
            "Não foi possível te associar a essa tarefa.";

          toast.error(message);
        });
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" {...rest}>
          Me associar {isPending ? <Spinner /> : <Link2Icon />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Caso realmente queira se associar a esta tarefa clique no botão
            abaixo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
