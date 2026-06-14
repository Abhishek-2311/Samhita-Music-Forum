'use client'

import { useState, useEffect } from 'react'
import { ZoomIn } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'
import { convertGoogleDriveLink } from '@/lib/gallery-utils'

// Gallery photo data structure
// This will be populated with actual images when user provides them
interface GalleryPhoto {
  id: number
  src: string
  title: string
  description?: string
  category: string
  rotation?: number
}

// Gallery photos organized by category
// 
// HOW TO ADD IMAGES:
// 
// OPTION 1: Google Drive Links (EASIEST!)
// 1. Right-click image in Google Drive → Get link → Set to "Anyone with the link"
// 2. Copy the share link (e.g., https://drive.google.com/file/d/FILE_ID/view?usp=sharing)
// 3. Use the share link directly in the src field - it will be automatically converted!
//
// OPTION 2: Local Images
// 1. Place your images in public/gallery/[category-name]/ folder
// 2. Use path like: '/gallery/category-name/image.jpg'
//
// Available categories:
// - Annual Conference Photos (with year subfolders)
// - Music Therapy (combines Music Theraphy Related + theraphy)
// - Appreciations by Neighbouring Institutions
// - bytak
// - dashamana
// - kalagourav
// - Media Reflections
// - special
//
// Annual Conference Photos - Folder IDs
// These folders will be embedded directly from Google Drive
const annualConferenceFolders = [
  { id: '10XQJmfc_-DsV8k5Ew2RHeSHr1mWNWVMF', year: '2012', month: 'Nov' },
  { id: '1-8e-UshFP_pHWaEIVnNe9hKUvgug_oQa', year: '2021', month: 'Dec' },
  { id: '104yUYmczK5HCqHzUzb5YgwJMeBj7LZmY', year: '2016', month: 'Nov' },
  { id: '10to-MOJCL3USbCrEl2SRjrfGkHsbNRzx', year: '2023', month: 'Jan' },
  { id: '1-QwVtArPRLtO48yYbHhZP2yfhKgDJsE6', year: '2015', month: 'Nov' },
  { id: '11kdkcERyii6KZ_oT2t8J2Husq9iUnckv', year: '2011', month: 'Dec' },
  { id: '10NvKzc9S4jabGxAqd4apolrCMGLyFIbE', year: '2014', month: 'Oct' },
  { id: '10dkcfM9IWu1J9SHAocE4Dy3mFieOPER2', year: '2017', month: 'Nov' },
  { id: '11-ZNEhakw-qFDgXKxcNYZZ5hxFrTZvUD', year: '2018', month: 'Nov' },
  { id: '1-toqqcyIENCH4R8BcPv-d7Dm31BHSlvi', year: '2021', month: 'Feb' },
  { id: '11prj5JlkaKrX5ba0wqG9PlsYLKl3M-Qg', year: '2013', month: 'Oct' },
  { id: '1-caUnDkSTHNYuEul4bwdZTYf3iEPw2wZ', year: '2010', month: 'Oct' },
  { id: '11dyIBacLs2lB1t8l0dQYjaJ22fN3noKo', year: '2020', month: '' }
];

// Gallery photos organized by category
// 
// HOW TO ADD IMAGES:
// 
// OPTION 1: Google Drive Links (EASIEST!)
// 1. Right-click image in Google Drive → Get link → Set to "Anyone with the link"
// 2. Copy the share link (e.g., https://drive.google.com/file/d/FILE_ID/view?usp=sharing)
// 3. Use the share link directly in the src field - it will be automatically converted!
//
// OPTION 2: Local Images
// 1. Place your images in public/gallery/[category-name]/ folder
// 2. Use path like: '/gallery/category-name/image.jpg'
//
// Example with Google Drive:
import galleryManifest from '../public/gallery/gallery-manifest.json'



const categoryDisplayNames: Record<string, string> = {
  'All': 'All',
  'Appreciations by Neighbouring Institutions': 'Appreciations',
  'Bytak': 'Bytak',
  'Dashamanotsava (10th Annual Day)': '10th Annual Day',
  'Kala Gaurava': 'Kala Gaurava',
  'Media Reflections': 'Media Reflections',
  'Music Therapy': 'Music Therapy',
  'Special Memories': 'Special Memories',
  'Annual Conference Photos': 'Annual Conferences'
}

// Get unique categories from photos
const getCategories = (photos: GalleryPhoto[]): string[] => {
  const categories = new Set(photos.map(photo => photo.category))
  return ['All', ...Array.from(categories).sort()]
}

export default function GallerySection() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(galleryManifest.singlePhotos as GalleryPhoto[])
  const [confPhotos, setConfPhotos] = useState<any[]>(galleryManifest.conferencePhotos)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [visibleCount, setVisibleCount] = useState<number>(12)
  const [selectedConferencePhoto, setSelectedConferencePhoto] = useState<any>(null)

  useEffect(() => {
    async function loadDynamicGallery() {
      try {
        const res = await fetch('/api/gallery', { cache: 'no-store' });
        if (!res.ok) throw new Error('API failed');
        const data = await res.json();
        if (data.singlePhotos && data.conferencePhotos) {
          setPhotos(data.singlePhotos);
          setConfPhotos(data.conferencePhotos);
        }
      } catch (err) {
        console.error('Failed to load dynamic gallery from Google Drive. Using offline fallback.', err);
      }
    }
    loadDynamicGallery();
  }, []);

  // Get categories
  const categories = getCategories(photos)

  // Add Annual Conference Photos category if we have folders
  if (annualConferenceFolders.length > 0 && !categories.includes('Annual Conference Photos')) {
    categories.push('Annual Conference Photos')
    categories.sort()
  }

  // Filter photos by selected category
  const filteredPhotos = selectedCategory === 'All'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory)

  // Get the currently visible photos
  const visiblePhotos = filteredPhotos.slice(0, visibleCount)
  const hasMore = visiblePhotos.length < filteredPhotos.length

  // Function to load more photos
  const loadMore = () => {
    setVisibleCount(prev => prev + 12) // Load 12 more images
  }

  // Check if we should show folder embed for Annual Conference Photos
  const showAnnualConferenceFolders =
    selectedCategory === 'Annual Conference Photos' &&
    annualConferenceFolders.length > 0 &&
    filteredPhotos.length === 0

  // If no photos, show placeholder message or folder embed
  if (photos.length === 0 && !showAnnualConferenceFolders) {
    return (
      <section id="gallery" className="py-20 bg-background pattern-mandala">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Gallery</h2>
            <p className="text-lg text-muted-foreground">
              Glimpses of our musical journey, student performances, and cultural celebrations.
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Gallery photos will be displayed here once images are added.
            </p>
          </div>
        </div>
      
      {/* Lightbox for conference photos */}
      {selectedConferencePhoto && (
        <Dialog open={!!selectedConferencePhoto} onOpenChange={(open) => !open && setSelectedConferencePhoto(null)}>
          <DialogContent className="max-w-[95vw] sm:max-w-3xl lg:max-w-6xl w-full p-0 gap-0 bg-background">
            <DialogTitle className="sr-only">{selectedConferencePhoto.title}</DialogTitle>
            <div className="relative w-full min-h-[250px] sm:min-h-[400px] max-h-[85vh] flex items-center justify-center bg-black/5 dark:bg-black/20">
              <img
                src={selectedConferencePhoto.src}
                alt={selectedConferencePhoto.title}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-t-lg"
              />
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold font-serif">{selectedConferencePhoto.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedConferencePhoto.category}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
    )
  }

  return (
    <section id="gallery" className="py-20 bg-background pattern-mandala">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Gallery</h2>
          <p className="text-lg text-muted-foreground font-light">
            Glimpses of our musical journey, student performances, and cultural celebrations.
          </p>
        </div>

        <Tabs
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value);
            setVisibleCount(12); // Reset visible count when changing categories
          }}
          className="w-full"
        >
          <div className="flex justify-start xl:justify-center mb-10 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="inline-flex h-auto p-1 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/20 shadow-sm min-w-max">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className={`
                    px-3 sm:px-5 py-2.5 text-xs sm:text-sm font-sans font-medium rounded-lg whitespace-nowrap
                    transition-all duration-300 ease-in-out transform
                    hover:bg-primary/10 hover:text-foreground
                    data-[state=active]:bg-white data-[state=active]:text-primary
                    data-[state=active]:shadow-md data-[state=active]:border
                    data-[state=active]:border-primary/20
                    dark:data-[state=active]:bg-primary/10 dark:data-[state=active]:text-primary-foreground
                    dark:data-[state=active]:border-primary/30
                    mx-0.5 first:ml-0 last:mr-0
                  `}
                >
                  <span className="relative z-10 font-serif">
                    {categoryDisplayNames[category] || category}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/80 transition-all duration-300 group-hover:w-full group-data-[state=active]:w-full"></span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={selectedCategory} className="mt-0">
            {showAnnualConferenceFolders ? (
              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Browse {annualConferenceFolders.length} sessions from our Annual Conference
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {annualConferenceFolders.map((folder, index) => (
                    <Dialog key={folder.id}>
                      <DialogTrigger asChild>
                        <Card className="group cursor-pointer hover-lift overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),_transparent)]" />
                            <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
                              <h3 className="text-2xl font-semibold text-foreground">
                                Annual Conference {folder.month ? `${folder.month}, ` : ''}{folder.year}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-3">
                                Click to view folder highlights
                              </p>
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                              <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </div>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl w-full p-0 gap-0 bg-background">
                        <div className="p-6 space-y-4">
                          <div className="w-full border rounded-xl overflow-hidden">
                            {/* Native Grid instead of iframe */}
                            {(() => {
                              const folderPhotos = confPhotos.filter(
                                (photo) => photo.year === folder.year && photo.month === folder.month
                              );
                              return (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto p-4 bg-muted/10">
                                  {folderPhotos.map((photo) => (
                                    <div
                                      key={photo.id}
                                      className="group relative aspect-[4/3] rounded-lg overflow-hidden border bg-background shadow-sm hover:shadow-md cursor-pointer transition-all duration-300"
                                      onClick={() => setSelectedConferencePhoto(photo)}
                                    >
                                      <img
                                        src={photo.src}
                                        alt={photo.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                      />
                                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                        <p className="text-white text-xs font-medium line-clamp-2">{photo.title}</p>
                                      </div>
                                    </div>
                                  ))}
                                  {folderPhotos.length === 0 && (
                                    <div className="col-span-full py-12 text-center text-muted-foreground">
                                      No photos found for this conference session.
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                              <h3 className="text-xl font-semibold">Annual Conference {folder.year}</h3>
                              <p className="text-sm text-muted-foreground">Session {index + 1}</p>
                            </div>
                            <a
                              href={`https://drive.google.com/drive/folders/${folder.id}?usp=sharing`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                            >
                              Open in Google Drive →
                            </a>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {visiblePhotos.map((photo) => (
                    <Dialog key={photo.id}>
                      <DialogTrigger asChild>
                        <Card className="group cursor-pointer hover-lift overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                            <img
                              src={convertGoogleDriveLink(photo.src)}
                              alt={photo.title}
                              className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${photo.rotation ? 'object-contain' : 'object-cover'}`}
                              style={photo.rotation ? { transform: `rotate(${photo.rotation}deg)` } : undefined}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                console.error('Failed to load image:', photo.src);
                              }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                              <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-foreground">{photo.title}</h3>
                            <p className="text-sm text-muted-foreground">{photo.category}</p>
                          </div>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-[95vw] sm:max-w-3xl lg:max-w-6xl w-full p-0 gap-0 bg-background">
                        <DialogTitle className="sr-only">{photo.title}</DialogTitle>
                        <div className="relative w-full min-h-[250px] sm:min-h-[400px] max-h-[85vh] flex items-center justify-center bg-black/5 dark:bg-black/20">
                          <img
                            src={convertGoogleDriveLink(photo.src)}
                            alt={photo.title}
                            className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-t-lg"
                            referrerPolicy="no-referrer"
                            style={photo.rotation ? { transform: `rotate(${photo.rotation}deg)` } : undefined}
                          />
                        </div>
                        <div className="p-4 sm:p-6 space-y-4">
                          <div>
                            <h3 className="text-xl font-semibold">{photo.title}</h3>
                            <p className="text-sm text-muted-foreground">{photo.category}</p>
                          </div>
                          {photo.description && <p className="text-foreground">{photo.description}</p>}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                  {filteredPhotos.length === 0 && (
                    <div className="text-center py-12 col-span-full">
                      <p className="text-muted-foreground">
                        No photos found in this category.
                      </p>
                    </div>
                  )}
                </div>

                {hasMore && (
                  <div className="flex justify-center">
                    <button
                      onClick={loadMore}
                      className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Lightbox for conference photos */}
      {selectedConferencePhoto && (
        <Dialog open={!!selectedConferencePhoto} onOpenChange={(open) => !open && setSelectedConferencePhoto(null)}>
          <DialogContent className="max-w-[95vw] sm:max-w-3xl lg:max-w-6xl w-full p-0 gap-0 bg-background">
            <DialogTitle className="sr-only">{selectedConferencePhoto.title}</DialogTitle>
            <div className="relative w-full min-h-[250px] sm:min-h-[400px] max-h-[85vh] flex items-center justify-center bg-black/5 dark:bg-black/20">
              <img
                src={selectedConferencePhoto.src}
                alt={selectedConferencePhoto.title}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-t-lg"
              />
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold font-serif">{selectedConferencePhoto.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedConferencePhoto.category}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}
