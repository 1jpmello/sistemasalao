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

export default function AppMiniSite() {
  const [copied, setCopied] = useState(false);
  const siteUrl = "https://seusalao.andromeda.app";

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Mini Site</h2>
            <p className="text-slate-400">Seu site de agendamento personalizado para clientes.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700" data-testid="button-preview">
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </Button>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white" data-testid="button-edit-site">
              <Edit className="h-4 w-4 mr-2" />
              Editar Site
            </Button>
          </div>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Seu link de agendamento</p>
                  <p className="font-bold text-white">{siteUrl}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700"
                  onClick={handleCopy}
                  data-testid="button-copy-link"
                >
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700"
                  data-testid="button-open-link"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700"
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
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Personalização</CardTitle>
              <CardDescription className="text-slate-400">Configure a aparência do seu site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="font-medium text-white">Cores do Tema</p>
                    <p className="text-sm text-slate-400">Personalize as cores do seu site</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700" data-testid="button-edit-colors">
                  Editar
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                <div className="flex items-center gap-3">
                  <Image className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="font-medium text-white">Logo e Imagens</p>
                    <p className="text-sm text-slate-400">Adicione seu logo e fotos do salão</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700" data-testid="button-edit-images">
                  Editar
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                <div className="flex items-center gap-3">
                  <Type className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="font-medium text-white">Textos e Descrições</p>
                    <p className="text-sm text-slate-400">Edite os textos do seu site</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700" data-testid="button-edit-texts">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Preview</CardTitle>
              <CardDescription className="text-slate-400">Veja como seu site aparece para os clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700" data-testid="button-preview-desktop">
                  <Monitor className="h-4 w-4 mr-2" />
                  Desktop
                </Button>
                <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700" data-testid="button-preview-mobile">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </Button>
              </div>
              <div className="aspect-video rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-12 w-12 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500">Preview do seu site</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Estatísticas</CardTitle>
            <CardDescription className="text-slate-400">Acompanhe o desempenho do seu site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-4 gap-6">
              {[
                { label: "Visitas Hoje", value: "47" },
                { label: "Visitas Semana", value: "312" },
                { label: "Agendamentos", value: "28" },
                { label: "Taxa Conversão", value: "8.9%" },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
