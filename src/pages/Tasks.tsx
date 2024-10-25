import { useTasks } from "@/hooks/useTasks.tsx";
import { FaPlus } from "react-icons/fa";
import { useContext, useEffect } from "react";
import GeneralContext from "@/context/GeneralContext.tsx";
import { getTasks, updateTask } from "@/service/task.service.ts";
import { Task } from "@/interfaces/task.interface.ts";
import BtnGoBack from "@/components/BtnGoBack.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { readTasks } from "@/redux/tasksSlice.ts";

function Tasks() {
  const tasks = useTasks();
  const taskss = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const { setIsTaskModalOpen } = useContext(GeneralContext);

  const handleTaskStatus = async (task: Task) => {
    const updatedTask = { ...task, status: !task.status };
    await updateTask(updatedTask);
    tasks.forceRefetch();
  };

  useEffect(() => {
    getTasks().then((response) => {
      dispatch(readTasks(response.data));
    }).catch((error) => {
      console.error("Error al obtener las tareas:", error);
    });
  }, [dispatch]);

  return (
    <div className="flex w-full flex-col bg-slate-800">
      <div className="flex w-full items-center justify-between border-b-2 border-slate-400">
        <BtnGoBack />
        <h1 className="md:4xl text-2xl font-bold text-violet-100">Tasks</h1>
        <button
          onClick={() => setIsTaskModalOpen(true)}
          className="m-2 flex items-center gap-2 rounded-md bg-violet-900 p-2 text-white hover:bg-violet-600 active:bg-violet-700"
        >
          New Task <FaPlus />
        </button>
      </div>
      {(tasks.tasksQuery.isLoading || tasks.tasksQuery.error || tasks.tasksQuery.data?.length === 0) &&
        <div className="flex items-center h-full justify-center">
          {tasks.tasksQuery.isLoading && <p className="text-center text-slate-100">Loading...</p>}
          {tasks.tasksQuery.data?.length === 0 && <p className="text-center text-slate-100">No tasks</p>}
          {tasks.tasksQuery.isError && <p className="text-center text-slate-100">Error</p>}
        </div>}
      <ul className="mt-4 pt-4">
        {taskss &&
          taskss.data.map((task) => (
            <li key={task.id} className="m-3">
              <div className="flex gap-4 rounded-full bg-slate-600 p-4 text-white">
                <input
                  type="checkbox"
                  onChange={() => handleTaskStatus(task)}
                  checked={task.status}
                />
                <span>{task.name}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Tasks;
