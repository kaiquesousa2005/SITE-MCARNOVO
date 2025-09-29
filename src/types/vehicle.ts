export interface Vehicle {
  id: string
  tipoVeiculo: "carro" | "moto" // New field to distinguish vehicle type
  marca: string
  modelo: string
  versao: string
  // Car-specific fields (optional for motorcycles)
  tipoCarro?: string
  potenciaMotor?: string
  portas?: number
  // Motorcycle-specific fields (optional for cars)
  cilindrada?: string
  tipoMoto?: string
  // Common fields
  ano: number
  quilometragem: number
  cambio: string
  direcao?: string // Optional for motorcycles
  combustivel: string
  cor?: string
  informacoesAdicionais: {
    unicoDono: boolean
    manualCarro: boolean
    chaveReserva: boolean
  }
  descricao: string
  preco?: number
  precoOferta?: number
  emOferta?: boolean
  imagens: string[]
  destacado?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface VehicleFormData {
  tipoVeiculo: "carro" | "moto"
  marca: string
  modelo: string
  versao: string
  // Car-specific fields
  tipoCarro: string
  potenciaMotor: string
  portas: string
  direcao: string
  // Motorcycle-specific fields
  cilindrada: string
  tipoMoto: string
  // Common fields
  ano: string
  quilometragem: string
  cambio: string
  combustivel: string
  cor: string
  informacoesAdicionais: {
    unicoDono: boolean
    manualCarro: boolean
    chaveReserva: boolean
  }
  descricao: string
  preco: string
  imagens: File[]
}
