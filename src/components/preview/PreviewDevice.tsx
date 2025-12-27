import { useMomentStore } from '@/store/useMomentStore'
import { MomentItem } from './MomentItem'
import { ChevronLeft, MoreHorizontal, Smile, PlusCircle } from 'lucide-react'
import { forwardRef } from 'react'
import { BatteryIcon } from '@/components/icons/BatteryIcon'
import { SignalIcon } from '@/components/icons/SignalIcon'
import { WifiIcon } from '@/components/icons/WifiIcon'
import { cn } from '@/lib/utils'

interface PreviewDeviceProps {
  isMobile?: boolean
}

export const PreviewDevice = forwardRef<HTMLDivElement, PreviewDeviceProps>(({ isMobile }, ref) => {
  const { system, device } = useMomentStore()

  // Base styles for the screen content
  const screenContent = (
    <div 
      ref={ref}
      id="preview-device-screen"
      className={cn(
        "overflow-hidden w-full h-full bg-white dark:bg-black relative flex flex-col",
        !isMobile && "rounded-[2rem]"
      )}
    >
      {/* Header Container (Status Bar + Nav Bar) */}
      <div className="bg-[#ededed] dark:bg-[#111111] shrink-0 relative z-20 pb-1 ">
          {/* Status Bar */}
          <div className="h-14 flex items-center justify-between text-wx-header-text dark:text-white font-medium select-none"
              style={{
                  paddingLeft: '45px',
                  paddingRight: '40px'
              }}
          >
          <div className="flex items-center gap-1">
              <span className="text-[17px] font-semibold translate-y-[1px]">{system.time}</span>
          </div>
          <div className="flex items-center gap-1.5 translate-y-[1px]">
              <SignalIcon strength={system.signalStrength} className="w-[19px] h-[13px] text-wx-header-text dark:text-white" />
              {system.wifi && <WifiIcon className="w-[17px] h-[13px] text-wx-header-text dark:text-white" />}
              <div className="relative ml-1">
                  <BatteryIcon level={system.batteryLevel} className="w-[28px] h-[13px] text-wx-header-text dark:text-white" />
              </div>
          </div>
          </div>

          {/* Navigation Bar */}
          <div className="h-11 px-4 flex items-end justify-between text-wx-header-text dark:text-white pb-1.5">
              <div className="w-8 flex items-center justify-start cursor-pointer">
                  <ChevronLeft className="w-6 h-6 -ml-2" strokeWidth={2} />
              </div>
              <div className="font-semibold text-[17px] tracking-wide">详情</div>
              <div className="w-8 flex items-center justify-end cursor-pointer">
                  <MoreHorizontal className="w-6 h-6" />
              </div>
          </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-black no-scrollbar">
          <div className="pt-1 pb-8">
              <MomentItem />
          </div>
      </div>

      {/* Input Bar (Mock) */}
      <div className="px-3 py-2 flex items-center gap-3 bg-wx-bg-comment dark:bg-[#111111] border-t border-gray-200 dark:border-gray-800 shrink-0 z-20 pb-6">
          <div className="flex-1 h-9 bg-white dark:bg-[#2c2c2c] rounded-md flex items-center px-3 text-sm text-gray-400">
              发表评论:
          </div>
          <Smile className="w-7 h-7 text-wx-text-primary dark:text-white stroke-1.5" />
          <PlusCircle className="w-7 h-7 text-wx-text-primary dark:text-white stroke-1.5" />
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <div className="w-full h-full flex flex-col">
        {screenContent}
      </div>
    )
  }

  return (
    <div 
      className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] shadow-xl transition-all duration-300 ease-in-out origin-top"
      style={{ 
        width: `${device.width}px`, 
        height: `${device.height}px`,
        transform: `scale(${device.scale})`
      }}
    >
      <div className="h-[4%] w-[3px] bg-gray-800 absolute -start-[17px] top-[10%] rounded-s-lg"></div>
      <div className="h-[6%] w-[3px] bg-gray-800 absolute -start-[17px] top-[18%] rounded-s-lg"></div>
      <div className="h-[6%] w-[3px] bg-gray-800 absolute -start-[17px] top-[26%] rounded-s-lg"></div>
      <div className="h-[9%] w-[3px] bg-gray-800 absolute -end-[17px] top-[20%] rounded-e-lg"></div>
      
      {screenContent}
    </div>
  )
})

PreviewDevice.displayName = "PreviewDevice"
