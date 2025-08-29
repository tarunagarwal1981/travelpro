import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TravelHub Pro - AI-Powered Travel Platform',
  description:
    'Connect travel agents with tour operators through intelligent lead generation and booking management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  );
}
