"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import type { Vehicle } from "@/types/vehicle"
import {
  Search,
  Filter,
  Car,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  MessageCircle,
  ChevronRight,
  Grid,
  List,
} from "lucide-react"
import "../styles/Estoque.css"

// Hook personalizado para detectar tamanho da tela
function useResponsiveView() {
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Função para atualizar o tamanho da janela
    const handleResize = () => {
      const width = window.innerWidth
      setWindowWidth(width)
      setIsMobile(width < 1100)
    }

    // Definir tamanho inicial
    handleResize()

    // Adicionar listener para mudanças de tamanho
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return { windowWidth, isMobile }
}

// Componente de Loading
function EstoqueLoading() {
  return (
    <div className="page-estoque-loading">
      <div className="page-estoque-spinner"></div>
      <p>Carregando veículos...</p>
    </div>
  )
}

// Componente de Card do Veículo
function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
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

  const whatsappNumber = "558532324632"
  const handleWhatsAppClick = () => {
    const message = `Olá! Vim através do site e gostaria de mais informações sobre o ${vehicle.marca} ${vehicle.modelo} ${vehicle.versao} ${vehicle.ano}.`
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <Card className="page-estoque-vehicle-card">
      <CardContent className="page-estoque-card-content">
        {/* Imagem do Veículo */}
        <div className="page-estoque-vehicle-image">
          {vehicle.imagens && vehicle.imagens.length > 0 ? (
            <Image
              src={vehicle.imagens[0] || "/placeholder.svg"}
              alt={`${vehicle.marca} ${vehicle.modelo}`}
              fill
              className="page-estoque-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          ) : (
            <div className="page-estoque-no-image">
              <Car size={32} />
              <span>Sem imagem</span>
            </div>
          )}

          {vehicle.destacado && <div className="page-estoque-featured-badge">Destaque</div>}
          {vehicle.emOferta && <div className="page-estoque-offer-badge-image">OFERTA</div>}
        </div>

        {/* Informações do Veículo */}
        <div className="page-estoque-vehicle-info">
          <div className="page-estoque-vehicle-header">
            <h3 className="page-estoque-vehicle-title">
              {vehicle.marca} {vehicle.modelo}
            </h3>
            <p className="page-estoque-vehicle-version">{vehicle.versao}</p>
          </div>

          <div className="page-estoque-vehicle-specs">
            <div className="page-estoque-spec-item">
              <Calendar size={16} />
              <span>{vehicle.ano}</span>
            </div>
            <div className="page-estoque-spec-item">
              <Gauge size={16} />
              <span>{vehicle.quilometragem.toLocaleString()} km</span>
            </div>
            <div className="page-estoque-spec-item">
              <Settings size={16} />
              <span>{vehicle.cambio}</span>
            </div>
            <div className="page-estoque-spec-item">
              <Fuel size={16} />
              <span>{vehicle.combustivel}</span>
            </div>
          </div>

          <div className="page-estoque-vehicle-price-container">
            {(() => {
              const priceInfo = formatPrice(vehicle)
              if (priceInfo.isOffer) {
                return (
                  <div className="page-estoque-offer-section">
                    <div className="page-estoque-offer-badge">OFERTA</div>
                    <div className="page-estoque-price-from">
                      De: <span className="page-estoque-original-price">{priceInfo.originalPrice}</span>
                    </div>
                    <div className="page-estoque-price-current">
                      Por: <span className="page-estoque-offer-price">{priceInfo.offerPrice}</span>
                    </div>
                  </div>
                )
              }
              return <div className="page-estoque-vehicle-price">{priceInfo.price}</div>
            })()}
          </div>

          <div className="page-estoque-vehicle-actions">
            <Link href={`/estoque/${vehicle.id}`} className="page-estoque-btn-details">
              Detalhes
              <ChevronRight size={16} />
            </Link>
            <Button onClick={handleWhatsAppClick} className="page-estoque-btn-whatsapp">
              <MessageCircle size={16} />
              WhatsApp
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function EstoquePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMarca, setFilterMarca] = useState("")
  const [filterAno, setFilterAno] = useState("")
  const [filterPreco, setFilterPreco] = useState("")
  const [filterCombustivel, setFilterCombustivel] = useState("")
  const [filterCambio, setFilterCambio] = useState("")
  const [sortBy, setSortBy] = useState("recentes")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Hook responsivo
  const { windowWidth, isMobile } = useResponsiveView()

  // Efeito para forçar modo lista em telas pequenas
  useEffect(() => {
    if (isMobile && viewMode === "grid") {
      setViewMode("list")
    }
  }, [isMobile, viewMode])

  // Carregar veículos
  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const q = query(collection(db, "vehicles"), orderBy("createdAt", "desc"))
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

        setVehicles(vehiclesData)
      } catch (error) {
        console.error("Erro ao carregar veículos:", error)
      } finally {
        setLoading(false)
      }
    }

    loadVehicles()
  }, [])

  // Filtros e busca otimizados com useMemo
  const filteredVehicles = useMemo(() => {
    const filtered = vehicles.filter((vehicle) => {
      const matchesSearch =
        searchTerm === "" ||
        vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.versao.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesMarca = filterMarca === "" || vehicle.marca === filterMarca
      const matchesAno = filterAno === "" || vehicle.ano.toString() === filterAno
      const matchesCombustivel = filterCombustivel === "" || vehicle.combustivel === filterCombustivel
      const matchesCambio = filterCambio === "" || vehicle.cambio === filterCambio

      const matchesPreco =
        filterPreco === "" ||
        (() => {
          if (!vehicle.preco) return filterPreco === "consulte"
          const preco = vehicle.preco
          switch (filterPreco) {
            case "ate-30k":
              return preco <= 30000
            case "30k-50k":
              return preco > 30000 && preco <= 50000
            case "50k-80k":
              return preco > 50000 && preco <= 80000
            case "acima-80k":
              return preco > 80000
            case "consulte":
              return false
            default:
              return true
          }
        })()

      return matchesSearch && matchesMarca && matchesAno && matchesCombustivel && matchesCambio && matchesPreco
    })

    // Ordenação
    switch (sortBy) {
      case "preco-menor":
        filtered.sort((a, b) => (a.preco || 0) - (b.preco || 0))
        break
      case "preco-maior":
        filtered.sort((a, b) => (b.preco || 0) - (a.preco || 0))
        break
      case "ano-novo":
        filtered.sort((a, b) => b.ano - a.ano)
        break
      case "ano-antigo":
        filtered.sort((a, b) => a.ano - b.ano)
        break
      case "km-menor":
        filtered.sort((a, b) => a.quilometragem - b.quilometragem)
        break
      case "recentes":
      default:
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
    }

    return filtered
  }, [vehicles, searchTerm, filterMarca, filterAno, filterPreco, filterCombustivel, filterCambio, sortBy])

  // Extrair opções únicas para filtros
  const marcasUnicas = useMemo(() => Array.from(new Set(vehicles.map((v) => v.marca))).sort(), [vehicles])

  const anosUnicos = useMemo(() => Array.from(new Set(vehicles.map((v) => v.ano))).sort((a, b) => b - a), [vehicles])

  const combustiveisUnicos = useMemo(() => Array.from(new Set(vehicles.map((v) => v.combustivel))).sort(), [vehicles])

  const cambiosUnicos = useMemo(() => Array.from(new Set(vehicles.map((v) => v.cambio))).sort(), [vehicles])

  const clearFilters = () => {
    setSearchTerm("")
    setFilterMarca("")
    setFilterAno("")
    setFilterPreco("")
    setFilterCombustivel("")
    setFilterCambio("")
    setSortBy("recentes")
  }

  // Função para alterar modo de visualização (apenas se não for mobile)
  const handleViewModeChange = (mode: "grid" | "list") => {
    if (!isMobile) {
      setViewMode(mode)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <Suspense fallback={<EstoqueLoading />}>
          <EstoqueLoading />
        </Suspense>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="page-estoque-main">
        {/* Hero Section */}
        <section className="page-estoque-hero">
          <div className="page-estoque-hero-content">
            <h1 className="page-estoque-hero-title">Nosso Estoque</h1>
            <p className="page-estoque-hero-subtitle">
              Encontre o veículo perfeito para você entre mais de {vehicles.length} opções
            </p>
            <div className="page-estoque-hero-stats">
              <div className="page-estoque-stat">
                <span className="page-estoque-stat-number">{vehicles.length}</span>
                <span className="page-estoque-stat-label">Veículos</span>
              </div>
              <div className="page-estoque-stat">
                <span className="page-estoque-stat-number">{marcasUnicas.length}</span>
                <span className="page-estoque-stat-label">Marcas</span>
              </div>
              <div className="page-estoque-stat">
                <span className="page-estoque-stat-number">{vehicles.filter((v) => v.destacado).length}</span>
                <span className="page-estoque-stat-label">Destaques</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className="page-estoque-filters-section">
          <div className="page-estoque-filters-container">
            <div className="page-estoque-filters-header">
              <h2 className="page-estoque-filters-title">
                <Filter size={20} />
                Filtros
              </h2>
              {/* Controles de visualização - ocultos em telas pequenas */}
              {!isMobile && (
                <div className="page-estoque-view-controls">
                  <button
                    onClick={() => handleViewModeChange("grid")}
                    className={`page-estoque-view-btn ${viewMode === "grid" ? "active" : ""}`}
                    title="Visualização em Grade"
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => handleViewModeChange("list")}
                    className={`page-estoque-view-btn ${viewMode === "list" ? "active" : ""}`}
                    title="Visualização em Lista"
                  >
                    <List size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Busca */}
            <div className="page-estoque-search-container">
              <Search size={20} className="page-estoque-search-icon" />
              <Input
                type="text"
                placeholder="Buscar por marca, modelo ou versão..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="page-estoque-search-input"
              />
            </div>

            {/* Filtros em Grid */}
            <div className="page-estoque-filters-grid">
              <Select value={filterMarca} onValueChange={setFilterMarca}>
                <SelectTrigger className="page-estoque-filter-select">
                  <SelectValue placeholder="Marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as marcas</SelectItem>
                  {marcasUnicas.map((marca) => (
                    <SelectItem key={marca} value={marca}>
                      {marca}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterAno} onValueChange={setFilterAno}>
                <SelectTrigger className="page-estoque-filter-select">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os anos</SelectItem>
                  {anosUnicos.map((ano) => (
                    <SelectItem key={ano} value={ano.toString()}>
                      {ano}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterPreco} onValueChange={setFilterPreco}>
                <SelectTrigger className="page-estoque-filter-select">
                  <SelectValue placeholder="Faixa de preço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os preços</SelectItem>
                  <SelectItem value="ate-30k">Até R$ 30.000</SelectItem>
                  <SelectItem value="30k-50k">R$ 30.000 - R$ 50.000</SelectItem>
                  <SelectItem value="50k-80k">R$ 50.000 - R$ 80.000</SelectItem>
                  <SelectItem value="acima-80k">Acima de R$ 80.000</SelectItem>
                  <SelectItem value="consulte">Consulte o preço</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCombustivel} onValueChange={setFilterCombustivel}>
                <SelectTrigger className="page-estoque-filter-select">
                  <SelectValue placeholder="Combustível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  {combustiveisUnicos.map((combustivel) => (
                    <SelectItem key={combustivel} value={combustivel}>
                      {combustivel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterCambio} onValueChange={setFilterCambio}>
                <SelectTrigger className="page-estoque-filter-select">
                  <SelectValue placeholder="Câmbio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  {cambiosUnicos.map((cambio) => (
                    <SelectItem key={cambio} value={cambio}>
                      {cambio}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="page-estoque-filter-select">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recentes">Mais recentes</SelectItem>
                  <SelectItem value="preco-menor">Menor preço</SelectItem>
                  <SelectItem value="preco-maior">Maior preço</SelectItem>
                  <SelectItem value="ano-novo">Ano mais novo</SelectItem>
                  <SelectItem value="ano-antigo">Ano mais antigo</SelectItem>
                  <SelectItem value="km-menor">Menor quilometragem</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="page-estoque-filters-actions">
              <Button onClick={clearFilters} variant="outline" className="page-estoque-clear-filters">
                Limpar Filtros
              </Button>
              <span className="page-estoque-results-count">
                {filteredVehicles.length} veículo(s) encontrado(s)
                {isMobile && " • Visualização em Lista"}
              </span>
            </div>
          </div>
        </section>

        {/* Lista de Veículos */}
        <section className="page-estoque-vehicles-section">
          <div className="page-estoque-vehicles-container">
            {filteredVehicles.length > 0 ? (
              <div className={`page-estoque-vehicles-grid ${viewMode === "list" || isMobile ? "list-view" : ""}`}>
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="page-estoque-empty-state">
                <Car size={64} />
                <h3>Nenhum veículo encontrado</h3>
                <p>Tente ajustar os filtros ou fazer uma nova busca</p>
                <Button onClick={clearFilters} className="page-estoque-btn-reset">
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
