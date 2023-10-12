import { createContext, useContext, useState } from "react";

const ContentContext = createContext();

export function useContent() {
  return useContext(ContentContext);
}

export function ContentProvider({ children }) {
  const [contentData, setContentData] = useState(0);
  return (
    <ContentContext.Provider value={{ contentData, setContentData }}>
      {children}
    </ContentContext.Provider>
  );
}
