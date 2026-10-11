import { useCallback, useEffect, useMemo, useState } from 'react';
import About from './components/About';
import BackToTop from './components/BackToTop';
import Certifications from './components/Certifications';
import CommandPalette from './components/CommandPalette';
import type { Command } from './components/CommandPalette';
import Connect from './components/Connect';
import Contact from './components/Contact';
import CursorGlow from './components/CursorGlow';
import Examinations from './components/Examinations';
import Footer from './components/Footer';
import GithubRepos from './components/GithubRepos';
import Hero from './components/Hero';
import Loader from './components/Loader';
import Marquee from './components/Marquee';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Projects from './components/Projects';
import Skills from './components/Skills';
import { useToast } from './components/Toast';
import { fontPairs } from './data/fonts';
import { profile, skillGroups, socialLinks } from './data/portfolio';
import { useFont } from './hooks/useFont';
import { useTheme } from './hooks/useTheme';
import { copyText } from './utils/clipboard';

const TECH = skillGroups.flatMap((g) => g.skills);

const SECTIONS = [
  { id: 'top', label: 'Home' },
  { id: 'profile', label: 'Profile' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'Code on GitHub' },
  { id: 'certifications', label: 'Certification' },
  { id: 'examinations', label: 'Examination' },
  { id: 'about', label: 'About me' },
  { id: 'connect', label: 'Find me online' },
  { id: 'contact', label: 'Get in touch' },
];

export default function App() {
  const { theme, toggle } = useTheme();
  const { fontId, setFontId } = useFont();
  const toast = useToast();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const commands = useMemo<Command[]>(() => [
    ...SECTIONS.map((s) => ({
      id: `go-${s.id}`, label: s.label, group: 'Go to', hint: 'Section',
      run: () => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }),
    })),
    {
      id: 'resume', label: 'Download resume (PDF)', group: 'Actions', keywords: 'cv',
      run: () => {
        const a = document.createElement('a');
        a.href = profile.resumeUrl; a.download = ''; a.click();
      },
    },
    {
      id: 'copy-email', label: 'Copy email address', group: 'Actions', hint: profile.email,
      run: async () => toast((await copyText(profile.email)) ? 'Email copied to clipboard' : 'Could not copy email'),
    },
    {
      id: 'theme', label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`, group: 'Actions', keywords: 'dark light mode',
      run: toggle,
    },
    ...fontPairs.map((f) => ({
      id: `font-${f.id}`, label: `Font: ${f.label}`, group: 'Fonts', hint: f.note, keywords: 'typography typeface',
      run: () => setFontId(f.id),
    })),
    ...socialLinks.map((l) => ({
      id: `link-${l.id}`, label: l.label, group: 'Links', hint: l.handle, keywords: l.group,
      run: () => { window.open(l.href, l.href.startsWith('http') ? '_blank' : '_self', 'noreferrer'); },
    })),
  ], [theme, toggle, toast, setFontId]);

  return (
    <>
      <Loader />
      <CursorGlow />
      <a className="skip-link" href="#profile">Skip to content</a>
      <Navbar theme={theme} onToggleTheme={toggle} onOpenPalette={openPalette} fontId={fontId} onFontChange={setFontId} />
      <main>
        <Hero />
        <Marquee items={TECH} />
        <Profile />
        <Skills />
        <Projects />
        <GithubRepos />
        <Certifications />
        <Examinations />
        <About />
        <Connect />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette open={paletteOpen} onClose={closePalette} commands={commands} />
    </>
  );
}
