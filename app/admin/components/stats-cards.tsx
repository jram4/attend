// app/admin/components/stats-cards.tsx
'use client'

import { GraduationCap, BookOpen, School, UserCheck } from 'lucide-react'
import { GRADE_SIZES } from '@/lib/grade-config'

interface StatsCardsProps {
  gradeCounts: Record<'Senior' | 'Junior' | 'Sophomore' | 'Freshman', number>
  totalCount: number
}

export function StatsCards({ gradeCounts, totalCount }: StatsCardsProps) {
  const gradeCards = [
    { 
      title: 'Senior', 
      count: gradeCounts.Senior || 0, 
      total: GRADE_SIZES.Senior,
      percentage: GRADE_SIZES.Senior ? (((gradeCounts.Senior || 0) / GRADE_SIZES.Senior) * 100).toFixed(1) : '0.0',
      Icon: GraduationCap, 
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-700'
    },
    { 
      title: 'Junior', 
      count: gradeCounts.Junior || 0, 
      total: GRADE_SIZES.Junior,
      percentage: GRADE_SIZES.Junior ? (((gradeCounts.Junior || 0) / GRADE_SIZES.Junior) * 100).toFixed(1) : '0.0',
      Icon: BookOpen, 
      color: 'from-emerald-500 to-emerald-600',
      textColor: 'text-emerald-700'
    },
    { 
      title: 'Sophomore', 
      count: gradeCounts.Sophomore || 0, 
      total: GRADE_SIZES.Sophomore,
      percentage: GRADE_SIZES.Sophomore ? (((gradeCounts.Sophomore || 0) / GRADE_SIZES.Sophomore) * 100).toFixed(1) : '0.0',
      Icon: School, 
      color: 'from-amber-500 to-amber-600',
      textColor: 'text-amber-700'
    },
    { 
      title: 'Freshman', 
      count: gradeCounts.Freshman || 0, 
      total: GRADE_SIZES.Freshman,
      percentage: GRADE_SIZES.Freshman ? (((gradeCounts.Freshman || 0) / GRADE_SIZES.Freshman) * 100).toFixed(1) : '0.0',
      Icon: UserCheck, 
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-700'
    },
  ] as const

  return (
    <div className="grid grid-cols-2 gap-3">
      {gradeCards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              {card.title}
            </h3>
            <card.Icon className={`h-5 w-5 ${card.textColor}`} />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-slate-900">{card.count}</p>
            <div className="flex items-baseline gap-1">
              <p className="text-xs text-slate-500">of {card.total}</p>
              <p className={`text-xs font-semibold ${card.textColor}`}>
                ({card.percentage}%)
              </p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${card.color} transition-all duration-500`}
              style={{ width: `${card.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}