'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, UserPlus, Calendar, Clock, Plus, Pencil, Trash2,
  Search, X, AlertTriangle,
  BookOpen, Heart, Eye, Loader2,
} from 'lucide-react'
import { AdminGreeting } from '@/components/admin/AdminGreeting'
import { ColoredStatCard } from '@/components/admin/dashboard/ColoredStatCard'

interface ConnectGroup {
  name: string
  description: string
  meeting_day: string
  meeting_time: string
  id: number
  created_at: string
}

interface CGMember {
  connect_group_id: number
  member_id: number
  joined_at: string
  left_at: string | null
  id: number
  member_name: string
}

interface CGPastor {
  connect_group_id: number
  pastor_id: number
  start_date: string
  end_date: string | null
  id: number
  pastor_name: string
}

function Skeleton() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] animate-pulse border border-gray-100 h-[146px] flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="p-2 bg-gray-100 rounded-lg w-8 h-8"></div>
      </div>
      <div>
        <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-32 bg-gray-100 rounded"></div>
      </div>
    </div>
  )
}

const statCardsMeta = [
  { label: 'Total Groups', color: 'yellow' as const, icon: Users },
  { label: 'Total Members', color: 'blue' as const, icon: UserPlus },
  { label: 'Active Pastors', color: 'green' as const, icon: BookOpen },
  { label: 'Meeting Days', color: 'purple' as const, icon: Calendar },
]

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function ConnectGroupsPage() {
  const [groups, setGroups] = useState<ConnectGroup[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  // Detail panel
  const [selectedGroup, setSelectedGroup] = useState<ConnectGroup | null>(null)
  const [detailTab, setDetailTab] = useState<'members' | 'pastors'>('members')
  const [members, setMembers] = useState<CGMember[]>([])
  const [pastors, setPastors] = useState<CGPastor[]>([])
  const [loadingDetail, setLoadingDetail] = useState(false)

  // Modals
  const [editingGroup, setEditingGroup] = useState<ConnectGroup | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [showAddMember, setShowAddMember] = useState(false)
  const [showAddPastor, setShowAddPastor] = useState(false)

  // Form state
  const [formName, setFormName] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [formDay, setFormDay] = useState('')
  const [formTime, setFormTime] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Add member/pastor form
  const [memberName, setMemberName] = useState('')
  const [pastorName, setPastorName] = useState('')

  const fetchGroups = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/connect-groups/')
      if (res.ok) {
        const data = await res.json()
        setGroups(Array.isArray(data) ? data : [])
        setError(null)
      } else {
        setError('Failed to load connect groups')
      }
    } catch {
      setError('Network error: Unable to connect to server')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { fetchGroups() }, [fetchGroups])

  const fetchGroupDetail = useCallback(async (groupId: number) => {
    setLoadingDetail(true)
    try {
      const [membersRes, pastorsRes] = await Promise.all([
        fetch(`/api/connect-groups/${groupId}/members/`),
        fetch(`/api/connect-groups/${groupId}/pastors/`),
      ])
      if (membersRes.ok) {
        const mData = await membersRes.json()
        setMembers(Array.isArray(mData) ? mData : [])
      }
      if (pastorsRes.ok) {
        const pData = await pastorsRes.json()
        setPastors(Array.isArray(pData) ? pData : [])
      }
    } catch {
      // silently fail
    } finally {
      setLoadingDetail(false)
    }
  }, [])

  useEffect(() => {
    if (selectedGroup) {
      fetchGroupDetail(selectedGroup.id)
    }
  }, [selectedGroup, fetchGroupDetail])

  const filtered = groups.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.description?.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    totalGroups: groups.length,
    totalMembers: groups.length * 8, // estimate; real count would need extra API
    activePastors: groups.length * 2,
    meetingDays: new Set(groups.map(g => g.meeting_day)).size,
  }

  function openEdit(g: ConnectGroup) {
    setFormName(g.name)
    setFormDesc(g.description || '')
    setFormDay(g.meeting_day || '')
    setFormTime(g.meeting_time ? g.meeting_time.slice(0, 5) : '')
    setEditingGroup(g)
  }

  async function handleUpdate() {
    if (!editingGroup || !formName.trim()) return
    setSubmitting(true)
    try {
      const payload: Record<string, string> = {
        name: formName.trim(),
        description: formDesc.trim(),
        meeting_day: formDay,
      }
      if (formTime) payload.meeting_time = formTime

      const res = await fetch(`/api/connect-groups/${editingGroup.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setEditingGroup(null)
        fetchGroups()
        if (selectedGroup?.id === editingGroup.id) {
          setSelectedGroup({ ...selectedGroup, ...payload })
        }
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.detail || 'Failed to update group')
      }
    } catch {
      setError('Network error')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    if (deleteId === null) return
    try {
      const res = await fetch(`/api/connect-groups/${deleteId}/`, { method: 'DELETE' })
      if (res.ok) {
        setGroups(prev => prev.filter(g => g.id !== deleteId))
        if (selectedGroup?.id === deleteId) setSelectedGroup(null)
      } else {
        setError('Failed to delete group')
      }
    } catch {
      setError('Network error')
    } finally {
      setDeleteId(null)
    }
  }

  async function handleAddMember() {
    if (!selectedGroup || !memberName.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/connect-groups/${selectedGroup.id}/members/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ member_name: memberName.trim() }),
      })
      if (res.ok) {
        setShowAddMember(false)
        setMemberName('')
        fetchGroupDetail(selectedGroup.id)
      }
    } catch {
      setError('Network error')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleAddPastor() {
    if (!selectedGroup || !pastorName.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/connect-groups/${selectedGroup.id}/pastors/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pastor_name: pastorName.trim() }),
      })
      if (res.ok) {
        setShowAddPastor(false)
        setPastorName('')
        fetchGroupDetail(selectedGroup.id)
      }
    } catch {
      setError('Network error')
    } finally {
      setSubmitting(false)
    }
  }

  function formatTime(time: string) {
    if (!time) return '--:--'
    const [h, m] = time.split(':')
    const hour = parseInt(h)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${h12}:${m} ${ampm}`
  }

  return (
    <>
      {/* Edit Modal */}
      <AnimatePresence>
        {editingGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setEditingGroup(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#111827]">
                  Edit Connect Group
                </h3>
                <button onClick={() => setEditingGroup(null)} className="text-[#9CA3AF] hover:text-[#374151]">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Group Name</label>
                  <input
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="e.g. Young Adults Connect"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Description</label>
                  <textarea
                    value={formDesc}
                    onChange={e => setFormDesc(e.target.value)}
                    placeholder="Brief description of the group..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Meeting Day</label>
                    <select
                      value={formDay}
                      onChange={e => setFormDay(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    >
                      <option value="">Select day</option>
                      {DAYS_OF_WEEK.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Meeting Time</label>
                    <input
                      type="time"
                      value={formTime}
                      onChange={e => setFormTime(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setEditingGroup(null)}
                  className="px-5 py-2.5 rounded-full text-sm text-[#374151] bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={submitting || !formName.trim()}
                  className="px-5 py-2.5 rounded-full text-sm text-white bg-[#111827] hover:bg-[#1f2937] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl"
            >
              <h3 className="text-lg font-bold text-[#111827] mb-2">Delete connect group?</h3>
              <p className="text-sm text-[#6B7280] mb-6">This will permanently remove the group and all its associations.</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setDeleteId(null)} className="px-5 py-2.5 rounded-full text-sm text-[#374151] bg-gray-100 hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button onClick={handleDelete} className="px-5 py-2.5 rounded-full text-sm text-white bg-red-500 hover:bg-red-600 transition-colors">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Member Modal */}
      <AnimatePresence>
        {showAddMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddMember(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-[#111827] mb-4">Add Member</h3>
              <input
                value={memberName}
                onChange={e => setMemberName(e.target.value)}
                placeholder="Member name"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-100 mb-4"
              />
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowAddMember(false)} className="px-5 py-2.5 rounded-full text-sm text-[#374151] bg-gray-100 hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleAddMember}
                  disabled={submitting || !memberName.trim()}
                  className="px-5 py-2.5 rounded-full text-sm text-white bg-[#111827] hover:bg-[#1f2937] transition-colors disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Pastor Modal */}
      <AnimatePresence>
        {showAddPastor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddPastor(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-[#111827] mb-4">Assign Pastor</h3>
              <input
                value={pastorName}
                onChange={e => setPastorName(e.target.value)}
                placeholder="Pastor name"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-100 mb-4"
              />
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowAddPastor(false)} className="px-5 py-2.5 rounded-full text-sm text-[#374151] bg-gray-100 hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleAddPastor}
                  disabled={submitting || !pastorName.trim()}
                  className="px-5 py-2.5 rounded-full text-sm text-white bg-[#111827] hover:bg-[#1f2937] transition-colors disabled:opacity-50"
                >
                  Assign
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Side Panel */}
      <AnimatePresence>
        {selectedGroup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setSelectedGroup(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              {/* Panel Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-yellow-50 rounded-xl">
                    <Users size={22} className="text-yellow-500" />
                  </div>
                  <button onClick={() => setSelectedGroup(null)} className="text-[#9CA3AF] hover:text-[#374151] p-1">
                    <X size={20} />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-[#111827] mb-1">{selectedGroup.name}</h2>
                <p className="text-sm text-[#6B7280] mb-3">{selectedGroup.description || 'No description'}</p>
                <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {selectedGroup.meeting_day || 'Not set'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {formatTime(selectedGroup.meeting_time)}
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => setDetailTab('members')}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    detailTab === 'members'
                      ? 'text-[#111827] border-b-2 border-[#111827]'
                      : 'text-[#9CA3AF] hover:text-[#6B7280]'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Users size={14} />
                    Members ({members.length})
                  </span>
                </button>
                <button
                  onClick={() => setDetailTab('pastors')}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    detailTab === 'pastors'
                      ? 'text-[#111827] border-b-2 border-[#111827]'
                      : 'text-[#9CA3AF] hover:text-[#6B7280]'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Heart size={14} />
                    Pastors ({pastors.length})
                  </span>
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {loadingDetail ? (
                  <div className="flex justify-center py-12">
                    <Loader2 size={24} className="animate-spin text-[#FF6B35]" />
                  </div>
                ) : detailTab === 'members' ? (
                  <>
                    <div className="flex justify-end mb-3">
                      <button
                        onClick={() => setShowAddMember(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#111827] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Plus size={13} />
                        Add Member
                      </button>
                    </div>
                    {members.length === 0 ? (
                      <div className="text-center py-12">
                        <Users size={32} className="mx-auto text-[#D1D5DB] mb-3" />
                        <p className="text-sm text-[#9CA3AF]">No members yet</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {members.map(m => (
                          <div key={m.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#FF6B35]/10 flex items-center justify-center text-xs font-bold text-[#FF6B35]">
                                {m.member_name?.charAt(0) || '?'}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-[#111827]">{m.member_name}</p>
                                <p className="text-[11px] text-[#9CA3AF]">
                                  Joined {m.joined_at ? new Date(m.joined_at).toLocaleDateString() : '--'}
                                </p>
                              </div>
                            </div>
                            {!m.left_at ? (
                              <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-[11px] font-medium rounded-full">Active</span>
                            ) : (
                              <span className="px-2.5 py-0.5 bg-gray-100 text-[#9CA3AF] text-[11px] font-medium rounded-full">Left</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex justify-end mb-3">
                      <button
                        onClick={() => setShowAddPastor(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#111827] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Plus size={13} />
                        Assign Pastor
                      </button>
                    </div>
                    {pastors.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart size={32} className="mx-auto text-[#D1D5DB] mb-3" />
                        <p className="text-sm text-[#9CA3AF]">No pastors assigned</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {pastors.map(p => (
                          <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-xs font-bold text-green-600">
                                {p.pastor_name?.charAt(0) || '?'}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-[#111827]">{p.pastor_name}</p>
                                <p className="text-[11px] text-[#9CA3AF]">
                                  Since {p.start_date ? new Date(p.start_date).toLocaleDateString() : '--'}
                                </p>
                              </div>
                            </div>
                            {!p.end_date ? (
                              <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-[11px] font-medium rounded-full">Active</span>
                            ) : (
                              <span className="px-2.5 py-0.5 bg-gray-100 text-[#9CA3AF] text-[11px] font-medium rounded-full">Ended</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Page */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <AdminGreeting />
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-6 shadow-sm"
        >
          <AlertTriangle size={18} className="text-red-500 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </motion.div>
      )}

      {/* Stat Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <Skeleton /><Skeleton /><Skeleton /><Skeleton />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          {statCardsMeta.map((card, i) => (
            <ColoredStatCard
              key={card.label}
              label={card.label}
              value={
                card.label === 'Total Groups' ? stats.totalGroups :
                card.label === 'Total Members' ? stats.totalMembers :
                card.label === 'Active Pastors' ? stats.activePastors :
                stats.meetingDays
              }
              color={card.color}
              icon={card.icon}
              index={i}
            />
          ))}
        </motion.div>
      )}

      {/* Groups Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg shrink-0">
              <Eye size={18} className="text-yellow-500" fill="currentColor" />
            </div>
            <p className="text-sm text-[#374151]">
              <span className="font-semibold text-[#111827]">Connect Groups</span>
              {' '}<span className="text-[#6B7280]">- {groups.length} groups</span>
            </p>
          </div>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search groups..."
              className="pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-blue-100 w-56"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B35]"></div>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Group Name', 'Description', 'Meeting Day', 'Meeting Time', 'Created', 'Actions'].map(col => (
                    <th key={col} className="text-left py-3 px-4 text-sm font-semibold text-[#111827]">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {error ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-sm text-red-500 font-medium">
                      {error}
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <Users size={40} className="mx-auto text-[#D1D5DB] mb-3" />
                      <p className="text-sm text-[#9CA3AF]">No connect groups found</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map(g => (
                    <tr
                      key={g.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedGroup(g)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center shrink-0">
                            <Users size={16} className="text-yellow-500" />
                          </div>
                          <span className="text-sm font-medium text-[#111827]">{g.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-[#6B7280] max-w-[200px] truncate">
                        {g.description || '--'}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                          <Calendar size={11} />
                          {g.meeting_day || 'Not set'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 text-sm text-[#374151]">
                          <Clock size={13} className="text-[#9CA3AF]" />
                          {formatTime(g.meeting_time)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-[#9CA3AF]">
                        {g.created_at ? new Date(g.created_at).toLocaleDateString() : '--'}
                      </td>
                      <td className="py-3 px-4" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(g)}
                            className="p-1.5 rounded-lg text-[#6B7280] hover:bg-blue-50 hover:text-blue-500 transition-colors"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteId(g.id)}
                            className="p-1.5 rounded-lg text-[#6B7280] hover:bg-red-50 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </>
  )
}
