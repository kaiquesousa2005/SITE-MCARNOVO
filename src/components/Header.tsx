"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone, Menu, X, MessageCircle } from "lucide-react"
import "../app/styles/Header.css"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Detectar scroll para efeito de header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fechar menu ao clicar em links
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Prevenir scroll quando menu mobile está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-container">
        {/* Logo */}
        <Link href="/" className="header-logo">
          <Image src="/images/logomcar.png" alt="MCar Veículos" width={180} height={60} priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          <Link href="/" className={`header-nav-item ${pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
          <Link href="/sobre" className={`header-nav-item ${pathname === "/sobre" ? "active" : ""}`}>
            Sobre
          </Link>
          <Link href="/estoque" className={`header-nav-item ${pathname === "/estoque" ? "active" : ""}`}>
            Estoque
          </Link>
        </nav>

        {/* Contact */}
        <div className="header-contact">
          <a href="tel:+5585323246432" className="header-phone">
            <Phone size={18} />
            <span>(85) 3232-4632</span>
          </a>
          <a
            href="https://wa.me/558532324632?text=Olá! Vim através do site e gostaria de mais informações."
            target="_blank"
            rel="noopener noreferrer"
            className="header-whatsapp"
          >
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="header-menu-toggle"
          onClick={handleMenuToggle}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`header-mobile ${isMenuOpen ? "open" : ""}`}>
        <nav className="header-mobile-nav">
          <Link
            href="/"
            className={`header-mobile-item ${pathname === "/" ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/sobre"
            className={`header-mobile-item ${pathname === "/sobre" ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Sobre
          </Link>
          <Link
            href="/estoque"
            className={`header-mobile-item ${pathname === "/estoque" ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Estoque
          </Link>
        </nav>

        <div className="header-mobile-contact">
          <a href="tel:+5585323246432" className="header-mobile-phone">
            <Phone size={20} />
            <span>(85) 3232-4632</span>
          </a>
          <a
            href="https://wa.me/558532324632?text=Olá! Vim através do site e gostaria de mais informações."
            target="_blank"
            rel="noopener noreferrer"
            className="header-mobile-whatsapp"
            onClick={() => setIsMenuOpen(false)}
          >
            <MessageCircle size={20} />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Overlay para mobile */}
      {isMenuOpen && <div className="header-overlay" onClick={() => setIsMenuOpen(false)} />}
    </header>
  )
}
