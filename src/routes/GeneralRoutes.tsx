import GeneralLayout from "@/layouts/GeneralLayout.tsx";
import Tasks from "@/pages/Tasks.tsx";
import MainScreen from "@/pages/MainScreen.tsx";
import Profiles from "@/pages/Profiles.tsx";
import ContextProvider from "@/context/ContextProvider.tsx";

const GeneralRoutes = {
  path: "",
  element: (
    <ContextProvider>
      <GeneralLayout />
    </ContextProvider>
  ),
  children: [
    {
      path: "",
      element: <MainScreen />,
    },
    {
      path: "tasks",
      element: <Tasks />,
    },
    {
      path: "profiles",
      element: <Profiles />,
    },
  ],
};

export default GeneralRoutes;
