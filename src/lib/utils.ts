import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setCookie = (name: string, value: string, days = 7, path = '/', domain?: string) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  let cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
  if (domain) {
    cookie += '; domain=' + domain
  }
  document.cookie = cookie
}

export const getCookie = (name: string) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}

export const deleteCookie = (name: string, path = '/', domain?: string) => {
  setCookie(name, '', -1, path, domain)
}