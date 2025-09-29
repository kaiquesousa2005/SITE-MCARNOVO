"use client"
import { Car, Bike, X } from "lucide-react"
import "@/app/styles/VehicleType.css"

interface VehicleTypeSelectorProps {
    onSelect: (type: "carro" | "moto") => void
    onClose: () => void
}

export default function VehicleTypeSelector({ onSelect, onClose }: VehicleTypeSelectorProps) {
    return (
        <div className="admin-form-overlay">
            <div className="admin-form-container" style={{ maxWidth: "500px" }}>
                <div className="admin-form-header">
                    <h2>Escolha o Tipo de Veículo</h2>
                    <button onClick={onClose} className="admin-form-close">
                        <X size={24} />
                    </button>
                </div>

                <div className="vehicle-type-selector">
                    <div className="vehicle-type-options">
                        <button onClick={() => onSelect("carro")} className="vehicle-type-option">
                            <Car size={48} />
                            <h3>Carro</h3>
                            <p>Adicionar um automóvel</p>
                        </button>

                        <button onClick={() => onSelect("moto")} className="vehicle-type-option">
                            <Bike size={48} />
                            <h3>Moto</h3>
                            <p>Adicionar uma motocicleta</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
