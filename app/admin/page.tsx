import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminLogin, adminLogout } from './actions';
import { AdminDashboardClient } from './dashboard-client';

export const dynamic = 'force-dynamic';

export default async function AdminPage({ searchParams }: { searchParams: { error?: string } }) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin-auth')?.value === 'authenticated';

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Admin Login
              </h2>
              {searchParams.error === 'auth' && (
                <p className="mt-2 text-center text-sm text-red-600">
                  Invalid password. Please try again.
                </p>
              )}
            </div>

            <form action={adminLogin} className="space-y-6 mt-8">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Admin Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter admin password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboardClient adminLogout={adminLogout} />;
}