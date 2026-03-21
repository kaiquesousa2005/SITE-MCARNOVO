"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/hooks/useAuth"
import ProtectedRoute from "@/components/ProtectedRoute"
import VehicleForm from "@/components/VehicleForm"
import VehicleTypeSelector from "@/components/VehicleTypeSelector"
import type { Vehicle } from "@/types/vehicle"
import { Plus, Edit, Trash2, Star, StarOff, LogOut, Car, Tag, X, Bike } from "lucide-react"
import Header from "@/components/Header"
import "../styles/Admin.css"

// Modal de Oferta
interface OfferModalProps {
    vehicle: Vehicle
    onClose: () => void
    onSave: (vehicleId: string, offerPrice: number) => void
    onRemove: (vehicleId: string) => void
}

function AdminOfferModal({ vehicle, onClose, onSave, onRemove }: OfferModalProps) {
    const [offerPrice, setOfferPrice] = useState(vehicle.precoOferta?.toString() || "")
    const [loading, setLoading] = useState(false)

    const handleSave = async () => {
        if (!offerPrice || !vehicle.id) return

        const price = Number.parseFloat(offerPrice)
        if (isNaN(price) || price <= 0) {
            alert("Por favor, insira um preço válido")
            return
        }

        if (vehicle.preco && price >= vehicle.preco) {
            alert("O preço de oferta deve ser menor que o preço normal")
            return
        }

        setLoading(true)
        await onSave(vehicle.id, price)
        setLoading(false)
        onClose()
    }

    const handleRemove = async () => {
        if (!vehicle.id) return

        if (window.confirm("Tem certeza que deseja remover a oferta?")) {
            setLoading(true)
            await onRemove(vehicle.id)
            setLoading(false)
            onClose()
        }
    }

    return (
        <div className="admin-modal-overlay">
            <div className="admin-modal-container">
                <div className="admin-modal-header">
                    <h3>Gerenciar Oferta</h3>
                    <button onClick={onClose} className="admin-modal-close">
                        <X size={20} />
                    </button>
                </div>

                <div className="admin-modal-content">
                    <div className="admin-offer-vehicle-info">
                        <h4>
                            {vehicle.marca} {vehicle.modelo} {vehicle.versao}
                        </h4>
                        <p className="admin-current-price">
                            Preço atual: <strong>R$ {vehicle.preco?.toLocaleString("pt-BR") || "Não informado"}</strong>
                        </p>
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="offerPrice">Preço de Oferta (R$)</label>
                        <input
                            type="number"
                            id="offerPrice"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                            placeholder="Ex: 35000"
                            min="0"
                            step="0.01"
                            className="admin-offer-input"
                        />
                    </div>

                    <div className="admin-modal-actions">
                        {vehicle.emOferta && (
                            <button onClick={handleRemove} disabled={loading} className="admin-btn-remove-offer">
                                {loading ? "Removendo..." : "Remover Oferta"}
                            </button>
                        )}
                        <button onClick={onClose} className="admin-btn-secondary">
                            Cancelar
                        </button>
                        <button onClick={handleSave} disabled={loading || !offerPrice} className="admin-btn-primary">
                            {loading ? "Salvando..." : "Salvar Oferta"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function AdminPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [showForm, setShowForm] = useState(false)
    const [showTypeSelector, setShowTypeSelector] = useState(false)
    const [selectedVehicleType, setSelectedVehicleType] = useState<"carro" | "moto">("carro")
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
    const [showOfferModal, setShowOfferModal] = useState(false)
    const [offerVehicle, setOfferVehicle] = useState<Vehicle | null>(null)
    const [loading, setLoading] = useState(true)
    const { logout } = useAuth()

    const [searchTerm, setSearchTerm] = useState("")
    const [filterMarca, setFilterMarca] = useState("")
    const [filterDestacado, setFilterDestacado] = useState<"all" | "destacado" | "normal">("all")
    const [filterTipoVeiculo, setFilterTipoVeiculo] = useState<"all" | "carro" | "moto">("all")

    const loadVehicles = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "vehicles"))
            const vehiclesData = querySnapshot.docs.map((doc) => {
                const data = doc.data()
                return {
                    id: doc.id,
                    ...data,
                    // Converter Timestamps do Firebase para Date
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date(),
                }
            }) as Vehicle[]

            // Ordenar por data de criação (mais recentes primeiro)
            vehiclesData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            setVehicles(vehiclesData)
        } catch (error) {
            console.error("Erro ao carregar veículos:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadVehicles()
    }, [])

    const handleDelete = async (vehicleId: string) => {
        if (window.confirm("Tem certeza que deseja excluir este veículo?")) {
            try {
                await deleteDoc(doc(db, "vehicles", vehicleId))
                setVehicles(vehicles.filter((v) => v.id !== vehicleId))
            } catch (error) {
                console.error("Erro ao excluir veículo:", error)
                alert("Erro ao excluir veículo")
            }
        }
    }

    const handleToggleDestaque = async (vehicle: Vehicle) => {
        try {
            if (vehicle.id) {
                await updateDoc(doc(db, "vehicles", vehicle.id), {
                    destacado: !vehicle.destacado,
                    updatedAt: new Date(),
                })

                setVehicles(vehicles.map((v) => (v.id === vehicle.id ? { ...v, destacado: !v.destacado } : v)))
            }
        } catch (error) {
            console.error("Erro ao atualizar destaque:", error)
            alert("Erro ao atualizar destaque")
        }
    }

    const handleEdit = (vehicle: Vehicle) => {
        setEditingVehicle(vehicle)
        setShowForm(true)
    }

    const handleCloseForm = () => {
        setShowForm(false)
        setEditingVehicle(null)
        setShowTypeSelector(false)
        loadVehicles()
    }

    const handleVehicleTypeSelect = (type: "carro" | "moto") => {
        setSelectedVehicleType(type)
        setShowTypeSelector(false)
        setShowForm(true)
    }

    const handleAddVehicle = () => {
        setEditingVehicle(null)
        setShowTypeSelector(true)
    }

    const handleSaveOffer = async (vehicleId: string, offerPrice: number) => {
        try {
            await updateDoc(doc(db, "vehicles", vehicleId), {
                precoOferta: offerPrice,
                emOferta: true,
                updatedAt: new Date(),
            })

            setVehicles(vehicles.map((v) => (v.id === vehicleId ? { ...v, precoOferta: offerPrice, emOferta: true } : v)))
        } catch (error) {
            console.error("Erro ao salvar oferta:", error)
            alert("Erro ao salvar oferta")
        }
    }

    const handleRemoveOffer = async (vehicleId: string) => {
        try {
            await updateDoc(doc(db, "vehicles", vehicleId), {
                precoOferta: null,
                emOferta: false,
                updatedAt: new Date(),
            })

            setVehicles(vehicles.map((v) => (v.id === vehicleId ? { ...v, precoOferta: undefined, emOferta: false } : v)))
        } catch (error) {
            console.error("Erro ao remover oferta:", error)
            alert("Erro ao remover oferta")
        }
    }

    const handleOpenOfferModal = (vehicle: Vehicle) => {
        setOfferVehicle(vehicle)
        setShowOfferModal(true)
    }

    const handleCloseOfferModal = () => {
        setShowOfferModal(false)
        setOfferVehicle(null)
    }

    return (
        <ProtectedRoute>
            <Header />
            <div className="admin-container">
                <header className="admin-header">
                    <div className="admin-header-content">
                        <div className="admin-header-left">
                            <Car size={32} />
                            <div>
                                <h1>Painel Administrativo</h1>
                                <p>MCar Veículos</p>
                            </div>
                        </div>
                        <button onClick={logout} className="admin-logout-btn">
                            <LogOut size={20} />
                            Sair
                        </button>
                    </div>
                </header>

                <main className="admin-main">
                    <div className="admin-actions">
                        <div className="admin-stats">
                            <div className="admin-stat-card">
                                <h3>Total de Veículos</h3>
                                <span className="admin-stat-number">{vehicles.length}</span>
                            </div>
                            <div className="admin-stat-card">
                                <h3>Carros</h3>
                                <span className="admin-stat-number">{vehicles.filter((v) => v.tipoVeiculo === "carro").length}</span>
                            </div>
                            <div className="admin-stat-card">
                                <h3>Motos</h3>
                                <span className="admin-stat-number">{vehicles.filter((v) => v.tipoVeiculo === "moto").length}</span>
                            </div>
                            <div className="admin-stat-card">
                                <h3>Em Destaque</h3>
                                <span className="admin-stat-number">{vehicles.filter((v) => v.destacado).length}</span>
                            </div>
                            <div className="admin-stat-card">
                                <h3>Em Oferta</h3>
                                <span className="admin-stat-number">{vehicles.filter((v) => v.emOferta).length}</span>
                            </div>
                        </div>

                        <button onClick={handleAddVehicle} className="admin-add-btn">
                            <Plus size={20} />
                            Adicionar Veículo
                        </button>
                    </div>

                    {/* Filtros e Busca */}
                    <div className="admin-filters">
                        <div className="admin-search">
                            <input
                                type="text"
                                placeholder="Buscar por marca, modelo ou versão..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="admin-search-input"
                            />
                        </div>

                        <div className="admin-filter-group">
                            <select
                                value={filterMarca}
                                onChange={(e) => setFilterMarca(e.target.value)}
                                className="admin-filter-select"
                            >
                                <option value="">Todas as marcas</option>
                                {Array.from(new Set(vehicles.map((v) => v.marca)))
                                    .sort()
                                    .map((marca) => (
                                        <option key={marca} value={marca}>
                                            {marca}
                                        </option>
                                    ))}
                            </select>

                            <select
                                value={filterTipoVeiculo}
                                onChange={(e) => setFilterTipoVeiculo(e.target.value as "all" | "carro" | "moto")}
                                className="admin-filter-select"
                            >
                                <option value="all">Todos os tipos</option>
                                <option value="carro">Carros</option>
                                <option value="moto">Motos</option>
                            </select>

                            <select
                                value={filterDestacado}
                                onChange={(e) => setFilterDestacado(e.target.value as "all" | "destacado" | "normal")}
                                className="admin-filter-select"
                            >
                                <option value="all">Todos os status</option>
                                <option value="destacado">Em destaque</option>
                                <option value="normal">Sem destaque</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="admin-loading">
                            <div className="admin-spinner"></div>
                            <p>Carregando veículos...</p>
                        </div>
                    ) : (
                        <div className="admin-vehicles-grid">
                            {(() => {
                                // Aplicar filtros
                                const filteredVehicles = vehicles.filter((vehicle) => {
                                    const matchesSearch =
                                        searchTerm === "" ||
                                        vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        vehicle.versao.toLowerCase().includes(searchTerm.toLowerCase())

                                    const matchesMarca = filterMarca === "" || vehicle.marca === filterMarca

                                    const matchesTipoVeiculo = filterTipoVeiculo === "all" || vehicle.tipoVeiculo === filterTipoVeiculo

                                    const matchesDestacado =
                                        filterDestacado === "all" ||
                                        (filterDestacado === "destacado" && vehicle.destacado) ||
                                        (filterDestacado === "normal" && !vehicle.destacado)

                                    return matchesSearch && matchesMarca && matchesTipoVeiculo && matchesDestacado
                                })

                                if (filteredVehicles.length === 0) {
                                    return (
                                        <div className="admin-empty-state">
                                            <Car size={64} />
                                            <h3>{vehicles.length === 0 ? "Nenhum veículo cadastrado" : "Nenhum veículo encontrado"}</h3>
                                            <p>
                                                {vehicles.length === 0
                                                    ? 'Clique em "Adicionar Veículo" para começar'
                                                    : "Tente ajustar os filtros de busca"}
                                            </p>
                                        </div>
                                    )
                                }

                                return filteredVehicles.map((vehicle) => (
                                    <div key={vehicle.id} className="admin-vehicle-card">
                                        {vehicle.destacado && (
                                            <div className="admin-featured-badge">
                                                <Star size={16} />
                                                Destaque
                                            </div>
                                        )}

                                        {vehicle.emOferta && (
                                            <div className="admin-offer-badge">
                                                <Tag size={16} />
                                                Oferta
                                            </div>
                                        )}

                                        <div className="admin-vehicle-image">
                                            {vehicle.imagens && vehicle.imagens.length > 0 ? (
                                                <img
                                                    src={vehicle.imagens[0] || "/placeholder.svg"}
                                                    alt={`${vehicle.marca} ${vehicle.modelo}`}
                                                />
                                            ) : (
                                                <div className="admin-no-image">
                                                    {vehicle.tipoVeiculo === "carro" ? <Car size={40} /> : <Bike size={40} />}
                                                </div>
                                            )}
                                        </div>

                                        <div className="admin-vehicle-info">
                                            <h3>
                                                {vehicle.marca} {vehicle.modelo}
                                            </h3>
                                            <p className="admin-vehicle-version">{vehicle.versao}</p>
                                            <div className="admin-vehicle-details">
                                                <span>{vehicle.ano}</span>
                                                <span>{vehicle.quilometragem.toLocaleString()} km</span>
                                                <span>{vehicle.cambio}</span>
                                            </div>

                                            {/* Preços */}
                                            <div className="admin-vehicle-prices">
                                                {vehicle.emOferta && vehicle.precoOferta ? (
                                                    <>
                                                        <p className="admin-vehicle-price-original">
                                                            De: R$ {vehicle.preco?.toLocaleString("pt-BR")}
                                                        </p>
                                                        <p className="admin-vehicle-price-offer">
                                                            Por: R$ {vehicle.precoOferta.toLocaleString("pt-BR")}
                                                        </p>
                                                    </>
                                                ) : (
                                                    vehicle.preco && (
                                                        <p className="admin-vehicle-price">R$ {vehicle.preco.toLocaleString("pt-BR")}</p>
                                                    )
                                                )}
                                            </div>

                                            <p className="admin-vehicle-date">
                                                Adicionado em {new Date(vehicle.createdAt).toLocaleDateString("pt-BR")}
                                            </p>
                                        </div>

                                        <div className="admin-vehicle-actions">
                                            <button
                                                onClick={() => handleToggleDestaque(vehicle)}
                                                className={`admin-action-btn ${vehicle.destacado ? "admin-featured" : ""}`}
                                                title={vehicle.destacado ? "Remover destaque" : "Destacar veículo"}
                                            >
                                                {vehicle.destacado ? <StarOff size={16} /> : <Star size={16} />}
                                            </button>

                                            <button
                                                onClick={() => handleOpenOfferModal(vehicle)}
                                                className={`admin-action-btn ${vehicle.emOferta ? "admin-offer-active" : ""}`}
                                                title={vehicle.emOferta ? "Gerenciar oferta" : "Criar oferta"}
                                            >
                                                <Tag size={16} />
                                            </button>

                                            <button
                                                onClick={() => handleEdit(vehicle)}
                                                className="admin-action-btn admin-edit"
                                                title="Editar veículo"
                                            >
                                                <Edit size={16} />
                                            </button>

                                            <button
                                                onClick={() => vehicle.id && handleDelete(vehicle.id)}
                                                className="admin-action-btn admin-delete"
                                                title="Excluir veículo"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            })()}
                        </div>
                    )}
                </main>

                {showTypeSelector && (
                    <VehicleTypeSelector onSelect={handleVehicleTypeSelect} onClose={() => setShowTypeSelector(false)} />
                )}

                {showForm && (
                    <VehicleForm
                        vehicle={editingVehicle}
                        onClose={handleCloseForm}
                        vehicleType={editingVehicle?.tipoVeiculo || selectedVehicleType}
                    />
                )}

                {showOfferModal && offerVehicle && (
                    <AdminOfferModal
                        vehicle={offerVehicle}
                        onClose={handleCloseOfferModal}
                        onSave={handleSaveOffer}
                        onRemove={handleRemoveOffer}
                    />
                )}
            </div>
        </ProtectedRoute>
    )
}
