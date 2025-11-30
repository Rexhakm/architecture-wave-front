import localFont from 'next/font/local'


// Initialize Mazzard Soft H font
export const mazzardSoft = localFont({
  src: [
    {
      path: '../../public/fonts/mazzard-soft-h-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/mazzard-soft-h-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/mazzard-soft-h-semi-bold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/mazzard-soft-h-bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mazzard-soft',
  display: 'swap',
}) 