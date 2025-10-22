import { TasksService } from "@/api/services/tasks.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { queryClient } from "@/providers";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, UserRoundPlusIcon } from "lucide-react";
import { useState, useTransition, type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface Props extends ComponentProps<typeof Button> {
  taskId: string;
  refetch?: () => Promise<void>;
}

const formSchema = z.object({
  email: z.email(),
});

export const TaskAssignmentButton = ({ taskId, refetch, ...rest }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    startSubmitTransition(async () => {
      await TasksService.createAssignment(taskId, data.email)
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
  }

  const handleCancel = () => {
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" {...rest}>
          Associar usuário <UserRoundPlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Associe um usuário! </DialogTitle>
          <DialogDescription>
            Basta preencher o campo abaixo. O usuário será notificado.
          </DialogDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o conteúdo do seu comentário"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="link"
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitPending}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitPending}>
                  Associar {isSubmitPending ? <Spinner /> : <ArrowRightIcon />}
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
