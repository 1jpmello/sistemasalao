import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  salonName: string | null;
  adminName: string | null;
  isOnboarded: boolean | null;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TEST_USERS: { [key: string]: { password: string; user: User } } = {
  "andromedateste": {
    password: "andromeda123",
    user: {
      id: "user-andromeda-001",
      username: "andromedateste",
      salonName: "Studio Beleza & Arte",
      adminName: "Carolina Mendes",
      isOnboarded: true
    }
  },
  "gigi123": {
    password: "gigikilzer",
    user: {
      id: "user-gigi-001",
      username: "gigi123",
      salonName: null,
      adminName: null,
      isOnboarded: false
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const testUser = TEST_USERS[username.toLowerCase()];
    
    if (!testUser || testUser.password !== password) {
      return { success: false, error: "Login ou senha incorretos. Tente novamente." };
    }

    setUser(testUser.user);
    localStorage.setItem("user", JSON.stringify(testUser.user));
    localStorage.setItem("isAuthenticated", "true");
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
