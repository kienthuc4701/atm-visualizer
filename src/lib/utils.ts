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

// Utility functions for validation
export const isValidCardNumber = (cardNumber: string): boolean => {
  // Check if the card number is exactly 19 digits
  if (!/^\d{19}$/.test(cardNumber)) {
    return false;
  }
  // Implement Luhn algorithm for 19-digit card numbers
  let sum = 0;
  let isEven = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};
export const isValidPin = (pin: string): boolean => {
  // Check if PIN is exactly 4 digits
  return /^\d{4}$/.test(pin);
};
