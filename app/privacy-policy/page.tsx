import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - The Horde Attendance System',
  description: 'Privacy policy for The Horde student attendance tracking system',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-sm text-gray-600 mb-6">
          Effective Date: {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. About This Service</h2>
          <p className="mb-4">
            The Horde Attendance System ("we," "our," or "the service") is a student-developed platform created to track attendance at school football games and foster school spirit through grade-level competitions. This service is operated by students on behalf of The Horde, a student organization focused on promoting school engagement and spirit at athletic events.
          </p>
          <p className="mb-4">
            While this service has been reviewed and approved by school technology administration for use with school Google accounts, it operates independently and is not officially administered by the school itself.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          
          <h3 className="text-xl font-medium mb-3">Authentication Information</h3>
          <p className="mb-4">
            When you sign in using Google OAuth through your school account, we receive and store:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your school email address</li>
            <li>Your unique Google account identifier</li>
            <li>Basic profile information provided by Google (such as name, if available)</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">Grade Level Information</h3>
          <p className="mb-4">
            We determine your grade level by cross-referencing your email with the student directory database to identify your graduation year, which is then used to calculate your current grade (Freshman, Sophomore, Junior, or Senior).
          </p>

          <h3 className="text-xl font-medium mb-3">Attendance Records</h3>
          <p className="mb-4">
            Each time you check in at a game, we record:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>The timestamp of your check-in</li>
            <li>The specific game identifier</li>
            <li>Your user ID and grade level</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">Technical Information</h3>
          <p className="mb-4">
            We may collect limited technical data necessary for the service to function, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Browser type and version</li>
            <li>Device type (mobile/desktop)</li>
            <li>IP address (for security purposes only)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">
            Your information is used exclusively for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Recording and verifying your attendance at school football games</li>
            <li>Preventing duplicate check-ins for the same event</li>
            <li>Calculating grade-level attendance statistics for The Horde competitions</li>
            <li>Displaying real-time and historical attendance data on admin dashboards</li>
            <li>Generating aggregate statistics about game attendance patterns</li>
            <li>Ensuring the security and integrity of the check-in system</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Visibility</h2>
          
          <h3 className="text-xl font-medium mb-3">What Others Can See</h3>
          <p className="mb-4">
            The admin dashboard, accessible to authorized Horde organizers, displays:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Aggregate attendance numbers by grade level</li>
            <li>Total attendance counts per game</li>
            <li>Attendance trends and patterns over time</li>
            <li>Grade-level competition standings</li>
          </ul>
          <p className="mb-4 font-semibold">
            Individual student names and specific check-in records are NOT displayed publicly or on any leaderboards.
          </p>

          <h3 className="text-xl font-medium mb-3">Third-Party Services</h3>
          <p className="mb-4">
            We use the following third-party services to operate the platform:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Google OAuth:</strong> For secure authentication using school accounts</li>
            <li><strong>Supabase:</strong> For database storage and authentication management</li>
            <li><strong>Vercel:</strong> For application hosting and deployment</li>
            <li><strong>Vercel Analytics:</strong> For basic usage statistics (anonymized)</li>
          </ul>
          <p className="mb-4">
            We do not sell, rent, or share your personal information with any other third parties for marketing or commercial purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="mb-4">
            We implement industry-standard security measures to protect your information:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>All data transmission is encrypted using HTTPS/TLS protocols</li>
            <li>Database access is restricted to authenticated and authorized users only</li>
            <li>Admin dashboard access requires separate password authentication</li>
            <li>Regular security reviews are conducted in consultation with school IT administration</li>
            <li>OAuth tokens are securely managed and never stored in plain text</li>
          </ul>
          <p className="mb-4">
            While we strive to protect your information, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security but are committed to maintaining reasonable safeguards.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
          <p className="mb-4">
            We retain attendance data for the duration of the current school year to maintain competition records and historical statistics. At the end of each school year:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Individual attendance records may be anonymized and aggregated for historical statistics</li>
            <li>Personal identifiers may be removed while preserving grade-level data</li>
            <li>Active user accounts are retained for returning students</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights and Controls</h2>
          <p className="mb-4">
            You have the following rights regarding your information:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Access:</strong> You can request a copy of the attendance data we have associated with your account</li>
            <li><strong>Correction:</strong> You can request corrections to inaccurate information</li>
            <li><strong>Deletion:</strong> You can request deletion of your account and associated data</li>
            <li><strong>Opt-out:</strong> Participation is voluntary - you can choose not to use the service</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, contact The Horde organizers or the student administrators of this system.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Cookies and Local Storage</h2>
          <p className="mb-4">
            We use minimal cookies and browser storage for:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Maintaining your authentication session</li>
            <li>Remembering your dashboard preferences (for admin users)</li>
            <li>Basic functionality required for the application to work</li>
          </ul>
          <p className="mb-4">
            We do not use tracking cookies for advertising or marketing purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Age and Consent</h2>
          <p className="mb-4">
            This service is designed for current students at the school. By using this service, you confirm that:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>You are a current student authorized to use a school Google account</li>
            <li>You understand that your attendance data will be used for grade-level competitions</li>
            <li>You are participating voluntarily in The Horde attendance tracking</li>
          </ul>
          <p className="mb-4">
            If you are under 13 years of age, please consult with a parent or guardian before using this service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. We will notify users of material changes by:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Posting a notice on the main application page</li>
            <li>Updating the "Effective Date" at the top of this policy</li>
            <li>Announcing changes through The Horde's communication channels</li>
          </ul>
          <p className="mb-4">
            Continued use of the service after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Transparency and Open Source</h2>
          <p className="mb-4">
            In the spirit of transparency and student collaboration, aspects of this project may be open source. This means:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>The code structure (without sensitive data) may be reviewable</li>
            <li>Security vulnerabilities can be reported and addressed quickly</li>
            <li>Future students can learn from and improve the system</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
          <p className="mb-4">
            For questions, concerns, or requests regarding this Privacy Policy or your data:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Primary Contact:</strong> The Horde student organizers</li>
            <li><strong>Technical Issues:</strong> Student developers maintaining this system</li>
            <li><strong>School IT Concerns:</strong> School technology administration</li>
          </ul>
          <p className="mb-4 text-sm text-gray-600">
            Note: As this is a student-operated service, response times may vary based on academic schedules and availability.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Disclaimer</h2>
          <p className="mb-4 text-sm text-gray-600">
            This service is provided "as is" by student volunteers. While we strive for accuracy and reliability, we cannot guarantee uninterrupted service or complete accuracy of all data. This service is not an official school system and should not be relied upon for official attendance records.
          </p>
        </section>
      </div>
    </div>
  )
}