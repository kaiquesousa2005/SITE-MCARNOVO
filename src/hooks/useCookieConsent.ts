"use client"

import { useState, useEffect } from "react"

interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

const COOKIE_CONSENT_KEY = "mcar-cookie-consent"
const COOKIE_CONSENT_DATE_KEY = "mcar-cookie-consent-date"

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    const consentDate = localStorage.getItem(COOKIE_CONSENT_DATE_KEY)

    if (savedConsent && consentDate) {
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
      const savedDate = new Date(consentDate)

      if (savedDate > sixMonthsAgo) {
        setConsent(JSON.parse(savedConsent))
        setShowBanner(false)
      } else {
        setShowBanner(true)
      }
    } else {
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

    if (newConsent.analytics) {
      enableGoogleAnalytics()
    }
    if (newConsent.marketing) {
      enableFacebookPixel()
    }
  }

  const enableGoogleAnalytics = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      })
    }
  }

  const enableFacebookPixel = () => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("consent", "grant")
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
