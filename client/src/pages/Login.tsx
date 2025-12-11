import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import andromedaLogo from "@/assets/andromeda_logo_new.png";
import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(username, password);
    
    if (result.success) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (!user.isOnboarded) {
          setLocation("/onboarding");
        } else {
          setLocation("/app");
        }
      } else {
        setLocation("/app");
      }
    } else {
      setError(result.error || "Login ou senha incorretos. Tente novamente.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px]" />
      </div>

      <Link href="/">
        <button className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Voltar ao site</span>
        </button>
      </Link>

      <div className="w-full max-w-md mx-4">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 rounded-2xl overflow-hidden border border-white/10 p-2 bg-gradient-to-br from-slate-800 to-slate-950 mb-4 shadow-lg shadow-cyan-900/20">
              <img src={andromedaLogo} alt="Andromeda Solutions" className="h-full w-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Painel do Cliente</h1>
            <p className="text-slate-400 text-sm mt-1">Acesse o sistema Andromeda</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-300 text-sm font-medium">
                Login
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu login"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
                  data-testid="input-username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 text-sm font-medium">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center" data-testid="text-error">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white font-semibold hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              data-testid="button-login"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </div>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-slate-500 text-xs">
              Precisa de ajuda? Entre em contato pelo WhatsApp
            </p>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          © 2024 Andromeda Solutions. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
