"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Calculator,
  MessageCircle,
  User,
  Phone,
  Mail,
  Car,
  Calendar,
  CheckCircle,
  ArrowLeft,
  Info,
  FileText,
  Shield,
} from "lucide-react"

interface SimulationData {
  // Dados do Veículo (preenchidos automaticamente)
  marca: string
  modelo: string
  versao: string
  ano: string
  cor: string
  preco: string

  // Dados Pessoais
  nomeCompleto: string
  cpf: string
  dataNascimento: string
  telefone: string
  email: string
  possuiCNH: boolean

  // Observações
  observacoes: string
}

export default function SimulacaoForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState<SimulationData>({
    // Dados do Veículo
    marca: "",
    modelo: "",
    versao: "",
    ano: "",
    cor: "",
    preco: "",

    // Dados Pessoais
    nomeCompleto: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    email: "",
    possuiCNH: false,

    // Observações
    observacoes: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  // Preencher dados do veículo automaticamente se vier da página de detalhes
  useEffect(() => {
    const marca = searchParams.get("marca")
    const modelo = searchParams.get("modelo")
    const versao = searchParams.get("versao")
    const ano = searchParams.get("ano")
    const cor = searchParams.get("cor")
    const preco = searchParams.get("preco")

    if (marca && modelo) {
      setFormData((prev) => ({
        ...prev,
        marca: marca || "",
        modelo: modelo || "",
        versao: versao || "",
        ano: ano || "",
        cor: cor || "Não informado",
        preco: preco ? `R$ ${Number(preco).toLocaleString("pt-BR")}` : "",
      }))
    }
  }, [searchParams])

  const handleInputChange = (field: keyof SimulationData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const formatPhone = (value: string) => {
    const numericValue = value.replace(/\D/g, "")
    if (numericValue.length <= 11) {
      return numericValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }
    return value
  }

  const formatCPF = (value: string) => {
    const numericValue = value.replace(/\D/g, "")
    if (numericValue.length <= 11) {
      return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }
    return value
  }

  const formatDate = (value: string) => {
    const numericValue = value.replace(/\D/g, "")
    if (numericValue.length <= 8) {
      return numericValue.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")
    }
    return value
  }

  const whatsappNumber = "558532324632"
  const handleSubmit = () => {
    setIsSubmitting(true)

    const message = `🚗 *SOLICITAÇÃO DE SIMULAÇÃO DE FINANCIAMENTO*
*MCar Veículos*

🚙 *DADOS DO VEÍCULO:*
• Marca: ${formData.marca}
• Modelo: ${formData.modelo}
• Versão: ${formData.versao}
• Ano: ${formData.ano}
• Cor: ${formData.cor}
• Preço: ${formData.preco}

👤 *DADOS PESSOAIS:*
• Nome Completo: ${formData.nomeCompleto}
• CPF: ${formData.cpf}
• Data de Nascimento: ${formData.dataNascimento}
• Telefone: ${formData.telefone}
• Email: ${formData.email}
• Possui CNH: ${formData.possuiCNH ? "Sim" : "Não"}

📝 *OBSERVAÇÕES:*
${formData.observacoes || "Nenhuma observação adicional"}

---
*Solicitação enviada através do site da MCar Veículos*
*Aguardo contato para simulação nos bancos parceiros*`

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")

    setTimeout(() => {
      setIsSubmitting(false)
      // Opcional: redirecionar ou mostrar mensagem de sucesso
    }, 2000)
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.nomeCompleto && formData.cpf && formData.dataNascimento
      case 2:
        return formData.telefone && formData.email
      default:
        return false
    }
  }

  const nextStep = () => {
    if (currentStep < 2 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="simulacao-page-hero">
        <div className="simulacao-page-hero-content">
          <Button onClick={() => router.back()} variant="ghost" className="simulacao-page-back-btn">
            <ArrowLeft size={16} />
            Voltar
          </Button>
          <h1 className="simulacao-page-hero-title">
            <Calculator className="simulacao-page-hero-icon" />
            Simulação de Financiamento
          </h1>
          <p className="simulacao-page-hero-subtitle">
            Preencha seus dados e nossa equipe entrará em contato com a melhor simulação
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="simulacao-page-progress">
        <div className="simulacao-page-container">
          <div className="simulacao-page-progress-bar">
            {[1, 2].map((step) => (
              <div
                key={step}
                className={`simulacao-page-progress-step ${
                  step <= currentStep ? "active" : ""
                } ${step < currentStep ? "completed" : ""}`}
              >
                <div className="simulacao-page-progress-circle">
                  {step < currentStep ? <CheckCircle size={16} /> : <span>{step}</span>}
                </div>
                <span className="simulacao-page-progress-label">
                  {step === 1 && "Dados Pessoais"}
                  {step === 2 && "Contato & Finalizar"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="simulacao-page-form-section">
        <div className="simulacao-page-container">
          <div className="simulacao-page-form-grid">
            {/* Form */}
            <Card className="simulacao-page-form-card">
              <CardHeader>
                <CardTitle className="simulacao-page-form-title">
                  {currentStep === 1 && "Dados Pessoais"}
                  {currentStep === 2 && "Contato & Finalizar"}
                </CardTitle>
              </CardHeader>
              <CardContent className="simulacao-page-form-content">
                {/* Step 1: Dados Pessoais */}
                {currentStep === 1 && (
                  <div className="simulacao-page-form-step">
                    <div className="simulacao-page-form-group">
                      <label className="simulacao-page-form-label">
                        <User size={16} />
                        Nome Completo *
                      </label>
                      <Input
                        type="text"
                        placeholder="Digite seu nome completo"
                        value={formData.nomeCompleto}
                        onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
                        className="simulacao-page-form-input"
                      />
                    </div>

                    <div className="simulacao-page-form-group">
                      <label className="simulacao-page-form-label">
                        <FileText size={16} />
                        CPF *
                      </label>
                      <Input
                        type="text"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange("cpf", formatCPF(e.target.value))}
                        className="simulacao-page-form-input"
                        maxLength={14}
                      />
                    </div>

                    <div className="simulacao-page-form-group">
                      <label className="simulacao-page-form-label">
                        <Calendar size={16} />
                        Data de Nascimento *
                      </label>
                      <Input
                        type="text"
                        placeholder="DD/MM/AAAA"
                        value={formData.dataNascimento}
                        onChange={(e) => handleInputChange("dataNascimento", formatDate(e.target.value))}
                        className="simulacao-page-form-input"
                        maxLength={10}
                      />
                    </div>

                    <div className="simulacao-page-form-group">
                      <div className="simulacao-page-checkbox-group">
                        <Checkbox
                          id="cnh"
                          checked={formData.possuiCNH}
                          onCheckedChange={(checked) => handleInputChange("possuiCNH", checked as boolean)}
                          className="simulacao-page-checkbox"
                        />
                        <label htmlFor="cnh" className="simulacao-page-checkbox-label">
                          <Shield size={16} />
                          Possuo CNH (Carteira Nacional de Habilitação)
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Contato & Finalizar */}
                {currentStep === 2 && (
                  <div className="simulacao-page-form-step">
                    <div className="simulacao-page-form-group">
                      <label className="simulacao-page-form-label">
                        <Phone size={16} />
                        Telefone/WhatsApp *
                      </label>
                      <Input
                        type="tel"
                        placeholder="(85) 99999-9999"
                        value={formData.telefone}
                        onChange={(e) => handleInputChange("telefone", formatPhone(e.target.value))}
                        className="simulacao-page-form-input"
                      />
                    </div>

                    <div className="simulacao-page-form-group">
                      <label className="simulacao-page-form-label">
                        <Mail size={16} />
                        Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="simulacao-page-form-input"
                      />
                    </div>

                    <div className="simulacao-page-form-group">
                      <label className="simulacao-page-form-label">
                        <Info size={16} />
                        Observações (Opcional)
                      </label>
                      <textarea
                        placeholder="Informações adicionais, dúvidas ou preferências sobre o financiamento..."
                        value={formData.observacoes}
                        onChange={(e) => handleInputChange("observacoes", e.target.value)}
                        className="simulacao-page-form-textarea"
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="simulacao-page-form-navigation">
                  {currentStep > 1 && (
                    <Button onClick={prevStep} variant="outline" className="simulacao-page-btn-prev">
                      Anterior
                    </Button>
                  )}

                  {currentStep < 2 ? (
                    <Button onClick={nextStep} disabled={!isStepValid(currentStep)} className="simulacao-page-btn-next">
                      Próximo
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!isStepValid(currentStep) || isSubmitting}
                      className="simulacao-page-btn-submit"
                    >
                      <MessageCircle size={16} />
                      {isSubmitting ? "Enviando..." : "Solicitar Simulação"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Info & Summary */}
            <div className="simulacao-page-sidebar">
              {/* Vehicle Info Card */}
              {formData.marca && formData.modelo && (
                <Card className="simulacao-page-vehicle-card">
                  <CardHeader>
                    <CardTitle className="simulacao-page-vehicle-title">
                      <Car size={20} />
                      Veículo Selecionado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="simulacao-page-vehicle-content">
                    <div className="simulacao-page-vehicle-info">
                      <h3 className="simulacao-page-vehicle-name">
                        {formData.marca} {formData.modelo}
                      </h3>
                      <p className="simulacao-page-vehicle-version">{formData.versao}</p>

                      <div className="simulacao-page-vehicle-details">
                        <div className="simulacao-page-vehicle-detail">
                          <span className="simulacao-page-vehicle-label">Ano:</span>
                          <span className="simulacao-page-vehicle-value">{formData.ano}</span>
                        </div>
                        <div className="simulacao-page-vehicle-detail">
                          <span className="simulacao-page-vehicle-label">Cor:</span>
                          <span className="simulacao-page-vehicle-value">{formData.cor}</span>
                        </div>
                        {formData.preco && (
                          <div className="simulacao-page-vehicle-detail price">
                            <span className="simulacao-page-vehicle-label">Preço:</span>
                            <span className="simulacao-page-vehicle-price">{formData.preco}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Info Card */}
              <Card className="simulacao-page-info-card">
                <CardHeader>
                  <CardTitle className="simulacao-page-info-title">
                    <Info size={20} />
                    Como Funciona
                  </CardTitle>
                </CardHeader>
                <CardContent className="simulacao-page-info-content">
                  <div className="simulacao-page-info-steps">
                    <div className="simulacao-page-info-step">
                      <div className="simulacao-page-info-step-number">1</div>
                      <div className="simulacao-page-info-step-text">
                        <strong>Preencha seus dados</strong>
                        <p>Complete o formulário com suas informações pessoais</p>
                      </div>
                    </div>

                    <div className="simulacao-page-info-step">
                      <div className="simulacao-page-info-step-number">2</div>
                      <div className="simulacao-page-info-step-text">
                        <strong>Envie via WhatsApp</strong>
                        <p>Seus dados serão enviados diretamente para nossa equipe</p>
                      </div>
                    </div>

                    <div className="simulacao-page-info-step">
                      <div className="simulacao-page-info-step-number">3</div>
                      <div className="simulacao-page-info-step-text">
                        <strong>Receba a simulação</strong>
                        <p>Nossa equipe fará a simulação nos melhores bancos e entrará em contato</p>
                      </div>
                    </div>
                  </div>

                  <div className="simulacao-page-info-note">
                    <Info size={16} />
                    <p>
                      Nossa equipe especializada consultará os melhores bancos parceiros para encontrar as condições
                      ideais para seu perfil.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
