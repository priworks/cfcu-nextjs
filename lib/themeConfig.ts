import { ThemeLabel } from '@/types/sanity'
import { stegaClean } from '@sanity/client/stega'

export const themeConfig = {
  Lavender: {
    background: '#3C1053',
    heading: '#F56600',
    icon: '#F56600',
    copy: '#fff',
    ctaBackground: '#fff',
    monotoneCopy: '#fff',
    subtitle: '#F56600',
  },
  Orange: {
    background: '#F56600',
    heading: '#3C1053',
    icon: 'text-blue-400',
    copy: '#3C1053',
    monotoneCopy: '#000',
    subtitle: '#3C1053',
  },
  Green: {
    background: '#008566',
    heading: '#FFFFFF',
    copy: '#FFFFFF',
    ctaBackground: '#fff',
    monotoneCopy: '#fff',
    subtitle: '#fff',
  },
  Yellow: {
    background: '#FFC600',
    heading: '#3C1053',
    copy: '#3C1053',
    monotoneCopy: '#000',
    subtitle: '#3C1053',
  },
  White: {
    background: '#F0F0F0',
    heading: '#3C1053',
    copy: '#3C1053',
    ctaBackground: '#fff',
    monotoneCopy: '#000',
    backgroundWhite: '#fff',
    subtitle: '#3C1053',
  },
} as const

export type ThemeName = keyof typeof themeConfig

export interface Theme {
  background: string
  heading: string
  icon: string
  copy: string
  ctaBackground: string
}

export function getThemeClasses(themeName: ThemeLabel) {
  return (
    themeConfig[stegaClean(themeName)] || {
      background: '#FFFFFF',
      heading: '#3C1053',
      icon: '#F56600',
      copy: '#3C1053',
      ctaBackground: '#fff',
      monotoneCopy: '#000',
      backgroundWhite: '#fff',
      subtitle: '#3C1053',
    }
  )
}
