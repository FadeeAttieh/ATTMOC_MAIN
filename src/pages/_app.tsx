import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Head from 'next/head';
import { reportWebVitals as reportToAnalytics } from '../lib/analytics';

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate loading for 1.5 seconds
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || loading) return <Loading />;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

// Export reportWebVitals to track Web Vitals metrics
// Next.js will automatically call this function with metrics
export { reportWebVitals } from '../lib/analytics';