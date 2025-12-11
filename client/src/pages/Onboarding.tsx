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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultRoles = [
  "Cabeleireiro(a)",
  "Manicure",
  "Pedicure",
  "Barbeiro(a)",
  "Esteticista",
  "Maquiador(a)",
  "Designer de Sobrancelhas",
  "Massagista",
  "Depilador(a)",
  "Recepcionista",
];

const defaultSpecialties = [
  "Corte Feminino",
  "Corte Masculino",
  "Coloração",
  "Mechas e Luzes",
  "Escova e Penteados",
  "Tratamentos Capilares",
  "Unhas em Gel",
  "Unhas de Fibra",
  "Esmaltação",
  "Design de Sobrancelhas",
  "Extensão de Cílios",
  "Maquiagem Social",
  "Maquiagem Artística",
  "Limpeza de Pele",
  "Massagem Relaxante",
  "Depilação a Laser",
  "Depilação com Cera",
  "Barba",
  "Hidratação Capilar",
];

interface StaffMember {
  name: string;
  role: string;
  specialty: string;
  customRole: boolean;
  customSpecialty: boolean;
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
    { name: "", role: "", specialty: "", customRole: false, customSpecialty: false }
  ]);

  const addStaffMember = () => {
    setStaffMembers([...staffMembers, { name: "", role: "", specialty: "", customRole: false, customSpecialty: false }]);
  };

  const removeStaffMember = (index: number) => {
    if (staffMembers.length > 1) {
      setStaffMembers(staffMembers.filter((_, i) => i !== index));
    }
  };

  const updateStaffMember = (index: number, field: 'name' | 'role' | 'specialty', value: string) => {
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
    
    const invalidStaff = staffMembers.some(s => 
      (s.name.trim() && (!s.role.trim() || (s.customSpecialty && !s.specialty.trim())))
    );
    
    if (invalidStaff) {
      toast({ 
        title: "Dados incompletos", 
        description: "Preencha todos os campos de função e especialidade para os profissionais adicionados.", 
        variant: "destructive" 
      });
      return;
    }
    
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6 sm:mb-8">
          <div className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-3 sm:mb-4">
            <img src={andromedaLogo} alt="Andromeda" className="h-full w-full object-contain" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Bem-vindo a Andromeda para Salões</h1>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">Vamos configurar seu salão em poucos passos</p>
        </div>

        <div className="flex justify-center mb-6 sm:mb-8">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all ${
                step >= s.number 
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 border-transparent text-white" 
                  : "bg-white border-slate-200 text-slate-400"
              }`}>
                {step > s.number ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : <s.icon className="h-4 w-4 sm:h-5 sm:w-5" />}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-1 mx-1 sm:mx-2 rounded transition-all ${
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
                    <div className="space-y-3">
                      <Input
                        placeholder="Nome do profissional"
                        value={member.name}
                        onChange={(e) => updateStaffMember(index, "name", e.target.value)}
                        data-testid={`input-staff-name-${index}`}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {!member.customRole ? (
                          <Select
                            value={member.role}
                            onValueChange={(value) => {
                              if (value === "__other__") {
                                const updated = [...staffMembers];
                                updated[index].customRole = true;
                                updated[index].role = "";
                                setStaffMembers(updated);
                              } else {
                                const updated = [...staffMembers];
                                updated[index].role = value;
                                updated[index].customRole = false;
                                setStaffMembers(updated);
                              }
                            }}
                          >
                            <SelectTrigger data-testid={`select-staff-role-${index}`}>
                              <SelectValue placeholder="Selecione a função" />
                            </SelectTrigger>
                            <SelectContent>
                              {defaultRoles.map((role) => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                              ))}
                              <SelectItem value="__other__">+ Outros</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="flex gap-2">
                            <Input
                              placeholder="Digite a função"
                              value={member.role}
                              onChange={(e) => updateStaffMember(index, "role", e.target.value)}
                              data-testid={`input-staff-role-custom-${index}`}
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const updated = [...staffMembers];
                                updated[index].customRole = false;
                                updated[index].role = "";
                                setStaffMembers(updated);
                              }}
                              className="px-2"
                            >
                              ✕
                            </Button>
                          </div>
                        )}
                        {!member.customSpecialty ? (
                          <Select
                            value={member.specialty}
                            onValueChange={(value) => {
                              if (value === "__other__") {
                                const updated = [...staffMembers];
                                updated[index].customSpecialty = true;
                                updated[index].specialty = "";
                                setStaffMembers(updated);
                              } else {
                                const updated = [...staffMembers];
                                updated[index].specialty = value;
                                updated[index].customSpecialty = false;
                                setStaffMembers(updated);
                              }
                            }}
                          >
                            <SelectTrigger data-testid={`select-staff-specialty-${index}`}>
                              <SelectValue placeholder="Selecione a especialidade" />
                            </SelectTrigger>
                            <SelectContent>
                              {defaultSpecialties.map((spec) => (
                                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                              ))}
                              <SelectItem value="__other__">+ Outros</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="flex gap-2">
                            <Input
                              placeholder="Digite a especialidade"
                              value={member.specialty}
                              onChange={(e) => updateStaffMember(index, "specialty", e.target.value)}
                              data-testid={`input-staff-specialty-custom-${index}`}
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const updated = [...staffMembers];
                                updated[index].customSpecialty = false;
                                updated[index].specialty = "";
                                setStaffMembers(updated);
                              }}
                              className="px-2"
                            >
                              ✕
                            </Button>
                          </div>
                        )}
                      </div>
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
