import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white rounded-3xl p-6 sm:p-10 flex flex-col gap-8 sm:gap-10 md:gap-0 justify-between relative overflow-hidden font-mazzard-soft" style={{ marginLeft: 20, marginRight: 20, marginBottom: 20, minHeight: 650, paddingBottom: 40 }}>
      {/* Background Vectors */}
      <img src="/assets/Vector-5.png" alt="background vector 5" style={{ position: 'absolute', left: 0, bottom: 0, width: '60%', zIndex: 0, pointerEvents: 'none', opacity: 0.7 }} />
      <img src="/assets/Vector-6.png" alt="background vector 6" style={{ position: 'absolute', right: 0, top: 0, width: '60%', zIndex: 0, pointerEvents: 'none', opacity: 0.7 }} />
      
      <div className="flex-1 min-w-[250px]">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-start gap-2 relative px-5 pt-5 sm:px-10 sm:pt-10">
            <img src="/assets/Vector.png" alt="a" className="h-16 sm:h-20 md:h-28 w-auto" />
            <img src="/assets/Vector-2.png" alt="w" className="h-16 sm:h-20 md:h-28 w-auto" />
            <div className="flex items-center ml-2">
              <img src="/assets/Vector-3.png" alt="T" className="h-3 sm:h-4 w-auto" />
              <img src="/assets/Vector-4.png" alt="M" className="h-3 sm:h-4 w-auto" />
            </div>
          </div>
        </div>
        <p
          className="mb-6 text-sm text-gray-200 max-w-xs sm:max-w-md px-5 pt-4 sm:px-10 sm:pt-6"
          style={{
            fontFamily: 'var(--font-mazzard-soft)',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.05em',
          }}
        >
          Discover the stories, trends, and experiences that shape
          <span
            style={{
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '0.05em',
            }}
          >
            how we live, work, and connect, blending everyday lifestyle 
          </span>
          <span> </span>
          with rich cultural insights.
        </p>
        <div className="mb-4 mt-16 sm:mt-24 px-5 sm:px-10">
          <span
            style={{
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '0.05em',
            }}
          >
            Get our newsletter.
          </span>
        </div>
        <form
          className="flex items-center bg-white border border-black rounded-xl pl-4 pr-2 mx-5 sm:mx-10"
          style={{ 
            width: '100%',
            maxWidth: '363px',
            height: '50px',
          }}
        >
          <input
            type="email"
            placeholder="Email Address"
            className="flex-1 bg-transparent outline-none text-black h-full text-sm sm:text-base"
            style={{
              border: 'none',
              boxShadow: 'none',
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '24px',
              letterSpacing: '0.05em',
            }}
          />
          <button
            type="submit"
            className="bg-black text-white font-bold ml-2 h-full text-xs sm:text-sm"
            style={{
              width: '80px',
              height: '45px',
              borderRadius: '12px',
              fontFamily: 'var(--font-inter)',
              fontWeight: 700,
              fontSize: '10px',
              lineHeight: '120%',
              letterSpacing: '-0.2292px',
              fontVariantNumeric: 'lining-nums tabular-nums',
            }}
          >
            Subscribe
          </button>
        </form>
      </div>
      
      <div className="flex-1 flex flex-col sm:flex-row gap-6 sm:gap-10 md:gap-20 justify-end px-5 pt-5 sm:px-10 sm:pt-10" >
        <div className="pr-5 sm:pr-10">
          <h4
            className="font-semibold mb-2 text-lg sm:text-xl"
            style={{
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 500,
              lineHeight: '140%',
              letterSpacing: '0.04em',
              fontVariantNumeric: 'lining-nums tabular-nums',
              color: 'rgba(230, 230, 230, 0.6)',
            }}
          >
            Exolore
          </h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li className="pt-5 sm:pt-7" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '13px', lineHeight: '140%', letterSpacing: '0%' }}><a href="#" className="hover:underline">About Us</a></li>
            <li className="pt-4 sm:pt-5" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '13px', lineHeight: '140%', letterSpacing: '0%' }}><a href="#" className="hover:underline">Our Mission</a></li>
            <li className="pt-4 sm:pt-5" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '13px', lineHeight: '140%', letterSpacing: '0%' }}><a href="#" className="hover:underline">Media Kit</a></li>
          </ul>
        </div>
        <div>
          <h4
            className="font-semibold mb-2 text-lg sm:text-xl"
            style={{
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 500,
              lineHeight: '140%',
              letterSpacing: '0.04em',
              fontVariantNumeric: 'lining-nums tabular-nums',
              color: 'rgba(230, 230, 230, 0.6)',
            }}
          >
            Say hello!
          </h4>
          <ul className="space-y-1 text-sm text-gray-300" >
            <li className="pt-5 sm:pt-7" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '13px', lineHeight: '140%', letterSpacing: '0%' }}><a href="#" className="hover:underline">Youtube</a></li>
            <li className="pt-4 sm:pt-5" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '13px', lineHeight: '140%', letterSpacing: '0%' }}><a href="#" className="hover:underline">Instagram</a></li>
            <li className="pt-4 sm:pt-5" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 500, fontSize: '13px', lineHeight: '140%', letterSpacing: '0%' }}><a href="#" className="hover:underline">Twitter (X)</a></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 absolute right-4 sm:right-10 bottom-4 sm:bottom-10">
            <div className="flex flex-col ">
              <span className="text-xs sm:text-sm" style={{ color: 'rgba(230,230,230,0.6)', letterSpacing: '4%', fontWeight: 500, fontFamily: 'var(--font-mazzard-soft)', lineHeight: '140%', textTransform: 'uppercase', fontVariantNumeric: 'lining-nums tabular-nums' }}>CONTACT US</span>
              <div className="flex items-center mt-2 sm:mt-2">
                <span className="text-sm sm:text-base" style={{ fontWeight: 500, fontFamily: 'var(--font-mazzard-soft)', lineHeight: '100%', letterSpacing: '0%' }}>Got an idea?</span>
                <span className="flex items-center justify-center ml-2 sm:ml-2" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'white' }}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L13 7M13 7H7M13 7V13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex flex-col ml-0 sm:ml-5">
              <span className="text-xs sm:text-sm" style={{ color: 'rgba(230,230,230,0.6)', letterSpacing: '4%', fontWeight: 500, fontFamily: 'var(--font-mazzard-soft)', lineHeight: '140%', textTransform: 'uppercase', fontVariantNumeric: 'lining-nums tabular-nums' }}>ADVERTISE</span>
              <div className="flex items-center mt-2 sm:mt-2">
                <span className="text-sm sm:text-base" style={{ fontWeight: 500, fontFamily: 'var(--font-mazzard-soft)', lineHeight: '100%', letterSpacing: '0%' }}>Got an idea?</span>
                <span className="flex items-center justify-center ml-2 sm:ml-2" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'white' }}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L13 7M13 7H7M13 7V13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex flex-col ml-0 sm:ml-5">
              <span className="text-xs sm:text-sm" style={{ color: 'rgba(230,230,230,0.6)', letterSpacing: '4%', fontWeight: 500, fontFamily: 'var(--font-mazzard-soft)', lineHeight: '140%', textTransform: 'uppercase', fontVariantNumeric: 'lining-nums tabular-nums' }}>EDITORIAL SUBMISSION</span>
              <div className="flex items-center mt-2 sm:mt-2">
                <span className="text-sm sm:text-base" style={{ fontWeight: 500, fontFamily: 'var(--font-mazzard-soft)', lineHeight: '100%', letterSpacing: '0%' }}>Got an idea?</span>
                <span className="flex items-center justify-center ml-2 sm:ml-2" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'white' }}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L13 7M13 7H7M13 7V13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
  
    </footer>
  );
} 