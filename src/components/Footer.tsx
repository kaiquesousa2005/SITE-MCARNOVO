import Link from "next/link";
import { Facebook, Instagram, MapPin, Mail, Phone } from "lucide-react";
import "../app/styles/Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Sobre a MCar Veículos</h3>
          <p>
            Especializada em veículos de qualidade, a MCar oferece as melhores
            opções para você encontrar o carro dos seus sonhos.
          </p>
        </div>
        <div className="footer-section">
          <h3>Links Rápidos</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>

            </li>
            <li>
              <Link href="/sobre">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link href="/estoque">
                Estoque
              </Link>            
              </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contato</h3>
          <p>
            <MapPin size={18} /> Av. Américo Barreira, 5626 - Demócrito Rocha,
            Fortaleza - CE
          </p>
          <p>
            <Phone size={18} /> (85) 3232-4632
          </p>
          <p>
            <Mail size={18} /> mcarveiculos2015@gmail.com
          </p>
        </div>
        <div className="footer-section">
          <h3>Siga-nos</h3>
          <div className="footer-social-icons">
            <a
              href="https://www.facebook.com/mcarveiculos3/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook />
            </a>
            <a
              href="https://www.instagram.com/mcarveiculos/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 MCar Veículos. Todos os direitos reservados.</p>
        <div>
          <Link href="/politica-privacidade">
            Política de Privacidade
          </Link>{" "}
          |{" "}
          <Link href="/termos-uso">
            Termos de Uso
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
