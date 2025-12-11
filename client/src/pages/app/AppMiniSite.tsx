import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Copy, 
  ExternalLink, 
  Palette, 
  Image, 
  Type, 
  Share2,
  Eye,
  Edit,
  Smartphone,
  Monitor,
  Check
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AppMiniSite() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const siteUrl = "https://seusalao.andromeda.app";

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    toast({ title: "Link copiado!", description: siteUrl });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600">Mini Site</h2>
            <p className="text-slate-500">Seu site de agendamento personalizado para clientes.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50" data-testid="button-preview">
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </Button>
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 font-bold" data-testid="button-edit-site">
              <Edit className="h-4 w-4 mr-2" />
              Editar Site
            </Button>
          </div>
        </div>

        <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Seu link de agendamento</p>
                  <p className="font-bold text-slate-900">{siteUrl}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  onClick={handleCopy}
                  data-testid="button-copy-link"
                >
                  {copied ? <Check className="h-4 w-4 mr-2 text-emerald-600" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  data-testid="button-open-link"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  data-testid="button-share-link"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50">
            <CardHeader>
              <CardTitle className="text-slate-900">Personalização</CardTitle>
              <CardDescription className="text-slate-500">Configure a aparência do seu site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-cyan-600" />
                  <div>
                    <p className="font-medium text-slate-900">Cores do Tema</p>
                    <p className="text-sm text-slate-500">Personalize as cores do seu site</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50" data-testid="button-edit-colors">
                  Editar
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <Image className="h-5 w-5 text-cyan-600" />
                  <div>
                    <p className="font-medium text-slate-900">Logo e Imagens</p>
                    <p className="text-sm text-slate-500">Adicione seu logo e fotos do salão</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50" data-testid="button-edit-images">
                  Editar
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <Type className="h-5 w-5 text-cyan-600" />
                  <div>
                    <p className="font-medium text-slate-900">Textos e Descrições</p>
                    <p className="text-sm text-slate-500">Edite os textos do seu site</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50" data-testid="button-edit-texts">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50">
            <CardHeader>
              <CardTitle className="text-slate-900">Preview</CardTitle>
              <CardDescription className="text-slate-500">Veja como seu site aparece para os clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50" data-testid="button-preview-desktop">
                  <Monitor className="h-4 w-4 mr-2" />
                  Desktop
                </Button>
                <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50" data-testid="button-preview-mobile">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </Button>
              </div>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-12 w-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-400">Preview do seu site</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50">
          <CardHeader>
            <CardTitle className="text-slate-900">Estatísticas</CardTitle>
            <CardDescription className="text-slate-500">Acompanhe o desempenho do seu site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-4 gap-6">
              {[
                { label: "Visitas Hoje", value: "47", color: "text-cyan-600" },
                { label: "Visitas Semana", value: "312", color: "text-blue-600" },
                { label: "Agendamentos", value: "28", color: "text-emerald-600" },
                { label: "Taxa Conversão", value: "8.9%", color: "text-purple-600" },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
