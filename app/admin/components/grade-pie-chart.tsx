'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GradePieChartProps {
  gradeCounts: Record<string, number>;
}

const COLORS = ['#1e40af', '#7c3aed', '#059669', '#d97706'];
const GRADES = ['Senior', 'Junior', 'Sophomore', 'Freshman'];

export function GradePieChart({ gradeCounts }: GradePieChartProps) {
  const data = GRADES.map((grade) => ({
    name: grade,
    value: gradeCounts[grade] || 0,
  }));

  return (
    <div className="bg-white p-10 rounded-lg border border-slate-200 shadow-sm">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Attendance by Grade</h2>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => {
                if (typeof percent !== 'number') return name;
                return `${name} ${(percent * 100).toFixed(0)}%`;
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
