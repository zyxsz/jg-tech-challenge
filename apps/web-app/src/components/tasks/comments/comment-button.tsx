import { ArrowRightIcon, MessageCirclePlusIcon } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { useState, useTransition, type ComponentProps } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Textarea } from "../../ui/textarea";
import { TasksService } from "@/api/services/tasks.service";
import { Spinner } from "../../ui/spinner";

interface Props extends ComponentProps<typeof Button> {
  taskId: string;
  refetch?: () => Promise<void>;
}

const formSchema = z.object({
  content: z.string().min(4).max(256),
});

export const TaskCommentButton = ({ taskId, refetch, ...rest }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    startSubmitTransition(async () => {
      await TasksService.createComment(taskId, data)
        .then(async () => {
          toast.success("Comentário publicado com sucesso.");

          if (refetch) await refetch();

          form.reset();
          setIsOpen(false);
        })
        .catch((error) => {
          const message =
            error.response?.data?.message ||
            error?.message ||
            "Não foi possível publicar o seu comentário.";

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
          Comentar <MessageCirclePlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deixe seu comentário! </DialogTitle>
          <DialogDescription>
            Basta preencher o campo abaixo. Todos podem ver o seu comentário.
          </DialogDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo</FormLabel>
                    <FormControl>
                      <Textarea
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
                  Enviar {isSubmitPending ? <Spinner /> : <ArrowRightIcon />}
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
