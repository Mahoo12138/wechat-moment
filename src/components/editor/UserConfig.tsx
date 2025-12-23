import { useMomentStore } from '@/store/useMomentStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Upload } from 'lucide-react'
import { useRef } from 'react'

export function UserConfig() {
  const { user, setUser } = useMomentStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUser({ avatar: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
            <div 
                className="relative w-16 h-16 rounded-md bg-muted border flex items-center justify-center overflow-hidden cursor-pointer group shrink-0"
                onClick={() => fileInputRef.current?.click()}
            >
                {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                    <User className="w-8 h-8 text-muted-foreground" />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="w-5 h-5 text-white" />
                </div>
                <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/*"
                    onChange={handleAvatarUpload}
                />
            </div>
            
            <div className="space-y-2 flex-1">
                <Label htmlFor="nickname">Nickname</Label>
                <Input 
                    id="nickname" 
                    value={user.nickname} 
                    onChange={(e) => setUser({ nickname: e.target.value })}
                    placeholder="Enter nickname"
                />
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
