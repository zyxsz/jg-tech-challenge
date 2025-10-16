import type { Task } from "@/api/interfaces/task.entity";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TaskCommentsContainer } from "./comments/comments-container";
import { TaskAssignmentsContainer } from "./assignments/assignments-container";

interface Props {
  task: Task;
}

export const TaskDetailsTabs = ({ task }: Props) => {
  return (
    <Tabs defaultValue="comments">
      <TabsList>
        <TabsTrigger value="comments">Comentários</TabsTrigger>
        <TabsTrigger value="assignments">Associações</TabsTrigger>
      </TabsList>
      <TabsContent value="comments">
        <TaskCommentsContainer taskId={task.id} />
      </TabsContent>
      <TabsContent value="assignments">
        <TaskAssignmentsContainer task={task} />
      </TabsContent>
    </Tabs>
  );
};
