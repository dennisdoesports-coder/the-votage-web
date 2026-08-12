'use client'

import { useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { BarChart3, HeartHandshake, Loader2, UserRoundCheck, Users } from 'lucide-react'
import { firstTimerApi, type FirstTimerRecord } from '@/lib/first-timer-api'

function prettyValue(value: string | null | undefined) {
  if (!value) return 'Not provided'
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default function MetricsPage() {
  const [records, setRecords] = useState<FirstTimerRecord[]>([])
  const [serviceDate, setServiceDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await firstTimerApi.getFirstTimers()
        setRecords(data.results)
        setServiceDate(data.service_date)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load first timer metrics')
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  const completedCount = useMemo(
    () => records.filter((record) => record.profile_completed).length,
    [records]
  )
  const memberInterestCount = useMemo(
    () => records.filter((record) => record.would_like_to_be_member === 'yes').length,
    [records]
  )
  const maybeCount = useMemo(
    () => records.filter((record) => record.would_like_to_be_member === 'maybe').length,
    [records]
  )
  const sourceBreakdown = useMemo(() => {
    const counts = new Map<string, number>()
    for (const record of records) {
      const key = record.heard_about_church || 'not_provided'
      counts.set(key, (counts.get(key) || 0) + 1)
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])
  }, [records])

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center text-sm text-[#6B7280]">
        <Loader2 size={18} className="mr-2 animate-spin" />
        Loading first-timer metrics...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-[#FECACA] bg-[#FEF2F2] px-6 py-5 text-sm text-[#B91C1C]">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'First timers', value: records.length, icon: Users, tint: 'bg-[#FEF3C7] text-[#D97706]' },
          { label: 'Completed profiles', value: completedCount, icon: UserRoundCheck, tint: 'bg-[#DBEAFE] text-[#2563EB]' },
          { label: 'Membership interest', value: memberInterestCount, icon: HeartHandshake, tint: 'bg-[#DCFCE7] text-[#16A34A]' },
          { label: 'Maybe responses', value: maybeCount, icon: BarChart3, tint: 'bg-[#F3E8FF] text-[#9333EA]' },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3">
              <div className={`rounded-xl p-2 ${card.tint}`}>
                <card.icon size={18} />
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">{card.label}</p>
                <p className="text-2xl font-semibold text-[#111827]">{card.value}</p>
              </div>
            </div>
            {serviceDate && (
              <p className="mt-4 text-sm text-[#6B7280]">
                Service date: {format(new Date(serviceDate), 'MMM d, yyyy')}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_1.2fr]">
        <section className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <h1 className="text-xl font-semibold text-[#111827]">First-Timer Metrics</h1>
          <p className="mt-1 text-sm text-[#6B7280]">What brought visitors in and how ready they are for next-step follow-up.</p>

          <div className="mt-6 space-y-4">
            {sourceBreakdown.length === 0 ? (
              <p className="text-sm text-[#6B7280]">No source data has been filled yet.</p>
            ) : (
              sourceBreakdown.map(([source, count]) => {
                const width = Math.max(12, Math.round((count / records.length) * 100))
                return (
                  <div key={source}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-[#111827]">{prettyValue(source)}</span>
                      <span className="text-[#6B7280]">{count}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-[#F3F4F6]">
                      <div className="h-full rounded-full bg-[#111827]" style={{ width: `${width}%` }} />
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <h2 className="text-lg font-semibold text-[#111827]">Follow-up Focus</h2>
          <div className="mt-5 space-y-3">
            {records.length === 0 ? (
              <p className="text-sm text-[#6B7280]">No first-timer records found for this service date.</p>
            ) : (
              records
                .filter((record) => !record.profile_completed || record.would_like_to_be_member === 'yes')
                .slice(0, 6)
                .map((record) => (
                  <div key={record.id} className="rounded-2xl border border-gray-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-[#111827]">{record.name}</p>
                        <p className="text-sm text-[#6B7280]">{record.phone_number}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          record.would_like_to_be_member === 'yes'
                            ? 'bg-[#DCFCE7] text-[#166534]'
                            : 'bg-[#FEF3C7] text-[#92400E]'
                        }`}
                      >
                        {record.would_like_to_be_member === 'yes' ? 'Interested' : 'Incomplete'}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-[#6B7280]">
                      Source: {prettyValue(record.heard_about_church)}
                    </p>
                    <p className="mt-1 text-sm text-[#6B7280]">
                      Membership response: {prettyValue(record.would_like_to_be_member)}
                    </p>
                  </div>
                ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
