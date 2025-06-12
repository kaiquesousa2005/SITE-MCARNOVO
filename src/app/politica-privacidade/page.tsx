import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Shield, Eye, Lock, Users, FileText, Clock, Mail, Phone } from "lucide-react"
import "../styles/Legal.css"

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="legal-page-main">
        <div className="legal-page-container">
          <div className="legal-page-header">
            <div className="legal-page-icon">
              <Shield size={32} />
            </div>
            <h1 className="legal-page-title">Política de Privacidade</h1>
            <p className="legal-page-subtitle">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>
          </div>

          <div className="legal-page-content">
            <section className="legal-section">
              <h2 className="legal-section-title">
                <Eye size={20} />
                1. Informações Gerais
              </h2>
              <p>
                A <strong>MCar Veículos</strong>, pessoa jurídica de direito privado, com sede na Avenida Américo
                Barreira, 5626, Democrito Rocha, Fortaleza - CE, inscrita no CNPJ sob o nº 23.760.314/0001-98, doravante
                denominada MCar, está comprometida com a proteção da privacidade e dos dados pessoais de seus
                usuários.
              </p>
              <p>
                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações
                pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018) e demais
                legislações aplicáveis.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <FileText size={20} />
                2. Dados Coletados
              </h2>
              <h3>2.1 Dados fornecidos voluntariamente:</h3>
              <ul>
                <li>Nome completo</li>
                <li>CPF</li>
                <li>Data de nascimento</li>
                <li>Telefone/WhatsApp</li>
                <li>Endereço de e-mail</li>
                <li>Informações sobre interesse em veículos</li>
                <li>Dados para simulação de financiamento</li>
              </ul>

              <h3>2.2 Dados coletados automaticamente:</h3>
              <ul>
                <li>Endereço IP</li>
                <li>Informações do navegador e dispositivo</li>
                <li>Páginas visitadas e tempo de permanência</li>
                <li>Cookies e tecnologias similares</li>
                <li>Localização aproximada (quando autorizada)</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Users size={20} />
                3. Finalidades do Tratamento
              </h2>
              <p>Utilizamos seus dados pessoais para as seguintes finalidades:</p>
              <ul>
                <li>
                  <strong>Atendimento ao cliente:</strong> Responder dúvidas, fornecer informações sobre veículos e
                  serviços
                </li>
                <li>
                  <strong>Simulação de financiamento:</strong> Processar solicitações de financiamento junto aos bancos
                  parceiros
                </li>
                <li>
                  <strong>Comunicação:</strong> Enviar informações sobre novos veículos, promoções e atualizações
                </li>
                <li>
                  <strong>Melhoria dos serviços:</strong> Analisar o uso do site para aprimorar a experiência do usuário
                </li>
                <li>
                  <strong>Cumprimento legal:</strong> Atender obrigações legais e regulamentares
                </li>
                <li>
                  <strong>Marketing:</strong> Personalizar conteúdo e anúncios (mediante consentimento)
                </li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Lock size={20} />
                4. Base Legal
              </h2>
              <p>O tratamento de seus dados pessoais é fundamentado nas seguintes bases legais:</p>
              <ul>
                <li>
                  <strong>Consentimento:</strong> Para envio de comunicações de marketing e uso de cookies não
                  essenciais
                </li>
                <li>
                  <strong>Execução de contrato:</strong> Para processar solicitações de financiamento e venda de
                  veículos
                </li>
                <li>
                  <strong>Interesse legítimo:</strong> Para melhoria dos serviços e segurança do site
                </li>
                <li>
                  <strong>Cumprimento de obrigação legal:</strong> Para atender exigências legais e regulamentares
                </li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Users size={20} />
                5. Compartilhamento de Dados
              </h2>
              <p>Seus dados pessoais podem ser compartilhados com:</p>
              <ul>
                <li>
                  <strong>Bancos e instituições financeiras:</strong> Para processamento de financiamentos (mediante
                  autorização)
                </li>
                <li>
                  <strong>Prestadores de serviços:</strong> Empresas que nos auxiliam na operação do site e serviços
                </li>
                <li>
                  <strong>Autoridades competentes:</strong> Quando exigido por lei ou ordem judicial
                </li>
                <li>
                  <strong>Parceiros comerciais:</strong> Apenas com seu consentimento expresso
                </li>
              </ul>
              <p>
                <strong>
                  Não vendemos, alugamos ou comercializamos seus dados pessoais com terceiros para fins comerciais.
                </strong>
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Clock size={20} />
                6. Retenção de Dados
              </h2>
              <p>Mantemos seus dados pessoais pelo tempo necessário para:</p>
              <ul>
                <li>Cumprir as finalidades descritas nesta política</li>
                <li>Atender obrigações legais (até 5 anos após o último contato)</li>
                <li>Resolver disputas e fazer cumprir nossos acordos</li>
                <li>Exercer direitos em processos judiciais</li>
              </ul>
              <p>
                Após esse período, os dados serão eliminados de forma segura, exceto quando a manutenção for exigida por
                lei.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Shield size={20} />
                7. Segurança dos Dados
              </h2>
              <p>Implementamos medidas técnicas e organizacionais para proteger seus dados:</p>
              <ul>
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controle de acesso restrito aos dados</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Treinamento regular da equipe</li>
                <li>Backup seguro e recuperação de dados</li>
                <li>Auditorias periódicas de segurança</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <FileText size={20} />
                8. Seus Direitos
              </h2>
              <p>Conforme a LGPD, você tem os seguintes direitos:</p>
              <ul>
                <li>
                  <strong>Confirmação e acesso:</strong> Saber se tratamos seus dados e acessá-los
                </li>
                <li>
                  <strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados
                </li>
                <li>
                  <strong>Anonimização ou eliminação:</strong> Solicitar a remoção de dados desnecessários
                </li>
                <li>
                  <strong>Portabilidade:</strong> Receber seus dados em formato estruturado
                </li>
                <li>
                  <strong>Informação:</strong> Saber com quem compartilhamos seus dados
                </li>
                <li>
                  <strong>Revogação do consentimento:</strong> Retirar autorização a qualquer momento
                </li>
                <li>
                  <strong>Oposição:</strong> Opor-se ao tratamento em certas situações
                </li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Eye size={20} />
                9. Cookies e Tecnologias Similares
              </h2>
              <p>Utilizamos cookies para:</p>
              <ul>
                <li>
                  <strong>Cookies essenciais:</strong> Garantir o funcionamento básico do site
                </li>
                <li>
                  <strong>Cookies de análise:</strong> Entender como você usa nosso site (Google Analytics)
                </li>
                <li>
                  <strong>Cookies de marketing:</strong> Personalizar anúncios (Facebook Pixel, Google Ads)
                </li>
                <li>
                  <strong>Cookies de preferências:</strong> Lembrar suas configurações
                </li>
              </ul>
              <p>
                Você pode gerenciar suas preferências de cookies através do banner que aparece em sua primeira visita ou
                nas configurações do seu navegador.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Mail size={20} />
                10. Contato e Exercício de Direitos
              </h2>
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, entre em contato
                conosco:
              </p>
              <div className="legal-contact-info">
                <div className="legal-contact-item">
                  <Mail size={16} />
                  <span>E-mail: mcarveiculos2015@gmail.com</span>
                </div>
                <div className="legal-contact-item">
                  <Phone size={16} />
                  <span>Telefone: (85) 3232-4632</span>
                </div>
                <div className="legal-contact-item">
                  <Users size={16} />
                  <span>Endereço: Av. Américo Barreira, 5626 - Democrito Rocha, Fortaleza - CE</span>
                </div>
              </div>
              <p>
                <strong>Prazo de resposta:</strong> Responderemos sua solicitação em até 15 dias úteis, podendo ser
                prorrogado por mais 15 dias mediante justificativa.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Clock size={20} />
                11. Alterações nesta Política
              </h2>
              <p>
                Esta Política de Privacidade pode ser atualizada periodicamente. Quando isso ocorrer, notificaremos você
                através do site ou por e-mail. A data da última atualização sempre estará indicada no início deste
                documento.
              </p>
              <p>
                Recomendamos que você revise esta política regularmente para se manter informado sobre como protegemos
                seus dados.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Shield size={20} />
                12. Legislação Aplicável
              </h2>
              <p>
                Esta Política de Privacidade é regida pela legislação brasileira, especialmente pela Lei Geral de
                Proteção de Dados (LGPD - Lei 13.709/2018) e pelo Marco Civil da Internet (Lei 12.965/2014).
              </p>
              <p>
                Qualquer controvérsia decorrente desta política será submetida ao foro da comarca de Fortaleza/CE, com
                renúncia expressa a qualquer outro, por mais privilegiado que seja.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
