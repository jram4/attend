'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DemoAttendanceRecord } from '@/lib/demo-data';
import { GAMES } from '@/lib/game-config';

interface AttendanceLineChartProps {
  data: Array<{ time: string; [grade: string]: number }>;
}

const COLORS = {
  Senior: '#0088FE',
  Junior: '#00C49F',
  Sophomore: '#FFBB28',
  Freshman: '#FF8042',
};

const GRADES = ['Senior', 'Junior', 'Sophomore', 'Freshman'] as const;

export function AttendanceLineChart({ data }: AttendanceLineChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Check-in Timeline</h2>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis />
            <Tooltip />
            <Legend />
            {GRADES.map((grade) => (
              <Line
                key={grade}
                type="monotone"
                dataKey={grade}
                stroke={COLORS[grade]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
