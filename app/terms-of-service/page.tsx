// app/terms-of-service/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service - The Horde Attendance System',
  description: 'Terms of Service for The Horde student attendance tracking system.',
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-sm text-gray-600 mb-6">
          Effective Date: {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">
            Welcome to The Horde Attendance System ("we," "our," "the service"). These Terms of Service ("Terms") govern your use of our web application. By accessing or using the service, you agree to be bound by these Terms and our <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>
          <p className="mb-4">
            This service is a voluntary, student-led initiative created by students for students of <strong>The Episcopal School of Dallas</strong> to promote school spirit. If you do not agree to these Terms, you may not use the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Eligibility and Use</h2>
          <p className="mb-4">
            This service is intended solely for current students of <strong>The Episcopal School of Dallas</strong>. To use the service, you must:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Be a currently enrolled student.</li>
            <li>Have a valid school-issued Google account.</li>
            <li>Use the service for its intended purpose: to check in at school football games and participate in the grade-level attendance competition.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Conduct and Responsibilities</h2>
          <p className="mb-4">
            The integrity of the grade-level competition depends on everyone acting in good faith. You agree not to misuse the service or help anyone else to do so. Specifically, you agree to the following:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Personal Use Only:</strong> You may only check in for yourself. Attempting to check in on behalf of another student is strictly prohibited.</li>
            <li><strong>One Check-in Per Event:</strong> The system is designed to permit only one check-in per student per game. Do not attempt to bypass this restriction.</li>
            <li><strong>No Tampering:</strong> You may not attempt to probe, scan, or test the vulnerability of the system. Do not use scripts, bots, or any other automated means to interact with the service.</li>
            <li><strong>Honest Participation:</strong> Your use of the service should be for the genuine purpose of recording your attendance at an event you are physically present at.</li>
            <li><strong>Account Security:</strong> You are responsible for safeguarding your school Google account. We are not liable for any loss or damage arising from your failure to protect your account.</li>
          </ul>
          <p className="mb-4">
            Violation of these conduct rules may result in your check-ins being invalidated and, in serious cases, your access to the service being revoked.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Disclaimers and No Warranties</h2>
          <p className="mb-4 font-semibold">
            This is a student-operated service provided by volunteers.
          </p>
          <p className="mb-4">
            The service is provided on an "AS IS" and "AS AVAILABLE" basis, without any warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, secure, or free from errors, bugs, or viruses.
          </p>
          <p className="mb-4">
            <strong>This service is not an official school system.</strong> The data collected is for the sole purpose of the grade-level competition and should not be used or relied upon for official school attendance records.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
          <p className="mb-4">
            To the fullest extent permitted by applicable law, the student organizers and developers of The Horde Attendance System shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your access to or use of, or inability to access or use, the service.</li>
            <li>Any conduct or content of any third party on the service.</li>
            <li>Any unauthorized access, use, or alteration of your transmissions or content.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
          <p className="mb-4">
            The service, including its source code, design, and branding, is the intellectual property of its student creators. In the spirit of collaboration and education, aspects of this project may be made available under an open-source license. This does not grant you the right to duplicate or repurpose the service for commercial means without permission.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
          <p className="mb-4">
            We reserve the right to suspend or terminate your access to the service at any time, without prior notice or liability, for any reason, including if you breach these Terms. If you are no longer a student at the school, your eligibility to use the service ceases.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to These Terms</h2>
          <p className="mb-4">
            We may modify these Terms from time to time. If we make a change that we believe materially affects your rights, we will notify you through The Horde's official communication channels or by posting a notice within the application.
          </p>
          <p className="mb-4">
            By continuing to use the service after those changes become effective, you agree to be bound by the revised Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed in accordance with the student conduct policies and administrative regulations of <strong>The Episcopal School of Dallas</strong>. Any disputes related to the use of this service will be addressed by the student organizers in consultation with school faculty sponsors as needed.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
          <p className="mb-4">
            If you have any questions about these Terms of Service, please contact The Horde student organizers or the student development team.
          </p>
           <p className="mb-4 text-sm text-gray-600">
            Note: As this is a student-operated service, response times may vary based on academic schedules and availability.
          </p>
        </section>
      </div>
    </div>
  )
}