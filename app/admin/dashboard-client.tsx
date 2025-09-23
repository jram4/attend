'use client';

import { useState, useEffect } from 'react';
import { GAMES } from '@/lib/game-config';
import { generateDemoAttendanceData, processGradeCounts, processTimeSeriesData, DemoAttendanceRecord } from '@/lib/demo-data';
import { StatsCards } from './components/stats-cards';
import { GradePieChart } from './components/grade-pie-chart';
import { AttendanceLineChart } from './components/attendance-line-chart';

interface AdminDashboardClientProps {
  adminLogout: () => Promise<void>;
}

export function AdminDashboardClient({ adminLogout }: AdminDashboardClientProps) {
  const [selectedGameId, setSelectedGameId] = useState<string>(GAMES[0].id);
  const [attendanceData, setAttendanceData] = useState<DemoAttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await generateDemoAttendanceData(selectedGameId);
        setAttendanceData(data);
      } catch (error) {
        console.error('Error generating demo data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [selectedGameId]);

  // Process data for visualization
  const gradeCounts = processGradeCounts(attendanceData);
  const selectedGame = GAMES.find(g => g.id === selectedGameId)!;
  const timeSeriesData = processTimeSeriesData(
    attendanceData,
    new Date(selectedGame.checkInStart),
    new Date(selectedGame.checkInEnd)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Attendance Dashboard</h1>
        <button
          onClick={() => adminLogout()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="mb-8">
        <label htmlFor="game-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Game
        </label>
        <select
          id="game-select"
          value={selectedGameId}
          onChange={(e) => setSelectedGameId(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          {GAMES.map((game) => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      ) : (
        <>
          <StatsCards gradeCounts={gradeCounts} totalCount={attendanceData.length} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <GradePieChart gradeCounts={gradeCounts} />
            <AttendanceLineChart data={timeSeriesData} />
          </div>
        </>
      )}
    </div>
  );
}