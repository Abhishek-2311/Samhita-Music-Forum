'use client'

import { useState, useEffect } from 'react'
import { Megaphone, X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

interface NoticeProps {
  notice: {
    type: 'text' | 'image'
    content: string
  } | null
}

export default function NoticeBanner({ notice }: NoticeProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!notice) {
      setIsVisible(false)
      setIsModalOpen(false)
      return
    }

    if (notice.type === 'text') {
      // Check if text notice was dismissed in this session
      const dismissed = sessionStorage.getItem('text-notice-dismissed')
      if (dismissed !== 'true') {
        setIsVisible(true)
      }
    } else if (notice.type === 'image') {
      // Check if image modal notice was dismissed in this session
      const dismissed = sessionStorage.getItem('image-notice-dismissed')
      if (dismissed !== 'true') {
        setIsModalOpen(true)
      }
    }
  }, [notice])

  if (!notice) return null

  const handleDismissText = () => {
    setIsVisible(false)
    sessionStorage.setItem('text-notice-dismissed', 'true')
  }

  const handleCloseModal = (open: boolean) => {
    setIsModalOpen(open)
    if (!open) {
      sessionStorage.setItem('image-notice-dismissed', 'true')
    }
  }

  return (
    <>
      {/* 1. Text Notice Announcement Bar */}
      {notice.type === 'text' && isVisible && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
            <div className="flex-1 flex items-center justify-center gap-2">
              <Megaphone className="w-5 h-5 text-amber-100 flex-shrink-0 animate-bounce" />
              <p className="text-sm font-medium font-sans text-center line-clamp-1 sm:line-clamp-none">
                {notice.content}
              </p>
            </div>
            <button
              onClick={handleDismissText}
              className="p-1 hover:bg-white/20 rounded-full transition-colors focus:outline-none"
              aria-label="Dismiss notice"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Image Notice (Flyer/Poster) Modal Popup */}
      {notice.type === 'image' && (
        <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-[90vw] sm:max-w-lg md:max-w-xl p-0 overflow-hidden bg-background rounded-xl border border-border/20 shadow-2xl">
            <DialogTitle className="sr-only">Notice Poster</DialogTitle>
            <div className="relative aspect-[3/4] sm:aspect-[1/1] md:aspect-[4/5] w-full flex items-center justify-center bg-black/5 dark:bg-black/25">
              <img
                src={notice.content}
                alt="Important Announcement Flyer"
                className="w-full h-full object-contain rounded-t-xl"
                loading="eager"
              />
            </div>
            <div className="p-4 bg-muted/30 flex justify-between items-center border-t border-border/20 rounded-b-xl">
              <div>
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5 font-serif">
                  <Megaphone className="w-4 h-4 text-amber-600" /> Important Notice
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">Please review the details above.</p>
              </div>
              <button
                onClick={() => handleCloseModal(false)}
                className="px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/95 transition-colors font-sans"
              >
                Close & Proceed
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
