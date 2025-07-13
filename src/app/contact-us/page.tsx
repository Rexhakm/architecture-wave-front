"use client";
import React, { useState } from 'react';
import Header from '../components/Header';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { name: '', email: '', message: '' };
    if (!form.name.trim()) {
      newErrors.name = 'This field is required.';
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = 'This field is required.';
      valid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email.';
      valid = false;
    }
    if (!form.message.trim()) {
      newErrors.message = 'This field is required.';
      valid = false;
    }
    setErrors(newErrors);
    if (valid) {
      // Handle successful submission (e.g., send data)
      alert('Form submitted!');
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          width: '1170.05px',
          height: '1016.89px',
          top: '0.06px',
          left: '-0.44px',
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: 'url(/assets/Vector-10.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top left',
          transform: 'rotate(0deg)'
        }}
        aria-hidden="true"
      />
      {/* Main Content */}
      <main className="w-[calc(100%-40px)] mx-auto px-4 bg-white rounded-3xl min-h-[calc(100vh-690px)]" style={{ marginBottom: 40, position: 'relative', zIndex: 1 }}>
        <Header />

        <div style={{ padding: '48px 48px 48px 30px' }}>
          <h1 style={{ 
            fontSize: '72px', 
            fontWeight: 400, 
            marginBottom: 0, 
            fontFamily: 'var(--font-mazzard-soft)', 
            color: '#111',
            lineHeight: '100%',
            letterSpacing: '0%'
          }}>Contact<br /><span style={{ 
            fontWeight: 700,
            fontSize: '72px',
            lineHeight: '100%',
            letterSpacing: '0%',
            fontFamily: 'var(--font-mazzard-soft)'
          }}>Architecture Wave</span></h1>
          <p style={{ 
            margin: '24px 0 32px 0', 
            fontFamily: 'var(--font-mazzard-soft)',
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: '28px',
            letterSpacing: '5%',
            color: '#000',
            maxWidth: '400px'
          }}>
            Discover the stories, trends, and experiences that shape <span style={{
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '28px',
              letterSpacing: '5%'
            }}> how we live, work, and connect, blending everyday.</span>
            <span style={{
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '28px',
              letterSpacing: '5%'
            }}></span>
          </p>
          <form onSubmit={handleSubmit} style={{ 
            maxWidth: 500, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 20,
            fontWeight: 600,
            fontFamily: 'var(--font-mazzard-soft)',
            color: '#000'
          }}>
            <input 
              name="name"
              type="text" 
              placeholder="Name" 
              value={form.name}
              onChange={handleChange}
              style={{ 
                padding: '12px', 
                borderRadius: 6, 
                fontWeight: 600,
                border: errors.name ? '2px solid #e57373' : 'none', 
                background: '#ededed', 
                fontSize: 18, 
                fontFamily: 'var(--font-mazzard-soft)',
                color: '#000'
              }} 
            />
            {errors.name && <span style={{ color: '#e57373', fontSize: 16 }}>{errors.name}</span>}
            <input 
              name="email"
              type="email" 
              placeholder="Email" 
              value={form.email}
              onChange={handleChange}
              style={{ 
                padding: '12px', 
                borderRadius: 6, 
                border: errors.email ? '2px solid #e57373' : 'none', 
                fontWeight: 600,
                background: '#ededed', 
                fontSize: 16, 
                fontFamily: 'var(--font-mazzard-soft)',
                color: '#000'
              }} 
            />
            {errors.email && <span style={{ color: '#e57373', fontSize: 16 }}>{errors.email}</span>}
            <textarea 
              name="message"
              placeholder="What you wanna say?" 
              rows={5} 
              value={form.message}
              onChange={handleChange}
              style={{ 
                padding: '12px', 
                borderRadius: 6, 
                border: errors.message ? '2px solid #e57373' : 'none', 
                fontWeight: 600,
                background: '#ededed', 
                fontSize: 16, 
                fontFamily: 'var(--font-mazzard-soft)',
                color: '#000',
                resize: 'vertical' 
              }} 
            />
            {errors.message && <span style={{ color: '#e57373', fontSize: 16 }}>{errors.message}</span>}
            <button 
              type="submit" 
              style={{ 
                width: 120, 
                background: 'black', 
                color: 'white', 
                border: 'none', 
                borderRadius: 12, 
                padding: '16px 0', 
                fontWeight: 600, 
                fontFamily: 'var(--font-mazzard-soft)',
                fontSize: 18, 
                cursor: 'pointer' 
              }}
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
} 