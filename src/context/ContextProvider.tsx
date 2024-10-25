import React, { useState } from "react";
import GeneralContext from "./GeneralContext";

interface Props {
  children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  return (
    <GeneralContext.Provider value={{ isTaskModalOpen, setIsTaskModalOpen }}>
      {children}
    </GeneralContext.Provider>
  );
}

export default ContextProvider;
