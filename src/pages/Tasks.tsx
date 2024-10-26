import { useTasks } from "@/hooks/useTasks.tsx";
import { FaCheckCircle, FaPlus, FaRegCircle, FaTrash } from "react-icons/fa";
import { useContext, useEffect } from "react";
import GeneralContext from "@/context/GeneralContext.tsx";
import { getTasks, updateTask as updatingTask } from "@/service/task.service.ts";
import { deleteTask, updateTask } from "@/redux/tasksSlice.ts";
import { deleteTask as deletingTask } from "@/service/task.service.ts";
import { Task } from "@/interfaces/task.interface.ts";
import BtnGoBack from "@/components/BtnGoBack.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import { readTasks } from "@/redux/tasksSlice.ts";
import toast from "react-hot-toast";

function Tasks() {
  const tasks = useTasks();
  const taskss = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const { setIsTaskModalOpen } = useContext(GeneralContext);

  const handleTaskStatus = async (task: Task) => {
    const updatedTask = { ...task, status: !task.status };
    dispatch(updateTask(updatedTask));
    await updatingTask(updatedTask);
  };

  const handleDeleteTask = async (task: Task) => {
    await deletingTask(task);
    dispatch(deleteTask(task.id));
    toast.success("Task deleted");
  };

  useEffect(() => {
    getTasks()
      .then((response) => {
        dispatch(readTasks(response.data));
      })
      .catch((error) => {
        console.error("Error al obtener las tareas:", error);
      });
  }, [dispatch]);

  return (
    <div className="flex w-full flex-col bg-slate-800">
      <div className="flex w-full items-center justify-between border-b-2 border-slate-400 bg-slate-900 md:p-3">
        <BtnGoBack />
        <h1 className="md:4xl text-2xl font-bold text-violet-100">Tasks</h1>
        <button
          onClick={() => setIsTaskModalOpen(true)}
          className="m-2 flex items-center gap-2 rounded-md bg-violet-900 p-2 text-white hover:bg-violet-600 active:bg-violet-700"
        >
          New Task <FaPlus />
        </button>
      </div>
      {(tasks.tasksQuery.isLoading ||
        tasks.tasksQuery.error ||
        tasks.tasksQuery.data?.length === 0) && (
        <div className="flex h-full items-center justify-center">
          {tasks.tasksQuery.isLoading && (
            <p className="text-center text-slate-100">Loading Tasks...</p>
          )}
          {tasks.tasksQuery.data?.length === 0 && (
            <p className="text-center text-slate-100">No tasks</p>
          )}
          {tasks.tasksQuery.isError && <p className="text-center text-slate-100">Error</p>}
        </div>
      )}
      <ul className="mt-4 pt-4">
        {taskss &&
          taskss.data.map((task) => (
            <li key={task.createdAt} className="m-3 hover:animate-pulse">
              <div className="flex items-center gap-4 rounded-lg bg-slate-600 p-4 text-white">
                {!task.status ? (
                  <FaRegCircle onClick={() => handleTaskStatus(task)} className="cursor-pointer" />
                ) : (
                  <FaCheckCircle
                    onClick={() => handleTaskStatus(task)}
                    className="cursor-pointer"
                  />
                )}
                <input
                  id={"task-" + task.createdAt}
                  type="checkbox"
                  onChange={() => handleTaskStatus(task)}
                  checked={task.status}
                  className="hidden"
                />
                <span>{task.name}</span>
                <FaTrash
                  onClick={() => handleDeleteTask(task)}
                  className="absolute right-10 cursor-pointer text-red-600 hover:animate-bounce"
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Tasks;
