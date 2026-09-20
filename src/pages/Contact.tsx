import { useState, type ChangeEvent, type FormEvent } from 'react'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '../components/Button'
import { SectionLabel } from '../components/SectionHeader'
import { serviceOptions } from '../data/services'
import { site } from '../data/site'
import { validateContact, type ContactErrors } from '../lib/validation'
import { buildContactMessage, whatsappUrl, type ContactFormValues } from '../lib/whatsapp'

const empty: ContactFormValues = { name: '', email: '', phone: '', service: '', message: '' }

const fieldBase =
  'block w-full border-0 border-b bg-transparent px-0 py-3 text-base text-ink placeholder:text-mute/70 transition-colors focus:outline-none focus:border-accent focus:ring-0'

export function Contact() {
  const [values, setValues] = useState<ContactFormValues>(empty)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [openedUrl, setOpenedUrl] = useState<string | null>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name as keyof ContactFormValues]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    setOpenedUrl(null)

    const firstInvalid = (Object.keys(found) as (keyof ContactFormValues)[])[0]
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid}`)?.focus()
      return
    }

    // Nothing is sent from here: we only prepare the message and hand it to WhatsApp.
    const trimmed: ContactFormValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      service: values.service,
      message: values.message.trim(),
    }
    const url = whatsappUrl(buildContactMessage(trimmed))
    setOpenedUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const field = (name: keyof ContactFormValues) => ({
    id: `field-${name}`,
    name,
    value: values[name],
    onChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `error-${name}` : undefined,
    className: `${fieldBase} ${errors[name] ? 'border-[#a3392b]' : 'border-line'}`,
  })

  const Label = ({ name, children }: { name: keyof ContactFormValues; children: string }) => (
    <label htmlFor={`field-${name}`} className="text-xs font-medium uppercase tracking-[0.18em] text-mute">
      {children}
    </label>
  )
  const Error = ({ name }: { name: keyof ContactFormValues }) =>
    errors[name] ? (
      <p id={`error-${name}`} className="mt-2 text-sm text-[#a3392b]">
        {errors[name]}
      </p>
    ) : null

  return (
    <div className="mx-auto max-w-[90rem] px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44 lg:px-14">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="animate-fade-up lg:col-span-5">
          <SectionLabel index="04">Contact</SectionLabel>
          <h1 className="mt-10 text-5xl leading-[1.02] sm:text-6xl lg:text-[4.75rem]">Tell me about your project.</h1>
          <p className="mt-8 max-w-md text-[1.05rem] leading-[1.75]">
            Share a few details and I’ll take it from there. The form prepares a WhatsApp message for you to review and send — or reach out directly.
          </p>

          <ul className="mt-12 space-y-5 border-t border-ink/80 pt-8 text-[0.98rem]">
            <li className="flex items-start gap-4">
              <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.5} />
              <a href={`mailto:${site.email}`} className="break-all text-ink hover:text-accent">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-4">
              <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.5} />
              <span className="text-ink">{site.phoneDisplay} · WhatsApp</span>
            </li>
            <li className="flex items-start gap-4">
              <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.5} />
              <span className="text-ink">{site.location}</span>
            </li>
          </ul>
        </div>

        <div className="animate-fade-up [animation-delay:120ms] lg:col-span-6 lg:col-start-7">
          <form onSubmit={onSubmit} noValidate className="border border-line bg-card p-6 sm:p-10">
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <div>
                <Label name="name">Name</Label>
                <input type="text" autoComplete="name" placeholder="Your full name" {...field('name')} />
                <Error name="name" />
              </div>
              <div>
                <Label name="email">Email</Label>
                <input type="email" autoComplete="email" placeholder="you@example.com" {...field('email')} />
                <Error name="email" />
              </div>
              <div>
                <Label name="phone">Phone Number</Label>
                <input type="tel" autoComplete="tel" placeholder="+20 …" {...field('phone')} />
                <Error name="phone" />
              </div>
              <div>
                <Label name="service">Service Needed</Label>
                <select {...field('service')}>
                  <option value="" disabled>
                    Select a service
                  </option>
                  {serviceOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <Error name="service" />
              </div>
              <div className="sm:col-span-2">
                <Label name="message">Message Details</Label>
                <textarea rows={5} placeholder="What are you building, and what would a good result look like?" {...field('message')} />
                <Error name="message" />
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-5">
              <Button type="submit" className="w-full sm:w-auto sm:self-start">
                Continue on WhatsApp
              </Button>
              <p className="text-sm leading-relaxed text-mute">
                This opens WhatsApp with your message ready. Nothing is sent until you press send there, and you can edit the text first.
              </p>
            </div>

            {openedUrl && (
              <div role="status" className="mt-8 border-t border-line pt-6 text-sm leading-relaxed">
                <p className="text-ink">WhatsApp should now be open with your message prepared.</p>
                <p className="mt-1">
                  Nothing has been sent yet. If it didn’t open,{' '}
                  <a href={openedUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent underline underline-offset-4">
                    open WhatsApp manually <ArrowUpRight aria-hidden className="size-3.5" />
                  </a>
                  .
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
