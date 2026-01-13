import { Fragment, type ReactNode } from 'react'

/**
 * Array of symbols that should be rendered as superscript.
 * Includes: dagger (†), double dagger (‡), registered trademark (®), and trademark (™)
 * Exported as const to allow reuse in other parts of the application
 */
export const SUPERSCRIPT_SYMBOLS = ['†', '‡', '®', '™'] as const

/**
 * Escapes special regex characters in a string to make it safe for use in a RegExp.
 *
 * @param char - The character or string to escape
 * @returns The escaped string safe to use in a regular expression
 *
 * @example
 * escapeForRegex('$') // Returns '\\$'
 * escapeForRegex('®') // Returns '®' (no escaping needed)
 */
function escapeForRegex(char: string) {
  return char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Dynamically generated pattern string for matching superscript symbols.
 * Creates an alternation pattern (e.g., "†|‡|®|™") by escaping each symbol
 * and joining them with the OR operator (|)
 */
const SYMBOL_PATTERN = SUPERSCRIPT_SYMBOLS.map(escapeForRegex).join('|')

/**
 * Regular expression to split text at superscript symbols.
 * Dynamically built from SUPERSCRIPT_SYMBOLS to match: †, ‡, ®, ™
 * Also matches optional emoji variation selector (️ = \uFE0F)
 *
 * Pattern: (†|‡|®|™)\uFE0F?
 * Flags:
 * - g: global (find all matches throughout the string)
 * - u: unicode (proper handling of unicode characters and code points)
 *
 * The parentheses create a capturing group, which includes the matched symbols
 * in the split result, allowing us to identify and wrap them separately
 */
const SPLIT_RE = new RegExp(`(${SYMBOL_PATTERN})\\uFE0F?`, 'gu')

/**
 * Regular expression to test if a string is exactly one superscript symbol.
 * Dynamically built from SUPERSCRIPT_SYMBOLS to match: †, ‡, ®, ™
 * Also matches optional emoji variation selector (️ = \uFE0F)
 *
 * Pattern: ^(†|‡|®|™)\uFE0F?$
 * Flag:
 * - u: unicode (proper handling of unicode characters and code points)
 *
 * The ^ and $ anchors ensure the entire string is just the symbol (no extra text)
 */
const IS_SUP_RE = new RegExp(`^(${SYMBOL_PATTERN})\\uFE0F?$`, 'u')

/**
 * Converts special symbols (†, ‡, ®, ™) in text to superscript HTML elements.
 *
 * This function processes text containing trademark, registered trademark, and dagger symbols,
 * wrapping them in <sup> tags while preserving the rest of the text as-is.
 *
 * The function is designed to be safe with various input types:
 * - Returns null for null/undefined inputs
 * - Passes through non-string React nodes unchanged (e.g., JSX elements)
 * - Avoids double-wrapping if superscript tags already exist
 *
 * @param text - The input to process. Can be a string, React node, undefined, or null.
 * @returns A React node with superscript symbols wrapped in <sup> elements,
 *          the original input if it's not a string, or null if no input is provided.
 *
 * @example
 * applySuperscripts("Product™ and Service®")
 * // Returns: <>Product<sup>™</sup> and Service<sup>®</sup></>
 *
 * @example
 * applySuperscripts(<div>Already formatted</div>)
 * // Returns: <div>Already formatted</div> (unchanged)
 *
 * @example
 * applySuperscripts(null)
 * // Returns: null
 */
export function applySuperscripts(text?: ReactNode): ReactNode {
  // Guard 1: Return null for null or undefined inputs
  if (text == null) return null

  // Guard 2: Only process plain strings - pass through React elements unchanged
  // This prevents errors when the function receives JSX elements or other React nodes
  if (typeof text !== 'string') {
    return text
  }

  // Guard 3: Avoid double-wrapping by checking if superscript tags already exist
  // This prevents applying the transformation multiple times to the same content
  if (text.includes('<sup')) {
    return text
  }

  return (
    text
      // Split the text at superscript symbols while keeping the symbols in the result
      .split(SPLIT_RE)
      // Remove any empty strings that might result from the split
      .filter(Boolean)
      // Transform each part into either a superscript element or plain text
      .map((part, index) =>
        // Check if this part is a superscript symbol
        IS_SUP_RE.test(part) ? (
          // Wrap the symbol in a <sup> element with styling
          <sup key={`${index}-${part}`} className="superscript-symbol">
            {part}
          </sup>
        ) : (
          // Keep regular text as-is, wrapped in a Fragment for consistent React rendering
          <Fragment key={`${index}-${part}`}>{part}</Fragment>
        ),
      )
  )
}
