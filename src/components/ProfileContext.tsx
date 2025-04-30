'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ProfileCtx = {
  isOpen: boolean
  open:  () => void
  close: () => void
}

const ProfileContext = createContext<ProfileCtx | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ProfileContext.Provider
      value={{
        isOpen,
        open:  () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within a ProfileProvider')
  return ctx
}
