import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { FileText, Users, Shield, AlertTriangle, Scale, Clock, Mail, Phone } from "lucide-react"
import "../styles/Legal.css"

export default function TermosUsoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="legal-page-main">
        <div className="legal-page-container">
          <div className="legal-page-header">
            <div className="legal-page-icon">
              <FileText size={32} />
            </div>
            <h1 className="legal-page-title">Termos de Uso</h1>
            <p className="legal-page-subtitle">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>
          </div>

          <div className="legal-page-content">
            <section className="legal-section">
              <h2 className="legal-section-title">
                <FileText size={20} />
                1. Aceitação dos Termos
              </h2>
              <p>
                Ao acessar e utilizar o site <strong>www.mcarveiculos.com</strong> (Site), você concorda em cumprir e
                ficar vinculado aos presentes Termos de Uso. Se você não concordar com qualquer parte destes termos, não
                deve utilizar nosso site.
              </p>
              <p>
                Estes termos constituem um acordo legal entre você (Usuário) e a <strong>MCar Veículos</strong>,
                pessoa jurídica de direito privado, com sede na Avenida Américo Barreira, 5626, Democrito Rocha,
                Fortaleza - CE.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Users size={20} />
                2. Descrição dos Serviços
              </h2>
              <p>A MCar Veículos oferece através deste site:</p>
              <ul>
                <li>Exposição de veículos seminovos e usados para venda</li>
                <li>Informações detalhadas sobre os veículos disponíveis</li>
                <li>Serviços de simulação de financiamento</li>
                <li>Canal de comunicação para atendimento ao cliente</li>
                <li>Informações sobre a empresa e seus serviços</li>
              </ul>
              <p>
                Os serviços são fornecidos (como estão) e podem ser modificados, suspensos ou descontinuados a qualquer
                momento, sem aviso prévio.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Shield size={20} />
                3. Uso Adequado do Site
              </h2>
              <h3>3.1 Você concorda em:</h3>
              <ul>
                <li>Utilizar o site apenas para fins legais e legítimos</li>
                <li>Fornecer informações verdadeiras, precisas e atualizadas</li>
                <li>Respeitar os direitos de propriedade intelectual</li>
                <li>Não interferir no funcionamento do site</li>
                <li>Manter a confidencialidade de suas credenciais de acesso</li>
              </ul>

              <h3>3.2 É expressamente proibido:</h3>
              <ul>
                <li>Usar o site para atividades ilegais ou não autorizadas</li>
                <li>Transmitir vírus, malware ou códigos maliciosos</li>
                <li>Fazer engenharia reversa ou tentar acessar códigos-fonte</li>
                <li>Coletar dados de outros usuários sem autorização</li>
                <li>Reproduzir, distribuir ou modificar conteúdo sem permissão</li>
                <li>Criar contas falsas ou se passar por terceiros</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <AlertTriangle size={20} />
                4. Informações sobre Veículos
              </h2>
              <p>
                As informações sobre veículos apresentadas no site são fornecidas de boa-fé e baseadas nas informações
                disponíveis no momento da publicação. No entanto:
              </p>
              <ul>
                <li>As especificações podem conter erros ou imprecisões involuntárias</li>
                <li>Os preços estão sujeitos a alterações sem aviso prévio</li>
                <li>A disponibilidade dos veículos não é garantida</li>
                <li>As fotos podem não representar exatamente o veículo específico</li>
                <li>Recomendamos sempre a verificação presencial antes da compra</li>
              </ul>
              <p>
                <strong>
                  A MCar Veículos se reserva o direito de corrigir erros, imprecisões ou omissões a qualquer momento.
                </strong>
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Scale size={20} />
                5. Simulação de Financiamento
              </h2>
              <p>O serviço de simulação de financiamento oferecido no site:</p>
              <ul>
                <li>É meramente informativo e não constitui oferta de crédito</li>
                <li>Depende da aprovação das instituições financeiras parceiras</li>
                <li>Pode ter condições diferentes das apresentadas na simulação</li>
                <li>Está sujeito à análise de crédito e documentação completa</li>
                <li>Não garante a aprovação do financiamento</li>
              </ul>
              <p>
                A MCar Veículos atua apenas como intermediária entre o cliente e as instituições financeiras, não sendo
                responsável pela aprovação ou recusa do crédito.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Shield size={20} />
                6. Propriedade Intelectual
              </h2>
              <p>
                Todo o conteúdo do site, incluindo mas não limitado a textos, imagens, logos, gráficos, vídeos, códigos
                e design, é de propriedade da MCar Veículos ou de seus licenciadores e está protegido por leis de
                direitos autorais e propriedade intelectual.
              </p>
              <p>É vedado:</p>
              <ul>
                <li>Copiar, reproduzir ou distribuir qualquer conteúdo sem autorização</li>
                <li>Usar marcas, logos ou elementos visuais da MCar Veículos</li>
                <li>Criar obras derivadas baseadas no conteúdo do site</li>
                <li>Remover avisos de direitos autorais ou propriedade</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <AlertTriangle size={20} />
                7. Limitação de Responsabilidade
              </h2>
              <p>
                A MCar Veículos não se responsabiliza por danos diretos, indiretos, incidentais, consequenciais ou
                punitivos decorrentes:
              </p>
              <ul>
                <li>Do uso ou impossibilidade de uso do site</li>
                <li>De erros, omissões ou imprecisões no conteúdo</li>
                <li>De interrupções ou falhas técnicas</li>
                <li>De ações de terceiros ou links externos</li>
                <li>De perda de dados ou informações</li>
              </ul>
              <p>
                <strong>
                  Nossa responsabilidade total, em qualquer caso, não excederá o valor pago pelo usuário pelos serviços
                  nos últimos 12 meses.
                </strong>
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Users size={20} />
                8. Links para Sites de Terceiros
              </h2>
              <p>
                Nosso site pode conter links para sites de terceiros. Estes links são fornecidos apenas para
                conveniência e não implicam endosso ou responsabilidade pelo conteúdo desses sites.
              </p>
              <p>
                Recomendamos que você leia os termos de uso e políticas de privacidade de qualquer site de terceiros que
                visitar.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Clock size={20} />
                9. Modificações dos Termos
              </h2>
              <p>
                Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em
                vigor imediatamente após sua publicação no site.
              </p>
              <p>
                É sua responsabilidade revisar periodicamente estes termos. O uso continuado do site após as
                modificações constitui aceitação dos novos termos.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <AlertTriangle size={20} />
                10. Suspensão e Encerramento
              </h2>
              <p>
                Podemos, a nosso exclusivo critério, suspender ou encerrar seu acesso ao site, temporária ou
                permanentemente, por qualquer motivo, incluindo:
              </p>
              <ul>
                <li>Violação destes Termos de Uso</li>
                <li>Uso inadequado ou abusivo do site</li>
                <li>Atividades que possam prejudicar outros usuários</li>
                <li>Solicitação de autoridades competentes</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Scale size={20} />
                11. Lei Aplicável e Jurisdição
              </h2>
              <p>
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa
                decorrente destes termos será submetida à jurisdição exclusiva dos tribunais de Fortaleza/CE.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <Mail size={20} />
                12. Contato
              </h2>
              <p>Para dúvidas, sugestões ou reclamações sobre estes Termos de Uso, entre em contato conosco:</p>
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
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">
                <FileText size={20} />
                13. Disposições Gerais
              </h2>
              <p>
                Se qualquer disposição destes termos for considerada inválida ou inexequível, as demais disposições
                permanecerão em pleno vigor e efeito.
              </p>
              <p>
                Estes Termos de Uso constituem o acordo completo entre você e a MCar Veículos sobre o uso do site,
                substituindo todos os acordos anteriores sobre o assunto.
              </p>
              <p>
                <strong>
                  Ao continuar usando nosso site, você confirma que leu, entendeu e concorda com estes Termos de Uso.
                </strong>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
