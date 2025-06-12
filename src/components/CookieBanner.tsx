"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useCookieConsent } from "@/hooks/useCookieConsent"
import { Cookie, Settings, Shield, BarChart3, Target, User } from "lucide-react"
import "@/app/styles/CookieBanner.css"

export default function CookieBanner() {
  const { showBanner, acceptAll, acceptNecessary, acceptCustom } = useCookieConsent()
  const [showDetails, setShowDetails] = useState(false)
  const [customConsent, setCustomConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  })

  if (!showBanner) return null

  const handleCustomConsentChange = (type: keyof typeof customConsent, checked: boolean) => {
    setCustomConsent((prev) => ({
      ...prev,
      [type]: type === "necessary" ? true : checked, // Necessários sempre true
    }))
  }

  return (
    <div className="cookie-banner-overlay">
      <Card className="cookie-banner">
        <CardContent className="cookie-banner-content">
          <div className="cookie-banner-header">
            <div className="cookie-banner-icon">
              <Cookie size={24} />
            </div>
            <h3 className="cookie-banner-title">Cookies e Privacidade</h3>
          </div>

          <p className="cookie-banner-description">
            Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego. Ao
            continuar navegando, você concorda com nossa{" "}
            <Link href="/politica-privacidade" className="cookie-banner-link">
              Política de Privacidade
            </Link>
            .
          </p>

          {!showDetails ? (
            <div className="cookie-banner-actions">
              <Button onClick={acceptNecessary} variant="outline" className="cookie-banner-btn-necessary">
                Apenas Necessários
              </Button>
              <Button onClick={() => setShowDetails(true)} variant="outline" className="cookie-banner-btn-settings">
                <Settings size={16} />
                Personalizar
              </Button>
              <Button onClick={acceptAll} className="cookie-banner-btn-accept">
                Aceitar Todos
              </Button>
            </div>
          ) : (
            <div className="cookie-banner-details">
              <h4 className="cookie-banner-details-title">Personalize suas preferências</h4>

              <div className="cookie-banner-options">
                <div className="cookie-banner-option">
                  <div className="cookie-banner-option-header">
                    <Checkbox id="necessary" checked={true} disabled={true} className="cookie-banner-checkbox" />
                    <div className="cookie-banner-option-info">
                      <Shield size={16} />
                      <div>
                        <label htmlFor="necessary" className="cookie-banner-option-label">
                          Cookies Necessários
                        </label>
                        <p className="cookie-banner-option-description">
                          Essenciais para o funcionamento básico do site
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cookie-banner-option">
                  <div className="cookie-banner-option-header">
                    <Checkbox
                      id="analytics"
                      checked={customConsent.analytics}
                      onCheckedChange={(checked) => handleCustomConsentChange("analytics", checked as boolean)}
                      className="cookie-banner-checkbox"
                    />
                    <div className="cookie-banner-option-info">
                      <BarChart3 size={16} />
                      <div>
                        <label htmlFor="analytics" className="cookie-banner-option-label">
                          Cookies de Análise
                        </label>
                        <p className="cookie-banner-option-description">
                          Nos ajudam a entender como você usa o site (Google Analytics)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cookie-banner-option">
                  <div className="cookie-banner-option-header">
                    <Checkbox
                      id="marketing"
                      checked={customConsent.marketing}
                      onCheckedChange={(checked) => handleCustomConsentChange("marketing", checked as boolean)}
                      className="cookie-banner-checkbox"
                    />
                    <div className="cookie-banner-option-info">
                      <Target size={16} />
                      <div>
                        <label htmlFor="marketing" className="cookie-banner-option-label">
                          Cookies de Marketing
                        </label>
                        <p className="cookie-banner-option-description">
                          Para mostrar anúncios relevantes (Facebook Pixel, Google Ads)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cookie-banner-option">
                  <div className="cookie-banner-option-header">
                    <Checkbox
                      id="preferences"
                      checked={customConsent.preferences}
                      onCheckedChange={(checked) => handleCustomConsentChange("preferences", checked as boolean)}
                      className="cookie-banner-checkbox"
                    />
                    <div className="cookie-banner-option-info">
                      <User size={16} />
                      <div>
                        <label htmlFor="preferences" className="cookie-banner-option-label">
                          Cookies de Preferências
                        </label>
                        <p className="cookie-banner-option-description">Lembram suas configurações e preferências</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cookie-banner-custom-actions">
                <Button onClick={() => setShowDetails(false)} variant="outline">
                  Voltar
                </Button>
                <Button onClick={() => acceptCustom(customConsent)} className="cookie-banner-btn-save">
                  Salvar Preferências
                </Button>
              </div>
            </div>
          )}

          <p className="cookie-banner-footer">
            Você pode alterar suas preferências a qualquer momento em nossa{" "}
            <Link href="/politica-privacidade" className="cookie-banner-link">
              Política de Privacidade
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
