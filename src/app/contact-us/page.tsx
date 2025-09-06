"use client";
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { absOrFallback } from '../utils/urlUtils';
import emailjs from '@emailjs/browser';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };
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
      setIsSubmitting(true);
      try {
        // Initialize EmailJS (you'll need to get these from EmailJS dashboard)
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
        
        const result = await emailjs.send(
          "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
          "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
          {
            to_email: "contact@architecturewave.com",
            from_name: form.name,
            from_email: form.email,
            message: form.message,
          }
        );

        if (result.status === 200) {
          alert('Thank you! Your message has been sent successfully.');
          setForm({ name: '', email: '', message: '' });
        } else {
          alert('Failed to send message. Please try again.');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        
        // Handle specific EmailJS quota errors
        if (error && typeof error === 'object' && 'text' in error) {
          const errorText = error.text as string;
          if (errorText.includes('insufficient_quota') || errorText.includes('429')) {
            alert('Email service is temporarily unavailable due to quota limits. Please try again later or contact us directly at contact@architecturewave.com');
          } else {
            alert('Failed to send message. Please try again or contact us directly at contact@architecturewave.com');
          }
        } else {
          alert('Failed to send message. Please try again or contact us directly at contact@architecturewave.com');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Background Image */}
      <div
        className="hidden sm:block"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: '0',
          left: '0',
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: `url(${absOrFallback('/assets/Vector-10.png')})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top left',
          transform: 'rotate(0deg)'
        }}
        aria-hidden="true"
      />
      {/* Main Content */}
      <main className="w-[calc(100%-20px)] sm:w-[calc(100%-30px)] md:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 md:px-4 bg-white min-h-[calc(100vh-690px)]" style={{ marginBottom: 40, position: 'relative', zIndex: 1, borderRadius: '45px' }}>
        <Header />

        <div className="px-4 sm:px-8 md:px-12 py-6 sm:py-8 md:py-12" style={{ marginLeft: 45 }}>
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
            fontWeight: 500,
            lineHeight: '28px',
            letterSpacing: '5%',
            color: '#000',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: '40px',
            marginBottom: '30px'

          }}>
            Discover the stories, trends, and<br />
            experiences that shape <span style={{ fontWeight: 700 }}>
              how we live,<br />
              work, and connect, blending everyday.
            </span>
          </p>
          <form onSubmit={handleSubmit} className="max-w-lg sm:max-w-xl md:max-w-2xl flex flex-col gap-4 sm:gap-5 md:gap-6" style={{
            fontWeight: 600,
            fontFamily: 'var(--font-mazzard-soft)',
            color: '#000',
            marginTop: '100px'
          }}>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 sm:px-4"
              style={{
                borderRadius: 10,
                fontWeight: 600,
                border: errors.name ? '2px solid #e57373' : '1px solid #d1d5db',
                background: '#ededed',
                fontFamily: 'Mazzard Soft H',
                color: 'black',
                fontSize: '18px',
                lineHeight: '38px',
                letterSpacing: '5%',
                fontStyle: 'normal',
                height: '58px',
                outline: 'none',
                transition: 'border-color 0.2s ease-in-out'
              }}
              onFocus={(e) => {
                if (!errors.name) {
                  e.target.style.border = '1px solid black';
                }
              }}
              onBlur={(e) => {
                if (!errors.name) {
                  e.target.style.border = '1px solid #d1d5db';
                }
              }}
            />
            <style jsx>{`
              input::placeholder,
              textarea::placeholder {
                color: black !important;
                font-family: 'Mazzard Soft H' !important;
                font-weight: 600 !important;
                font-size: 18px !important;
                line-height: 38px !important;
                letter-spacing: 5% !important;
                font-style: normal !important;
              }
            `}</style>
            {errors.name && <span className="text-sm sm:text-base" style={{ color: '#e57373' }}>{errors.name}</span>}
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 sm:px-4"
              style={{
                borderRadius: 10,
                border: errors.email ? '2px solid #e57373' : '1px solid #d1d5db',
                fontWeight: 600,
                background: '#ededed',
                fontFamily: 'Mazzard Soft H',
                color: 'black',
                fontSize: '18px',
                lineHeight: '38px',
                letterSpacing: '5%',
                fontStyle: 'normal',
                height: '58px',
                outline: 'none',
                transition: 'border-color 0.2s ease-in-out'
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.target.style.border = '1px solid black';
                }
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  e.target.style.border = '1px solid #d1d5db';
                }
              }}
            />
            {errors.email && <span className="text-sm sm:text-base" style={{ color: '#e57373' }}>{errors.email}</span>}
            <textarea
              name="message"
              placeholder="What you wanna say?"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-3 sm:py-4"
              style={{
                borderRadius: 6,
                border: errors.message ? '2px solid #e57373' : '1px solid #d1d5db',
                fontWeight: 600,
                background: '#ededed',
                fontFamily: 'Mazzard Soft H',
                color: 'black',
                resize: 'vertical',
                fontSize: '18px',
                lineHeight: '38px',
                letterSpacing: '5%',
                fontStyle: 'normal',
                outline: 'none',
                transition: 'border-color 0.2s ease-in-out'
              }}
              onFocus={(e) => {
                if (!errors.message) {
                  e.target.style.border = '1px solid black';
                }
              }}
              onBlur={(e) => {
                if (!errors.message) {
                  e.target.style.border = '1px solid #d1d5db';
                }
              }}
            />
            {errors.message && <span className="text-sm sm:text-base" style={{ color: '#e57373' }}>{errors.message}</span>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg"
              style={{
                background: isSubmitting ? '#666' : 'black',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                fontWeight: 600,
                fontFamily: 'var(--font-mazzard-soft)',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                width: '120px',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
} 