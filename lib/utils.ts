import { clsx, type ClassValue } from 'clsx'
import { type CustomValidatorResult } from 'sanity'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '')

  // Return the formatted number with tel: prefix
  return `tel:${digitsOnly}`
}

export function getGoogleMapsLink(coordinates: {
  longitude: number
  latitude: number
}): string {
  // const encodedAddress = encodeURIComponent(address)
  return `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`
  // return `https://www.google.com/maps/search/businesses/@${coordinates.latitude},${coordinates.longitude}`
}

/**
 * Validates a Sanity slug format
 *
 * Ensures the slug follows proper URL-safe conventions:
 * - Only lowercase letters, numbers, and hyphens
 * - Cannot start or end with a hyphen
 * - Supports nested paths with forward slashes
 * - Cannot end with a trailing slash
 *
 * @param {string} slug - The slug string to validate
 * @returns {CustomValidatorResult | Promise<CustomValidatorResult>}
 *   Returns true if valid, or an error message string if invalid
 *
 * @example
 * isValidSanitySlug('about-us') // returns true
 * isValidSanitySlug('about/team') // returns true
 * isValidSanitySlug('About-Us') // returns error message (uppercase not allowed)
 * isValidSanitySlug('about-us/') // returns error message (trailing slash)
 */
export function isValidSanitySlug(
  slug: string,
): CustomValidatorResult | Promise<CustomValidatorResult> {
  // Regular expression breakdown:
  // ^[a-z0-9]+ - Start with one or more lowercase letters or numbers
  // (?:-[a-z0-9]+)* - Optionally followed by hyphen + letters/numbers (repeated)
  // (?:\/[a-z0-9]+(?:-[a-z0-9]+)*)* - Optionally followed by slash + same pattern (for nested paths)
  // $ - End of string (ensures no trailing slash or invalid characters)
  const VALID_SLUG_REGEX =
    /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/

  // Return error message if invalid, otherwise true
  return VALID_SLUG_REGEX.test(slug)
    ? true
    : 'Slug must contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen. It also should not end with a slash.'
}
