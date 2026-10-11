import { useRef, useState } from 'react';
import { profile, socialLinks } from '../data/portfolio';
import { useTypewriter } from '../hooks/useTypewriter';
import Button from '../templates/Button';
import Banner from './Banner';
import Logo from './Logo';
import NeuralCanvas from './NeuralCanvas';
import SocialIcon from './SocialIcon';
import styles from './Hero.module.css';

const CHIPS = ['React', 'Node.js', 'Python', 'MongoDB'];

export default function Hero() {
  const role = useTypewriter(profile.roles);
  const cardRef = useRef<HTMLDivElement>(null);
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = Boolean(profile.photo) && !photoFailed;
  const words = profile.shortName.split(' ');

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${px * 14}deg) rotateX(${-py * 14}deg)`;
  };
  const onLeave = () => { if (cardRef.current) cardRef.current.style.transform = ''; };

  let offset = 0;
  return (
    <section id="top" className={styles.hero}>
      <NeuralCanvas />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.hello}>Hello, I’m</p>
          <h1 className={styles.name} aria-label={profile.shortName}>
            {words.map((word) => {
              const start = offset;
              offset += word.length;
              return (
                <span key={word} className={styles.word} aria-hidden="true">
                  {word.split('').map((ch, i) => (
                    <span key={i} className={styles.ch} style={{ animationDelay: `${(start + i) * 55}ms` }}>
                      {ch}
                    </span>
                  ))}
                </span>
              );
            })}
          </h1>
          <p className={styles.role} aria-live="off">
            <span>{role}</span>
            <span className={styles.caret} aria-hidden="true" />
          </p>
          <p className={styles.tagline}>{profile.tagline}</p>
          <div className={styles.cta}>
            <Button href="#projects">See my projects</Button>
            <Button href={profile.resumeUrl} variant="ghost" download>Download resume</Button>
          </div>
          <ul className={styles.socials} aria-label="Social links">
            {socialLinks.slice(0, 6).map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={l.label}
                  title={l.label}
                >
                  <SocialIcon id={l.id} size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.stage} onPointerMove={onMove} onPointerLeave={onLeave}>
          <Banner />
          {CHIPS.map((c) => <span key={c} className={styles.chip}>{c}</span>)}
          <div ref={cardRef} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.avatar}>
                {showPhoto ? (
                  <img
                    src={profile.photo}
                    alt={`Portrait of ${profile.name}`}
                    onError={() => setPhotoFailed(true)}
                  />
                ) : (
                  <span aria-hidden="true">{profile.initials}</span>
                )}
              </div>
              <div className={styles.cardLogo}><Logo size={34} /></div>
            </div>
            <div className={styles.cardText}>
              <strong>{profile.name}</strong>
              <span>{profile.role}</span>
            </div>
            <p className={styles.meta}>{profile.location}</p>
            <p className={styles.status}>
              <i aria-hidden="true" />
              {profile.availability}
            </p>
          </div>
        </div>
      </div>
      <a href="#profile" className={styles.scroll} aria-label="Scroll to profile">
        <span />
      </a>
    </section>
  );
}
