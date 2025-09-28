'use client'

import { ReactNode, useEffect } from 'react'
import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react'

interface TelegramProviderProps {
  children: ReactNode
}

function TelegramInner({ children }: TelegramProviderProps) {
  const lp = useLaunchParams()

  useEffect(() => {
    // Initialize Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      
      // Ready the app
      tg.ready()
      
      // Expand the app to full height
      tg.expand()
      
      // Enable closing confirmation
      tg.enableClosingConfirmation()
      
      // Set header color to match app theme
      tg.setHeaderColor('#0f172a') // bg-gray-950
      
      // Set background color
      tg.setBackgroundColor('#0f172a')
      
      // Hide main button initially
      tg.MainButton.hide()
      
      console.log('Telegram WebApp initialized:', {
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
    }
  }, [])

  return <>{children}</>
}

export function TelegramProvider({ children }: TelegramProviderProps) {
  // Check if we're in Telegram environment
  const isTelegram = typeof window !== 'undefined' && window.Telegram?.WebApp

  if (!isTelegram) {
    // If not in Telegram, render children directly
    return <>{children}</>
  }

  return (
    <SDKProvider acceptCustomStyles debug>
      <TelegramInner>{children}</TelegramInner>
    </SDKProvider>
  )
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
        initDataUnsafe: any
        version: string
        platform: string
        colorScheme: 'light' | 'dark'
        themeParams: any
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