import { useContext } from "react";
import { ThemeContext } from "./ThemeContext"; // Import from the file above

export default function useTheme() {
  const context = useContext(ThemeContext);
        
  if (!context) {
    throw new Error("useTheme must be used within an AuthProvider");
  }
  
  return context;
}

