import { useEffect, useState } from 'react';

const fmt = new Intl.DateTimeFormat('en-IN', {
  hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata',
});

/** Live local time in India (IST). */
export default function LocalTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 20000);
    return () => window.clearInterval(id);
  }, []);
  return <time dateTime={now.toISOString()}>{fmt.format(now)} IST</time>;
}
