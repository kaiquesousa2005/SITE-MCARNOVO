export interface Vehicle {
  id: string
  marca: string
  modelo: string
  versao: string
  tipoCarro: string
  potenciaMotor: string
  ano: number
  quilometragem: number
  portas: number
  cambio: string
  direcao: string
  combustivel: string
  cor?: string
  informacoesAdicionais: {
    unicoDono: boolean
    manualCarro: boolean
    chaveReserva: boolean
  }
  descricao: string
  preco?: number
  precoOferta?: number // Add offer price field
  emOferta?: boolean // Add offer status field
  imagens: string[]
  destacado?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface VehicleFormData {
  marca: string
  modelo: string
  versao: string
  tipoCarro: string
  potenciaMotor: string
  ano: string
  quilometragem: string
  portas: string
  cambio: string
  direcao: string
  combustivel: string
  cor: string // Adicionado campo de cor
  informacoesAdicionais: {
    unicoDono: boolean
    manualCarro: boolean
    chaveReserva: boolean
  }
  descricao: string
  preco: string
  imagens: File[]
}
