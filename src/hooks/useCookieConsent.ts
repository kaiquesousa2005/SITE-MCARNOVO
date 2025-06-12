"use client"

import { useState, useEffect } from "react"

interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

const COOKIE_CONSENT_KEY = "mcar-cookie-consent"
const COOKIE_CONSENT_DATE_KEY = "mcar-cookie-consent-date"

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Verificar se já existe consentimento
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    const consentDate = localStorage.getItem(COOKIE_CONSENT_DATE_KEY)

    if (savedConsent && consentDate) {
      // Verificar se o consentimento não expirou (6 meses)
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
      const savedDate = new Date(consentDate)

      if (savedDate > sixMonthsAgo) {
        setConsent(JSON.parse(savedConsent))
        setShowBanner(false)
      } else {
        // Consentimento expirado
        setShowBanner(true)
      }
    } else {
      // Primeiro acesso
      setShowBanner(true)
    }
  }, [])

  const acceptAll = () => {
    const fullConsent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    saveConsent(fullConsent)
  }

  const acceptNecessary = () => {
    const necessaryOnly: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }
    saveConsent(necessaryOnly)
  }

  const acceptCustom = (customConsent: CookieConsent) => {
    saveConsent({ ...customConsent, necessary: true })
  }

  const saveConsent = (newConsent: CookieConsent) => {
    setConsent(newConsent)
    setShowBanner(false)
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newConsent))
    localStorage.setItem(COOKIE_CONSENT_DATE_KEY, new Date().toISOString())

    // Ativar/desativar scripts baseado no consentimento
    if (newConsent.analytics) {
      enableGoogleAnalytics()
    }
    if (newConsent.marketing) {
      enableFacebookPixel()
    }
  }

  const enableGoogleAnalytics = () => {
    // Ativar Google Analytics se consentimento for dado
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("consent", "update", {
        analytics_storage: "granted",
      })
    }
  }

  const enableFacebookPixel = () => {
    // Ativar Facebook Pixel se consentimento for dado
    if (typeof window !== "undefined" && (window as any).fbq) {
      ;(window as any).fbq("consent", "grant")
    }
  }

  const resetConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY)
    localStorage.removeItem(COOKIE_CONSENT_DATE_KEY)
    setConsent(null)
    setShowBanner(true)
  }

  return {
    consent,
    showBanner,
    acceptAll,
    acceptNecessary,
    acceptCustom,
    resetConsent,
  }
}
