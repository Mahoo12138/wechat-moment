import { PreviewDevice } from '@/components/preview/PreviewDevice'
import { ConfigForm } from '@/components/editor/ConfigForm'
import { Button } from '@/components/ui/button'
import { Settings2 } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function EditorPage() {
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
      <div className="hidden md:flex w-[600px] border-l bg-card flex-col h-full shadow-xl z-10">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Configuration</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <ConfigForm />
        </div>
      </div>
    </div>
  )
}
