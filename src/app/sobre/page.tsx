"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import {
  Shield,
  Award,
  Users,
  Clock,
  MapPin,
  Phone,
  Star,
  CheckCircle,
  Car,
  MessageCircle,
  ArrowRight,
} from "lucide-react"
import "../styles/Sobre.css"

export default function SobrePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const whatsappNumber = "558532324632"
  const handleWhatsAppClick = () => {
    const message = "Olá! Vim através da página Sobre e gostaria de mais informações sobre a MCar Veículos."
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const features = [
    {
      icon: Shield,
      title: "Carros Inspecionados",
      description:
        "Cada veículo é submetido a uma rigorosa inspeção para garantir que você dirija com total tranquilidade e segurança.",
    },
    {
      icon: Award,
      title: "Documentação Regularizada",
      description: "Toda a documentação dos veículos é verificada e entregue em dia, sem complicações.",
    },
    {
      icon: Users,
      title: "Atendimento Personalizado",
      description: "Nossa equipe está sempre à disposição para responder suas dúvidas e oferecer a melhor orientação.",
    },
    {
      icon: Car,
      title: "Facilidade no Financiamento",
      description:
        "Trabalhamos com condições de pagamento flexíveis que cabem no seu bolso, facilitando sua conquista.",
    },
  ]

  const testimonials = [
    {
      text: "Maravilha como sempre, sou cliente a mais de 20 anos. Atendimento, qualidade e transparência sempre, parabéns.",
      author: "Grayson Sales",
      rating: 5,
    },
    {
      text: "Empresa maravilhosa, com preços justos. Super indico!",
      author: "Joice Lopes",
      rating: 5,
    },
    {
      text: "Excelente atendimento e carros de qualidade. Recomendo a todos!",
      author: "Carlos Silva",
      rating: 5,
    },
  ]

  const stats = [
    { number: "20+", label: "Anos no Mercado" },
    { number: "3000+", label: "Carros Vendidos" },
    { number: "90%", label: "Clientes Satisfeitos" },
    { number: "4.5/5", label: "Avaliação Google" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="sobre-page-main">
        {/* Hero Section */}
        <section className="sobre-page-hero">
          <div className="sobre-page-hero-content">
            <div className={`sobre-page-hero-text ${isVisible ? "sobre-page-fade-in" : ""}`}>
              <h1 className="sobre-page-hero-title">
                Bem-vindo à <span className="sobre-page-highlight">MCar Veículos</span>
              </h1>
              <p className="sobre-page-hero-subtitle">
                Mais de 20 anos transformando sonhos em realidade através de veículos de qualidade
              </p>
              <div className="sobre-page-hero-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="sobre-page-stat-item">
                    <span className="sobre-page-stat-number">{stat.number}</span>
                    <span className="sobre-page-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="sobre-page-hero-image">
              <Image
                src="/images/foto da frente mcar.jpg"
                alt="Fachada da MCar Veículos"
                fill
                className="sobre-page-hero-img"
                priority
              />
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="sobre-page-historia">
          <div className="sobre-page-container">
            <div className="sobre-page-historia-content">
              <div className="sobre-page-historia-text">
                <h2 className="sobre-page-section-title">Nossa História</h2>
                <p className="sobre-page-text">
                  Na <strong>MCar Veículos</strong>, nossa missão é transformar a compra de carros em uma experiência
                  prazerosa, prática e confiável. Sabemos que adquirir um veículo é mais do que uma compra — é uma
                  conquista que precisa ser acompanhada de segurança e satisfação.
                </p>
                <p className="sobre-page-text">
                  Com mais de <strong>20 anos de experiência</strong> no mercado, oferecemos um serviço que vai além das
                  expectativas. Nosso catálogo conta com uma ampla variedade de veículos seminovos e usados,
                  cuidadosamente selecionados para garantir a mais alta qualidade.
                </p>
                <p className="sobre-page-text">
                  Desde modelos compactos ideais para o dia a dia até SUVs espaçosos e elegantes, aqui você encontra o
                  carro perfeito para o seu estilo de vida.
                </p>
              </div>
              <div className="sobre-page-historia-image">
                <Image
                  src="/images/Antes e depois mcar.jpg"
                  alt="História da MCar Veículos - 20 anos de experiência"
                  fill
                  className="sobre-page-historia-img"
                />
                <div className="sobre-page-historia-overlay">
                  <span className="sobre-page-historia-badge">20+ Anos de Experiência</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Por que escolher */}
        <section className="sobre-page-features">
          <div className="sobre-page-container">
            <h2 className="sobre-page-section-title">Por que escolher a MCar Veículos?</h2>
            <div className="sobre-page-features-grid">
              {features.map((feature, index) => (
                <Card key={index} className="sobre-page-feature-card">
                  <CardContent className="sobre-page-feature-content">
                    <div className="sobre-page-feature-icon">
                      <feature.icon size={32} />
                    </div>
                    <h3 className="sobre-page-feature-title">{feature.title}</h3>
                    <p className="sobre-page-feature-description">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="sobre-page-diferenciais">
          <div className="sobre-page-container">
            <div className="sobre-page-diferenciais-content">
              <div className="sobre-page-diferenciais-text">
                <h2 className="sobre-page-section-title">Nossos Diferenciais</h2>
                <div className="sobre-page-diferenciais-list">
                  <div className="sobre-page-diferencial-item">
                    <CheckCircle className="sobre-page-check-icon" />
                    <div>
                      <h4>Segurança em Primeiro Lugar</h4>
                      <p>
                        Realizamos rigorosa verificação de cada veículo, assegurando que você adquira um carro de
                        confiança.
                      </p>
                    </div>
                  </div>
                  <div className="sobre-page-diferencial-item">
                    <CheckCircle className="sobre-page-check-icon" />
                    <div>
                      <h4>Preços Justos</h4>
                      <p>
                        Acreditamos que qualidade não deve custar uma fortuna. Nossas ofertas são pensadas para atender
                        seu bolso.
                      </p>
                    </div>
                  </div>
                  <div className="sobre-page-diferencial-item">
                    <CheckCircle className="sobre-page-check-icon" />
                    <div>
                      <h4>Atendimento Personalizado</h4>
                      <p>
                        Sua satisfação é nossa prioridade. Nossa equipe está sempre pronta para ouvir suas necessidades.
                      </p>
                    </div>
                  </div>
                  <div className="sobre-page-diferencial-item">
                    <CheckCircle className="sobre-page-check-icon" />
                    <div>
                      <h4>Pagamento Facilitado</h4>
                      <p>Financiamento, cartão em até 18x, à vista, carta de crédito e aceitamos trocas de veículos.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sobre-page-diferenciais-image">
                <Image
                  src="/images/entrega.jpg"
                  alt="Equipe de atendimento da MCar Veículos"
                  fill
                  className="sobre-page-diferenciais-img"
                />
                <div className="sobre-page-diferenciais-overlay">
                  <span className="sobre-page-diferenciais-badge">Compromisso com Você</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="sobre-page-testimonials">
          <div className="sobre-page-container">
            <h2 className="sobre-page-section-title">O que nossos clientes dizem</h2>
            <div className="sobre-page-testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="sobre-page-testimonial-card">
                  <CardContent className="sobre-page-testimonial-content">
                    <div className="sobre-page-testimonial-stars">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="sobre-page-star-filled" />
                      ))}
                    </div>
                    <p className="sobre-page-testimonial-text">&ldquo;{testimonial.text}&rdquo;</p>
                    <cite className="sobre-page-testimonial-author">- {testimonial.author}</cite>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Localização e Contato */}
        <section className="sobre-page-contato">
          <div className="sobre-page-container">
            <div className="sobre-page-contato-content">
              <div className="sobre-page-contato-info">
                <h2 className="sobre-page-section-title">Visite Nossa Loja</h2>
                <div className="sobre-page-contato-details">
                  <div className="sobre-page-contato-item">
                    <MapPin className="sobre-page-contato-icon" />
                    <div>
                      <h4>Endereço</h4>
                      <p>
                        Avenida Américo Barreira, 5626
                        <br />
                        Democrito Rocha, Fortaleza - CE
                      </p>
                    </div>
                  </div>
                  <div className="sobre-page-contato-item">
                    <Clock className="sobre-page-contato-icon" />
                    <div>
                      <h4>Horário de Funcionamento</h4>
                      <p>
                        Segunda à Sexta: 8h às 17h
                        <br />
                        Sábado: 8h às 14h
                      </p>
                    </div>
                  </div>
                  <div className="sobre-page-contato-item">
                    <Phone className="sobre-page-contato-icon" />
                    <div>
                      <h4>Telefone</h4>
                      <p>(85) 3232-4632</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sobre-page-contato-actions">
                <Button onClick={handleWhatsAppClick} className="sobre-page-whatsapp-btn">
                  <MessageCircle size={20} />
                  Falar no WhatsApp
                </Button>
                <Button asChild variant="outline" className="sobre-page-location-btn">
                  <a
                    href="https://www.google.com/maps/place/M+Car+Ve%C3%ADculos/@-3.7610285,-38.5649082,21z/data=!4m14!1m7!3m6!1s0x7c749541ebe7ce7:0x76fcb962f91f2015!2sAvenida+Am%C3%A9rico+Barreira,+5626!8m2!3d-3.76099!4d-38.56484!16s%2Fg%2F11c6_bzl4h!3m5!1s0x7c7495416864d73:0xc9a040168063dc15!8m2!3d-3.7609033!4d-38.5649269!16s%2Fg%2F1ptx3kwkp?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin size={20} />
                    Ver Localização
                  </a>
                </Button>
                <Button asChild variant="outline" className="sobre-page-estoque-btn">
                  <Link href="/estoque">
                    <Car size={20} />
                    Ver Estoque
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
