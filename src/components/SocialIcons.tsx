"use client"; // importante se estiver usando dentro de app/

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Olx from "public/images/icone-olx.png";
import iCarros from "public/images/iCarros icon.png";
import Whatsapp from "public/images/icone-zap-.png";
import Instagram from "public/images/instagram-icone.png";
import MobiAutos from "public/images/mobi auto icon.png";
import "../app/styles/SocialIcons.css";

const Social: React.FC = () => {
  const [showSocialIcons, setShowSocialIcons] = useState(true);

  const toggleSocialIcons = () => {
    setShowSocialIcons(!showSocialIcons);
  };

  return (
    <div className={`social-sidebar ${showSocialIcons ? "show" : "hide"}`}>
      <button onClick={toggleSocialIcons} className="toggle-social-icons">
        {showSocialIcons ? <FaEyeSlash /> : <FaEye />}
      </button>

      <a
        href="https://www.instagram.com/mcarveiculos"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <Image src={Instagram} alt="Instagram" width={40} height={40} />
      </a>
      <a
        href="https://wa.me/558532324632"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <Image src={Whatsapp} alt="WhatsApp" width={40} height={40} />
      </a>
      <a
        href="https://www.olx.com.br/perfil/mcar-veiculos-3db64f60"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon-olx"
      >
        <Image src={Olx} alt="OLX" width={40} height={40} />
      </a>
      <a
        href="https://www.mobiauto.com.br/comprar/estoque/m-car-veiculos-23370"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <Image src={MobiAutos} alt="MobiAutos" width={40} height={40} />
      </a>
      <a
        href="https://www.icarros.com.br/ache/estoque.jsp?id=2628223"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon"
      >
        <Image src={iCarros} alt="iCarros" width={40} height={40} />
      </a>
    </div>
  );
};

export default Social;
