import { PreviewDevice } from '@/components/preview/PreviewDevice'
import { ConfigForm } from '@/components/editor/ConfigForm'
import { Button } from '@/components/ui/button'
import { Settings2, Moon, Sun } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useState, useEffect } from 'react'

export function EditorPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    if (newMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left Panel - Preview */}
      <div className="flex-1 bg-muted/30 flex items-center justify-center p-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none" />
        <PreviewDevice />
        
        {/* Mobile Config Trigger */}
        <div className="absolute bottom-6 right-6 md:hidden z-50">
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
                <Settings2 className="h-6 w-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[85vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
              </DrawerHeader>
              <div className="flex-1 overflow-y-auto p-4">
                <ConfigForm />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {/* Right Panel - Configuration (Desktop only) */}
      <div className="hidden md:flex w-[400px] border-l bg-card flex-col h-full shadow-xl z-10">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-lg">Configuration</h2>
          <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle Theme">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <ConfigForm />
        </div>
      </div>
    </div>
  )
}
