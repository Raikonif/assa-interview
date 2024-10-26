import BaseModal from "@/components/BaseModal.tsx";
import { useContext, useRef, useState } from "react";
import GeneralContext from "@/context/GeneralContext.tsx";
import { createTask } from "@/redux/tasksSlice.ts";
import { createTask as creatingTask } from "@/service/task.service.ts";
import { OPTask } from "@/interfaces/task.interface.ts";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { FaCircleNotch } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

function CreateTaskModal() {
  const randomId = uuidv4();
  const [isProcessing, setIsProcessing] = useState(false);
  const [taskData, setTaskData] = useState<OPTask>({
    id: randomId,
    name: "",
    createdAt: String(Date.now()),
    status: false,
  } as OPTask);
  const modalRef = useRef(null);
  const { isTaskModalOpen, setIsTaskModalOpen } = useContext(GeneralContext);
  const dispatch = useDispatch();

  const handleCreateTask = async () => {
    setIsProcessing(true);
    if (!taskData.name && taskData.name === "") {
      toast.error("Task name is required");
      setIsProcessing(false);
      return;
    }

    await creatingTask(taskData).then(() => {
      setTaskData({
        name: "",
        createdAt: String(Date.now()),
        status: false,
      } as OPTask);
      setIsTaskModalOpen(false);
    });
    dispatch(createTask(taskData));
    toast.success("Task created");
    setIsProcessing(false);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await handleCreateTask();
    }
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
          value={taskData.name}
          onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
          onKeyDown={handleKeyDown}
          className="rounded-xl bg-slate-600 p-3 text-violet-100 outline-none outline"
        />
      </div>
      <button
        onMouseEnter={() =>
          setTaskData({ ...taskData, createdAt: String(Date.now()), status: false })
        }
        onClick={() => handleCreateTask()}
        className="flex items-center justify-center rounded-b-xl bg-violet-700 p-3 text-violet-100 hover:bg-violet-600 active:bg-violet-500"
      >
        Create <FaCircleNotch className={`${!isProcessing && "hidden"}`} />
      </button>
    </BaseModal>
  );
}

export default CreateTaskModal;
