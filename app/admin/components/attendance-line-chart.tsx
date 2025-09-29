'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AttendanceLineChartProps {
  data: Array<{ time: string; Senior: number; Junior: number; Sophomore: number; Freshman: number }>;
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
    <div className="bg-white/70 backdrop-blur-xl p-4 rounded-lg border border-slate-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-slate-900">Check-in Timeline</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="time"
              tick={{ fontSize: 11 }}
              interval="preserveStartEnd"
              axisLine={{ stroke: '#94a3b8' }}
              tickLine={{ stroke: '#94a3b8' }}
            />
            <YAxis 
              allowDecimals={false}
              tick={{ fontSize: 11 }}
              axisLine={{ stroke: '#94a3b8' }}
              tickLine={{ stroke: '#94a3b8' }}
            />
            <Tooltip 
              labelStyle={{ fontSize: '14px', color: '#1e293b' }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '14px' }} iconSize={12} />
            {GRADES.map((grade) => (
              <Line
                key={grade}
                type="monotone"
                dataKey={grade}
                stroke={COLORS[grade]}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, stroke: COLORS[grade], strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
