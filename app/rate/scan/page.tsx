'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

interface QrScannerProps {
  delay?: number;
  onError: (error: any) => void;
  onResult: (result: any) => void;
  constraints?: { video: { facingMode: string } };
  containerStyle?: React.CSSProperties;
  videoStyle?: React.CSSProperties;
  ViewFinder?: () => JSX.Element;
}

// Dynamically import QR scanner component with SSR disabled
const QrScanner = dynamic<QrScannerProps>(() => import('react-qr-scanner'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video bg-neutral-100 rounded-lg flex items-center justify-center">
      <div className="animate-pulse text-neutral-500">Loading camera...</div>
    </div>
  ),
});

export default function ScanQRCodePage() {
  const [scannedUrl, setScannedUrl] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleScan = (result: any) => {
    if (!result) return;
    // react-qr-scanner may return a string or an object with text/data
    const text = typeof result === 'string' ? result : result?.text ?? result?.data ?? null;
    if (text) {
      setScannedUrl(text);
      setError('');
      if (text.startsWith('http')) {
        // navigate to scanned link
        router.push(text);
      } else {
        setError('Invalid QR code link');
      }
    }
  };

  const handleError = (err: any) => {
    setError('QR scanner error');
    console.error(err);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-md w-full p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Scan QR Code</h1>
        <p className="mb-6 text-center text-neutral-600">
          Scan an agent's QR code to rate their service.
        </p>
        
        <div className="mb-6 overflow-hidden rounded-lg border border-neutral-200">
          {typeof window !== 'undefined' && (
            <QrScanner
              delay={300}
              onError={handleError}
              onResult={handleScan}
              constraints={{
                video: { facingMode: 'environment' } // Use back camera on mobile devices
              }}
              containerStyle={{ width: '100%' }}
              videoStyle={{ width: '100%' }}
            />
          )}
        </div>
        
        {scannedUrl && (
          <div className="text-center text-green-600 mb-2 p-2 bg-green-50 rounded-lg">
            <span className="font-medium">Scanned:</span> {scannedUrl}
          </div>
        )}
        
        {error && (
          <div className="text-center text-primary-600 mb-2 p-2 bg-primary-50 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="mt-8 text-xs text-neutral-400 text-center">
          Powered by{' '}
          <a 
            href="https://github.com/JodusNodus/react-qr-scanner" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline hover:text-neutral-600"
          >
            react-qr-scanner
          </a>
        </div>
      </div>
    </div>
  );
}
