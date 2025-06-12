"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone, Menu, X, Instagram, Facebook } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-blue-900 px-3 py-1 rounded font-bold text-xl flex items-center space-x-2">
              <Image src="/images/logomcar.png" alt="MCar Logo" width={150} height={150}/>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium">
              Home
            </Link>
            <Link href="/sobre" className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium">
              Empresa
            </Link>
            <Link
              href="/estoque"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
            >
              Estoque
            </Link>
          </nav>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="tel:+5585323246432"
              className="flex items-center space-x-2 hover:text-yellow-400 transition-colors duration-300"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm">(85) 3232-4632</span>
            </a>
            <div className="flex items-center space-x-3">
              <a
                href="https://www.instagram.com/mcarveiculos/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/mcarveiculos3/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-blue-800 rounded transition-colors duration-300"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-800">
            <div className="flex flex-col space-y-4">
              {/* Navigation Links */}
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/sobre"
                  className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Empresa
                </Link>
                <Link
                  href="/estoque"
                  className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Estoque
                </Link>
              </nav>

              {/* Contact Info */}
              <div className="pt-3 border-t border-blue-800">
                <a
                  href="tel:+5585323246432"
                  className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors duration-300 mb-3"
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">(85) 3232-4632</span>
                </a>
                <div className="flex items-center space-x-4">
                  <a
                    href="https://www.instagram.com/mcarveiculos/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-yellow-400 transition-colors duration-300"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.facebook.com/mcarveiculos3/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-yellow-400 transition-colors duration-300"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
