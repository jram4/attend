/**
 * Utility functions for determining student grade levels from email addresses.
 */

/**
 * Maps graduating class years to grade levels.
 * Based on the current academic year (2025), the mappings are:
 * - Class of 2025: Seniors
 * - Class of 2026: Juniors
 * - Class of 2027: Sophomores
 * - Class of 2028: Freshmen
 */
const GRADUATING_YEAR_TO_GRADE: Record<number, string> = {
  2025: 'Senior',
  2026: 'Junior',
  2027: 'Sophomore',
  2028: 'Freshman',
}

/**
 * Extracts the graduating year from an email address.
 * Looks for patterns like:
 * - YY (last 2 digits of graduating year) in username
 * - Full year in various positions
 *
 * @param email - The student's email address
 * @returns The graduating year as a number, or null if not found
 */
function extractGraduatingYear(email: string): number | null {
  const username = email.split('@')[0]?.toLowerCase()
  if (!username) return null

  // Current year for reference
  const currentYear = new Date().getFullYear()

  // Look for 2-digit year patterns (e.g., '25', '26', '27', '28')
  const twoDigitPattern = /\b(2[5-8])\b/g
  const twoDigitMatches = username.match(twoDigitPattern)
  if (twoDigitMatches) {
    // Convert 2-digit to 4-digit (assuming 2000s)
    const years = twoDigitMatches.map(match => 2000 + parseInt(match))
    // Return the most recent graduating year found
    return Math.max(...years.filter(year => year >= currentYear))
  }

  // Look for 4-digit year patterns
  const fourDigitPattern = /\b(202[5-8])\b/g
  const fourDigitMatches = username.match(fourDigitPattern)
  if (fourDigitMatches) {
    const years = fourDigitMatches.map(match => parseInt(match))
    // Return the most recent graduating year found
    return Math.max(...years.filter(year => year >= currentYear))
  }

  return null
}

/**
 * Determines a student's grade level from their email address.
 * Parses the email to extract graduating year and maps to grade level.
 *
 * @param email - The student's email address
 * @returns The grade level as a string (e.g., 'Freshman', 'Sophomore', 'Junior', 'Senior', 'Other')
 */
export function getGradeFromEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return 'Other'
  }

  const graduatingYear = extractGraduatingYear(email)

  if (graduatingYear && GRADUATING_YEAR_TO_GRADE[graduatingYear]) {
    return GRADUATING_YEAR_TO_GRADE[graduatingYear]
  }

  // Default for faculty, staff, or unrecognized email patterns
  return 'Other'
}
