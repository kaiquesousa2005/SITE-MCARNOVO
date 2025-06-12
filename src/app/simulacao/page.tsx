import { Suspense } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import SimulacaoForm from "../../components/SimulacaoForm"
import "../styles/Simulação.css"

function SimulacaoLoading() {
  return (
    <div className="simulacao-page-loading">
      <div className="simulacao-page-spinner"></div>
      <p>Carregando formulário...</p>
    </div>
  )
}

export default function SimulacaoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="simulacao-page-main">
        <Suspense fallback={<SimulacaoLoading />}>
          <SimulacaoForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
