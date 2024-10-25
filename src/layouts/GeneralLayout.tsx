import { Outlet } from "react-router-dom";
import CreateTaskModal from "@/components/CreateTaskModal.tsx";
import ProfileDataModal from "@/components/ProfileDataModal.tsx";
import { Toaster } from "react-hot-toast";

function GeneralLayout() {
  return (
    <div className="flex min-h-screen">
      <Outlet />
      <CreateTaskModal />
      <ProfileDataModal />
      <Toaster />
    </div>
  );
}

export default GeneralLayout;
