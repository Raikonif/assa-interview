import BaseModal from "@/components/BaseModal.tsx";
import { useContext, useRef, useState } from "react";
import GeneralContext from "@/context/GeneralContext.tsx";
import { createTask } from "@/service/task.service.ts";
import { OPTask } from "@/interfaces/task.interface.ts";
import toast from "react-hot-toast";
import { useTasks } from "@/hooks/useTasks.tsx";

function CreateTaskModal() {
  const modalRef = useRef(null);
  const { isTaskModalOpen, setIsTaskModalOpen } = useContext(GeneralContext);
  const [taskData, setTaskData] = useState<OPTask>({} as OPTask);
  const { forceRefetch } = useTasks();
  const handleCreateTask = async () => {
    if (!taskData.name) {
      toast.error("Task name is required");
      return;
    }
    setTaskData({ ...taskData, createdAt: String(Date.now()), status: false });
    await createTask(taskData);
    setIsTaskModalOpen(false);
    forceRefetch();
    toast.success("Task created");
  };

  return (
    <BaseModal
      modalRef={modalRef}
      onClose={setIsTaskModalOpen}
      isOpen={isTaskModalOpen}
      title={"Create Task"}
    >
      <div className="flex flex-col p-5">
        <input
          type="text"
          placeholder="Task Name"
          onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
          className="rounded-xl bg-slate-600 p-3 text-violet-100 outline-none outline"
        />
      </div>
      <button
        onMouseEnter={() =>
          setTaskData({ ...taskData, createdAt: String(Date.now()), status: false })
        }
        onClick={() => handleCreateTask()}
        className="rounded-b-xl bg-violet-700 p-3 text-violet-100 hover:bg-violet-600 active:bg-violet-500"
      >
        Create
      </button>
    </BaseModal>
  );
}

export default CreateTaskModal;
