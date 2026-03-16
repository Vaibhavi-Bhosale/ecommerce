import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // Import from the file above

export default function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
