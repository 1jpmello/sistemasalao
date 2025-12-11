import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, HelpCircle, BookOpen, Video, ExternalLink } from "lucide-react";

export default function AppSupport() {
  const whatsappNumber = "5511999999999";
  const whatsappMessage = encodeURIComponent("Olá! Preciso de ajuda com o sistema Andromeda.");

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600">Suporte</h2>
          <p className="text-slate-500">Estamos aqui para ajudar você.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 hover:shadow-2xl transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="h-14 w-14 rounded-2xl bg-green-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">WhatsApp</h3>
              <p className="text-slate-500 text-sm mb-4">Fale diretamente com nossa equipe pelo WhatsApp.</p>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank')}
                data-testid="button-whatsapp-support"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Iniciar Conversa
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 hover:shadow-2xl transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">E-mail</h3>
              <p className="text-slate-500 text-sm mb-4">Envie sua dúvida por e-mail e responderemos em até 24h.</p>
              <Button 
                variant="outline"
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                onClick={() => window.location.href = 'mailto:suporte@andromeda.com.br'}
                data-testid="button-email-support"
              >
                <Mail className="h-4 w-4 mr-2" />
                suporte@andromeda.com.br
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 hover:shadow-2xl transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="h-14 w-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Telefone</h3>
              <p className="text-slate-500 text-sm mb-4">Ligue para nossa central de atendimento.</p>
              <Button 
                variant="outline"
                className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
                data-testid="button-phone-support"
              >
                <Phone className="h-4 w-4 mr-2" />
                (11) 9999-9999
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-cyan-600" />
              Perguntas Frequentes
            </CardTitle>
            <CardDescription className="text-slate-500">Encontre respostas rápidas para as dúvidas mais comuns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { q: "Como adicionar um novo profissional?", a: "Vá em 'Profissionais' no menu lateral e clique em 'Novo Profissional'." },
              { q: "Como configurar automações de WhatsApp?", a: "Acesse a aba 'Marketing' e clique nas sugestões de automação para ativá-las." },
              { q: "Como cadastrar novos serviços?", a: "Na aba 'Serviços', clique em 'Novo Serviço' e preencha as informações." },
              { q: "Como ver os relatórios financeiros?", a: "Acesse a aba 'Financeiro' para visualizar faturamento, comissões e relatórios." },
            ].map((faq, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100" data-testid={`faq-${i}`}>
                <h4 className="font-medium text-slate-900 mb-1">{faq.q}</h4>
                <p className="text-sm text-slate-500">{faq.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-cyan-50 to-blue-50 hover:shadow-2xl transition-all">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <Video className="h-7 w-7 text-cyan-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">Tutoriais em Vídeo</h3>
                <p className="text-slate-600 text-sm">Aprenda a usar todas as funcionalidades</p>
              </div>
              <Button variant="ghost" className="text-cyan-600 hover:bg-cyan-100" data-testid="button-tutorials">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-slate-200/50 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-all">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <BookOpen className="h-7 w-7 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">Central de Ajuda</h3>
                <p className="text-slate-600 text-sm">Documentação completa do sistema</p>
              </div>
              <Button variant="ghost" className="text-purple-600 hover:bg-purple-100" data-testid="button-help-center">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
