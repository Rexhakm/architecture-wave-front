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
        className="hidden sm:block"
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

        <div className="px-4 sm:px-8 md:px-12 py-6 sm:py-8 md:py-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 sm:mb-6" style={{ 
            fontFamily: 'var(--font-mazzard-soft)', 
            color: '#111',
            lineHeight: '100%',
            letterSpacing: '0%'
          }}>Contact<br /><span style={{ 
            fontWeight: 700,
            fontFamily: 'var(--font-mazzard-soft)'
          }}>Architecture Wave</span></h1>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg max-w-lg sm:max-w-xl md:max-w-2xl" style={{ 
            fontFamily: 'var(--font-mazzard-soft)',
            fontWeight: 700,
            lineHeight: '28px',
            letterSpacing: '5%',
            color: '#000',
          }}>
            Discover the stories, trends, and experiences that shape <span style={{
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 700,
              lineHeight: '28px',
              letterSpacing: '5%'
            }}> how we live, work, and connect, blending everyday.</span>
            <span style={{
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 700,
              lineHeight: '28px',
              letterSpacing: '5%'
            }}></span>
          </p>
          <form onSubmit={handleSubmit} className="max-w-lg sm:max-w-xl md:max-w-2xl flex flex-col gap-4 sm:gap-5 md:gap-6" style={{ 
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
              className="w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base md:text-lg"
              style={{ 
                borderRadius: 6, 
                fontWeight: 600,
                border: errors.name ? '2px solid #e57373' : 'none', 
                background: '#ededed', 
                fontFamily: 'var(--font-mazzard-soft)',
                color: '#000'
              }} 
            />
            {errors.name && <span className="text-sm sm:text-base" style={{ color: '#e57373' }}>{errors.name}</span>}
            <input 
              name="email"
              type="email" 
              placeholder="Email" 
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base md:text-lg"
              style={{ 
                borderRadius: 6, 
                border: errors.email ? '2px solid #e57373' : 'none', 
                fontWeight: 600,
                background: '#ededed', 
                fontFamily: 'var(--font-mazzard-soft)',
                color: '#000'
              }} 
            />
            {errors.email && <span className="text-sm sm:text-base" style={{ color: '#e57373' }}>{errors.email}</span>}
            <textarea 
              name="message"
              placeholder="What you wanna say?" 
              rows={5} 
              value={form.message}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base md:text-lg"
              style={{ 
                borderRadius: 6, 
                border: errors.message ? '2px solid #e57373' : 'none', 
                fontWeight: 600,
                background: '#ededed', 
                fontFamily: 'var(--font-mazzard-soft)',
                color: '#000',
                resize: 'vertical' 
              }} 
            />
            {errors.message && <span className="text-sm sm:text-base" style={{ color: '#e57373' }}>{errors.message}</span>}
            <button 
              type="submit" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg"
              style={{ 
                background: 'black', 
                color: 'white', 
                border: 'none', 
                borderRadius: 12, 
                fontWeight: 600, 
                fontFamily: 'var(--font-mazzard-soft)',
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