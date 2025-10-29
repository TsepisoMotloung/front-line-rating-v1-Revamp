'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QrScanner from 'react-qr-scanner';

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
      <div className="max-w-md w-full p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Scan QR Code</h1>
        <p className="mb-6 text-center text-neutral-600">Scan an agent's QR code to rate their service.</p>
        <div className="mb-6">
          <QrScanner
            onScan={handleScan}
            onError={handleError}
            style={{ width: '100%' }}
          />
        </div>
        {scannedUrl && (
          <div className="text-center text-green-600 mb-2">Scanned: {scannedUrl}</div>
        )}
        {error && <div className="text-center text-red-600 mb-2">{error}</div>}
        <div className="mt-8 text-xs text-neutral-400 text-center">
          Powered by <a href="https://github.com/JodusNodus/react-qr-scanner" target="_blank" rel="noopener noreferrer" className="underline">react-qr-scanner</a>
        </div>
      </div>
    </div>
  );
}
