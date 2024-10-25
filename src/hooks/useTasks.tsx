import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/service/task.service.ts";
import { Task } from "@/interfaces/task.interface.ts";

const getAllTasks = async (): Promise<Task[]> => {
  const { data } = await getTasks();
  console.log("data", data);
  return data;
};

function useTasks() {
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getAllTasks(),
    staleTime: 1000 * 60 * 5,
  });
  const forceRefetch = () => {
    tasksQuery.refetch();
  };
  return { tasksQuery: tasksQuery, forceRefetch };
}

export { useTasks };
