import { http } from './http-client'

export interface FirstTimerRecord {
  id: string
  member_id: string
  service_date: string
  service_type: string
  service_name: string
  name: string
  phone_number: string
  address: string | null
  email: string | null
  gender: string | null
  date_of_birth: string | null
  relationship_status: string | null
  employment_status: string | null
  heard_about_church: string | null
  heard_about_church_other: string | null
  purpose_of_attending: string | null
  would_like_to_be_member: string | null
  profile_completed: boolean
}

export interface FirstTimerListResponse {
  service_date: string
  count: number
  results: FirstTimerRecord[]
}

export interface FirstTimerUpdatePayload {
  name: string
  phone_number: string
  address: string
  email: string
  gender: string
  date_of_birth: string
  relationship_status: string
  employment_status: string
  heard_about_church: string
  heard_about_church_other?: string | null
  purpose_of_attending: string
  would_like_to_be_member: string
}

export const firstTimerApi = {
  async getFirstTimers(serviceDate?: string): Promise<FirstTimerListResponse> {
    const query = serviceDate ? `?service_date=${encodeURIComponent(serviceDate)}` : ''
    const res = await http.get<FirstTimerListResponse>(`/api/first-timers${query}`)

    if (!res.ok || !res.data) {
      throw new Error(res.error || 'Failed to fetch first timers')
    }

    return res.data
  },

  async updateFirstTimer(memberId: string, payload: FirstTimerUpdatePayload) {
    const res = await http.put<{ ok: boolean; message: string; member_id: string }>(
      `/api/first-timers/${memberId}`,
      payload
    )

    if (!res.ok || !res.data) {
      throw new Error(res.error || 'Failed to update first timer')
    }

    return res.data
  },
}
