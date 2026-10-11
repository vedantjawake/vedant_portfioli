import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { profile, socialLinks } from '../data/portfolio';
import { copyText } from '../utils/clipboard';
import LocalTime from './LocalTime';
import { useToast } from './Toast';
import Button from '../templates/Button';
import Card from '../templates/Card';
import Marquee from './Marquee';
import Reveal from '../templates/Reveal';
import SectionTemplate from '../templates/SectionTemplate';
import styles from './Contact.module.css';

interface FormValues { name: string; email: string; subject: string; message: string }
type Errors = Partial<Record<keyof FormValues, string>>;

const SUBJECTS = ['Internship opportunity', 'Full-time role', 'Project collaboration', 'Just saying hello'];
const INITIAL: FormValues = { name: '', email: '', subject: SUBJECTS[0], message: '' };
const MAX = 500;

function validate(v: FormValues): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email, like name@example.com.';
  if (v.message.trim().length < 10) e.message = 'Write a message of at least 10 characters.';
  return e;
}

const BANNER = ['Let’s build something', 'Open to internships', 'Full-stack + AI', 'Say hello'];

export default function Contact() {
  const toast = useToast();
  const copyEmail = async () => toast((await copyText(profile.email)) ? 'Email copied to clipboard' : 'Could not copy. Select it manually.');
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [sent, setSent] = useState(false);

  const errors = validate(values);
  const show = (k: keyof FormValues) => (touched[k] ? errors[k] : undefined);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };
  const onBlur = (e: React.FocusEvent<HTMLElement>) => {
    const name = (e.target as HTMLInputElement).name as keyof FormValues;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length > 0) return;
    // No backend: open the visitor's email app with the message filled in.
    const body = `${values.message}\n\n— ${values.name} (${values.email})`;
    window.location.href =
      `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const reset = () => { setValues(INITIAL); setTouched({}); setSent(false); };

  const info = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'Phone', value: profile.phone, href: `tel:+91${profile.phone}` },
    { label: 'Location', value: profile.location },
    { label: 'Local time', value: <LocalTime /> },
    ...socialLinks
      .filter((l) => l.id === 'linkedin' || l.id === 'github')
      .map((l) => ({ label: l.label, value: l.handle, href: l.href })),
  ];

  return (
    <>
      <div className={styles.banner} aria-hidden="true"><Marquee items={BANNER} variant="display" /></div>
      <SectionTemplate
        id="contact"
        title="Get in touch"
        intro="Tell me about the internship, role or project. I will get back to you as soon as I can."
      >
        <div className={styles.grid}>
          <Reveal fill>
            <Card as="aside" className={styles.info}>
              <h3>Contact details</h3>
              <dl>
                {info.map((i) => (
                  <div key={i.label}>
                    <dt>{i.label}</dt>
                    <dd>
                      {i.href ? (
                        <a href={i.href} target={i.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{i.value}</a>
                      ) : i.value}
                      {i.label === 'Email' && (
                        <button type="button" className={styles.copy} onClick={copyEmail}>Copy</button>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>

          <Reveal delay={120}>
            {sent ? (
              <div className={styles.done} role="status">
                <h3>Your email draft is ready</h3>
                <p>Your email app should have opened with the message filled in. Press send there to deliver it.</p>
                <Button variant="ghost" onClick={reset}>Write another message</Button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} noValidate>
                <div className={styles.row}>
                  <label className={styles.field}>
                    <span>Name</span>
                    <input name="name" value={values.name} onChange={onChange} onBlur={onBlur}
                      autoComplete="name" aria-invalid={!!show('name')} aria-describedby="err-name" />
                    <small id="err-name" className={styles.error}>{show('name')}</small>
                  </label>
                  <label className={styles.field}>
                    <span>Email</span>
                    <input name="email" type="email" value={values.email} onChange={onChange} onBlur={onBlur}
                      autoComplete="email" aria-invalid={!!show('email')} aria-describedby="err-email" />
                    <small id="err-email" className={styles.error}>{show('email')}</small>
                  </label>
                </div>

                <label className={styles.field}>
                  <span>What is this about?</span>
                  <select name="subject" value={values.subject} onChange={onChange}>
                    {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Message</span>
                  <textarea name="message" rows={6} maxLength={MAX} value={values.message}
                    onChange={onChange} onBlur={onBlur}
                    aria-invalid={!!show('message')} aria-describedby="err-message" />
                  <div className={styles.foot}>
                    <small id="err-message" className={styles.error}>{show('message')}</small>
                    <small className={styles.count}>{values.message.length}/{MAX}</small>
                  </div>
                </label>

                <Button type="submit">Send message</Button>
              </form>
            )}
          </Reveal>
        </div>
      </SectionTemplate>
    </>
  );
}
