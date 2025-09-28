import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Attend',
  description: 'Privacy policy for the Attend student attendance tracking application',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-sm text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Attend ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our student attendance tracking application for school games.
          </p>
          <p className="mb-4">
            By using Attend, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our application.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

          <h3 className="text-xl font-medium mb-3">Information Provided by School Authentication</h3>
          <p className="mb-4">
            When you sign in using your school's authentication system, we collect:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your school email address</li>
            <li>Your grade level (as determined by your school's records)</li>
            <li>A unique user identifier provided by your school's authentication system</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">Attendance Data</h3>
          <p className="mb-4">
            When you check in to a school game event, we collect:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>The specific game or event you attended</li>
            <li>The date and time of your check-in</li>
            <li>Association of your attendance with your user account</li>
          </ul>

          <p className="mb-4">
            <strong>Important:</strong> We do not collect or store any personally identifiable information beyond what is necessary for attendance tracking. We do not collect names, phone numbers, addresses, or any other personal details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">
            We use the collected information solely for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>To track and record your attendance at school game events</li>
            <li>To generate grade-level attendance statistics and leaderboards for school competitions</li>
            <li>To prevent duplicate check-ins for the same event</li>
            <li>To provide organizers with aggregated attendance data (without individual student details)</li>
            <li>To ensure the security and integrity of the attendance tracking system</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
          <p className="mb-4">
            We are committed to protecting your privacy. Your personal information is never sold, traded, or rented to third parties. We only share information in the following limited circumstances:
          </p>

          <h3 className="text-xl font-medium mb-3">Aggregated Data for Organizers</h3>
          <p className="mb-4">
            School organizers and administrators may access aggregated attendance statistics and grade-level leaderboards. This data does not include individual student information or personally identifiable details.
          </p>

          <h3 className="text-xl font-medium mb-3">Service Providers</h3>
          <p className="mb-4">
            We use Supabase (our database provider) to securely store your information. Supabase employs industry-standard security measures and is contractually obligated to maintain the confidentiality of your data.
          </p>

          <h3 className="text-xl font-medium mb-3">Legal Requirements</h3>
          <p className="mb-4">
            We may disclose your information if required by law, court order, or governmental regulation, or if we believe such disclosure is necessary to protect our rights, your safety, or the safety of others.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="mb-4">
            We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>All data is encrypted in transit and at rest</li>
            <li>Access to the system requires secure authentication through your school's systems</li>
            <li>Database access is restricted to authorized personnel only</li>
            <li>Regular security audits and updates are performed</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
          <p className="mb-4">
            We retain your attendance data for the duration of the school year and the associated competition period. After this period, data may be aggregated into historical statistics or deleted in accordance with our data retention policy and applicable school district guidelines.
          </p>
          <p className="mb-4">
            If you believe your data should be deleted sooner, please contact your school administrator or the system organizers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights and Choices</h2>
          <p className="mb-4">
            Depending on your location and applicable privacy laws, you may have certain rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Access:</strong> Request access to the personal information we have about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal and operational requirements)</li>
            <li><strong>Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, please contact your school administrator or the system organizers. We will respond to your requests in accordance with applicable privacy laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
          <p className="mb-4">
            Attend is designed for use by students under the supervision and with the consent of their educational institution. We are committed to complying with the Children's Online Privacy Protection Act (COPPA) and other applicable children's privacy laws.
          </p>
          <p className="mb-4">
            Schools using Attend are responsible for obtaining appropriate parental consent and ensuring compliance with applicable privacy regulations for their jurisdiction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Third-Party Services</h2>
          <p className="mb-4">
            Attend uses the following third-party services:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Supabase:</strong> For secure data storage and authentication</li>
            <li><strong>Microsoft OAuth:</strong> For secure school authentication (provided by your educational institution)</li>
            <li><strong>Vercel:</strong> For application hosting and deployment</li>
          </ul>
          <p className="mb-4">
            These services have their own privacy policies, and we encourage you to review them. We only share the minimum information necessary for these services to function.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Cookies and Tracking</h2>
          <p className="mb-4">
            Attend uses minimal cookies and tracking technologies necessary for authentication and basic functionality. We do not use cookies for advertising, analytics, or tracking purposes beyond what is required for the core attendance tracking functionality.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. International Data Transfers</h2>
          <p className="mb-4">
            Your data is stored on secure servers provided by Supabase. Depending on your location and our service providers, your data may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify users of any material changes by posting the updated policy on this page and updating the "Last updated" date.
          </p>
          <p className="mb-4">
            Your continued use of Attend after any changes constitutes acceptance of the updated Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your school administrator</li>
            <li>The Attend system organizers</li>
            <li>Email: [Insert contact email when available]</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">14. Governing Law</h2>
          <p className="mb-4">
            This Privacy Policy is governed by the laws of the jurisdiction where your educational institution is located. Any disputes arising from this policy will be resolved through the appropriate channels within your school district.
          </p>
        </section>
      </div>
    </div>
  )
}

