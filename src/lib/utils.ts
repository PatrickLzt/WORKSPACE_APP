import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Price } from "./supabase/supabase.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @brief Format Price
 * 
 * @param price
 * 
 * @returns string
 */
export function formatPrice(price: Price) {
  const priceString = new Intl.NumberFormat('en-US', { style: 'currency', currency: price.currency || undefined, minimumFractionDigits: 0, }).format((price?.unitAmount || 0) / 100);

  return priceString;
}

/**
 * @brief Get URL
 * 
 * @returns string
 */
export function getURL() {
  let url = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000/';

  url = url.includes('http') ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;

  return url;
}

/**
 * @brief Posting Data
 * 
 * @param {url, data} 
 * 
 * @returns Response
 */
export async function postData({ url, data, }: { url: string; data?: { price: Price } }) {

  console.log('posting,', url, data);

  const res: Response = await fetch(url, { method: 'POST', headers: new Headers({ 'Content-Type': 'application/json' }), credentials: 'same-origin', body: JSON.stringify(data), });

  if (!res.ok) {
    console.log('Error in postData', { url, data, res });
    throw Error(res.statusText);
  }

  return res.json();
}

/**
 * @brief Convert to DateTime
 * 
 * @param secs 
 *  
 * @returns The date in seconds
 */
export function toDateTime(secs: number) {

  const t = new Date('1970-01-01T00:30:00Z');
  t.setSeconds(secs);

  return t;
}
