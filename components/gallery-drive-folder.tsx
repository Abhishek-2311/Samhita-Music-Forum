'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface DriveFolder {
  id: string
  name: string
  year?: string
}

interface GalleryDriveFolderProps {
  folders: DriveFolder[]
  category: string
}

/**
 * Component to display Google Drive folder contents
 * This embeds the folder view directly
 */
export default function GalleryDriveFolder({ folders, category }: GalleryDriveFolderProps) {
  const [selectedFolder, setSelectedFolder] = useState<string>(folders[0]?.id || '')

  if (folders.length === 0) {
    return null
  }

  return (
    <div className="w-full">
      {folders.length > 1 && (
        <Tabs value={selectedFolder} onValueChange={setSelectedFolder} className="mb-4">
          <TabsList>
            {folders.map((folder) => (
              <TabsTrigger key={folder.id} value={folder.id}>
                {folder.year || folder.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      <div className="w-full">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className={selectedFolder === folder.id ? 'block' : 'hidden'}
          >
            <iframe
              src={`https://drive.google.com/embeddedfolderview?id=${folder.id}#grid`}
              className="w-full h-[600px] border-0 rounded-lg"
              style={{ minHeight: '600px' }}
              allow="autoplay"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

