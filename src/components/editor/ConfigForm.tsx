import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserConfig } from './UserConfig'
import { ContentConfig } from './ContentConfig'
import { InteractionConfig } from './InteractionConfig'
import { SystemConfig } from './SystemConfig'
import { ScreenshotGenerator } from './ScreenshotGenerator'
import { Separator } from '@/components/ui/separator'

export function ConfigForm() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="user" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="interaction">Social</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="user">
            <UserConfig />
          </TabsContent>
          <TabsContent value="content">
            <ContentConfig />
          </TabsContent>
          <TabsContent value="interaction">
            <InteractionConfig />
          </TabsContent>
          <TabsContent value="system">
            <SystemConfig />
          </TabsContent>
        </div>
      </Tabs>
      
      <Separator />
      
      <div className="pt-2">
        <ScreenshotGenerator />
      </div>
    </div>
  )
}
