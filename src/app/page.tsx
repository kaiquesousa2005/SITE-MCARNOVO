"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "../components/Header"
import Footer from "../components/Footer"
import type { Vehicle } from "@/types/vehicle"
import { Phone, MessageCircle, Clock, MapPin, Car, Shield, Award, ChevronRight, Star } from "lucide-react"
import "./styles/LandingPage.css"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([])
  const [loadingVehicles, setLoadingVehicles] = useState(true)

  useEffect(() => {
    setIsVisible(true)
    loadFeaturedVehicles()
  }, [])

  const loadFeaturedVehicles = async () => {
    try {
      // Buscar apenas veículos destacados
      const q = query(collection(db, "vehicles"), where("destacado", "==", true))
      const querySnapshot = await getDocs(q)

      const vehiclesData = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        }
      }) as Vehicle[]

      // Ordenar por data de criação (mais recentes primeiro) e limitar a 3
      vehiclesData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      setFeaturedVehicles(vehiclesData.slice(0, 3))
    } catch (error) {
      console.error("Erro ao carregar veículos em destaque:", error)
    } finally {
      setLoadingVehicles(false)
    }
  }

  const whatsappNumber = "558532324632"
  const whatsappMessage = "Olá! Vim através do site e gostaria de mais informações sobre os veículos disponíveis."

  const handleWhatsAppClick = (vehicle?: Vehicle) => {
    let message = whatsappMessage
    if (vehicle) {
      message = `Olá! Vim através do site e gostaria de mais informações sobre o ${vehicle.marca} ${vehicle.modelo} ${vehicle.versao} ${vehicle.ano}.`
    }
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const handleCallClick = () => {
    window.open("tel:+5585323246432", "_self")
  }

  const formatPrice = (vehicle: Vehicle) => {
    if (vehicle.emOferta && vehicle.precoOferta) {
      return {
        isOffer: true,
        originalPrice: vehicle.preco ? `R$ ${vehicle.preco.toLocaleString("pt-BR")}` : "Consulte",
        offerPrice: `R$ ${vehicle.precoOferta.toLocaleString("pt-BR")}`,
      }
    }

    if (!vehicle.preco) return { isOffer: false, price: "Consulte o preço" }
    return { isOffer: false, price: `R$ ${vehicle.preco.toLocaleString("pt-BR")}` }
  }

  const getVehicleDescription = (vehicle: Vehicle) => {
    const features = []

    if (vehicle.cambio) features.push(vehicle.cambio)
    if (vehicle.combustivel) features.push(vehicle.combustivel)
    if (vehicle.informacoesAdicionais?.unicoDono) features.push("Único dono")

    return features.length > 0 ? features.join(", ") : "Veículo em excelente estado"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Importado */}
      <Header />

      {/* Hero Section com imagem de fundo */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Imagem de fundo da fachada da loja */}
        <div className="absolute inset-0">
          <Image
            src="/images/foto da frente mcar.jpg"
            alt="Fachada da MCar Veículos"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-700/80"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32 min-h-screen flex items-center">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Badge className="bg-green-500 hover:bg-green-600 text-white mb-6 px-4 py-2 text-sm">
                🚗 Mais de 20 anos no mercado
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Encontre o<span className="text-yellow-400 block">Carro dos Seus Sonhos</span>
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Qualidade e confiança em cada veículo. Financiamento facilitado e as melhores condições do mercado.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  onClick={() => handleWhatsAppClick()}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Falar no WhatsApp
                </Button>

                <Button
                  onClick={handleCallClick}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
                  size="lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Ligar Agora
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">3000+</div>
                  <div className="text-sm text-blue-200">Carros Vendidos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">20+</div>
                  <div className="text-sm text-blue-200">Anos no Mercado</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">4,5/5⭐</div>
                  <div className="text-sm text-blue-200">Avaliações do Google</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">24h</div>
                  <div className="text-sm text-blue-200">Resposta Rápida</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Carros em Destaque - DINÂMICA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Carros em Destaque</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Confira os veículos selecionados especialmente para você
            </p>
          </div>

          {loadingVehicles ? (
            <div className="flex justify-center items-center py-12">
              <div className="featured-spinner"></div>
              <span className="ml-3 text-gray-600">Carregando veículos em destaque...</span>
            </div>
          ) : featuredVehicles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVehicles.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  className="featured-vehicle-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Badge de Destaque */}
                  <div className="featured-badge">
                    <Star size={14} />
                    <span>Destaque</span>
                  </div>

                  {vehicle.emOferta && <div className="featured-offer-badge-image">OFERTA</div>}

                  {/* Imagem do Veículo */}
                  <div className="featured-vehicle-image">
                    {vehicle.imagens && vehicle.imagens.length > 0 ? (
                      <Image
                        src={vehicle.imagens[0] || "/placeholder.svg"}
                        alt={`${vehicle.marca} ${vehicle.modelo}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="featured-no-image">
                        <Car size={48} />
                        <span>Sem imagem</span>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    {/* Título do Veículo */}
                    <div className="featured-vehicle-header">
                      <h3 className="featured-vehicle-title">
                        {vehicle.marca} {vehicle.modelo}
                      </h3>
                      <p className="featured-vehicle-version">{vehicle.versao}</p>
                    </div>

                    {/* Detalhes do Veículo */}
                    <div className="featured-vehicle-details">
                      <div className="featured-detail-item">
                        <span className="featured-detail-label">Ano:</span>
                        <span className="featured-detail-value">{vehicle.ano}</span>
                      </div>
                      <div className="featured-detail-item">
                        <span className="featured-detail-label">KM:</span>
                        <span className="featured-detail-value">{vehicle.quilometragem.toLocaleString()}</span>
                      </div>
                      <div className="featured-detail-item">
                        <span className="featured-detail-label">Câmbio:</span>
                        <span className="featured-detail-value">{vehicle.cambio}</span>
                      </div>
                    </div>

                    {/* Descrição */}
                    <p className="featured-vehicle-description">{getVehicleDescription(vehicle)}</p>

                    {/* Preço */}
                    <div className="featured-vehicle-price-container">
                      {(() => {
                        const priceInfo = formatPrice(vehicle)
                        if (priceInfo.isOffer) {
                          return (
                            <div className="featured-offer-price-section">
                              <div className="featured-offer-badge">OFERTA</div>
                              <div className="featured-price-from">
                                De: <span className="featured-original-price">{priceInfo.originalPrice}</span>
                              </div>
                              <div className="featured-price-current">
                                Por: <span className="featured-offer-price">{priceInfo.offerPrice}</span>
                              </div>
                            </div>
                          )
                        }
                        return <div className="featured-vehicle-price">{priceInfo.price}</div>
                      })()}
                    </div>

                    {/* Botão de Ação */}
                    <Button
                      onClick={() => handleWhatsAppClick(vehicle)}
                      className="featured-cta-button w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Ver Detalhes
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="featured-empty-state">
              <Car size={64} className="text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum veículo em destaque</h3>
              <p className="text-gray-500 mb-6">Em breve teremos novos veículos especiais para você!</p>
              <Button onClick={() => handleWhatsAppClick()} className="bg-blue-900 hover:bg-blue-800">
                <MessageCircle className="mr-2 h-4 w-4" />
                Falar Conosco
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Por que escolher a MCar Veículos?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Somos referência em qualidade e confiança no mercado de veículos seminovos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-200">
              <CardContent className="pt-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Garantia Total</h3>
                <p className="text-gray-600">
                  Todos os nossos veículos passam por rigorosa inspeção e vêm com garantia completa
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-200">
              <CardContent className="pt-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Financiamento Fácil</h3>
                <p className="text-gray-600">
                  Parceria com os principais bancos para oferecer as melhores condições de financiamento
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-200">
              <CardContent className="pt-6">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Car className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Estoque Variado</h3>
                <p className="text-gray-600">
                  Grande variedade de marcas e modelos para atender todos os perfis e orçamentos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção Bancos Parceiros */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Bancos Parceiros</h2>
            <p className="text-gray-600">Financiamento aprovado com os melhores bancos do mercado</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center">
            <Image
              src="/images/bradesco.png"
              alt="Bradesco"
              width={160}
              height={20}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
            <Image
              src="/images/itau.png"
              alt="Itaú"
              width={120}
              height={60}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
            <Image
              src="/images/santander.png"
              alt="Santander"
              width={180}
              height={0}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
            <Image
              src="/images/pan.png"
              alt="Banco Pan"
              width={120}
              height={60}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
            <Image
              src="/images/daycoval.png"
              alt="Daycoval"
              width={120}
              height={60}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
            <Image
              src="/images/bv.png"
              alt="Banco BV"
              width={100}
              height={40}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para encontrar seu próximo carro?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Nossa equipe especializada está pronta para ajudar você a encontrar o veículo perfeito
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => handleWhatsAppClick()}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Conversar no WhatsApp
            </Button>

            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              size="lg"
            >
              Ver Estoque
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Horário de Funcionamento</h3>
              <p className="text-gray-600 text-sm">
                Segunda à Sexta: 8h às 17h
                <br />
                Sábado: 8h às 14h
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Telefone</h3>
              <p className="text-gray-600 text-sm">(85) 3232-4632</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Localização</h3>
              <p className="text-gray-600 text-sm"> Avenida Americo Barreira, 5626 - Democrito Rocha, Fortaleza - CE</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => handleWhatsAppClick()}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
