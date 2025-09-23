'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GRADE_SIZES } from '@/lib/grade-config';

interface GradePieChartProps {
  gradeCounts: Record<string, number>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const GRADES = ['Senior', 'Junior', 'Sophomore', 'Freshman'];

export function GradePieChart({ gradeCounts }: GradePieChartProps) {
  const data = GRADES.map((grade) => ({
    name: grade,
    value: gradeCounts[grade] || 0,
  }));

  return (
    <div className="bg-white/70 backdrop-blur-xl p-4 rounded-lg border border-slate-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-slate-900">Attendance by Grade</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => {
                if (typeof percent !== 'number') return '';
                // Only show label if percentage is above 5% to avoid crowding
                return (percent * 100) > 5 ? `${name}` : '';
              }}
              fontSize={12}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => {
                const grade = name as keyof typeof GRADE_SIZES;
                const total = GRADE_SIZES[grade];
                const percentage = ((Number(value) / total) * 100).toFixed(1);
                return [`${value} / ${total} (${percentage}%)`, grade];
              }}
              labelStyle={{ fontSize: '14px' }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '14px' }}
              iconSize={12}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
