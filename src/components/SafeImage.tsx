"use client"

import { useState } from "react"
import Image, { ImageProps } from "next/image"
import { Car } from "lucide-react"

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackIcon?: React.ReactNode
}

export default function SafeImage({ 
  src, 
  alt, 
  fallbackIcon,
  className,
  ...props 
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Se a URL é do Vercel Blob mas não está configurada, usar img nativo
  const isVercelBlob = typeof src === 'string' && src.includes('.public.blob.vercel-storage.com')
  
  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ position: 'relative', width: '100%', height: '100%' }}
      >
        {fallbackIcon || <Car size={48} className="text-gray-400" />}
      </div>
    )
  }

  // Para imagens do Vercel Blob, usar tag img nativa para evitar erros de configuração
  if (isVercelBlob) {
    return (
      <>
        {isLoading && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-gray-100"
          >
            <div className="animate-pulse bg-gray-200 w-full h-full" />
          </div>
        )}
        <img
          src={src as string}
          alt={alt}
          className={className}
          style={{ 
            objectFit: 'cover', 
            width: '100%', 
            height: '100%',
            position: 'absolute',
            inset: 0
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />
      </>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  )
}
