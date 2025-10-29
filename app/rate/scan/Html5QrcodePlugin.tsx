'use client';

import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const qrcodeRegionId = "html5qr-code-full-region";

interface Html5QrcodePluginProps {
  height?: number;
  onSuccess: (decodedText: string) => void;
  onError: (errorMessage: string) => void;
}

const Html5QrcodePlugin = ({
  height = 400,
  onSuccess,
  onError
}: Html5QrcodePluginProps) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    let active = true;
    console.log('Html5QrcodePlugin: Initializing...');

    const setupScanner = async () => {
      try {
        // Check browser compatibility first
        if (typeof window === 'undefined') {
          throw new Error('Scanner cannot run in this environment');
        }

        if (!navigator?.mediaDevices) {
          throw new Error('Camera API not supported in this browser');
        }

        // List available cameras
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        console.log('Html5QrcodePlugin: Available cameras:', videoDevices.length);
        
        if (videoDevices.length === 0) {
          throw new Error('No cameras found');
        }

        // Create scanner instance
        console.log('Html5QrcodePlugin: Creating scanner instance');
        scannerRef.current = new Html5Qrcode(qrcodeRegionId);

        // Configure scanner with optimized settings
        const config = {
          fps: 10,
          qrbox: { width: 300, height: 300 }, // Larger scan area
          aspectRatio: 1.0,
          disableFlip: false,
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true
          },
          rememberLastUsedCamera: true,
          showTorchButtonIfSupported: true
        };

        // Try back camera first
        console.log('Html5QrcodePlugin: Starting scanner with back camera');
        await scannerRef.current.start(
          { 
            facingMode: 'environment'
          },
          config,
          (decodedText: string) => {
            if (!active) return;
            console.log('Html5QrcodePlugin: QR code detected:', decodedText);
            onSuccess(decodedText);
          },
          (errorMessage: string) => {
            if (!active) return;
            console.log('Html5QrcodePlugin: Scan error:', errorMessage);
            
            // Only show user-friendly errors
            if (errorMessage.includes('NotFoundException')) {
              // This is normal - it means no QR code is visible
              return;
            } else if (!errorMessage.includes('permission')) {
              onError('Please ensure the QR code is clearly visible and well-lit');
            }
          }
        ).catch(async () => {
          // If back camera fails, try front camera
          console.log('Html5QrcodePlugin: Retrying with front camera');
          if (scannerRef.current) {
            await scannerRef.current.start(
              { facingMode: 'user' },
              config,
              (decodedText: string) => {
                if (!active) return;
                console.log('Html5QrcodePlugin: QR code detected (front):', decodedText);
                onSuccess(decodedText);
              },
              (errorMessage: string) => {
                if (!active) return;
                console.log('Html5QrcodePlugin: Scan error (front):', errorMessage);
                
                // Only show user-friendly errors for front camera
                if (errorMessage.includes('NotFoundException')) {
                  // Normal - no QR code visible
                  return;
                } else if (!errorMessage.includes('permission')) {
                  onError('Please ensure the QR code is clearly visible and well-lit');
                }
              }
            );
          }
        });
      } catch (err: unknown) {
        console.error('Html5QrcodePlugin: Setup error:', err);
        onError(err instanceof Error ? err.message : 'Failed to initialize scanner');
      }
    };

    setupScanner().catch(err => {
      console.error('Html5QrcodePlugin: Fatal setup error:', err);
    });

    return () => {
      console.log('Html5QrcodePlugin: Cleaning up...');
      active = false;
      if (scannerRef.current) {
        scannerRef.current.stop().catch((err: unknown) => {
          console.error('Html5QrcodePlugin: Failed to stop scanner:', err);
        });
        scannerRef.current = null;
      }
    };
  }, [onSuccess, onError]);

  return (
    <div
      id={qrcodeRegionId}
      className="w-full"
      style={{ 
        height: height, 
        maxHeight: '80vh',
        position: 'relative',
      }}
    >
      {/* Scanner will be injected here */}
    </div>
  );
};

export default Html5QrcodePlugin;