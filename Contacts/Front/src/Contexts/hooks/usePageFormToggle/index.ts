import { useContext } from "react";
import { defaulpage, PageToggleContext } from "../../../constants";
import type { pageToggleContextInterface } from "../../../Types";

export const usePageFormToggle = (): pageToggleContextInterface => {
  const context = useContext(PageToggleContext);
  
  if (context === defaulpage) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};