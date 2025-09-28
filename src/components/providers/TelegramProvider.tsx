'use client'

import { ReactNode, useEffect, useState } from 'react'

interface TelegramProviderProps {
  children: ReactNode
}

export function TelegramProvider({ children }: TelegramProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      
      try {
        // Ready the app
        tg.ready()
        
        // Expand the app to full height
        tg.expand()
        
        // Enable closing confirmation
        tg.enableClosingConfirmation()
        
        // Set header color to match app theme
        if (tg.setHeaderColor) {
          tg.setHeaderColor('#0f172a') // bg-gray-950
        }
        
        // Set background color
        if (tg.setBackgroundColor) {
          tg.setBackgroundColor('#0f172a')
        }
        
        // Hide main button initially
        if (tg.MainButton) {
          tg.MainButton.hide()
        }
        
        console.log('🎬 KFLIX Telegram WebApp initialized:', {
          initData: tg.initData,
          initDataUnsafe: tg.initDataUnsafe,
          version: tg.version,
          platform: tg.platform,
          colorScheme: tg.colorScheme,
          themeParams: tg.themeParams,
          isExpanded: tg.isExpanded,
          viewportHeight: tg.viewportHeight,
          viewportStableHeight: tg.viewportStableHeight,
        })
        
        setIsInitialized(true)
      } catch (error) {
        console.error('Error initializing Telegram WebApp:', error)
        setIsInitialized(true) // Still render the app
      }
    } else {
      // Not in Telegram environment
      console.log('🎬 KFLIX running outside Telegram')
      setIsInitialized(true)
    }
  }, [])

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Loading KFLIX...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Hook to access Telegram WebApp
export function useTelegram() {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    return window.Telegram.WebApp
  }
  return null
}

// TypeScript declarations for Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string
        initDataUnsafe: Record<string, unknown>
        version: string
        platform: string
        colorScheme: 'light' | 'dark'
        themeParams: Record<string, unknown>
        isExpanded: boolean
        viewportHeight: number
        viewportStableHeight: number
        ready(): void
        expand(): void
        close(): void
        enableClosingConfirmation(): void
        disableClosingConfirmation(): void
        setHeaderColor(color: string): void
        setBackgroundColor(color: string): void
        MainButton: {
          text: string
          color: string
          textColor: string
          isVisible: boolean
          isProgressVisible: boolean
          isActive: boolean
          setText(text: string): void
          onClick(callback: () => void): void
          offClick(callback: () => void): void
          show(): void
          hide(): void
          enable(): void
          disable(): void
          showProgress(leaveActive?: boolean): void
          hideProgress(): void
        }
        BackButton: {
          isVisible: boolean
          onClick(callback: () => void): void
          offClick(callback: () => void): void
          show(): void
          hide(): void
        }
        HapticFeedback: {
          impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void
          notificationOccurred(type: 'error' | 'success' | 'warning'): void
          selectionChanged(): void
        }
        onEvent(eventType: string, eventHandler: () => void): void
        offEvent(eventType: string, eventHandler: () => void): void
        sendData(data: string): void
        openLink(url: string): void
        openTelegramLink(url: string): void
        showPopup(params: {
          title?: string
          message: string
          buttons?: Array<{
            id?: string
            type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'
            text: string
          }>
        }, callback?: (buttonId: string) => void): void
        showAlert(message: string, callback?: () => void): void
        showConfirm(message: string, callback?: (confirmed: boolean) => void): void
        showScanQrPopup(params: {
          text?: string
        }, callback?: (text: string) => boolean): void
        closeScanQrPopup(): void
      }
    }
  }
}