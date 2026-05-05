'use client';

import { useState, FormEvent } from 'react';
import styles from '../app/page.module.css';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    if (formData.get('_honeypot')) return;

    const body = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Wystąpił błąd.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Błąd połączenia. Spróbuj ponownie.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <span style={{ fontSize: '3rem' }}>✅</span>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem', color: 'rgba(255,255,255,0.8)' }}>
          Wiadomość wysłana! Odpowiem najszybciej jak to możliwe.
        </p>
        <button
          className="btn btn-outline"
          style={{ marginTop: '1.5rem' }}
          onClick={() => setStatus('idle')}
        >
          Wyślij kolejną
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <input type="text" name="name" placeholder="Imię i nazwisko" required />
      </div>
      <div className={styles.formGroup}>
        <input type="email" name="email" placeholder="Twój e-mail" required />
      </div>
      <div className={styles.formGroup}>
        <textarea name="message" placeholder="W czym mogę pomóc?" rows={5} required></textarea>
      </div>
      {/* Honeypot - ukryte pole antyspamowe */}
      <input type="text" name="_honeypot" style={{ display: 'none' }} />

      {status === 'error' && (
        <p style={{ color: '#D30000', fontSize: '0.9rem' }}>{errorMsg}</p>
      )}

      <button type="submit" className="btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Wysyłanie...' : 'Wyślij wiadomość'}
      </button>
    </form>
  );
}
