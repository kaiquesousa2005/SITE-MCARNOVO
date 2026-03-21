import { del } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  try {
    const { urls } = await request.json()

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'Nenhuma URL fornecida' }, { status: 400 })
    }

    // Filtrar apenas URLs do Vercel Blob (ignorar URLs do Firebase antigo)
    const blobUrls = urls.filter((url: string) => 
      url.includes('blob.vercel-storage.com') || url.includes('vercel-blob.com')
    )

    if (blobUrls.length > 0) {
      await del(blobUrls)
    }

    return NextResponse.json({ success: true, deleted: blobUrls.length })
  } catch (error) {
    console.error('Erro ao deletar:', error)
    return NextResponse.json({ error: 'Falha ao deletar' }, { status: 500 })
  }
}
