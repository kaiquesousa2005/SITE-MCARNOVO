"use client"

import type React from "react"
import NextImage from "next/image"
import { useState, useEffect } from "react"
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "@/lib/firebase"
import type { Vehicle, VehicleFormData } from "@/types/vehicle"
import { X, Upload, Trash2, GripVertical, ImageIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import "@/app/styles/VehicleForm.css"

interface VehicleFormProps {
  vehicle?: Vehicle | null
  onClose: () => void
  vehicleType?: "carro" | "moto" // Added vehicle type prop
}

interface ImageItem {
  id: string
  file?: File
  url?: string
  isExisting: boolean
}

const MARCAS = [
  "Fiat",
  "Chevrolet",
  "Toyota",
  "Volkswagen",
  "Jeep",
  "Honda",
  "Mitsubishi",
  "BMW",
  "Hyundai",
  "Nissan",
  "Renault",
  "Ford",
  "Buggy",
]

const MARCAS_MOTO = [
  "Honda",
  "Yamaha",
  "Suzuki",
  "Kawasaki",
  "BMW",
  "Ducati",
  "Harley-Davidson",
  "KTM",
  "Triumph",
  "Royal Enfield",
  "Dafra",
  "Shineray",
]

const TIPOS_CARRO = ["Hatch", "SUV", "Sedã", "Pick-up", "Cupê", "Minivan", "Esportivo"]

const TIPOS_MOTO = ["Street", "Sport", "Naked", "Cruiser", "Adventure", "Trail", "Scooter", "Custom"]

const TIPOS_DIRECAO = ["Direção Elétrica", "Direção Mecânica", "Direção Hidraúlica"]

const TIPOS_CAMBIO = ["Manual", "Automático"]

const TIPOS_CAMBIO_MOTO = ["Manual", "Automático", "CVT"]

const TIPOS_COMBUSTIVEL = ["Gasolina", "Flex", "Diesel", "Elétrico"]

const CORES = [
  "Preto",
  "Branco",
  "Prata",
  "Cinza",
  "Vermelho",
  "Azul",
  "Verde",
  "Amarelo",
  "Marrom",
  "Bege",
  "Laranja",
  "Dourado",
  "Outro",
]

// Função para otimizar imagens
const optimizeImage = (file: File, maxWidth = 1200, quality = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      // Calcular novas dimensões mantendo proporção
      let { width, height } = img

      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }

      canvas.width = width
      canvas.height = height

      // Desenhar imagem redimensionada
      ctx?.drawImage(img, 0, 0, width, height)

      // Converter para blob otimizado
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const optimizedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            })
            resolve(optimizedFile)
          } else {
            resolve(file)
          }
        },
        "image/jpeg",
        quality,
      )
    }

    img.src = URL.createObjectURL(file)
  })
}

export default function VehicleForm({ vehicle, onClose, vehicleType = "carro" }: VehicleFormProps) {
  const [formData, setFormData] = useState<VehicleFormData>({
    tipoVeiculo: vehicle?.tipoVeiculo || vehicleType,
    marca: "",
    modelo: "",
    versao: "",
    tipoCarro: "",
    potenciaMotor: "",
    ano: "",
    quilometragem: "",
    portas: "",
    cambio: "",
    direcao: "",
    combustivel: "",
    cor: "",
    cilindrada: "", // New motorcycle field
    tipoMoto: "", // New motorcycle field
    informacoesAdicionais: {
      unicoDono: false,
      manualCarro: false,
      chaveReserva: false,
    },
    descricao: "",
    preco: "",
    imagens: [],
  })

  const [imageItems, setImageItems] = useState<ImageItem[]>([])
  const [loading, setLoading] = useState(false)
  const [optimizing, setOptimizing] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (vehicle) {
      setFormData({
        tipoVeiculo: vehicle.tipoVeiculo,
        marca: vehicle.marca,
        modelo: vehicle.modelo,
        versao: vehicle.versao,
        tipoCarro: vehicle.tipoCarro || "",
        potenciaMotor: vehicle.potenciaMotor || "",
        ano: vehicle.ano.toString(),
        quilometragem: vehicle.quilometragem.toString(),
        portas: vehicle.portas?.toString() || "",
        cambio: vehicle.cambio,
        direcao: vehicle.direcao || "",
        combustivel: vehicle.combustivel,
        cor: vehicle.cor || "",
        cilindrada: vehicle.cilindrada || "",
        tipoMoto: vehicle.tipoMoto || "",
        informacoesAdicionais: vehicle.informacoesAdicionais,
        descricao: vehicle.descricao,
        preco: vehicle.preco?.toString() || "",
        imagens: [],
      })

      // Converter imagens existentes para ImageItems
      const existingImageItems: ImageItem[] = (vehicle.imagens || []).map((url, index) => ({
        id: `existing-${index}`,
        url,
        isExisting: true,
      }))
      setImageItems(existingImageItems)
    }
  }, [vehicle])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement
      setFormData((prev) => ({
        ...prev,
        informacoesAdicionais: {
          ...prev.informacoesAdicionais,
          [name]: checkbox.checked,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleCheckboxChange = (checked: boolean | "indeterminate", name: string) => {
    setFormData((prev) => ({
      ...prev,
      informacoesAdicionais: {
        ...prev.informacoesAdicionais,
        [name]: checked === true,
      },
    }))
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setOptimizing(true)
      const files = Array.from(e.target.files)

      try {
        // Otimizar todas as imagens
        const optimizedFiles = await Promise.all(files.map((file) => optimizeImage(file)))

        // Criar novos ImageItems
        const newImageItems: ImageItem[] = optimizedFiles.map((file, index) => ({
          id: `new-${Date.now()}-${index}`,
          file,
          isExisting: false,
        }))

        setImageItems((prev) => [...prev, ...newImageItems])

        // Atualizar formData
        setFormData((prev) => ({
          ...prev,
          imagens: [...prev.imagens, ...optimizedFiles],
        }))
      } catch (error) {
        console.error("Erro ao otimizar imagens:", error)
        alert("Erro ao processar imagens")
      } finally {
        setOptimizing(false)
      }
    }
  }

  const removeImage = (id: string) => {
    const imageItem = imageItems.find((item) => item.id === id)
    if (!imageItem) return

    setImageItems((prev) => prev.filter((item) => item.id !== id))

    if (!imageItem.isExisting && imageItem.file) {
      // Remover da lista de arquivos novos
      setFormData((prev) => ({
        ...prev,
        imagens: prev.imagens.filter((file) => file !== imageItem.file),
      }))
    }
  }

  // Funções de Drag & Drop
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      return
    }

    const newImageItems = [...imageItems]
    const draggedItem = newImageItems[draggedIndex]

    // Remover item da posição original
    newImageItems.splice(draggedIndex, 1)

    // Inserir na nova posição
    newImageItems.splice(dropIndex, 0, draggedItem)

    setImageItems(newImageItems)
    setDraggedIndex(null)

    // Atualizar formData mantendo a ordem
    const newFiles: File[] = []
    newImageItems.forEach((item) => {
      if (!item.isExisting && item.file) {
        newFiles.push(item.file)
      }
    })

    setFormData((prev) => ({
      ...prev,
      imagens: newFiles,
    }))
  }

  const uploadImages = async (images: File[]): Promise<string[]> => {
    const uploadPromises = images.map(async (image) => {
      const imageRef = ref(storage, `vehicles/${Date.now()}_${image.name}`)
      await uploadBytes(imageRef, image)
      return getDownloadURL(imageRef)
    })

    return Promise.all(uploadPromises)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Upload das novas imagens
      const newFiles = imageItems.filter((item) => !item.isExisting && item.file).map((item) => item.file!)

      const uploadedImageUrls = newFiles.length > 0 ? await uploadImages(newFiles) : []

      // Combinar imagens na ordem correta
      const allImages: string[] = []
      let uploadIndex = 0

      imageItems.forEach((item) => {
        if (item.isExisting && item.url) {
          allImages.push(item.url)
        } else if (!item.isExisting) {
          allImages.push(uploadedImageUrls[uploadIndex])
          uploadIndex++
        }
      })

      const vehicleData: Partial<Vehicle> = {
        tipoVeiculo: formData.tipoVeiculo,
        marca: formData.marca,
        modelo: formData.modelo,
        versao: formData.versao,
        ano: Number.parseInt(formData.ano),
        quilometragem: Number.parseInt(formData.quilometragem),
        cambio: formData.cambio,
        combustivel: formData.combustivel,
        cor: formData.cor,
        informacoesAdicionais: formData.informacoesAdicionais,
        descricao: formData.descricao,
        preco: formData.preco ? Number.parseFloat(formData.preco) : undefined,
        imagens: allImages,
        destacado: vehicle?.destacado || false,
        updatedAt: new Date(),
      }

      // Add car-specific fields
      if (formData.tipoVeiculo === "carro") {
        vehicleData.tipoCarro = formData.tipoCarro
        vehicleData.potenciaMotor = formData.potenciaMotor
        vehicleData.portas = Number.parseInt(formData.portas)
        vehicleData.direcao = formData.direcao
      }

      // Add motorcycle-specific fields
      if (formData.tipoVeiculo === "moto") {
        vehicleData.cilindrada = formData.cilindrada
        vehicleData.tipoMoto = formData.tipoMoto
      }

      if (vehicle?.id) {
        // Atualizar veículo existente
        await updateDoc(doc(db, "vehicles", vehicle.id), vehicleData)
      } else {
        // Criar novo veículo
        await addDoc(collection(db, "vehicles"), {
          ...vehicleData,
          createdAt: new Date(),
        })
      }

      onClose()
    } catch (error) {
      console.error("Erro ao salvar veículo:", error)
      alert("Erro ao salvar veículo")
    } finally {
      setLoading(false)
    }
  }

  const currentMarcas = formData.tipoVeiculo === "moto" ? MARCAS_MOTO : MARCAS
  const currentTipos = formData.tipoVeiculo === "moto" ? TIPOS_MOTO : TIPOS_CARRO
  const currentCambios = formData.tipoVeiculo === "moto" ? TIPOS_CAMBIO_MOTO : TIPOS_CAMBIO

  return (
    <div className="admin-form-overlay">
      <div className="admin-form-container">
        <div className="admin-form-header">
          <h2>
            {vehicle
              ? `Editar ${formData.tipoVeiculo === "moto" ? "Moto" : "Carro"}`
              : `Adicionar ${formData.tipoVeiculo === "moto" ? "Moto" : "Carro"}`}
          </h2>
          <button onClick={onClose} className="admin-form-close">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label htmlFor="marca">Marca *</label>
              <select id="marca" name="marca" value={formData.marca} onChange={handleInputChange} required>
                <option value="">Selecione a marca</option>
                {currentMarcas.map((marca) => (
                  <option key={marca} value={marca}>
                    {marca}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-form-group">
              <label htmlFor="modelo">Modelo *</label>
              <input
                type="text"
                id="modelo"
                name="modelo"
                value={formData.modelo}
                onChange={handleInputChange}
                required
                placeholder={
                  formData.tipoVeiculo === "moto" ? "Ex: CB 600F, YZF-R3, Ninja 300" : "Ex: Civic, Corolla, Gol"
                }
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="versao">Versão *</label>
              <input
                type="text"
                id="versao"
                name="versao"
                value={formData.versao}
                onChange={handleInputChange}
                required
                placeholder={formData.tipoVeiculo === "moto" ? "Ex: Hornet, ABS, STD" : "Ex: EX, XEI, Comfortline"}
              />
            </div>

            {formData.tipoVeiculo === "carro" ? (
              <>
                <div className="admin-form-group">
                  <label htmlFor="tipoCarro">Tipo do Carro *</label>
                  <select
                    id="tipoCarro"
                    name="tipoCarro"
                    value={formData.tipoCarro}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione o tipo</option>
                    {TIPOS_CARRO.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="potenciaMotor">Potência do Motor *</label>
                  <input
                    type="text"
                    id="potenciaMotor"
                    name="potenciaMotor"
                    value={formData.potenciaMotor}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: 1.0, 1.6, 2.0"
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="portas">Portas *</label>
                  <select id="portas" name="portas" value={formData.portas} onChange={handleInputChange} required>
                    <option value="">Selecione</option>
                    <option value="2">2 portas</option>
                    <option value="3">3 portas</option>
                    <option value="4">4 portas</option>
                    <option value="5">5 portas</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="direcao">Direção *</label>
                  <select id="direcao" name="direcao" value={formData.direcao} onChange={handleInputChange} required>
                    <option value="">Selecione a direção</option>
                    {TIPOS_DIRECAO.map((direcao) => (
                      <option key={direcao} value={direcao}>
                        {direcao}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="admin-form-group">
                  <label htmlFor="tipoMoto">Tipo da Moto *</label>
                  <select id="tipoMoto" name="tipoMoto" value={formData.tipoMoto} onChange={handleInputChange} required>
                    <option value="">Selecione o tipo</option>
                    {TIPOS_MOTO.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="cilindrada">Cilindrada *</label>
                  <input
                    type="text"
                    id="cilindrada"
                    name="cilindrada"
                    value={formData.cilindrada}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: 125cc, 300cc, 600cc"
                  />
                </div>
              </>
            )}

            <div className="admin-form-group">
              <label htmlFor="ano">Ano *</label>
              <input
                type="number"
                id="ano"
                name="ano"
                value={formData.ano}
                onChange={handleInputChange}
                required
                min="1990"
                max={new Date().getFullYear() + 1}
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="quilometragem">Quilometragem *</label>
              <input
                type="number"
                id="quilometragem"
                name="quilometragem"
                value={formData.quilometragem}
                onChange={handleInputChange}
                required
                min="0"
                placeholder="Ex: 50000"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="cambio">Câmbio *</label>
              <select id="cambio" name="cambio" value={formData.cambio} onChange={handleInputChange} required>
                <option value="">Selecione o câmbio</option>
                {currentCambios.map((cambio) => (
                  <option key={cambio} value={cambio}>
                    {cambio}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-form-group">
              <label htmlFor="combustivel">Combustível *</label>
              <select
                id="combustivel"
                name="combustivel"
                value={formData.combustivel}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione o combustível</option>
                {TIPOS_COMBUSTIVEL.map((combustivel) => (
                  <option key={combustivel} value={combustivel}>
                    {combustivel}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-form-group">
              <label htmlFor="cor">Cor *</label>
              <select id="cor" name="cor" value={formData.cor} onChange={handleInputChange} required>
                <option value="">Selecione a cor</option>
                {CORES.map((cor) => (
                  <option key={cor} value={cor}>
                    {cor}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-form-group">
              <label htmlFor="preco">Preço (R$)</label>
              <input
                type="number"
                id="preco"
                name="preco"
                value={formData.preco}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                placeholder="Ex: 45000.00"
              />
            </div>
          </div>

          <div className="admin-form-group admin-form-full">
            <label>Informações Adicionais</label>
            <div className="admin-checkbox-group">
              <div className="admin-checkbox-item">
                <Checkbox
                  id="unicoDono"
                  checked={formData.informacoesAdicionais.unicoDono}
                  onCheckedChange={(checked) => handleCheckboxChange(checked, "unicoDono")}
                />
                <label htmlFor="unicoDono" className="admin-checkbox-label">
                  Único Dono
                </label>
              </div>
              <div className="admin-checkbox-item">
                <Checkbox
                  id="manualCarro"
                  checked={formData.informacoesAdicionais.manualCarro}
                  onCheckedChange={(checked) => handleCheckboxChange(checked, "manualCarro")}
                />
                <label htmlFor="manualCarro" className="admin-checkbox-label">
                  {formData.tipoVeiculo === "moto" ? "Manual da Moto" : "Manual do Carro"}
                </label>
              </div>
              <div className="admin-checkbox-item">
                <Checkbox
                  id="chaveReserva"
                  checked={formData.informacoesAdicionais.chaveReserva}
                  onCheckedChange={(checked) => handleCheckboxChange(checked, "chaveReserva")}
                />
                <label htmlFor="chaveReserva" className="admin-checkbox-label">
                  Chave Reserva
                </label>
              </div>
            </div>
          </div>

          <div className="admin-form-group admin-form-full">
            <label htmlFor="descricao">Descrição *</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder={`Descreva as características e condições ${formData.tipoVeiculo === "moto" ? "da moto" : "do veículo"}...`}
            />
          </div>

          <div className="admin-form-group admin-form-full">
            <label>Imagens</label>

            {optimizing && (
              <div className="admin-optimizing-notice">
                <ImageIcon size={20} />
                <span>Otimizando imagens...</span>
              </div>
            )}

            {/* Grid de imagens com drag & drop */}
            {imageItems.length > 0 && (
              <div className="admin-images-section">
                <h4>Imagens {formData.tipoVeiculo === "moto" ? "da moto" : "do veículo"} (arraste para reordenar):</h4>
                <div className="admin-images-grid-sortable">
                  {imageItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`admin-image-item-sortable ${draggedIndex === index ? "dragging" : ""}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragEnter}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <div className="admin-image-drag-handle">
                        <GripVertical size={16} />
                      </div>

                      <div className="admin-image-preview">
                        <NextImage
                          src={item.url || (item.file ? URL.createObjectURL(item.file) : "/placeholder.svg")}
                          alt={`Imagem ${index + 1}`}
                          width={200}
                          height={150}
                          className="object-cover rounded"
                        />
                      </div>

                      <div className="admin-image-info">
                        <span className="admin-image-order">#{index + 1}</span>
                        <span className="admin-image-type">{item.isExisting ? "Existente" : "Nova"}</span>
                      </div>

                      <button type="button" onClick={() => removeImage(item.id)} className="admin-image-remove">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="admin-file-input">
              <input
                type="file"
                id="imagens"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="admin-file-input-hidden"
                disabled={optimizing}
              />
              <label htmlFor="imagens" className="admin-file-input-label">
                <Upload size={20} />
                {optimizing ? "Processando..." : "Adicionar Imagens"}
              </label>
              <p className="admin-file-input-help">
                As imagens serão automaticamente otimizadas para melhor performance
              </p>
            </div>
          </div>

          <div className="admin-form-actions">
            <button type="button" onClick={onClose} className="admin-btn-secondary">
              Cancelar
            </button>
            <button type="submit" disabled={loading || optimizing} className="admin-btn-primary">
              {loading ? "Salvando..." : optimizing ? "Processando..." : vehicle ? "Atualizar" : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
