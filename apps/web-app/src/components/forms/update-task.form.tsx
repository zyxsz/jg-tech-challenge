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
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ArrowRightIcon, ChevronDownIcon } from "lucide-react";
import MonacoEditor from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { TasksService } from "@/api/services/tasks.service";
import { queryClient } from "@/providers";

const formSchema = z.object({
  title: z.string().min(4).max(128),
  description: z.string().min(2),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]),
  term: z.date(),
});

export interface Props {
  defaultValues?: Partial<z.infer<typeof formSchema>>;
  taskId: string;
}

export const UpdateTaskForm = ({ taskId, defaultValues }: Props) => {
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      description: "",
      priority: "LOW",
      status: "TODO",
      term: new Date(),
      title: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    startSubmitTransition(async () => {
      try {
        await TasksService.update(taskId, data);

        await queryClient.invalidateQueries({
          queryKey: ["tasks"],
          exact: false,
        });

        toast.success("Tarefa atualizada com sucesso, redirecionando...");

        navigate({ to: "/tasks/$taskId", params: { taskId } });
      } catch (error: unknown | AxiosError) {
        if (error instanceof AxiosError) {
          const message =
            error.response?.data.message ||
            "Não foi possível atualizar a tarefa.";

          toast.error(message);
        } else {
          toast.error("Não foi possível atualizar a tarefa.");
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 bg-card rounded-md border border-border p-4"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: my-task-01" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <div className="rounded-md overflow-hidden border">
                    <MonacoEditor
                      className="h-80"
                      language="markdown"
                      value={field.value}
                      onChange={field.onChange}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        scrollbar: { vertical: "hidden" },
                      }}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioridade</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="URGENT">Urgente</SelectItem>
                      <SelectItem value="HIGH">Alta</SelectItem>
                      <SelectItem value="MEDIUM">Media</SelectItem>
                      <SelectItem value="LOW">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DONE">Concluída</SelectItem>
                      <SelectItem value="REVIEW">Em analise</SelectItem>
                      <SelectItem value="IN_PROGRESS">Em progresso</SelectItem>
                      <SelectItem value="TODO">A ser feito</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prazo</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                      >
                        {field.value
                          ? field.value.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon className="text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex items-center justify-end gap-4">
          <Button
            variant="link"
            type="button"
            onClick={() => form.reset()}
            disabled={isSubmitPending}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitPending}>
            Atualizar tarefa <ArrowRightIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
};
