import { useNavigate } from "react-router-dom";
import { PROFILES, TASKS } from "@/constants/general.constants.ts";

function MainScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-800">
      <div className="fixed top-0 w-full border-b-2 bg-slate-900 p-3 md:p-6">
        <h1 className="text-center font-bold text-slate-100 md:text-xl">Main Screen</h1>
      </div>
      <div className="flex flex-col gap-5">
        <button
          onClick={() => navigate(TASKS)}
          className="rounded-xl bg-sky-600 p-3 text-white duration-300 hover:animate-pulse md:p-8 md:text-3xl"
        >
          Tasks
        </button>
        <button
          onClick={() => navigate(PROFILES)}
          className="rounded-xl bg-emerald-500 p-3 text-white hover:animate-pulse md:p-8 md:text-3xl"
        >
          List of profiles
        </button>
      </div>
    </div>
  );
}

export default MainScreen;
