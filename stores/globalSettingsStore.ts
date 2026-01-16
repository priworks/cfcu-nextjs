import { create } from 'zustand'
import { GlobalSettingsType } from '@/types/sanity'
import globalAlert from '@/schemas/documents/modules/globalAlert'
type GlobalStore = {
  globalSettings: GlobalSettingsType
  setGlobalSettings: (globalSettings: GlobalSettingsType) => void
  alertIsOpen: boolean
  setAlertIsOpen: (alertIsOpen: boolean) => void
  alertHeight: number
  setAlertHeight: (alertHeight: number) => void
  globalAlertHeight: number
  setGlobalAlertHeight: (globalAlertHeight: number) => void
  globalAlertIsOpen: boolean
  setGlobalAlertIsOpen: (globalAlertIsOpen: boolean) => void
}

export const useGlobalSettingsStore = create<GlobalStore>()((set) => ({
  globalSettings: {} as GlobalSettingsType,
  setGlobalSettings: (globalSettings) => set({ globalSettings }),
  alertIsOpen: false,
  setAlertIsOpen: (alertIsOpen) => set({ alertIsOpen }),
  alertHeight: 0,
  setAlertHeight: (alertHeight) => set({ alertHeight }),
  globalAlertHeight: 0,
  setGlobalAlertHeight: (globalAlertHeight) => set({ globalAlertHeight }),
  globalAlertIsOpen: false,
  setGlobalAlertIsOpen: (globalAlertIsOpen) => set({ globalAlertIsOpen }),
}))
