'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { ComponentType } from 'react';

// We'll dynamically import the client-only Html5QrcodePlugin after mount
// using the browser's import(...) so we avoid SSR and Next's dynamic chunk
// resolution issues that caused ChunkLoadError in some dev environments.
const Html5QrcodePluginPlaceholder: ComponentType<any> | null = null;

export default function ScanQRCodePage() {
  const [scannedUrl, setScannedUrl] = useState('');
  const [error, setError] = useState('');
  const [Plugin, setPlugin] = useState<ComponentType<any> | null>(null);
  const [loadingPlugin, setLoadingPlugin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    // Only load on client after mount to avoid any SSR evaluation of the scanner lib
    if (typeof window === 'undefined') {
      setLoadingPlugin(false);
      return;
    }

    import('./Html5QrcodePlugin')
      .then((mod) => {
        if (!mounted) return;
        const Comp = mod?.default ?? null;
        setPlugin(() => Comp);
      })
      .catch((err) => {
        console.error('Failed to dynamically load Html5QrcodePlugin:', err);
        setError('Failed to load scanner component');
      })
      .finally(() => {
        if (mounted) setLoadingPlugin(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleScanSuccess = (decodedText: string) => {
    console.log('Scan success:', decodedText);
    setScannedUrl(decodedText);
    setError('');
    
    if (decodedText.startsWith('http')) {
      router.push(decodedText);
    } else {
      setError('Invalid QR code: Not a valid URL');
    }
  };

  const handleScanError = (errorMessage: string) => {
    console.error('Scan error:', errorMessage);
    // Only show user-friendly errors
    if (errorMessage.includes('NotAllowedError')) {
      setError('Camera access denied. Please grant permission to use your camera.');
    } else if (errorMessage.includes('NotFoundError')) {
      setError('No camera found. Please ensure your device has a working camera.');
    } else if (!errorMessage.includes('permission')) {
      // Don't show permission-related messages as errors
      setError('Scanner error: ' + errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-neutral-50 p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/rate" className="text-primary-600 mb-8 inline-flex items-center hover:text-primary-700">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Search
          </Link>
          <h1 className="text-2xl font-bold text-neutral-900 mt-4">Scan QR Code</h1>
          <p className="text-neutral-600 mt-2">
            Point your camera at an agent's QR code to rate their service
          </p>
        </div>

        {/* Scanner */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="mb-6 overflow-hidden rounded-lg border border-neutral-200">
            {typeof window !== 'undefined' && (
              loadingPlugin ? (
                <div className="w-full aspect-video bg-neutral-100 rounded-lg flex items-center justify-center">
                  <div className="animate-pulse text-neutral-500">Initializing camera...</div>
                </div>
              ) : Plugin ? (
                <Plugin
                  onSuccess={handleScanSuccess}
                  onError={handleScanError}
                  height={400}
                />
              ) : (
                <div className="w-full aspect-video bg-neutral-100 rounded-lg flex items-center justify-center text-sm text-neutral-600">
                  Scanner unavailable on this device
                </div>
              )
            )}
          </div>

          {/* Status Messages */}
          {scannedUrl && (
            <div className="text-sm bg-green-50 text-green-700 rounded-lg p-4 mb-4">
              <div className="font-medium">QR Code Detected!</div>
              <div className="mt-1 break-all">{scannedUrl}</div>
            </div>
          )}

          {error && (
            <div className="text-sm bg-primary-50 text-primary-700 rounded-lg p-4 mb-4">
              <div className="font-medium">Scanner Error</div>
              <div className="mt-1">{error}</div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 bg-neutral-50 rounded-lg p-4">
            <h3 className="font-medium text-neutral-900 mb-2">Tips for scanning:</h3>
            <ul className="text-sm text-neutral-600 space-y-2">
              <li>• Ensure good lighting</li>
              <li>• Hold your device steady</li>
              <li>• Position the QR code within the frame</li>
              <li>• Make sure your camera has permission to access the site</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
