'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { CalendarDays, Loader2, Search, UserRoundCheck, Users } from 'lucide-react'
import { firstTimerApi, type FirstTimerRecord, type FirstTimerUpdatePayload } from '@/lib/first-timer-api'

const heardAboutOptions = [
  { value: 'social_media', label: 'Social Media' },
  { value: 'evangelism', label: 'Evangelism' },
  { value: 'refresh', label: 'Refresh' },
  { value: 'friend', label: 'Friend' },
  { value: 'others', label: 'Others' },
]

const employmentOptions = ['employed', 'unemployed', 'student'] as const
const relationshipOptions = ['single', 'married'] as const
const membershipOptions = ['no', 'maybe', 'yes'] as const
const genderOptions = ['male', 'female'] as const

function toFormState(record: FirstTimerRecord): FirstTimerUpdatePayload {
  return {
    name: record.name,
    phone_number: record.phone_number,
    address: record.address || '',
    email: record.email || '',
    gender: record.gender || 'male',
    date_of_birth: record.date_of_birth || '',
    relationship_status: record.relationship_status || 'single',
    employment_status: record.employment_status || 'employed',
    heard_about_church: record.heard_about_church || 'social_media',
    heard_about_church_other: record.heard_about_church_other || '',
    purpose_of_attending: record.purpose_of_attending || '',
    would_like_to_be_member: record.would_like_to_be_member || 'maybe',
  }
}

function prettyValue(value: string | null | undefined) {
  if (!value) return 'Not provided'
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default function TrackingPage() {
  const [records, setRecords] = useState<FirstTimerRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [serviceDate, setServiceDate] = useState('')
  const [form, setForm] = useState<FirstTimerUpdatePayload>({
    name: '',
    phone_number: '',
    address: '',
    email: '',
    gender: 'male',
    date_of_birth: '',
    relationship_status: 'single',
    employment_status: 'employed',
    heard_about_church: 'social_media',
    heard_about_church_other: '',
    purpose_of_attending: '',
    would_like_to_be_member: 'maybe',
  })

  const loadRecords = useCallback(async (date?: string, preferredSelectedId?: string | null) => {
    setLoading(true)
    setError(null)

    try {
      const data = await firstTimerApi.getFirstTimers(date)
      setRecords(data.results)
      setServiceDate(data.service_date)

      if (data.results.length > 0) {
        const nextSelected = preferredSelectedId && data.results.some((item) => item.member_id === preferredSelectedId)
          ? preferredSelectedId
          : data.results[0].member_id
        setSelectedId(nextSelected)
        const selected = data.results.find((item) => item.member_id === nextSelected) || data.results[0]
        setForm(toFormState(selected))
      } else {
        setSelectedId(null)
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load first timers')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    async function initialLoad() {
      await loadRecords()
    }

    void initialLoad()
  }, [loadRecords])

  const filteredRecords = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return records

    return records.filter((record) => {
      return (
        record.name.toLowerCase().includes(term) ||
        record.phone_number.toLowerCase().includes(term) ||
        (record.email || '').toLowerCase().includes(term) ||
        record.service_name.toLowerCase().includes(term)
      )
    })
  }, [records, search])

  const selectedRecord = useMemo(
    () => records.find((record) => record.member_id === selectedId) || null,
    [records, selectedId]
  )

  function chooseRecord(record: FirstTimerRecord) {
    setSelectedId(record.member_id)
    setForm(toFormState(record))
    setSuccess(null)
    setError(null)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedRecord) return

    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      await firstTimerApi.updateFirstTimer(selectedRecord.member_id, {
        ...form,
        heard_about_church_other:
          form.heard_about_church === 'others' ? form.heard_about_church_other || '' : null,
      })
      setSuccess('First timer information saved.')
      await loadRecords(serviceDate, selectedRecord.member_id)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Failed to save first timer')
    } finally {
      setSaving(false)
    }
  }

  const completedCount = records.filter((record) => record.profile_completed).length

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl bg-[#FEF3C7] p-2 text-[#D97706]">
              <Users size={18} />
            </div>
            <div>
              <p className="text-sm text-[#6B7280]">First timers</p>
              <p className="text-2xl font-semibold text-[#111827]">{records.length}</p>
            </div>
          </div>
          <p className="text-sm text-[#6B7280]">Pulled from the most recent Sunday service list.</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl bg-[#DBEAFE] p-2 text-[#2563EB]">
              <UserRoundCheck size={18} />
            </div>
            <div>
              <p className="text-sm text-[#6B7280]">Profiles completed</p>
              <p className="text-2xl font-semibold text-[#111827]">{completedCount}</p>
            </div>
          </div>
          <p className="text-sm text-[#6B7280]">VIP can see who still needs follow-up before closing the day.</p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl bg-[#DCFCE7] p-2 text-[#16A34A]">
              <CalendarDays size={18} />
            </div>
            <div>
              <p className="text-sm text-[#6B7280]">Service date</p>
              <p className="text-lg font-semibold text-[#111827]">
                {serviceDate ? format(new Date(serviceDate), 'EEEE, MMM d, yyyy') : 'Loading...'}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#6B7280]">Use this to review the latest first-timer check-ins after service.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_1.4fr]">
        <section className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-[#111827]">Visitors Tracking</h1>
              <p className="text-sm text-[#6B7280]">Search Sunday first timers and open a profile to complete their details.</p>
            </div>
            <div className="relative w-full max-w-xs">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, phone or email"
                className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-[#111827]"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center text-sm text-[#6B7280]">
              <Loader2 size={18} className="mr-2 animate-spin" />
              Loading first timers...
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 px-6 py-12 text-center text-sm text-[#6B7280]">
              No first timer records found for this service date.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRecords.map((record) => {
                const active = selectedId === record.member_id
                return (
                  <button
                    key={record.id}
                    type="button"
                    onClick={() => chooseRecord(record)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      active
                        ? 'border-[#111827] bg-[#F9FAFB]'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-[#FCFCFD]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-[#111827]">{record.name}</p>
                        <p className="text-sm text-[#6B7280]">{record.phone_number}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#9CA3AF]">{prettyValue(record.service_name)}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          record.profile_completed
                            ? 'bg-[#DCFCE7] text-[#166534]'
                            : 'bg-[#FEF3C7] text-[#92400E]'
                        }`}
                      >
                        {record.profile_completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          {!selectedRecord ? (
            <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-gray-200 text-sm text-[#6B7280]">
              Select a first timer to view or update details.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-[#111827]">{selectedRecord.name}</h2>
                  <p className="text-sm text-[#6B7280]">
                    Checked in for {prettyValue(selectedRecord.service_name)} on{' '}
                    {format(new Date(selectedRecord.service_date), 'MMM d, yyyy')}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    selectedRecord.profile_completed
                      ? 'bg-[#DCFCE7] text-[#166534]'
                      : 'bg-[#FEF3C7] text-[#92400E]'
                  }`}
                >
                  {selectedRecord.profile_completed ? 'Profile completed' : 'Needs follow-up'}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-[#374151]">
                  <span>Name</span>
                  <input
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:border-[#111827]"
                    required
                  />
                </label>

                <label className="space-y-2 text-sm text-[#374151]">
                  <span>Phone No</span>
                  <input
                    value={form.phone_number}
                    onChange={(event) => setForm({ ...form, phone_number: event.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:border-[#111827]"
                    required
                  />
                </label>

                <label className="space-y-2 text-sm text-[#374151] md:col-span-2">
                  <span>Address</span>
                  <input
                    value={form.address}
                    onChange={(event) => setForm({ ...form, address: event.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:border-[#111827]"
                    required
                  />
                </label>

                <label className="space-y-2 text-sm text-[#374151]">
                  <span>Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:border-[#111827]"
                    required
                  />
                </label>

                <label className="space-y-2 text-sm text-[#374151]">
                  <span>Gender</span>
                  <select
                    value={form.gender}
                    onChange={(event) => setForm({ ...form, gender: event.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:border-[#111827]"
                  >
                    {genderOptions.map((option) => (
                      <option key={option} value={option}>
                        {prettyValue(option)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2 text-sm text-[#374151]">
                  <span>Date of Birth</span>
                  <input
                    type="date"
                    value={form.date_of_birth}
                    onChange={(event) => setForm({ ...form, date_of_birth: event.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:border-[#111827]"
                    required
                  />
                </label>

                <label className="space-y-2 text-sm text-[#374151]">
                  <span>Relationship Status</span>
                  <select
                    value={form.relationship_status}
                    onChange={(event) => setForm({ ...form, relationship_status: event.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:border-[#111827]"
                  >
                    {relationshipOptions.map((option) => (
                      <option key={option} value={option}>
                        {prettyValue(option)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2 text-sm text-[#374151]">
                  <span>Employment Status</span>
                  <select
                    value={form.employment_status}
                    onChange={(event) => setForm({ ...form, employment_status: event.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:border-[#111827]"
                  >
                    {employmentOptions.map((option) => (
                      <option key={option} value={option}>
                        {prettyValue(option)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2 text-sm text-[#374151]">
                  <span>How did you hear about Votage Church?</span>
                  <select
                    value={form.heard_about_church}
                    onChange={(event) => setForm({ ...form, heard_about_church: event.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:border-[#111827]"
                  >
                    {heardAboutOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                {form.heard_about_church === 'others' && (
                  <label className="space-y-2 text-sm text-[#374151]">
                    <span>Please specify</span>
                    <input
                      value={form.heard_about_church_other || ''}
                      onChange={(event) => setForm({ ...form, heard_about_church_other: event.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:border-[#111827]"
                      required
                    />
                  </label>
                )}

                <label className="space-y-2 text-sm text-[#374151] md:col-span-2">
                  <span>Purpose of Attending</span>
                  <textarea
                    value={form.purpose_of_attending}
                    onChange={(event) => setForm({ ...form, purpose_of_attending: event.target.value })}
                    className="min-h-[110px] w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:border-[#111827]"
                    required
                  />
                </label>

                <label className="space-y-2 text-sm text-[#374151] md:col-span-2">
                  <span>Would you like to be a member of our church?</span>
                  <select
                    value={form.would_like_to_be_member}
                    onChange={(event) => setForm({ ...form, would_like_to_be_member: event.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none transition focus:border-[#111827]"
                  >
                    {membershipOptions.map((option) => (
                      <option key={option} value={option}>
                        {prettyValue(option)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {error && (
                <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#B91C1C]">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3 text-sm text-[#166534]">
                  {success}
                </div>
              )}

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center rounded-xl bg-[#111827] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1F2937] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {saving ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save first timer information'
                  )}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  )
}
