import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Camera, Smartphone, Download, Settings } from 'lucide-react'

export function WelcomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
          WeChat Moment Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create authentic-looking WeChat Moment screenshots for your projects, presentations, or fun.
          Customize everything from user info to comments.
        </p>
        
        <div className="flex justify-center gap-4">
          <Link to="/editor">
            <Button size="lg" className="gap-2">
              Start Creating <Camera className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
          <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Full Customization</h3>
            <p className="text-muted-foreground">
              Edit user details, moment content, time, location, and even system status bar indicators.
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Real-time Preview</h3>
            <p className="text-muted-foreground">
              See your changes instantly on a realistic mobile device simulator as you type.
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Download className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">High Quality Export</h3>
            <p className="text-muted-foreground">
              Export your creations as high-resolution PNG images ready for sharing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
