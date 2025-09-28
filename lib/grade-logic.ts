// lib/grade-logic.ts
import { supabaseAdmin } from '@/lib/supabase/admin'

/**
 * Maps a graduation year to a grade level based on the current school year.
 * Assumes the school year ends in the summer.
 * Example: In Fall 2024 / Spring 2025, the class of 2025 are Seniors.
 */
function mapGradYearToGrade(gradYear: number): string {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0-11 (Jan-Dec)

  // Determine the "end year" of the current academic year.
  // If we are in Aug-Dec (months 7-11), the academic year ends next year.
  // If we are in Jan-Jul (months 0-6), the academic year ends this year.
  const academicYearEnd = currentMonth >= 7 ? currentYear + 1 : currentYear;

  const yearsUntilGraduation = gradYear - academicYearEnd;

  switch (yearsUntilGraduation) {
    case 0: return 'Senior';
    case 1: return 'Junior';
    case 2: return 'Sophomore';
    case 3: return 'Freshman';
    default:
      // Covers middle schoolers, alumni, etc.
      return 'Other';
  }
}

/**
 * Fetches a student's grade level by looking up their email in the database.
 * This is an async server-side function that uses a privileged client.
 *
 * @param email - The student's email address
 * @returns The grade level as a string (e.g., 'Freshman', 'Senior', 'Other')
 */
export async function getGradeFromEmail(email: string): Promise<string> {
  if (!email || typeof email !== 'string') {
    return 'Other';
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('student_directory')
      .select('grad_year')
      .eq('user_email', email)
      .single(); // .single() is efficient: gets one record or throws an error

    if (error || !data || !data.grad_year) {
      // This will catch faculty, staff, or any email not in our directory
      console.log(`Email ${email} not found in student directory. Defaulting to 'Other'.`);
      return 'Other';
    }

    return mapGradYearToGrade(data.grad_year);

  } catch (error) {
    console.error('Error fetching grade for email:', email, error);
    return 'Other';
  }
}
