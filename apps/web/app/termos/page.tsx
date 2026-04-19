import Link from "next/link";
import { ArrowLeft, Shield, FileText, Scale, Lock } from "lucide-react";

export const metadata = {
  title: "Termos de Serviço - Restech AI",
  description: "Termos de Serviço e condições de uso da plataforma Restech AI",
};

export default function TermosPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o início</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Termos de Serviço</h1>
          <p className="text-slate-400">
            Última atualização: 19 de Abril de 2025
          </p>
        </div>

        {/* Content */}
        <div className="glass rounded-3xl p-8 md:p-12 space-y-8">
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-indigo-400" />
              <h2 className="text-2xl font-semibold">1. Aceitação dos Termos</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Ao acessar e utilizar a plataforma Restech AI, você concorda em cumprir
              e estar vinculado aos seguintes Termos de Serviço. Se você não concordar
              com qualquer parte destes termos, não deverá utilizar nossos serviços.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-indigo-400" />
              <h2 className="text-2xl font-semibold">2. Descrição do Serviço</h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">
              A Restech AI é uma plataforma de inteligência artificial que auxilia
              na criação de conteúdo digital, incluindo:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Criação de produtos digitais</li>
              <li>Geração de posts para redes sociais</li>
              <li>Criação de anúncios publicitários</li>
              <li>Assistente de vendas virtual</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-indigo-400" />
              <h2 className="text-2xl font-semibold">3. Assinaturas e Pagamentos</h2>
            </div>
            <div className="space-y-4 text-slate-300">
              <p className="leading-relaxed">
                <strong className="text-white">3.1.</strong> O acesso às funcionalidades
                completas da plataforma requer uma assinatura ativa. Oferecemos três
                planos: Mensal, Semestral e Anual.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">3.2.</strong> Os valores dos planos
                estão sujeitos a alterações. Descontos especiais podem ser aplicados
                para pagamentos semestrais e anuais.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">3.3.</strong> O cancelamento pode ser
                realizado a qualquer momento, mas não haverá reembolso proporcional
                pelo período restante.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">3.4.</strong> O não pagamento da
                assinatura resultará no bloqueio do acesso às funcionalidades
                pagas até a regularização.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Conta do Usuário</h2>
            <div className="space-y-4 text-slate-300">
              <p className="leading-relaxed">
                <strong className="text-white">4.1.</strong> Você é responsável por
                manter a confidencialidade de suas credenciais de acesso.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">4.2.</strong> Não é permitido
                compartilhar contas ou permitir o acesso de terceiros à sua conta.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">4.3.</strong> Reservamo-nos o direito
                de suspender ou encerrar contas que violem estes termos.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Propriedade Intelectual</h2>
            <p className="text-slate-300 leading-relaxed">
              Todo o conteúdo gerado através da plataforma é de propriedade do usuário
              que o criou. No entanto, concedemos a nós mesmos uma licença para usar
              o conteúdo anonimizado para melhorar nossos algoritmos e modelos de IA.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Limitação de Responsabilidade</h2>
            <p className="text-slate-300 leading-relaxed">
              A Restech AI não garante resultados específicos de vendas, engajamento
              ou conversão. O sucesso depende de diversos fatores externos além do
              nosso controle.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Modificações dos Termos</h2>
            <p className="text-slate-300 leading-relaxed">
              Podemos modificar estes Termos de Serviço a qualquer momento. As
              alterações entrarão em vigor imediatamente após a publicação. O uso
              continuado da plataforma constitui aceitação dos termos modificados.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contato</h2>
            <p className="text-slate-300 leading-relaxed">
              Para dúvidas sobre estes Termos de Serviço, entre em contato através
              do e-mail: suporte@restech.ai
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="btn btn-primary"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
