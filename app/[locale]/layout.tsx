import { Footer } from '@/components/footer';
import LoadingWrapper from '@/components/loading-wrapper';
import { Navbar } from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { defaultMetadata, generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { Cairo, Inter, Space_Grotesk } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';

const ChatbotWidget = dynamic(() => import('@/components/chatbot-widget').then(mod => mod.ChatbotWidget), {
  ssr: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const locales = ['en', 'ar'];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'en' | 'ar';
  const metadata = defaultMetadata[locale];
  
  return generatePageMetadata({
    locale,
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    path: '',
  });
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const { locale } = params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://backend.zynk-adv.com" />
        <link rel="dns-prefetch" href="https://backend.zynk-adv.com" />
        <link rel="preload" href="/_next/static/media/e4af272ccee01ff0-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/_next/static/media/36966cca54120369-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${cairo.variable} ${locale === 'ar' ? 'font-arabic' : 'font-body'}`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <LoadingWrapper>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 pt-20">
                  {children}
                </main>
                <Footer />
                <ChatbotWidget />
              </div>
            </LoadingWrapper>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
