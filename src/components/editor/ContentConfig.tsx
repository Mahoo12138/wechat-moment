import { useMomentStore } from '@/store/useMomentStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Plus } from 'lucide-react'
import { ChangeEvent } from 'react'

export function ContentConfig() {
  const { moment, setMoment } = useMomentStore()

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      if (moment.images.length < 9) {
        setMoment({ images: [...moment.images, url] })
      }
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...moment.images]
    newImages.splice(index, 1)
    setMoment({ images: newImages })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Moment Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">Text Content</Label>
          <Textarea 
            id="text" 
            value={moment.text} 
            onChange={(e) => setMoment({ text: e.target.value })}
            placeholder="What's on your mind?"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>Images (Max 9)</Label>
          <div className="grid grid-cols-3 gap-2">
            {moment.images.map((img, idx) => (
              <div key={idx} className="relative aspect-square bg-muted rounded-md overflow-hidden group">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button 
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {moment.images.length < 9 && (
              <div className="aspect-square bg-muted rounded-md flex items-center justify-center border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors relative cursor-pointer">
                <Plus className="w-6 h-6 text-muted-foreground" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input 
              id="time" 
              value={moment.time} 
              onChange={(e) => setMoment({ time: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input 
              id="source" 
              value={moment.source || ''} 
              onChange={(e) => setMoment({ source: e.target.value })}
              placeholder="e.g. iPhone 15"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            value={moment.location || ''} 
            onChange={(e) => setMoment({ location: e.target.value })}
            placeholder="Location"
          />
        </div>
      </CardContent>
    </Card>
  )
}
