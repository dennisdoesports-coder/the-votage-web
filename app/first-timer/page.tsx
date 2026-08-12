'use client'

import Link from 'next/link'
import PhoneInput from 'react-phone-input-2'
import { FormEvent, useState } from 'react'
import styles from '../register/register.module.css'

const heardAboutOptions = [
  { value: 'social_media', label: 'Social Media' },
  { value: 'evangelism', label: 'Evangelism' },
  { value: 'refresh', label: 'Refresh' },
  { value: 'friend', label: 'Friend' },
  { value: 'others', label: 'Others (please specify)' },
]

export default function FirstTimerPage() {
  const base = process.env.NEXT_PUBLIC_API_BASE || ''
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('male')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [relationshipStatus, setRelationshipStatus] = useState('single')
  const [employmentStatus, setEmploymentStatus] = useState('employed')
  const [heardAboutChurch, setHeardAboutChurch] = useState('social_media')
  const [heardAboutChurchOther, setHeardAboutChurchOther] = useState('')
  const [purposeOfAttending, setPurposeOfAttending] = useState('')
  const [wouldLikeToBeMember, setWouldLikeToBeMember] = useState('maybe')

  const showOtherSource = heardAboutChurch === 'others'

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setNotice(null)

    try {
      const normalizedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`
      const payload = {
        name,
        phone_number: normalizedPhone,
        address,
        email,
        gender,
        date_of_birth: dateOfBirth,
        relationship_status: relationshipStatus,
        employment_status: employmentStatus,
        heard_about_church: heardAboutChurch,
        heard_about_church_other: showOtherSource ? heardAboutChurchOther : null,
        purpose_of_attending: purposeOfAttending,
        would_like_to_be_member: wouldLikeToBeMember,
      }

      const url = base ? `${base}/api/first-timer` : '/api/first-timer'
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        let message = 'We could not submit your form. Please try again.'
        try {
          const body = (await res.json()) as { detail?: string; message?: string }
          message = body.detail || body.message || message
        } catch {
          // keep default
        }
        throw new Error(message)
      }

      const data = (await res.json()) as {
        ok: boolean
        message: string
        auto_checked_in?: boolean
        created_member?: boolean
      }
      setName('')
      setPhoneNumber('')
      setAddress('')
      setEmail('')
      setGender('male')
      setDateOfBirth('')
      setRelationshipStatus('single')
      setEmploymentStatus('employed')
      setHeardAboutChurch('social_media')
      setHeardAboutChurchOther('')
      setPurposeOfAttending('')
      setWouldLikeToBeMember('maybe')
      const extra =
        data.created_member
          ? ' We also created your first-timer record and Sunday attendance from this submission.'
          : data.auto_checked_in
            ? ' We also checked you in for the latest Sunday service automatically.'
            : ''
      setNotice({ type: 'success', text: `${data.message}${extra}` })
    } catch (error) {
      setNotice({
        type: 'error',
        text: error instanceof Error ? error.message : 'Submission failed',
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className={styles.page}>
      {notice && (
        <div
          role="alert"
          style={{
            position: 'fixed',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
            minWidth: 'min(560px, calc(100vw - 24px))',
            maxWidth: 'calc(100vw - 24px)',
            borderRadius: 12,
            padding: '12px 14px',
            fontSize: 14,
            fontWeight: 700,
            color: notice.type === 'success' ? '#0f5132' : '#842029',
            background: notice.type === 'success' ? '#d1e7dd' : '#f8d7da',
            border: notice.type === 'success' ? '1px solid #badbcc' : '1px solid #f5c2c7',
            boxShadow: '0 10px 24px rgba(0, 0, 0, 0.14)',
          }}
        >
          {notice.text}
        </div>
      )}

      <div className={styles.wrap}>
        <Link href="/" className={styles.backLink}>
          <span aria-hidden="true">←</span>
          <span>Back to Home</span>
        </Link>

        <header className={styles.hero}>
          <h1 className={styles.title}>First Timer Form</h1>
          <p className={styles.subtitle}>
            If you already checked in at church, please fill this form with the same phone number you used at check-in so we can complete your first-timer record.
          </p>
        </header>

        <section className={styles.card}>
          <form onSubmit={onSubmit} className={styles.form}>
            <label className={styles.field}>
              <span className={styles.label}>Phone number used at check-in</span>
              <PhoneInput
                country="ng"
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
                specialLabel=""
                inputProps={{ required: true, name: 'phone' }}
                placeholder="e.g. +234 801 234 5678"
                containerClass={styles.phoneContainer}
                inputClass={styles.phoneInput}
                buttonClass={styles.phoneButton}
                dropdownClass={styles.phoneDropdown}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Name</span>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={styles.control}
                placeholder="First and last name"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Address</span>
              <input
                required
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className={styles.control}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={styles.control}
                placeholder="e.g. you@example.com"
              />
            </label>

            <div className={styles.rowTwo}>
              <label className={styles.field}>
                <span className={styles.label}>Gender</span>
                <select value={gender} onChange={(event) => setGender(event.target.value)} className={styles.control}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Date of birth</span>
                <input
                  required
                  type="date"
                  value={dateOfBirth}
                  onChange={(event) => setDateOfBirth(event.target.value)}
                  className={styles.control}
                />
              </label>
            </div>

            <div className={styles.rowTwo}>
              <label className={styles.field}>
                <span className={styles.label}>Relationship status</span>
                <select
                  value={relationshipStatus}
                  onChange={(event) => setRelationshipStatus(event.target.value)}
                  className={styles.control}
                >
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Employment status</span>
                <select
                  value={employmentStatus}
                  onChange={(event) => setEmploymentStatus(event.target.value)}
                  className={styles.control}
                >
                  <option value="employed">Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="student">Student</option>
                </select>
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.label}>How did you hear about the Votage Church?</span>
              <select
                value={heardAboutChurch}
                onChange={(event) => setHeardAboutChurch(event.target.value)}
                className={styles.control}
              >
                {heardAboutOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            {showOtherSource && (
              <label className={styles.field}>
                <span className={styles.label}>Please specify</span>
                <input
                  required
                  value={heardAboutChurchOther}
                  onChange={(event) => setHeardAboutChurchOther(event.target.value)}
                  className={styles.control}
                />
              </label>
            )}

            <label className={styles.field}>
              <span className={styles.label}>Purpose of attending</span>
              <textarea
                required
                value={purposeOfAttending}
                onChange={(event) => setPurposeOfAttending(event.target.value)}
                className={styles.control}
                style={{ minHeight: 110, resize: 'vertical' }}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Would you like to be a member of our church?</span>
              <select
                value={wouldLikeToBeMember}
                onChange={(event) => setWouldLikeToBeMember(event.target.value)}
                className={styles.control}
              >
                <option value="no">No</option>
                <option value="maybe">Maybe</option>
                <option value="yes">Yes</option>
              </select>
            </label>

            <button type="submit" disabled={busy} className={styles.submitButton}>
              {busy ? 'Submitting...' : 'Submit First Timer Form'}
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}
