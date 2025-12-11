import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, User, Users, ChevronRight, Check, Plus, Trash2, Sparkles } from "lucide-react";
import andromedaLogo from "@/assets/andromeda_logo_new.png";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface StaffMember {
  name: string;
  role: string;
  specialty: string;
}

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [salonName, setSalonName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    { name: "", role: "", specialty: "" }
  ]);

  const addStaffMember = () => {
    setStaffMembers([...staffMembers, { name: "", role: "", specialty: "" }]);
  };

  const removeStaffMember = (index: number) => {
    if (staffMembers.length > 1) {
      setStaffMembers(staffMembers.filter((_, i) => i !== index));
    }
  };

  const updateStaffMember = (index: number, field: keyof StaffMember, value: string) => {
    const updated = [...staffMembers];
    updated[index][field] = value;
    setStaffMembers(updated);
  };

  const handleNext = () => {
    if (step === 1 && !salonName.trim()) {
      toast({ title: "Erro", description: "Digite o nome do salão", variant: "destructive" });
      return;
    }
    if (step === 2 && !adminName.trim()) {
      toast({ title: "Erro", description: "Digite seu nome", variant: "destructive" });
      return;
    }
    setStep(step + 1);
  };

  const handleComplete = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      await updateUser({ salonName, adminName, isOnboarded: true });

      const validStaff = staffMembers.filter(s => s.name.trim() && s.role.trim());
      for (const member of validStaff) {
        await fetch("/api/staff", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            name: member.name,
            role: member.role,
            specialty: member.specialty || member.role,
            services: [],
          }),
        });
      }

      toast({ title: "Configuração concluída!", description: "Seu salão está pronto para uso." });
      setLocation("/app");
    } catch (error) {
      toast({ title: "Erro", description: "Erro ao salvar configurações", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Salão", icon: Building2 },
    { number: 2, title: "Admin", icon: User },
    { number: 3, title: "Equipe", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="h-16 w-16 mx-auto rounded-2xl overflow-hidden border border-cyan-100 p-2 bg-white mb-4 shadow-lg shadow-cyan-100/50">
            <img src={andromedaLogo} alt="Andromeda" className="h-full w-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Bem-vindo ao Andromeda</h1>
          <p className="text-slate-500 mt-2">Vamos configurar seu salão em poucos passos</p>
        </div>

        <div className="flex justify-center mb-8">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                step >= s.number 
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 border-transparent text-white" 
                  : "bg-white border-slate-200 text-slate-400"
              }`}>
                {step > s.number ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 rounded transition-all ${
                  step > s.number ? "bg-gradient-to-r from-cyan-600 to-blue-600" : "bg-slate-200"
                }`} />
              )}
            </div>
          ))}
        </div>

        <Card className="border-none shadow-2xl shadow-slate-200/50">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">
              {step === 1 && "Como se chama seu salão?"}
              {step === 2 && "Quem é o administrador?"}
              {step === 3 && "Adicione sua equipe"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Este nome aparecerá para seus clientes"}
              {step === 2 && "Seus dados para gerenciar o sistema"}
              {step === 3 && "Você pode adicionar mais profissionais depois"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="salonName">Nome do Salão</Label>
                  <Input
                    id="salonName"
                    placeholder="Ex: Studio Beleza Maria"
                    value={salonName}
                    onChange={(e) => setSalonName(e.target.value)}
                    className="h-12 text-lg"
                    data-testid="input-salon-name"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminName">Seu Nome</Label>
                  <Input
                    id="adminName"
                    placeholder="Digite seu nome completo"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="h-12 text-lg"
                    data-testid="input-admin-name"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                {staffMembers.map((member, index) => (
                  <div key={index} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-500">Profissional {index + 1}</span>
                      {staffMembers.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeStaffMember(index)}
                          className="h-8 w-8 text-slate-400 hover:text-red-500"
                          data-testid={`button-remove-staff-${index}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <Input
                        placeholder="Nome"
                        value={member.name}
                        onChange={(e) => updateStaffMember(index, "name", e.target.value)}
                        data-testid={`input-staff-name-${index}`}
                      />
                      <Input
                        placeholder="Função"
                        value={member.role}
                        onChange={(e) => updateStaffMember(index, "role", e.target.value)}
                        data-testid={`input-staff-role-${index}`}
                      />
                      <Input
                        placeholder="Especialidade"
                        value={member.specialty}
                        onChange={(e) => updateStaffMember(index, "specialty", e.target.value)}
                        data-testid={`input-staff-specialty-${index}`}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addStaffMember}
                  className="w-full border-dashed"
                  data-testid="button-add-staff"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar mais profissional
                </Button>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)} data-testid="button-back">
                  Voltar
                </Button>
              ) : (
                <div />
              )}
              
              {step < 3 ? (
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600"
                  data-testid="button-next"
                >
                  Próximo
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleComplete}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600"
                  data-testid="button-complete"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Salvando...
                    </div>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Começar a usar
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
