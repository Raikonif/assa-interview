import { createContext } from "react";

interface IDataContext {
  isTaskModalOpen: boolean;
  setIsTaskModalOpen: (value: boolean) => void;
}

const GeneralContext = createContext<IDataContext>({} as IDataContext);

export default GeneralContext;
