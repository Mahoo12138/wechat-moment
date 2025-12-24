import { Button } from '@/components/ui/button'
import { Download, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toPng } from 'html-to-image'

export function ScreenshotGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    const element = document.getElementById('preview-device-screen')
    if (!element) return

    setIsGenerating(true)
    try {
      // Small delay to ensure any pending renders are done
      await new Promise(resolve => setTimeout(resolve, 100))

      const dataUrl = await toPng(element, {
        pixelRatio: 2, // Retina display quality
        cacheBust: true,
        backgroundColor: undefined, // Let it be transparent or inherited
      })

      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `wechat-moment-${Date.now()}.png`
      link.click()
    } catch (error) {
      console.error('Screenshot failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button 
      className="w-full" 
      size="lg" 
      onClick={handleGenerate} 
      disabled={isGenerating}
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Export Screenshot
        </>
      )}
    </Button>
  )
}
