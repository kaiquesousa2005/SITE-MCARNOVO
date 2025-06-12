"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import type { Vehicle } from "@/types/vehicle"
import { ArrowLeft, MessageCircle, Phone, Calendar, Gauge, Fuel, Settings, Car, Shield, Key, FileText, MapPin, Clock, Star, ChevronLeft, ChevronRight, X, Share2, Heart, Calculator, PaletteIcon, TagIcon, Percent } from 'lucide-react'
import "@/app/styles/Detalhes.css"

export default function VehicleDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        if (params.id) {
          const docRef = doc(db, "vehicles", params.id as string)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            const data = docSnap.data()
            setVehicle({
              id: docSnap.id,
              ...data,
              createdAt: data.createdAt?.toDate() || new Date(),
              updatedAt: data.updatedAt?.toDate() || new Date(),
            } as Vehicle)
          } else {
            router.push("/estoque")
          }
        }
      } catch (error) {
        console.error("Erro ao carregar veículo:", error)
        router.push("/estoque")
      } finally {
        setLoading(false)
      }
    }

    loadVehicle()
  }, [params.id, router])

  const formatPrice = (price?: number) => {
    if (!price) return "Consulte o preço"
    return `R$ ${price.toLocaleString("pt-BR")}`
  }

  const calculateDiscountPercentage = () => {
    if (!vehicle?.preco || !vehicle?.precoOferta) return 0
    const discount = vehicle.preco - vehicle.precoOferta
    return Math.round((discount / vehicle.preco) * 100)
  }

  const whatsappNumber = "558532324632"
  const handleWhatsAppClick = () => {
    if (vehicle) {
      const message = `Olá! Vim através do site e gostaria de mais informações sobre o ${vehicle.marca} ${vehicle.modelo} ${vehicle.versao} ${vehicle.ano}. Link: ${window.location.href}`
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
      window.open(url, "_blank")
    }
  }

  const handleCallClick = () => {
    window.open("tel:+5585323246432", "_self")
  }

  const handleSimulationClick = () => {
    if (vehicle) {
      // Create URL with vehicle data as query parameters
      const vehicleData = {
        marca: vehicle.marca,
        modelo: vehicle.modelo,
        versao: vehicle.versao,
        ano: vehicle.ano,
        cor: vehicle.cor || "Não informado",
        preco: vehicle.emOferta ? vehicle.precoOferta : vehicle.preco,
      }

      const queryParams = new URLSearchParams(vehicleData as any).toString()
      router.push(`/simulacao?${queryParams}`)
    } else {
      router.push("/simulacao")
    }
  }

  const handleShare = async () => {
    if (navigator.share && vehicle) {
      try {
        await navigator.share({
          title: `${vehicle.marca} ${vehicle.modelo} ${vehicle.versao}`,
          text: `Confira este ${vehicle.marca} ${vehicle.modelo} na MCar Veículos`,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback para copiar URL
        navigator.clipboard.writeText(window.location.href)
        alert("Link copiado para a área de transferência!")
      }
    } else {
      // Fallback para navegadores sem suporte
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  const nextImage = () => {
    if (vehicle?.imagens) {
      setCurrentImageIndex((prev) => (prev === vehicle.imagens.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (vehicle?.imagens) {
      setCurrentImageIndex((prev) => (prev === 0 ? vehicle.imagens.length - 1 : prev - 1))
    }
  }

  // Função para processar a descrição em lista
  const formatDescription = (description: string) => {
    if (!description) return []

    // Dividir por quebras de linha, pontos ou vírgulas seguidas de espaço
    const items = description
      .split(/[.\n,;]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0)

    return items
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="veiculos-detalhes-page-loading">
          <div className="veiculos-detalhes-page-spinner"></div>
          <p>Carregando detalhes do veículo...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="veiculos-detalhes-page-not-found">
          <Car size={64} />
          <h2>Veículo não encontrado</h2>
          <p>O veículo que você está procurando não existe ou foi removido.</p>
          <Button onClick={() => router.push("/estoque")}>Voltar ao Estoque</Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="veiculos-detalhes-page-main">
        {/* Breadcrumb e Ações */}
        <section className="veiculos-detalhes-page-header">
          <div className="veiculos-detalhes-page-container">
            <div className="veiculos-detalhes-page-breadcrumb">
              <Button
                onClick={() => router.push("/estoque")}
                variant="ghost"
                className="veiculos-detalhes-page-back-btn"
              >
                <ArrowLeft size={16} />
                Voltar ao Estoque
              </Button>
            </div>

            <div className="veiculos-detalhes-page-actions">
              <Button
                onClick={() => setIsFavorite(!isFavorite)}
                variant="outline"
                className={`veiculos-detalhes-page-favorite-btn ${isFavorite ? "active" : ""}`}
              >
                <Heart size={16} />
                {isFavorite ? "Favoritado" : "Favoritar"}
              </Button>

              <Button onClick={handleShare} variant="outline" className="veiculos-detalhes-page-share-btn">
                <Share2 size={16} />
                Compartilhar
              </Button>
            </div>
          </div>
        </section>

        {/* Galeria de Imagens */}
        <section className="veiculos-detalhes-page-gallery-section">
          <div className="veiculos-detalhes-page-container">
            <div className="veiculos-detalhes-page-gallery">
              {vehicle.imagens && vehicle.imagens.length > 0 ? (
                <>
                  <div className="veiculos-detalhes-page-main-image">
                    <Image
                      src={vehicle.imagens[currentImageIndex] || "/placeholder.svg"}
                      alt={`${vehicle.marca} ${vehicle.modelo} - Imagem ${currentImageIndex + 1}`}
                      fill
                      className="veiculos-detalhes-page-image"
                      onClick={() => setShowImageModal(true)}
                      priority
                    />

                    {/* Badge de Oferta */}
                    {vehicle.emOferta && (
                      <div className="veiculos-detalhes-offer-badge-image">
                        <Percent size={16} />
                        {calculateDiscountPercentage()}% OFF
                      </div>
                    )}

                    {vehicle.destacado && (
                      <div className="veiculos-detalhes-page-featured-badge">
                        <Star size={16} />
                        Destaque
                      </div>
                    )}

                    {vehicle.imagens.length > 1 && (
                      <>
                        <button onClick={prevImage} className="veiculos-detalhes-page-nav-btn prev">
                          <ChevronLeft size={24} />
                        </button>
                        <button onClick={nextImage} className="veiculos-detalhes-page-nav-btn next">
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}

                    <div className="veiculos-detalhes-page-image-counter">
                      {currentImageIndex + 1} / {vehicle.imagens.length}
                    </div>
                  </div>

                  {vehicle.imagens.length > 1 && (
                    <div className="veiculos-detalhes-page-thumbnails">
                      {vehicle.imagens.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`veiculos-detalhes-page-thumbnail ${index === currentImageIndex ? "active" : ""}`}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="veiculos-detalhes-page-thumbnail-image"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="veiculos-detalhes-page-no-image">
                  <Car size={64} />
                  <span>Sem imagens disponíveis</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Informações Principais */}
        <section className="veiculos-detalhes-page-info-section">
          <div className="veiculos-detalhes-page-container">
            <div className="veiculos-detalhes-page-info-grid">
              {/* Coluna Principal */}
              <div className="veiculos-detalhes-page-main-info">
                <div className="veiculos-detalhes-page-title-section">
                  <h1 className="veiculos-detalhes-page-title">
                    {vehicle.marca} {vehicle.modelo}
                  </h1>
                  <p className="veiculos-detalhes-page-version">{vehicle.versao}</p>
                  
                  {/* Exibição de preço com oferta ou preço normal */}
                  {vehicle.emOferta ? (
                    <div className="veiculos-detalhes-page-price-container">
                      <div className="veiculos-detalhes-offer-section">
                        <div className="veiculos-detalhes-offer-badge">
                          <TagIcon size={16} /> Oferta Especial
                        </div>
                        <div className="veiculos-detalhes-price-comparison">
                          <div className="veiculos-detalhes-price-from">
                            De <span className="veiculos-detalhes-original-price">{formatPrice(vehicle.preco)}</span>
                          </div>
                          <div className="veiculos-detalhes-price-current">
                            Por apenas
                            <span className="veiculos-detalhes-offer-price">{formatPrice(vehicle.precoOferta)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="veiculos-detalhes-page-price">{formatPrice(vehicle.preco)}</div>
                  )}
                </div>

                {/* Especificações Principais */}
                <Card className="veiculos-detalhes-page-specs-card">
                  <CardContent className="veiculos-detalhes-page-specs-content">
                    <h3 className="veiculos-detalhes-page-specs-title">Especificações</h3>
                    <div className="veiculos-detalhes-page-specs-grid">
                      <div className="veiculos-detalhes-page-spec-item">
                        <Calendar size={20} />
                        <div>
                          <span className="veiculos-detalhes-page-spec-label">Ano</span>
                          <span className="veiculos-detalhes-page-spec-value">{vehicle.ano}</span>
                        </div>
                      </div>

                      <div className="veiculos-detalhes-page-spec-item">
                        <Gauge size={20} />
                        <div>
                          <span className="veiculos-detalhes-page-spec-label">Quilometragem</span>
                          <span className="veiculos-detalhes-page-spec-value">
                            {vehicle.quilometragem.toLocaleString()} km
                          </span>
                        </div>
                      </div>

                      <div className="veiculos-detalhes-page-spec-item">
                        <PaletteIcon size={20} />
                        <div>
                          <span className="veiculos-detalhes-page-spec-label">Cor</span>
                          <span className="veiculos-detalhes-page-spec-value">{vehicle.cor}</span>
                        </div>
                      </div>

                      <div className="veiculos-detalhes-page-spec-item">
                        <Settings size={20} />
                        <div>
                          <span className="veiculos-detalhes-page-spec-label">Câmbio</span>
                          <span className="veiculos-detalhes-page-spec-value">{vehicle.cambio}</span>
                        </div>
                      </div>

                      <div className="veiculos-detalhes-page-spec-item">
                        <Fuel size={20} />
                        <div>
                          <span className="veiculos-detalhes-page-spec-label">Combustível</span>
                          <span className="veiculos-detalhes-page-spec-value">{vehicle.combustivel}</span>
                        </div>
                      </div>

                      <div className="veiculos-detalhes-page-spec-item">
                        <Car size={20} />
                        <div>
                          <span className="veiculos-detalhes-page-spec-label">Tipo</span>
                          <span className="veiculos-detalhes-page-spec-value">{vehicle.tipoCarro}</span>
                        </div>
                      </div>

                      <div className="veiculos-detalhes-page-spec-item">
                        <Settings size={20} />
                        <div>
                          <span className="veiculos-detalhes-page-spec-label">Portas</span>
                          <span className="veiculos-detalhes-page-spec-value">{vehicle.portas}</span>
                        </div>
                      </div>

                      <div className="veiculos-detalhes-page-spec-item">
                        <Gauge size={20} />
                        <div>
                          <span className="veiculos-detalhes-page-spec-label">Motor</span>
                          <span className="veiculos-detalhes-page-spec-value">{vehicle.potenciaMotor}</span>
                        </div>
                      </div>

                      <div className="veiculos-detalhes-page-spec-item">
                        <Settings size={20} />
                        <div>
                          <span className="veiculos-detalhes-page-spec-label">Direção</span>
                          <span className="veiculos-detalhes-page-spec-value">{vehicle.direcao}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Informações Adicionais */}
                <Card className="veiculos-detalhes-page-additional-card">
                  <CardContent className="veiculos-detalhes-page-additional-content">
                    <h3 className="veiculos-detalhes-page-additional-title">Informações Adicionais</h3>
                    <div className="veiculos-detalhes-page-additional-grid">
                      <div
                        className={`veiculos-detalhes-page-additional-item ${vehicle.informacoesAdicionais?.unicoDono ? "active" : ""
                          }`}
                      >
                        <Shield size={20} />
                        <span>Único Dono</span>
                        {vehicle.informacoesAdicionais?.unicoDono && (
                          <Badge className="veiculos-detalhes-page-badge-yes">Sim</Badge>
                        )}
                      </div>

                      <div
                        className={`veiculos-detalhes-page-additional-item ${vehicle.informacoesAdicionais?.manualCarro ? "active" : ""
                          }`}
                      >
                        <FileText size={20} />
                        <span>Manual do Carro</span>
                        {vehicle.informacoesAdicionais?.manualCarro && (
                          <Badge className="veiculos-detalhes-page-badge-yes">Sim</Badge>
                        )}
                      </div>

                      <div
                        className={`veiculos-detalhes-page-additional-item ${vehicle.informacoesAdicionais?.chaveReserva ? "active" : ""
                          }`}
                      >
                        <Key size={20} />
                        <span>Chave Reserva</span>
                        {vehicle.informacoesAdicionais?.chaveReserva && (
                          <Badge className="veiculos-detalhes-page-badge-yes">Sim</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Descrição */}
                <Card className="veiculos-detalhes-page-description-card">
                  <CardContent className="veiculos-detalhes-page-description-content">
                    <h3 className="veiculos-detalhes-page-description-title">Descrição</h3>
                    <ul className="veiculos-detalhes-page-description-list">
                      {formatDescription(vehicle.descricao).map((item, index) => (
                        <li key={index} className="veiculos-detalhes-page-description-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar de Contato */}
              <div className="veiculos-detalhes-page-contact-sidebar">
                <Card className="veiculos-detalhes-page-contact-card">
                  <CardContent className="veiculos-detalhes-page-contact-content">
                    <h3 className="veiculos-detalhes-page-contact-title">Interessado neste veículo?</h3>
                    <p className="veiculos-detalhes-page-contact-subtitle">
                      Entre em contato conosco para mais informações
                    </p>

                    {/* Destaque para oferta na sidebar */}
                    {vehicle.emOferta && (
                      <div className="veiculos-detalhes-offer-badge" style={{ marginBottom: '1rem' }}>
                        <Percent size={16} /> Oferta por tempo limitado!
                      </div>
                    )}

                    <div className="veiculos-detalhes-page-contact-actions">
                      <Button onClick={handleWhatsAppClick} className="veiculos-detalhes-page-whatsapp-btn">
                        <MessageCircle size={20} />
                        WhatsApp
                      </Button>

                      <Button onClick={handleCallClick} variant="outline" className="veiculos-detalhes-page-call-btn">
                        <Phone size={20} />
                        Ligar
                      </Button>

                      <Button
                        onClick={handleSimulationClick}
                        variant="outline"
                        className="veiculos-detalhes-page-simulation-btn"
                      >
                        <Calculator size={20} />
                        Simular Financiamento
                      </Button>
                    </div>

                    <div className="veiculos-detalhes-page-contact-info">
                      <div className="veiculos-detalhes-page-info-item">
                        <Clock size={16} />
                        <div>
                          <span className="veiculos-detalhes-page-info-label">Horário</span>
                          <span className="veiculos-detalhes-page-info-value">
                            Seg-Sex: 8h-17h
                            <br />
                            Sáb: 8h-14h
                          </span>
                        </div>
                      </div>

                      <div className="veiculos-detalhes-page-info-item">
                        <Phone size={16} />
                        <div>
                          <span className="veiculos-detalhes-page-info-label">Telefone</span>
                          <span className="veiculos-detalhes-page-info-value">(85) 3232-4632</span>
                        </div>
                      </div>

                      <div className="veiculos-detalhes-page-info-item">
                        <MapPin size={16} />
                        <div>
                          <span className="veiculos-detalhes-page-info-label">Endereço</span>
                          <span className="veiculos-detalhes-page-info-value">
                            Av. Américo Barreira, 5626
                            <br />
                            Fortaleza - CE
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal de Imagem */}
      {showImageModal && vehicle.imagens && (
        <div className="veiculos-detalhes-page-modal-overlay" onClick={() => setShowImageModal(false)}>
          <div className="veiculos-detalhes-page-modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowImageModal(false)} className="veiculos-detalhes-page-modal-close">
              <X size={24} />
            </button>

            <Image
              src={vehicle.imagens[currentImageIndex] || "/placeholder.svg"}
              alt={`${vehicle.marca} ${vehicle.modelo} - Imagem ${currentImageIndex + 1}`}
              fill
              className="veiculos-detalhes-page-modal-image"
            />

            {vehicle.imagens.length > 1 && (
              <>
                <button onClick={prevImage} className="veiculos-detalhes-page-modal-nav prev">
                  <ChevronLeft size={32} />
                </button>
                <button onClick={nextImage} className="veiculos-detalhes-page-modal-nav next">
                  <ChevronRight size={32} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}