import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Fonts - system fonts for fast load */}
          <style>{`
            @supports (font-variation-settings: normal) {
              :root {
                --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              }
            }
          `}</style>

          {/* Favicon and manifest */}
          <link rel="icon" type="image/png" href="/favicon.png?v=3" />
          <link rel="manifest" href="/site.webmanifest" />
          
          {/* Apple icon */}
          <link rel="apple-touch-icon" href="/favicon.png?v=3" />
          
          {/* Theme color for address bar */}
          <meta name="theme-color" content="#ffffff" />
          
          {/* Preconnect to external resources for performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
          
          {/* DNS prefetch for analytics (if using external analytics) */}
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          
          {/* Open Graph for social sharing */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="ATTMOC - Web, Mobile & App Development" />
          <meta property="og:description" content="Building websites, web apps, mobile apps and powerful brands with cutting-edge technology" />
          <meta property="og:image" content="/og-image.jpg" />
          <meta property="og:url" content="https://attmoc.com" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="ATTMOC - Web, Mobile & App Development" />
          <meta name="twitter:description" content="Building websites, web apps, mobile apps and powerful brands" />
          <meta name="twitter:image" content="/og-image.jpg" />
        </Head>
        <body>
          <Main />
          <NextScript />
          
          {/* Google Analytics placeholder - add your tracking ID to .env.local */}
          {process.env.NEXT_PUBLIC_ANALYTICS_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
            </>
          )}
        </body>
      </Html>
    );
  }
}
