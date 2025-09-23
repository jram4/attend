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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 leading-tight">Dashboard</h1>
        <h2 className="text-lg font-medium text-slate-600">THE HORDE</h2>
      </div>

      {/* Game Selection */}
      <div className="mb-6">
        <label htmlFor="game-select" className="block text-sm font-medium text-slate-700 mb-2">
          Select Game
        </label>
        <select
          id="game-select"
          value={selectedGameId}
          onChange={(e) => setSelectedGameId(e.target.value)}
          className="block w-full px-4 py-3 bg-white/70 backdrop-blur-xl border border-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          {GAMES.map((game) => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading data...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <StatsCards gradeCounts={gradeCounts} totalCount={attendanceData.length} />
          
          <div className="space-y-6">
            <GradePieChart gradeCounts={gradeCounts} />
            <AttendanceLineChart data={timeSeriesData} />
          </div>
        </div>
      )}

      {/* Logout Button - Fixed at bottom */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => adminLogout()}
          className="bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition-colors text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}