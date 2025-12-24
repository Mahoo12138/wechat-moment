import { useMomentStore } from '@/store/useMomentStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Plus, Calendar } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { format, parse, isValid } from 'date-fns'

export function ContentConfig() {
  const { moment, setMoment } = useMomentStore()
  
  // Local state for the date picker input (YYYY-MM-DDTHH:mm)
  const [dateInputValue, setDateInputValue] = useState('')

  // Sync dateInputValue with moment.time when component mounts or moment.time changes externally
  // But only if moment.time matches our format, otherwise leave it empty (or let user overwrite)
  useEffect(() => {
    try {
        // Try to parse "2023年12月12日 12:00"
        const parsed = parse(moment.time, 'yyyy年MM月dd日 HH:mm', new Date())
        if (isValid(parsed)) {
            setDateInputValue(format(parsed, "yyyy-MM-dd'T'HH:mm"))
        } else {
            // If moment.time is "Just now" or other format, reset picker or keep it independent?
            // If we reset it, the picker shows placeholder.
            // Let's check if it is "Just now" etc.
            setDateInputValue('')
        }
    } catch (e) {
        setDateInputValue('')
    }
  }, [moment.time])

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value
    setDateInputValue(newVal)
    if (newVal) {
        const date = new Date(newVal)
        if (isValid(date)) {
            // Format to WeChat style
            setMoment({ time: format(date, 'yyyy年MM月dd日 HH:mm') })
        }
    }
  }

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
            <div className="relative">
                {/* Standard datetime picker */}
                <div className="relative">
                    <Input
                        type="datetime-local"
                        id="time-picker"
                        value={dateInputValue}
                        onChange={handleDateChange}
                        className="w-full block"
                        style={{ display: 'block' }}
                    />
                </div>
                {/* Fallback manual text input for "Just now" etc? 
                    The user requested "Change to standard date time component", so maybe we replace the text input entirely.
                    But if we do, we lose "Just now".
                    Let's provide a way to type manual text too?
                    Actually, let's keep it simple: Date Picker writes to Store. 
                    If user wants "Just now", they can't type it in the date picker.
                    
                    Alternative: Text Input + Date Picker Icon.
                    Let's try that to be most flexible.
                */}
            </div>
            {/* If we strictly follow "Change this to a standard date time selection component", we might just swap it. 
               But let's add a small text input below or toggle? 
               Let's just use a Text Input that has a Date Picker Trigger.
            */}
             <div className="flex gap-2 mt-1">
                 <Input 
                    id="time-manual" 
                    value={moment.time} 
                    onChange={(e) => setMoment({ time: e.target.value })}
                    placeholder="Custom text (e.g. Just now)"
                    className="flex-1"
                />
             </div>
             <p className="text-xs text-muted-foreground mt-1">Pick a date above or type custom text below.</p>
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
