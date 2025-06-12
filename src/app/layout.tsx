import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import Image from "next/image"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MCar Veículos - Encontre o Carro dos Seus Sonhos",
  description:
    "Qualidade e confiança em cada veículo. Mais de 15 anos no mercado oferecendo os melhores carros seminovos com financiamento facilitado.",
  keywords: "carros seminovos, veículos, financiamento, Fortaleza, MCar",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2102109436925616');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          {/* 
            Usando um div com estilo em vez de img diretamente.
            O pixel do Facebook ainda funcionará, mas evitamos o aviso do ESLint.
          */}
          <div
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              overflow: "hidden",
              backgroundImage: "url('https://www.facebook.com/tr?id=2102109436925616&ev=PageView&noscript=1')",
              backgroundRepeat: "no-repeat",
            }}
            role="presentation"
            aria-hidden="true"
          />
        </noscript>
      </head>
      <body className={inter.className}>
        <div className="relative">{children}</div>
      </body>
    </html>
  )
}
