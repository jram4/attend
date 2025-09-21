import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to The Horde
          </h1>
          <h2 className="text-xl text-gray-600 mb-6">
            Attendance System
          </h2>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="text-4xl mb-4">📱</div>
          <p className="text-gray-700 leading-relaxed">
            Attendance can only be taken by scanning a QR code at an event.
            Please visit the game venue and scan the QR code provided to check in.
          </p>
        </div>

        <div className="text-sm text-gray-500">
          <p>For organizers:</p>
          <Link
            href="/admin"
            className="text-blue-600 hover:text-blue-800 underline mt-1 inline-block"
          >
            Access Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
