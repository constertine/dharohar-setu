// src/config/appConfig.js
// Client-side public configuration for Humsafar web fallback landing application.
// IMPORTANT: Never add backend credentials, API secrets, or private tokens here.

export const ANDROID_PACKAGE_NAME =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ANDROID_PACKAGE_NAME) || 'com.example.humsafar'

export const DEFAULT_RELEASE_TAG_URL =
  'https://github.com/constertine/dharohar-setu/releases/tag/v.0.2.0'

export const DEFAULT_APK_DOWNLOAD_URL =
  'https://github.com/constertine/dharohar-setu/releases/download/v.0.2.0/app-release.apk'

export const DEFAULT_PLAY_STORE_URL = DEFAULT_APK_DOWNLOAD_URL

/**
 * Resolves the primary Android App download destination.
 * Controlled via VITE_ANDROID_DOWNLOAD_URL with fallback to the official GitHub Release APK.
 */
export function getAndroidDownloadUrl() {
  const customUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_ANDROID_DOWNLOAD_URL : undefined
  if (customUrl && typeof customUrl === 'string' && customUrl.trim() !== '') {
    return customUrl.trim()
  }
  return DEFAULT_APK_DOWNLOAD_URL
}

/**
 * Resolves the public canonical domain of the web application.
 */
export function getPublicAppUrl() {
  const envUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_PUBLIC_APP_URL : undefined
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/$/, '')
  }
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin
  }
  return 'https://dharohar-setu.vercel.app'
}

/**
 * Builds an Android intent link to open the installed Humsafar app directly,
 * or gracefully fall back to the download destination on Android devices.
 */
export function getOpenAppIntentUrl(nodeId = '') {
  const host = typeof window !== 'undefined' && window.location.host
    ? window.location.host
    : 'dharohar-setu.vercel.app'
  
  const path = nodeId ? `node/${encodeURIComponent(nodeId)}` : ''
  // Android Intent URI specification for Chrome / Android Browsers:
  // intent://<host>/<path>#Intent;scheme=https;package=com.example.humsafar;end
  return `intent://${host}/${path}#Intent;scheme=https;package=${ANDROID_PACKAGE_NAME};S.browser_fallback_url=${encodeURIComponent(getAndroidDownloadUrl())};end`
}

export const APP_METADATA = {
  appName: 'Humsafar',
  tagline: 'Discover India’s Heritage. Experience it Differently.',
  packageName: ANDROID_PACKAGE_NAME,
  version: '1.0.0',
}
