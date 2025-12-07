'use client'

import { useState } from 'react'
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
const galleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    src: 'https://drive.google.com/file/d/12kxjzYKVbQ_0kCOzjRZ2_j-mjESvJPfH/view?usp=sharing',
    title: 'Appreciation Letter 1',
    category: 'Appreciations by Neighbouring Institutions',
    rotation: 90,
  },
  {
    id: 2,
    src: 'https://drive.google.com/file/d/12p98mVJ-TlDvkn8LV7V-vCLSiwTHYC1T/view?usp=sharing',
    title: 'Appreciation Letter 2',
    category: 'Appreciations by Neighbouring Institutions',
  },
  {
    id: 3,
    src: 'https://drive.google.com/file/d/12sIyc5XKM3SEVLYQYgIHRMMMATmWLD7f/view?usp=sharing',
    title: 'Appreciation Letter 3',
    category: 'Appreciations by Neighbouring Institutions',
    rotation: 90,
  },
  {
    id: 4,
    src: 'https://drive.google.com/file/d/15yK3AEntI7sNatmnOmt4_JJukqZE8622/view?usp=sharing',
    title: 'Dashamanotsava Highlight 1',
    category: 'Dashamanotsava (10th Annual Day)',
  },
  {
    id: 5,
    src: 'https://drive.google.com/file/d/1CO58ahYUe1mJ2E7HAzyHy80M3lnvFGKt/view?usp=sharing',
    title: 'Dashamanotsava Highlight 2',
    category: 'Dashamanotsava (10th Annual Day)',
  },
  {
    id: 6,
    src: 'https://drive.google.com/file/d/1CT6VsK8tv7SN_e6zor7e43ODMZQIHbUt/view?usp=sharing',
    title: 'Dashamanotsava Highlight 3',
    category: 'Dashamanotsava (10th Annual Day)',
  },
  {
    id: 7,
    src: 'https://drive.google.com/file/d/1FZG8ZuyDN5_L-kxMWz55P9k4r6ntXWrB/view?usp=sharing',
    title: 'Dashamanotsava Highlight 4',
    category: 'Dashamanotsava (10th Annual Day)',
  },
  {
    id: 8,
    src: 'https://drive.google.com/file/d/1NdxsefEz-3SRRDYc2M6vvUwwS0uw4RTw/view?usp=sharing',
    title: 'Dashamanotsava Highlight 5',
    category: 'Dashamanotsava (10th Annual Day)',
  },
  {
    id: 9,
    src: 'https://drive.google.com/file/d/1OvtNqbDCCJchm9ehIjg0a0p1FSWoMFX4/view?usp=sharing',
    title: 'Dashamanotsava Highlight 6',
    category: 'Dashamanotsava (10th Annual Day)',
  },
  {
    id: 10,
    src: 'https://drive.google.com/file/d/1Q7xOf6UC4z8LL-IdErfwrsyR4TDHKJsq/view?usp=sharing',
    title: 'Dashamanotsava Highlight 7',
    category: 'Dashamanotsava (10th Annual Day)',
  },
  {
    id: 11,
    src: 'https://drive.google.com/file/d/1WAX681mAxo3BhQ7Abl4bSfMDhjvgLBVO/view?usp=sharing',
    title: 'Dashamanotsava Highlight 8',
    category: 'Dashamanotsava (10th Annual Day)',
  },
  {
    id: 12,
    src: 'https://drive.google.com/file/d/1Z2ZLhvh53UnuxG8oFaSvMxa-e-vh1HTM/view?usp=sharing',
    title: 'Dashamanotsava Highlight 9',
    category: 'Dashamanotsava (10th Annual Day)',
  },
  {
    id: 13,
    src: 'https://drive.google.com/file/d/1jhiPqOAsJ4Zv9EKGPkowqZyfKHHRzuQv/view?usp=sharing',
    title: 'Dashamanotsava Highlight 10',
    category: 'Dashamanotsava (10th Annual Day)',
  },
  {
    id: 14,
    src: 'https://drive.google.com/file/d/1kX7lidacbSwEhe2gX9jG0dvHotlXzQzF/view?usp=sharing',
    title: 'Dashamanotsava Highlight 11',
    category: 'Dashamanotsava (10th Annual Day)',
  },
  {
    id: 15,
    src: 'https://drive.google.com/file/d/1nFUspxCLGNiieETqO04GT0OkfjRYz32t/view?usp=sharing',
    title: 'Dashamanotsava Highlight 12',
    category: 'Dashamanotsava (10th Annual Day)',
  },
  {
    id: 16,
    src: 'https://drive.google.com/file/d/1nI8nOh71TRB9dqPIbMZE4WpWOsUu0ecO/view?usp=sharing',
    title: 'Dashamanotsava Highlight 13',
    category: 'Dashamanotsava (10th Annual Day)',
  },
  {
    id: 17,
    src: 'https://drive.google.com/file/d/1qzzlDkA7NNiEpfMGzpDnuYlrl_T7aosm/view?usp=sharing',
    title: 'Dashamanotsava Highlight 14',
    category: 'Dashamanotsava (10th Annual Day)',
  },
  {
    id: 18,
    src: 'https://drive.google.com/file/d/1rTBwuh3OuDBof1srjLlHhRBoQPMcmFGE/view?usp=sharing',
    title: 'Dashamanotsava Highlight 15',
    category: 'Dashamanotsava (10th Annual Day)',
  },
  {
    id: 19,
    src: 'https://drive.google.com/file/d/10E-fY0_YhbuY5WjLdnlQilT6S2k9FxSm/view?usp=sharing',
    title: 'Kala Gaurava Highlight 1',
    category: 'Kala Gaurava',
  },
  {
    id: 20,
    src: 'https://drive.google.com/file/d/195ho1XKSkafd5K2IPWLUGzf0Tsa4heav/view?usp=sharing',
    title: 'Kala Gaurava Highlight 2',
    category: 'Kala Gaurava',
  },
  {
    id: 21,
    src: 'https://drive.google.com/file/d/1G13bqLaWlPNd9BcDQJpyjPontEMBj5H6/view?usp=sharing',
    title: 'Kala Gaurava Highlight 3',
    category: 'Kala Gaurava',
  },
  {
    id: 22,
    src: 'https://drive.google.com/file/d/1P1-gVCCwwvP--fpQ-EzOBy4tChBXk6dl/view?usp=sharing',
    title: 'Kala Gaurava Highlight 4',
    category: 'Kala Gaurava',
  },
  {
    id: 23,
    src: 'https://drive.google.com/file/d/1UqBPJRkCnKdle_egk2ELT_f6iydru5_k/view?usp=sharing',
    title: 'Kala Gaurava Highlight 5',
    category: 'Kala Gaurava',
  },
  {
    id: 24,
    src: 'https://drive.google.com/file/d/1VQO7SQSxCGRR-_es3lUE1s5JXubTYF1P/view?usp=sharing',
    title: 'Kala Gaurava Highlight 6',
    category: 'Kala Gaurava',
  },
  {
    id: 25,
    src: 'https://drive.google.com/file/d/1ZQddAmiWXM0fbRMv0IX0UBv2LASXbzaa/view?usp=sharing',
    title: 'Kala Gaurava Highlight 7',
    category: 'Kala Gaurava',
  },
  {
    id: 26,
    src: 'https://drive.google.com/file/d/1aQdP2RC3O-xCdQk8jCUEYbHqC3Z0XXpA/view?usp=sharing',
    title: 'Kala Gaurava Highlight 8',
    category: 'Kala Gaurava',
  },
  {
    id: 27,
    src: 'https://drive.google.com/file/d/1gQHqVDVfbwbstkAs5auwVvOnrc72mhPW/view?usp=sharing',
    title: 'Kala Gaurava Highlight 9',
    category: 'Kala Gaurava',
  },
  {
    id: 28,
    src: 'https://drive.google.com/file/d/1lo5VsDhC95MTMXvmu-GJfzjazqdsjRZM/view?usp=sharing',
    title: 'Kala Gaurava Highlight 10',
    category: 'Kala Gaurava',
  },
  {
    id: 29,
    src: 'https://drive.google.com/file/d/1quv55VgYlwBM38suO4ibjN9SkREVp_S5/view?usp=sharing',
    title: 'Kala Gaurava Highlight 11',
    category: 'Kala Gaurava',
  },
  {
    id: 30,
    src: 'https://drive.google.com/file/d/1r32GCZA3y5l7UGVYeYRxRH-S_T94THdk/view?usp=sharing',
    title: 'Kala Gaurava Highlight 12',
    category: 'Kala Gaurava',
  },
  {
    id: 31,
    src: 'https://drive.google.com/file/d/1vhpUBR7wc9mRli-S8yMp7csZm-FJpnOw/view?usp=sharing',
    title: 'Kala Gaurava Highlight 13',
    category: 'Kala Gaurava',
  },
  {
    id: 32,
    src: 'https://drive.google.com/file/d/12K_NJ4LiESJE3tU4Ky9-MEjjF1hkcSfR/view?usp=sharing',
    title: 'Media Reflection Highlight 1',
    category: 'Media Reflections',
    rotation: 90,
  },
  {
    id: 33,
    src: 'https://drive.google.com/file/d/12ThAH7OsfDHBLrmL3MDiLczLIMWnFRgr/view?usp=sharing',
    title: 'Media Reflection Highlight 2',
    category: 'Media Reflections',
    rotation: 90,
  },
  {
    id: 34,
    src: 'https://drive.google.com/file/d/12WujvDIPeEgCDvMywJ7gKfqMA7C4ymt0/view?usp=sharing',
    title: 'Media Reflection Highlight 3',
    category: 'Media Reflections',
  },
  {
    id: 35,
    src: 'https://drive.google.com/file/d/12bU5KEj_e9jZiqgpsAw8-lmSDGmKDq8B/view?usp=sharing',
    title: 'Music Therapy Highlight 1',
    category: 'Music Therapy',
  },
  {
    id: 36,
    src: 'https://drive.google.com/file/d/12bk-v_gOOfVMMiSmNoiZJJ-6jTHGJwJ-/view?usp=sharing',
    title: 'Music Therapy Highlight 2',
    category: 'Music Therapy',
  },
  {
    id: 37,
    src: 'https://drive.google.com/file/d/17LEFlQAOQn486luS4EV0-rbdxbVsL6ZY/view?usp=sharing',
    title: 'Music Therapy Highlight 3',
    category: 'Music Therapy',
  },
  {
    id: 38,
    src: 'https://drive.google.com/file/d/182FKHKOKIMLNW3XLDZ_OXKDJVYmworVD/view?usp=sharing',
    title: 'Music Therapy Highlight 4',
    category: 'Music Therapy',
  },
  {
    id: 39,
    src: 'https://drive.google.com/file/d/18ivAR7I95ZppQCgpCHBwvM2YfvBUj5xa/view?usp=sharing',
    title: 'Music Therapy Highlight 5',
    category: 'Music Therapy',
  },
  {
    id: 40,
    src: 'https://drive.google.com/file/d/19i3feZD8t9UbTCRZJYq6J9eYJIDjrdir/view?usp=sharing',
    title: 'Music Therapy Highlight 6',
    category: 'Music Therapy',
  },
  {
    id: 41,
    src: 'https://drive.google.com/file/d/1C73aoDBJdk_ouWI0n1q2NNDIsD4QSAPj/view?usp=sharing',
    title: 'Music Therapy Highlight 7',
    category: 'Music Therapy',
  },
  {
    id: 42,
    src: 'https://drive.google.com/file/d/1CP49b9o34ElKv-un4EW9bZ5Dx4vw6yVf/view?usp=sharing',
    title: 'Music Therapy Highlight 8',
    category: 'Music Therapy',
  },
  {
    id: 43,
    src: 'https://drive.google.com/file/d/1ElC0YtpikUOpiADsphNU8wqDOak4uS2D/view?usp=sharing',
    title: 'Music Therapy Highlight 9',
    category: 'Music Therapy',
  },
  {
    id: 44,
    src: 'https://drive.google.com/file/d/1F2KtwwgS09UtuDwFg_8y4wnwXZjHXDex/view?usp=sharing',
    title: 'Music Therapy Highlight 10',
    category: 'Music Therapy',
  },
  {
    id: 45,
    src: 'https://drive.google.com/file/d/1GtPzyTEpdvbD0cwRyJWiY90YJteI9YV0/view?usp=sharing',
    title: 'Music Therapy Highlight 11',
    category: 'Music Therapy',
  },
  {
    id: 46,
    src: 'https://drive.google.com/file/d/1I7ja559Z7UCIQM9lkjMa1SHc54jYTkgt/view?usp=sharing',
    title: 'Music Therapy Highlight 12',
    category: 'Music Therapy',
  },
  {
    id: 47,
    src: 'https://drive.google.com/file/d/1Jah0AHOszMob_0iRlwMLojeS_6g9IZeM/view?usp=sharing',
    title: 'Music Therapy Highlight 13',
    category: 'Music Therapy',
  },
  {
    id: 48,
    src: 'https://drive.google.com/file/d/1N8vTmUseLDiaj6TYUziRKlvcsRYO0YHP/view?usp=sharing',
    title: 'Music Therapy Highlight 14',
    category: 'Music Therapy',
  },
  {
    id: 49,
    src: 'https://drive.google.com/file/d/1Nok75P7TliEECEOCHFIZdhMuEpjO7a4U/view?usp=sharing',
    title: 'Music Therapy Highlight 15',
    category: 'Music Therapy',
  },
  {
    id: 50,
    src: 'https://drive.google.com/file/d/1REHBSylqKxsMqw0vKuY3LGMTy3kCPoD3/view?usp=sharing',
    title: 'Music Therapy Highlight 16',
    category: 'Music Therapy',
  },
  {
    id: 51,
    src: 'https://drive.google.com/file/d/1V52YRPbMPM1KNNrkNTZbQNhYYsvxswP-/view?usp=sharing',
    title: 'Music Therapy Highlight 17',
    category: 'Music Therapy',
  },
  {
    id: 52,
    src: 'https://drive.google.com/file/d/1h6Yob130FWqEdEQ4guwx5VvaLWgu4crc/view?usp=sharing',
    title: 'Music Therapy Highlight 18',
    category: 'Music Therapy',
  },
  {
    id: 53,
    src: 'https://drive.google.com/file/d/1iQ9up-IDerxCVmCLDCQK2eG03-XzWPE6/view?usp=sharing',
    title: 'Music Therapy Highlight 19',
    category: 'Music Therapy',
  },
  {
    id: 54,
    src: 'https://drive.google.com/file/d/1kmBwNoZmbDbwO_7XRzhJatmgJZgpsVN3/view?usp=sharing',
    title: 'Music Therapy Highlight 20',
    category: 'Music Therapy',
  },
  {
    id: 55,
    src: 'https://drive.google.com/file/d/1nsGF-bOJO4hBdpGC64UgglLspjaaOL3k/view?usp=sharing',
    title: 'Music Therapy Highlight 21',
    category: 'Music Therapy',
  },
  {
    id: 56,
    src: 'https://drive.google.com/file/d/1olFrfBtPodmD6zsJZas4kM1PQj_b53wa/view?usp=sharing',
    title: 'Music Therapy Highlight 22',
    category: 'Music Therapy',
  },
  {
    id: 57,
    src: 'https://drive.google.com/file/d/1wh053bYvcRGI7BDfMzyNisaCAfydjLvR/view?usp=sharing',
    title: 'Music Therapy Highlight 23',
    category: 'Music Therapy',
  },
  {
    id: 58,
    src: 'https://drive.google.com/file/d/19uyDVPB8BUaNSdkqPPxJevbMMB6g6wxX/view?usp=sharing',
    title: 'Special Memory 1',
    category: 'Special Memories',
  },
  {
    id: 59,
    src: 'https://drive.google.com/file/d/1FfaNpT6vUL34KP5KBGWnVW5lhR26D8ve/view?usp=sharing',
    title: 'Special Memory 2',
    category: 'Special Memories',
  },
  {
    id: 60,
    src: 'https://drive.google.com/file/d/1IIzPlwV_PJrzGlbNX-ks7yPfiViQJbb0/view?usp=sharing',
    title: 'Special Memory 3',
    category: 'Special Memories',
  },
  {
    id: 61,
    src: 'https://drive.google.com/file/d/1KAyzXFVKTyf5JHd9Tu0-puY_y6_ycJqV/view?usp=sharing',
    title: 'Special Memory 4',
    category: 'Special Memories',
  },
  {
    id: 62,
    src: 'https://drive.google.com/file/d/1dNZu4kWggyL4YlSlK49kVVzjVtzOuSzX/view?usp=sharing',
    title: 'Special Memory 5',
    category: 'Special Memories',
  },
  {
    id: 63,
    src: 'https://drive.google.com/file/d/1jZd0z8W9411GrDJ_ENjmNEr6RxADudUq/view?usp=sharing',
    title: 'Special Memory 6',
    category: 'Special Memories',
  },
  {
    id: 64,
    src: 'https://drive.google.com/file/d/1nhgY9_tHeo2UomEhUtR_6nXJ_HnJUB3c/view?usp=sharing',
    title: 'Special Memory 7',
    category: 'Special Memories',
  },
  {
    id: 65,
    src: 'https://drive.google.com/file/d/1-Flxy-0AtUQ92mSOQvsRNBBj4pcC9QUU/view?usp=sharing',
    title: 'Bytak Image 1',
    category: 'Bytak',
  },
  {
    id: 66,
    src: 'https://drive.google.com/file/d/1-Smyp-s1e8_FKnV_y-5iSCqQL2nobR9C/view?usp=sharing',
    title: 'Bytak Image 2',
    category: 'Bytak',
  },
  {
    id: 67,
    src: 'https://drive.google.com/file/d/10tf36OnptKpMCwX7_Iyjg4C7TIhS0O9v/view?usp=sharing',
    title: 'Bytak Image 3',
    category: 'Bytak',
  },
  {
    id: 68,
    src: 'https://drive.google.com/file/d/115tbDoa2m8WWGIchy_bmksdWpeVNKj__/view?usp=sharing',
    title: 'Bytak Image 4',
    category: 'Bytak',
  },
  {
    id: 69,
    src: 'https://drive.google.com/file/d/11GZHdjfKTqryYEwrhfkh-jSo5xjTAlcj/view?usp=sharing',
    title: 'Bytak Image 5',
    category: 'Bytak',
  },
  {
    id: 70,
    src: 'https://drive.google.com/file/d/12w-2L_loHC9trG4uhS5BxXa-P8Ujh0TS/view?usp=sharing',
    title: 'Bytak Image 6',
    category: 'Bytak',
  },
  {
    id: 71,
    src: 'https://drive.google.com/file/d/14rXiFzNUYZxSfxPajzEB8rwWaiRB3OXN/view?usp=sharing',
    title: 'Bytak Image 7',
    category: 'Bytak',
  },
  {
    id: 72,
    src: 'https://drive.google.com/file/d/159WPaPOuXGTnjSb6dw7FtKA89s1g4Uzf/view?usp=sharing',
    title: 'Bytak Image 8',
    category: 'Bytak',
  },
  {
    id: 73,
    src: 'https://drive.google.com/file/d/15VcnF9BRGWVNItQVPEnEx6pzhjsoac-S/view?usp=sharing',
    title: 'Bytak Image 9',
    category: 'Bytak',
  },
  {
    id: 74,
    src: 'https://drive.google.com/file/d/17m22u1LpSDyL0gR3CHZQB16FVsx6wj6n/view?usp=sharing',
    title: 'Bytak Image 10',
    category: 'Bytak',
  },
  {
    id: 75,
    src: 'https://drive.google.com/file/d/19Vds6OlL27xnP5l5w44kGFrIm1s0NgPk/view?usp=sharing',
    title: 'Bytak Image 11',
    category: 'Bytak',
  },
  {
    id: 76,
    src: 'https://drive.google.com/file/d/1AdCN4QwpsuGmHLnM5LqElVITcvwXhH6i/view?usp=sharing',
    title: 'Bytak Image 12',
    category: 'Bytak',
  },
  {
    id: 77,
    src: 'https://drive.google.com/file/d/1AojwQELp-MP64U1A8ce0O40VfEDEO5rZ/view?usp=sharing',
    title: 'Bytak Image 13',
    category: 'Bytak',
  },
  {
    id: 78,
    src: 'https://drive.google.com/file/d/1BFg8J0qD7PHCLs82fsAqL2N_c-nMJqSj/view?usp=sharing',
    title: 'Bytak Image 14',
    category: 'Bytak',
  },
  {
    id: 79,
    src: 'https://drive.google.com/file/d/1ChT6fZduYHvjv2FVzLbtUkV5VnBKFGmr/view?usp=sharing',
    title: 'Bytak Image 15',
    category: 'Bytak',
  },
  {
    id: 80,
    src: 'https://drive.google.com/file/d/1CneE8qO5Qr14HVJ0hDL6QWz5q5VtsOog/view?usp=sharing',
    title: 'Bytak Image 16',
    category: 'Bytak',
  },
  {
    id: 81,
    src: 'https://drive.google.com/file/d/1D8quBaMd28A3Sn3tDG7anqIa9k9pKb5Q/view?usp=sharing',
    title: 'Bytak Image 17',
    category: 'Bytak',
  },
  {
    id: 82,
    src: 'https://drive.google.com/file/d/1DAGndvm2yV0MFsq5BeXqoigGoX6u08-H/view?usp=sharing',
    title: 'Bytak Image 18',
    category: 'Bytak',
  },
  {
    id: 83,
    src: 'https://drive.google.com/file/d/1DBfqJbfGZ-BgYsM1lYuWqCSQl3IJ_GDa/view?usp=sharing',
    title: 'Bytak Image 19',
    category: 'Bytak',
  },
  {
    id: 84,
    src: 'https://drive.google.com/file/d/1De246DivInrKDCmX6d50QrUGJZAKsV1U/view?usp=sharing',
    title: 'Bytak Image 20',
    category: 'Bytak',
  },
  {
    id: 85,
    src: 'https://drive.google.com/file/d/1EAUE0kBBGvSkUmaIa6I9WeJmP-yKWS5Z/view?usp=sharing',
    title: 'Bytak Image 21',
    category: 'Bytak',
  },
  {
    id: 86,
    src: 'https://drive.google.com/file/d/1EKp3ivV2O5u-pTpwNOY4F0KXOXygX0wn/view?usp=sharing',
    title: 'Bytak Image 22',
    category: 'Bytak',
  },
  {
    id: 87,
    src: 'https://drive.google.com/file/d/1EV0hfcvQd_MLLhLMa9Y6LXuDBcffuric/view?usp=sharing',
    title: 'Bytak Image 23',
    category: 'Bytak',
  },
  {
    id: 88,
    src: 'https://drive.google.com/file/d/1Eiv3i2lme8BpYjuo-rkIAotWCwapAt5L/view?usp=sharing',
    title: 'Bytak Image 24',
    category: 'Bytak',
  },
  {
    id: 89,
    src: 'https://drive.google.com/file/d/1EkON9C6O9RsBZ0xq4YZU3cK4sREWO2yZ/view?usp=sharing',
    title: 'Bytak Image 25',
    category: 'Bytak',
  },
  {
    id: 90,
    src: 'https://drive.google.com/file/d/1Fsl6m3pbZKc4Sq6OCIS4DBXfBgEmLu7p/view?usp=sharing',
    title: 'Bytak Image 26',
    category: 'Bytak',
  },
  {
    id: 91,
    src: 'https://drive.google.com/file/d/1GeKfUoepm78CWVZkaEeMW8PUZH9oiWlm/view?usp=sharing',
    title: 'Bytak Image 27',
    category: 'Bytak',
  },
  {
    id: 92,
    src: 'https://drive.google.com/file/d/1GzTKq_LqbOt9bW-yP_wVDWxJCCFh8Uui/view?usp=sharing',
    title: 'Bytak Image 28',
    category: 'Bytak',
  },
  {
    id: 93,
    src: 'https://drive.google.com/file/d/1HAT6NNBbUlLG6bFUZvF9XhQSVMMt5wWz/view?usp=sharing',
    title: 'Bytak Image 29',
    category: 'Bytak',
  },
  {
    id: 94,
    src: 'https://drive.google.com/file/d/1Ha4tCoNnEBVn4LsUecAfbqi98r73Woak/view?usp=sharing',
    title: 'Bytak Image 30',
    category: 'Bytak',
  },
  {
    id: 95,
    src: 'https://drive.google.com/file/d/1IMf01TEC_5tan_LYzidW4LcF2Y5Zvyva/view?usp=sharing',
    title: 'Bytak Image 31',
    category: 'Bytak',
  },
  {
    id: 96,
    src: 'https://drive.google.com/file/d/1IlubQPpoo1s7sNWGB9uoGYT6wls8J80i/view?usp=sharing',
    title: 'Bytak Image 32',
    category: 'Bytak',
  },
  {
    id: 97,
    src: 'https://drive.google.com/file/d/1K1NN63jlD_s91bVIxpRxa4FTNHzsW1XU/view?usp=sharing',
    title: 'Bytak Image 33',
    category: 'Bytak',
  },
  {
    id: 98,
    src: 'https://drive.google.com/file/d/1OtpiXGeQIcygMn_TrQTNlV6qkvy8bNM5/view?usp=sharing',
    title: 'Bytak Image 34',
    category: 'Bytak',
  },
  {
    id: 99,
    src: 'https://drive.google.com/file/d/1PDVUdFdexJiCX38U6Kn-ya6kY1LlAEgY/view?usp=sharing',
    title: 'Bytak Image 35',
    category: 'Bytak',
  },
  {
    id: 100,
    src: 'https://drive.google.com/file/d/1Pg16-Dd9fe5DHWmvr2D2gE_rbe669vL2/view?usp=sharing',
    title: 'Bytak Image 36',
    category: 'Bytak',
  },
  {
    id: 101,
    src: 'https://drive.google.com/file/d/1U9DQQFh1KX-kr8WmTA8-Bi5DmzcUVTC4/view?usp=sharing',
    title: 'Bytak Image 37',
    category: 'Bytak',
  },
  {
    id: 102,
    src: 'https://drive.google.com/file/d/1UO0ibaTuGV6SeV1wLsy9SZmKxFKFFEB2/view?usp=sharing',
    title: 'Bytak Image 38',
    category: 'Bytak',
  },
  {
    id: 103,
    src: 'https://drive.google.com/file/d/1WH5moq3P8ssqwTR1motjltD16dz5GXmM/view?usp=sharing',
    title: 'Bytak Image 39',
    category: 'Bytak',
  },
  {
    id: 104,
    src: 'https://drive.google.com/file/d/1WLS60bSOmImlMsMvtYH9kruZoK4D_4oc/view?usp=sharing',
    title: 'Bytak Image 40',
    category: 'Bytak',
  },
  {
    id: 105,
    src: 'https://drive.google.com/file/d/1WTjgcoYjt2cxpNZOmOzl2rQ3XcIS4ENp/view?usp=sharing',
    title: 'Bytak Image 41',
    category: 'Bytak',
  },
  {
    id: 106,
    src: 'https://drive.google.com/file/d/1WUO7M0yIFZwhxgECaSqKU9uBBsvJISDM/view?usp=sharing',
    title: 'Bytak Image 42',
    category: 'Bytak',
  },
  {
    id: 107,
    src: 'https://drive.google.com/file/d/1XX8lS6a86X2Sgmf7jH6CptszZTgSTAQR/view?usp=sharing',
    title: 'Bytak Image 43',
    category: 'Bytak',
  },
  {
    id: 108,
    src: 'https://drive.google.com/file/d/1XY_yjL7j_64Aq0_PAiY4uJTXxtfI92jw/view?usp=sharing',
    title: 'Bytak Image 44',
    category: 'Bytak',
  },
  {
    id: 109,
    src: 'https://drive.google.com/file/d/1YAf-qhdLVfikPVB29zwIfV87JAZXa4Do/view?usp=sharing',
    title: 'Bytak Image 45',
    category: 'Bytak',
  },
  {
    id: 110,
    src: 'https://drive.google.com/file/d/1_xx_9hJCPNuQprst2GlGpPxE8h_67t4m/view?usp=sharing',
    title: 'Bytak Image 46',
    category: 'Bytak',
  },
  {
    id: 111,
    src: 'https://drive.google.com/file/d/1bK9sNh3VmpoS4ME-LCMN2E80-c6b4ZGJ/view?usp=sharing',
    title: 'Bytak Image 47',
    category: 'Bytak',
  },
  {
    id: 112,
    src: 'https://drive.google.com/file/d/1bQUjHqIIu9nchX9ITlAJP9gJXIxavp1V/view?usp=sharing',
    title: 'Bytak Image 48',
    category: 'Bytak',
  },
  {
    id: 113,
    src: 'https://drive.google.com/file/d/1bSWaDi0vhhFadAODBaG_DW-SddcQ9-oZ/view?usp=sharing',
    title: 'Bytak Image 49',
    category: 'Bytak',
  },
  {
    id: 114,
    src: 'https://drive.google.com/file/d/1bUqGlMvRuGbdrN5YkpzlNcxAuQAh-ZpF/view?usp=sharing',
    title: 'Bytak Image 50',
    category: 'Bytak',
  },
  {
    id: 115,
    src: 'https://drive.google.com/file/d/1c1mrkf3erCqM4m2nLy-2Za4_BPomP2xf/view?usp=sharing',
    title: 'Bytak Image 51',
    category: 'Bytak',
  },
  {
    id: 116,
    src: 'https://drive.google.com/file/d/1dszij0ku_jDAiPUh5z0_7RrkrS-uO0PU/view?usp=sharing',
    title: 'Bytak Image 52',
    category: 'Bytak',
  },
  {
    id: 117,
    src: 'https://drive.google.com/file/d/1g9uHn8MCNSQ_BmVZiC-3LA_uBade08PC/view?usp=sharing',
    title: 'Bytak Image 53',
    category: 'Bytak',
  },
  {
    id: 118,
    src: 'https://drive.google.com/file/d/1hjA4BN9ALKNL08hJbknYAbkjGhgtJSXx/view?usp=sharing',
    title: 'Bytak Image 54',
    category: 'Bytak',
  },
  {
    id: 119,
    src: 'https://drive.google.com/file/d/1i_5wNZ4PpGaQMJC35qfQNf4mhMazssye/view?usp=sharing',
    title: 'Bytak Image 55',
    category: 'Bytak',
  },
  {
    id: 120,
    src: 'https://drive.google.com/file/d/1lJIE4rOYhQwwzbe6GW1eXB48S4inuYXK/view?usp=sharing',
    title: 'Bytak Image 56',
    category: 'Bytak',
  },
  {
    id: 121,
    src: 'https://drive.google.com/file/d/1lLK8pXLjaK9K2rYtcgQiwOUfeW5QfPzN/view?usp=sharing',
    title: 'Bytak Image 57',
    category: 'Bytak',
  },
  {
    id: 122,
    src: 'https://drive.google.com/file/d/1nDMN8COpIqnkosyqswzZxb0XzUc3efFC/view?usp=sharing',
    title: 'Bytak Image 58',
    category: 'Bytak',
  },
  {
    id: 123,
    src: 'https://drive.google.com/file/d/1oSSglfq5qXHcnleFSZ8Z2mdcj66DV6R9/view?usp=sharing',
    title: 'Bytak Image 59',
    category: 'Bytak',
  },
  {
    id: 124,
    src: 'https://drive.google.com/file/d/1ocky1IjYOVONFu3eWyvI7SUrHuylfjZw/view?usp=sharing',
    title: 'Bytak Image 60',
    category: 'Bytak',
  },
  {
    id: 125,
    src: 'https://drive.google.com/file/d/1qgO09-vUtDpfo7K0EV2rrHZkJzn2ypvZ/view?usp=sharing',
    title: 'Bytak Image 61',
    category: 'Bytak',
  },
  {
    id: 126,
    src: 'https://drive.google.com/file/d/1quDbvvYnu_RymqaX-E36bqYPeXd9E04O/view?usp=sharing',
    title: 'Bytak Image 62',
    category: 'Bytak',
  },
  {
    id: 127,
    src: 'https://drive.google.com/file/d/1rhfJq3gQioayqnURuNxPrhiANGmPWXe-/view?usp=sharing',
    title: 'Bytak Image 63',
    category: 'Bytak',
  },
  {
    id: 128,
    src: 'https://drive.google.com/file/d/1sO3QReZy_9QUODBOvjM8gyu23CzeKMNL/view?usp=sharing',
    title: 'Bytak Image 64',
    category: 'Bytak',
  },
  {
    id: 129,
    src: 'https://drive.google.com/file/d/1t8Z0NCwk3JfSvW3UJJUgpQXj7Pd0H_Rm/view?usp=sharing',
    title: 'Bytak Image 65',
    category: 'Bytak',
  },
  {
    id: 130,
    src: 'https://drive.google.com/file/d/1u2XXYzLBDBzCLFKyphXInf7Ea04pvSwh/view?usp=sharing',
    title: 'Bytak Image 66',
    category: 'Bytak',
  },
  {
    id: 131,
    src: 'https://drive.google.com/file/d/1wsKkZ_VRMqClf5d9O96nN8KTXqu0MtFP/view?usp=sharing',
    title: 'Bytak Image 67',
    category: 'Bytak',
  },
  {
    id: 132,
    src: 'https://drive.google.com/file/d/1ySus-GoBJntGSe7UwvE2bo0-bw2vPq8U/view?usp=sharing',
    title: 'Bytak Image 68',
    category: 'Bytak',
  },
]

// Get unique categories from photos
const getCategories = (photos: GalleryPhoto[]): string[] => {
  const categories = new Set(photos.map(photo => photo.category))
  return ['All', ...Array.from(categories).sort()]
}

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [visibleCount, setVisibleCount] = useState<number>(12) // Show 12 images initially

  // Get categories
  const categories = getCategories(galleryPhotos)

  // Add Annual Conference Photos category if we have folders
  if (annualConferenceFolders.length > 0 && !categories.includes('Annual Conference Photos')) {
    categories.push('Annual Conference Photos')
    categories.sort()
  }

  // Filter photos by selected category
  const filteredPhotos = selectedCategory === 'All'
    ? galleryPhotos
    : galleryPhotos.filter(photo => photo.category === selectedCategory)

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
  if (galleryPhotos.length === 0 && !showAnnualConferenceFolders) {
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
          <div className="flex justify-center mb-10 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
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
                    {category}
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
                            <iframe
                              src={`https://drive.google.com/embeddedfolderview?id=${folder.id}#grid`}
                              className="w-full h-[500px] border-0"
                              allow="autoplay"
                              title={`Annual Conference ${folder.month ? `${folder.month} ` : ''}${folder.year}`}
                            />
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
    </section>
  )
}
