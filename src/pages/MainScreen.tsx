import { useNavigate } from "react-router-dom";
import { PROFILES, TASKS } from "@/constants/general.constants.ts";

function MainScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-800">
      <div className="fixed top-0 w-full bg-slate-900 p-3 md:p-6 border-b-2">
        <h1 className="text-slate-100 text-center md:text-xl font-bold">Main Screen</h1>
      </div>
      <div className="flex flex-col gap-5">
        <button
          onClick={() => navigate(TASKS)}
          className="rounded-xl bg-sky-600 p-3 text-white md:p-8 md:text-3xl"
        >
          Tasks
        </button>
        <button
          onClick={() => navigate(PROFILES)}
          className="rounded-xl bg-emerald-500 p-3 md:p-8 md:text-3xl text-white"
        >
          List of profiles
        </button>
      </div>
    </div>
  );
}

export default MainScreen;
