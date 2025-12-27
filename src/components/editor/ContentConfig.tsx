import { useMomentStore } from '@/store/useMomentStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Plus, Image as ImageIcon, Link as LinkIcon, Loader2, RefreshCw } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { format, parse, isValid } from 'date-fns'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

export function ContentConfig() {
  const { moment, setMoment } = useMomentStore()
  
  // Local state for the date picker input (YYYY-MM-DDTHH:mm)
  const [dateInputValue, setDateInputValue] = useState('')
  const [isFetchingLink, setIsFetchingLink] = useState(false)

  useEffect(() => {
    try {
        const parsed = parse(moment.time, 'yyyy年MM月dd日 HH:mm', new Date())
        if (isValid(parsed)) {
            setDateInputValue(format(parsed, "yyyy-MM-dd'T'HH:mm"))
        } else {
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

  const handleLinkCoverUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      setMoment({ 
        linkInfo: { 
          ...moment.linkInfo!, 
          cover: url 
        } 
      })
    }
  }

  const fetchLinkInfo = async () => {
    const url = moment.linkInfo?.url
    if (!url) return

    setIsFetchingLink(true)
    try {
        // Use microlink.io API to fetch metadata
        const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`)
        const data = await response.json()
        
        if (data.status === 'success') {
            const { title, image } = data.data
            setMoment({
                linkInfo: {
                    ...moment.linkInfo!,
                    title: title || moment.linkInfo?.title || 'No Title',
                    cover: image?.url || moment.linkInfo?.cover || './favicon.png'
                }
            })
        }
    } catch (error) {
        console.error("Failed to fetch link info", error)
    } finally {
        setIsFetchingLink(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Moment Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Type Toggle */}
        <div className="space-y-2">
            <Label>Content Type</Label>
            <Tabs 
                value={moment.type} 
                onValueChange={(val) => setMoment({ type: val as 'original' | 'link' })}
                className="w-full"
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="original">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Image & Text
                    </TabsTrigger>
                    <TabsTrigger value="link">
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Web Link
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>

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

        {/* Conditional Rendering based on Type */}
        {moment.type === 'original' ? (
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
        ) : (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                <div className="space-y-2">
                    <Label htmlFor="link-url">URL (Auto Fetch)</Label>
                    <div className="flex gap-2">
                        <Input 
                            id="link-url"
                            value={moment.linkInfo?.url || ''}
                            onChange={(e) => setMoment({ 
                                linkInfo: { ...moment.linkInfo!, url: e.target.value } 
                            })}
                            placeholder="https://example.com"
                        />
                        <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={fetchLinkInfo}
                            disabled={!moment.linkInfo?.url || isFetchingLink}
                            title="Fetch Title & Image"
                        >
                            {isFetchingLink ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <RefreshCw className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="link-title">Link Title</Label>
                    <Input 
                        id="link-title"
                        value={moment.linkInfo?.title || ''}
                        onChange={(e) => setMoment({ 
                            linkInfo: { ...moment.linkInfo!, title: e.target.value } 
                        })}
                        placeholder="Page Title"
                    />
                </div>
                
                <div className="space-y-2">
                    <Label>Link Cover Image</Label>
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0 border">
                            <img 
                                src={moment.linkInfo?.cover || './favicon.png'} 
                                alt="Link Cover" 
                                className="w-full h-full object-cover" 
                            />
                             <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-colors cursor-pointer group">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                    onChange={handleLinkCoverUpload}
                                />
                                <Plus className="text-white opacity-0 group-hover:opacity-100" />
                            </div>
                        </div>
                        <div className="flex-1 text-xs text-muted-foreground">
                            <p>Auto-fetched from URL or upload manually.</p>
                            <p className="mt-1">Click image to change.</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <div className="relative">
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
            </div>
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
