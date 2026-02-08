'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/Button';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface EmailFormProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function EmailForm({ variant = 'light', className = '' }: EmailFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!email.trim()) {
      setErrorMessage('Veuillez entrer votre adresse email');
      setStatus('error');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Veuillez entrer une adresse email valide');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Une erreur est survenue. Veuillez réessayer.'
      );
    }
  };

  const isDark = variant === 'dark';

  if (status === 'success') {
    return (
      <div className={`text-center ${className}`}>
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          isDark ? 'bg-green-500/20' : 'bg-green-100'
        }`}>
          <svg 
            className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Inscription réussie! 🎉
        </h3>
        <p className={isDark ? 'text-white/80' : 'text-gray-600'}>
          Vous recevrez des rappels avant chaque échéance importante.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className={`mt-4 text-sm underline ${isDark ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Inscrire une autre adresse
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') {
                setStatus('idle');
                setErrorMessage('');
              }
            }}
            placeholder="votre@email.com"
            className={`w-full px-4 py-3 rounded-lg outline-none transition-all ${
              isDark 
                ? 'text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-white' 
                : 'text-gray-900 border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
            } ${status === 'error' ? 'ring-2 ring-red-500' : ''}`}
            disabled={status === 'loading'}
            aria-label="Adresse email"
            aria-invalid={status === 'error'}
            aria-describedby={status === 'error' ? 'email-error' : undefined}
          />
        </div>
        <Button 
          variant="accent" 
          className="py-3 px-6 whitespace-nowrap"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                  fill="none"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Envoi...
            </span>
          ) : (
            "S'inscrire"
          )}
        </Button>
      </div>
      
      {status === 'error' && errorMessage && (
        <p 
          id="email-error" 
          className={`mt-2 text-sm ${isDark ? 'text-red-300' : 'text-red-600'}`}
          role="alert"
        >
          ⚠️ {errorMessage}
        </p>
      )}
      
      <p className={`mt-3 text-sm ${isDark ? 'text-white/70' : 'text-gray-500'}`}>
        Gratuit. Pas de spam. Désinscription en un clic.
      </p>
    </form>
  );
}
