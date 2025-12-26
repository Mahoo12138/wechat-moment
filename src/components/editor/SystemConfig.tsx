import { useMomentStore } from '@/store/useMomentStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Battery, Signal, Wifi, Smartphone, Monitor } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DEVICES } from '@/constants/devices'
import { useState, useEffect, ChangeEvent } from 'react'

export function SystemConfig() {
  const { system, setSystem, device, setDevice } = useMomentStore()

  // Local state for time picker (HH:mm)
  const [timeInputValue, setTimeInputValue] = useState('')

  useEffect(() => {
     // Check if system.time is valid HH:mm (simple check)
     // Regex for HH:mm (24h)
     const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
     if (timeRegex.test(system.time)) {
         setTimeInputValue(system.time)
     } else {
         setTimeInputValue('')
     }
  }, [system.time])

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setTimeInputValue(val)
      if (val) setSystem({ time: val })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System & Device</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" /> Device Model
          </Label>
          <Select
            value={device.modelId}
            onValueChange={(value) => {
              const selectedDevice = DEVICES.find(d => d.id === value)
              if (selectedDevice) {
                setDevice({
                  modelId: selectedDevice.id,
                  width: selectedDevice.width,
                  height: selectedDevice.height,
                  scale: selectedDevice.scale
                })
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent>
              {DEVICES.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.name} ({d.width}x{d.height})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
            <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
                <Monitor className="w-4 h-4" /> Preview Scale ({device.scale.toFixed(2)}x)
            </Label>
            </div>
            <Slider 
            value={[device.scale]} 
            onValueChange={([v]) => setDevice({ scale: v })}
            min={0.5}
            max={1.5}
            step={0.05}
            />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sys-time">Time</Label>
          <div className="relative">
              <Input 
                type="time"
                value={timeInputValue}
                onChange={handleTimeChange}
                className="w-full block"
                style={{ display: 'block' }}
              />
          </div>
          <div className="flex gap-2 mt-1">
            <Input 
                id="sys-time" 
                value={system.time} 
                onChange={(e) => setSystem({ time: e.target.value })}
                placeholder="Custom (e.g. 12:00)"
                className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Pick a time above or type custom text below.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Battery className="w-4 h-4" /> Battery Level ({system.batteryLevel}%)
            </Label>
          </div>
          <Slider 
            value={[system.batteryLevel]} 
            onValueChange={([v]) => setSystem({ batteryLevel: v })}
            max={100}
            step={1}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Signal className="w-4 h-4" /> Signal Strength ({system.signalStrength})
            </Label>
          </div>
          <Slider 
            value={[system.signalStrength]} 
            onValueChange={([v]) => setSystem({ signalStrength: v })}
            max={4}
            step={1}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="wifi" className="flex items-center gap-2">
            <Wifi className="w-4 h-4" /> Wi-Fi
          </Label>
          <Switch 
            id="wifi" 
            checked={system.wifi} 
            onCheckedChange={(checked) => setSystem({ wifi: checked })}
          />
        </div>
      </CardContent>
    </Card>
  )
}
