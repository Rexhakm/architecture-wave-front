"use client";
import React, { useState } from "react";
import Header from "./components/Header";

const articles = [
  {
    image: "/assets/article-1.jpg",
    category: "Architecture",
    categoryColor: "#88B056",
    title: "WTF Happened to the Winners of Airbnb's $10M",
    description:
      "A new home on the Hudson River with incredible views. The house was a collaboration between our office and the homeowner who has a background in architecture and design. Given the nature of the site we pulled the house apart in order to create a variety of indoor and outdoor experiences.",
  },
  {
    image: "/assets/article-2.jpg",
    category: "Lifestyle",
    categoryColor: "#DA6969",
    title: "WTF Happened to the Winners of Airbnb's $10M",
    description:
      "A new home on the Hudson River with incredible views. The house was a collaboration between our office and the homeowner who has a background in architecture and design. Given the nature of the site we pulled the house apart in order to create a variety of indoor and outdoor experiences.",
  },
  {
    image: "/assets/article-3.jpg",
    category: "Travel",
    categoryColor: "#5162BC",
    title: "WTF Happened to the Winners of Airbnb's $10M",
    description:
      "A new home on the Hudson River with incredible views. The house was a collaboration between our office and the homeowner who has a background in architecture and design. Given the nature of the site we pulled the house apart in order to create a variety of indoor and outdoor experiences.",
  },
  {
    image: "/assets/article-4.jpg",
    category: "Travel",
    categoryColor: "#5162BC",
    title: "WTF Happened to the Winners of Airbnb's $10M",
    description:
      "A new home on the Hudson River with incredible views. The house was a collaboration between our office and the homeowner who has a background in architecture and design. Given the nature of the site we pulled the house apart in order to create a variety of indoor and outdoor experiences.",
  },
  // Add more articles as needed
  {
    image: "/assets/article-5.jpg",
    category: "Architecture",
    categoryColor: "#88B056",
    title: "WTF Happened to the Winners of Airbnb's $10M",
    description:
      "A new home on the Hudson River with incredible views. The house was a collaboration between our office and the homeowner who has a background in architecture and design. Given the nature of the site we pulled the house apart in order to create a variety of indoor and outdoor experiences.",
  },
  {
    image: "/assets/article-6.jpg",
    category: "Lifestyle",
    categoryColor: "#DA6969",
    title: "WTF Happened to the Winners of Airbnb's $10M",
    description:
      "A new home on the Hudson River with incredible views. The house was a collaboration between our office and the homeowner who has a background in architecture and design. Given the nature of the site we pulled the house apart in order to create a variety of indoor and outdoor experiences.",
  },
  {
    image: "/assets/article-7.jpg",
    category: "Travel",
    categoryColor: "#5162BC",
    title: "WTF Happened to the Winners of Airbnb's $10M",
    description:
      "A new home on the Hudson River with incredible views. The house was a collaboration between our office and the homeowner who has a background in architecture and design. Given the nature of the site we pulled the house apart in order to create a variety of indoor and outdoor experiences.",
  },
];

export default function Home() {
    const [visibleCount, setVisibleCount] = useState(4);
    return (
        <main className="w-[calc(100%-40px)] mx-auto px-4 bg-white rounded-3xl">
            <Header />
            <section className="mb-12">
                <div style={{ padding: '40px 40px 48px 30px' }}>
                    <h1 style={{
                        fontSize: '72px',
                        fontWeight: 400,
                        marginBottom: 0,
                        fontFamily: 'var(--font-mazzard-soft)',
                        color: '#111',
                        lineHeight: '100%',
                        letterSpacing: '0%'
                    }}>Your atlas to a life<br /><span style={{
                        fontWeight: 700,
                        fontSize: '72px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        fontFamily: 'var(--font-mazzard-soft)'
                    }}>with a good design.</span></h1>
                    <p style={{
                        margin: '24px 0 32px 0',
                        fontFamily: 'var(--font-mazzard-soft)',
                        fontWeight: 500,
                        fontSize: '18px',
                        lineHeight: '28px',
                        letterSpacing: '5%',
                        color: '#000',
                        maxWidth: '600px'
                    }}>
                        Discover the stories, trends, and experiences that shape <span style={{ fontWeight: 700 }}>
                            how we live, work, and connect, blending everyday.
                        </span>
                    </p>
                    <div className="flex flex-col md:flex-row gap-8 justify-start items-start mt-6" style={{ marginTop: '80px' }}>
                        <div className="flex flex-row items-center w-80 gap-4">
                            <img src="/assets/image-1.png" alt="Architecture" className="w-28 h-28 rounded-2xl object-cover" />
                            <div>
                                <span className="text-green-600 text-sm font-medium mb-1 block" style={{
                                    fontFamily: 'Inter',
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    lineHeight: '28.5px',
                                    letterSpacing: '-5%',
                                    color: '#88B056'
                                }}>Architecture</span>
                                <span className="font-medium text-base text-black text-left block" style={{
                                    fontSize: '20px',
                                    fontWeight: 500,
                                    marginBottom: 0,
                                    fontFamily: 'var(--font-mazzard-soft)',
                                    color: '#000000',
                                    lineHeight: '100%',
                                    letterSpacing: '0%'
                                }}>mishmash. Unique e-commerce design for</span>
                            </div>
                        </div>
                        <div className="flex flex-row items-center w-80 gap-4">
                            <img src="/assets/image-2.png" alt="Lifestyle" className="w-28 h-28 rounded-2xl object-cover" />
                            <div>
                                <span className="text-red-400 text-sm font-medium mb-1 block" style={{
                                    fontFamily: 'Inter',
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    lineHeight: '28.5px',
                                    letterSpacing: '-5%',
                                    color: '#DA6969'
                                }}>Lifestyle</span>
                                <span className="font-medium text-base text-black text-left block" style={{
                                    fontSize: '20px',
                                    fontWeight: 500,
                                    marginBottom: 0,
                                    fontFamily: 'var(--font-mazzard-soft)',
                                    color: '#000000',
                                    lineHeight: '100%',
                                    letterSpacing: '0%'
                                }}>mishmash. Unique e-commerce design for</span>
                            </div>
                        </div>
                        <div className="flex flex-row items-center w-80 gap-4">
                            <img src="/assets/image-3.png" alt="Travel" className="w-28 h-28 rounded-2xl object-cover" />
                            <div>
                                <span className="text-blue-700 text-sm font-medium mb-1 block" style={{
                                    fontFamily: 'Inter',
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    lineHeight: '28.5px',
                                    letterSpacing: '-5%',
                                    color: '#5162BC'
                                }}>Travel</span>
                                <span className="font-medium text-base text-black text-left block" style={{
                                    fontSize: '20px',
                                    fontWeight: 500,
                                    marginBottom: 0,
                                    fontFamily: 'var(--font-mazzard-soft)',
                                    color: '#000000',
                                    lineHeight: '100%',
                                    letterSpacing: '0%'
                                }}>mishmash. Unique e-commerce design for</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Topic/Series/Creator Grid Section */}
            <section className="mb-16" style={{ padding: '40px 40px 48px 30px' }}>
                <h2 className="text-3xl font-semibold mb-2" style={{
                                    fontSize: '20px',
                                    fontWeight: 500,
                                    marginBottom: 0,
                                    fontFamily: 'var(--font-mazzard-soft)',
                                    color: '#000000',
                                    lineHeight: '100%',
                                    letterSpacing: '0%'
                                }}>
                    Dive in by topic, series, or creator
                </h2>
                <p className="mb-8 text-gray-500" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 400, fontSize: '14px', maxWidth: '600px' }}>
                    A ribbon-esque stair connects three levels that hold a bath
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-0 hover:opacity-90 transition-opacity">
                        <div>
                            <img src="/assets/image-1.png" alt="Architecture" className="w-full h-56 object-cover rounded-2xl mb-4" />
                            <span className="text-green-600 text-sm font-medium mb-1 block" style={{
                                        fontFamily: 'Inter',
                                        fontWeight: 600,
                                        fontSize: '16px',
                                        lineHeight: '28.5px',
                                        letterSpacing: '-5%',
                                        color: '#88B056'
                                    }}>Architecture</span>
                            <h3 className="font-semibold text-lg mb-1" style={{
                                        fontFamily: 'var(--font-mazzard-soft)',
                                        fontWeight: 500,
                                        fontSize: '20px',
                                        lineHeight: '27px',
                                        letterSpacing: '0%',
                                        color: '#111'
                                    }}>WTF Happened to the Winners of Airbnb's $10M</h3>
                            <p className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                                One witch, Sirius, The Sufficient Hyperplane, has medium, warm-toned skin, a chiseled.
                            </p>
                        </div>
                    </div>
                    <div className="p-0 hover:opacity-90 transition-opacity">
                        <div>
                            <img src="/assets/image-2.png" alt="Lifestyle" className="w-full h-56 object-cover rounded-2xl mb-4" />
                            <span className="text-red-400 text-sm font-medium mb-1 block" style={{
                                        fontFamily: 'Inter',
                                        fontWeight: 600,
                                        fontSize: '16px',
                                        lineHeight: '28.5px',
                                        letterSpacing: '-5%',
                                        color: '#DA6969'
                                    }}>Lifestyle</span>
                            <h3 className="font-semibold text-lg mb-1" style={{
                                        fontFamily: 'var(--font-mazzard-soft)',
                                        fontWeight: 500,
                                        fontSize: '20px',
                                        lineHeight: '27px',
                                        letterSpacing: '0%',
                                        color: '#111'
                                    }}>WTF Happened to the Winners of Airbnb's $10M</h3>
                            <p className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                                One witch, Sirius, The Sufficient Hyperplane, has medium, warm-toned skin, a chiseled.
                            </p>
                        </div>
                    </div>
                    <div className="p-0 hover:opacity-90 transition-opacity">
                        <div>
                            <img src="/assets/image-3.png" alt="Travel" className="w-full h-56 object-cover rounded-2xl mb-4" />
                            <span className="text-blue-700 text-sm font-medium mb-1 block" style={{
                                        fontFamily: 'Inter',
                                        fontWeight: 600,
                                        fontSize: '16px',
                                        lineHeight: '28.5px',
                                        letterSpacing: '-5%',
                                        color: '#5162BC'
                                    }}>Travel</span>
                            <h3 className="font-semibold text-lg mb-1" style={{
                                        fontFamily: 'var(--font-mazzard-soft)',
                                        fontWeight: 500,
                                        fontSize: '20px',
                                        lineHeight: '27px',
                                        letterSpacing: '0%',
                                        color: '#111'
                                    }}>WTF Happened to the Winners of Airbnb's $10M</h3>
                            <p className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                                One witch, Sirius, The Sufficient Hyperplane, has medium, warm-toned skin, a chiseled.
                            </p>
                        </div>
                    </div>
                    <div className="p-0">
                        <img src="/assets/image-4.png" alt="Architecture" className="w-full h-56 object-cover rounded-2xl mb-4" />
                        <span className="text-green-600 text-sm font-medium mb-1 block" style={{
                                    fontFamily: 'Inter',
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    lineHeight: '28.5px',
                                    letterSpacing: '-5%',
                                    color: '#88B056'
                                }}>Architecture</span>
                        <h3 className="font-semibold text-lg mb-1" style={{
                                    fontFamily: 'var(--font-mazzard-soft)',
                                    fontWeight: 500,
                                    fontSize: '20px',
                                    lineHeight: '27px',
                                    letterSpacing: '0%',
                                    color: '#111'
                                }}>WTF Happened to the Winners of Airbnb's $10M</h3>
                        <p className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                            One witch, Sirius, The Sufficient Hyperplane, has medium, warm-toned skin, a chiseled.
                        </p>
                    </div>
                    <div className="p-0">
                        <img src="/assets/image-5.png" alt="Lifestyle" className="w-full h-56 object-cover rounded-2xl mb-4" />
                        <span className="text-red-400 text-sm font-medium mb-1 block" style={{
                                    fontFamily: 'Inter',
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    lineHeight: '28.5px',
                                    letterSpacing: '-5%',
                                    color: '#DA6969'
                                }}>Lifestyle</span>
                        <h3 className="font-semibold text-lg mb-1" style={{
                                    fontFamily: 'var(--font-mazzard-soft)',
                                    fontWeight: 500,
                                    fontSize: '20px',
                                    lineHeight: '27px',
                                    letterSpacing: '0%',
                                    color: '#111'
                                }}>WTF Happened to the Winners of Airbnb's $10M</h3>
                        <p className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                            One witch, Sirius, The Sufficient Hyperplane, has medium, warm-toned skin, a chiseled.
                        </p>
                    </div>
                    <div className="p-0">
                        <img src="/assets/image-6.png" alt="Travel" className="w-full h-56 object-cover rounded-2xl mb-4" />
                        <span className="text-blue-700 text-sm font-medium mb-1 block" style={{
                                    fontFamily: 'Inter',
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    lineHeight: '28.5px',
                                    letterSpacing: '-5%',
                                    color: '#5162BC'
                                }}>Travel</span>
                        <h3 className="font-semibold text-lg mb-1" style={{
                                    fontFamily: 'var(--font-mazzard-soft)',
                                    fontWeight: 500,
                                    fontSize: '20px',
                                    lineHeight: '27px',
                                    letterSpacing: '0%',
                                    color: '#111'
                                }}>WTF Happened to the Winners of Airbnb's $10M</h3>
                        <p className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                            One witch, Sirius, The Sufficient Hyperplane, has medium, warm-toned skin, a chiseled.
                        </p>
                    </div>
                </div>
            </section>
            {/* Vertical Card List Section */}
            <section className="mb-16" style={{ padding: '40px 40px 48px 30px' }}>
                <div className="flex flex-col gap-12">
                    {/* Card 1 */}
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <img src="/assets/image-1.png" alt="Architecture" className="w-[350px] h-[220px] object-cover rounded-2xl border-4 border-blue-400" />
                        <div>
                            <span className="block mb-1" style={{
                                fontFamily: 'Inter',
                                fontWeight: 600,
                                fontSize: '16px',
                                lineHeight: '28.5px',
                                letterSpacing: '-5%',
                                color: '#88B056'
                            }}>Architecture</span>
                            <h3 className="mb-1" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 700, fontSize: '24px', lineHeight: '32px', color: '#111' }}>WTF Happened to the Winners of Airbnb's $10M</h3>
                            <p style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 400, fontSize: '16px', lineHeight: '26px', color: '#6B7280' }}>
                                A new home on the Hudson River with incredible views. The house was a collaboration between our office and the homeowner who has a background in architecture and design. Given the nature of the site we pulled the house apart in order to create a variety of indoor and outdoor experiences.
                            </p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <img src="/assets/image-2.png" alt="Lifestyle" className="w-[350px] h-[220px] object-cover rounded-2xl" />
                        <div>
                            <span className="block mb-1" style={{
                                fontFamily: 'Inter',
                                fontWeight: 600,
                                fontSize: '16px',
                                lineHeight: '28.5px',
                                letterSpacing: '-5%',
                                color: '#DA6969'
                            }}>Lifestyle</span>
                            <h3 className="mb-1" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 700, fontSize: '24px', lineHeight: '32px', color: '#111' }}>WTF Happened to the Winners of Airbnb's $10M</h3>
                            <p style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 400, fontSize: '16px', lineHeight: '26px', color: '#6B7280' }}>
                                A new home on the Hudson River with incredible views. The house was a collaboration between our office and the homeowner who has a background in architecture and design. Given the nature of the site we pulled the house apart in order to create a variety of indoor and outdoor experiences.
                            </p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <img src="/assets/image-3.png" alt="Travel" className="w-[350px] h-[220px] object-cover rounded-2xl" />
                        <div>
                            <span className="block mb-1" style={{
                                fontFamily: 'Inter',
                                fontWeight: 600,
                                fontSize: '16px',
                                lineHeight: '28.5px',
                                letterSpacing: '-5%',
                                color: '#5162BC'
                            }}>Travel</span>
                            <h3 className="mb-1" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 700, fontSize: '24px', lineHeight: '32px', color: '#111' }}>WTF Happened to the Winners of Airbnb's $10M</h3>
                            <p style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 400, fontSize: '16px', lineHeight: '26px', color: '#6B7280' }}>
                                A new home on the Hudson River with incredible views. The house was a collaboration between our office and the homeowner who has a background in architecture and design. Given the nature of the site we pulled the house apart in order to create a variety of indoor and outdoor experiences.
                            </p>
                        </div>
                    </div>
                    {/* Card 4 */}
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <img src="/assets/image-4.png" alt="Travel" className="w-[350px] h-[220px] object-cover rounded-2xl" />
                        <div>
                            <span className="block mb-1" style={{
                                fontFamily: 'Inter',
                                fontWeight: 600,
                                fontSize: '16px',
                                lineHeight: '28.5px',
                                letterSpacing: '-5%',
                                color: '#5162BC'
                            }}>Travel</span>
                            <h3 className="mb-1" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 700, fontSize: '24px', lineHeight: '32px', color: '#111' }}>WTF Happened to the Winners of Airbnb's $10M</h3>
                            <p style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 400, fontSize: '16px', lineHeight: '26px', color: '#6B7280' }}>
                                A new home on the Hudson River with incredible views. The house was a collaboration between our office and the homeowner who has a background in architecture and design. Given the nature of the site we pulled the house apart in order to create a variety of indoor and outdoor experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Featured Projects Section */}
            <section className="mb-16" style={{ padding: '40px 40px 48px 30px' }}>
                <h2 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'var(--font-mazzard-soft)', color: '#111' }}>
                    Featured Projects
                </h2>
                <p className="mb-8 text-gray-500" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 400, fontSize: '16px', maxWidth: '700px' }}>
                    Featured Projects are submitted to Wave by our community of architects, designers, agents, and proud home. <a href="#" className="font-semibold underline">Post your project!</a>
                </p>
                {/* Large Featured Card */}
                <div className="mb-10">
                    <img src="/assets/image-7.png" alt="Featured" className="w-full h-[340px] object-cover rounded-[40px] mb-4" />
                    <span className="block mb-1" style={{
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '28.5px',
                        letterSpacing: '-5%',
                        color: '#DA6969'
                    }}>Lifestyle</span>
                    <h3 className="mb-1" style={{
                        fontFamily: 'var(--font-mazzard-soft)',
                        fontWeight: 500,
                        fontSize: '20px',
                        lineHeight: '27px',
                        letterSpacing: '0%',
                        color: '#111'
                    }}>WTF Happened to the Winners of Airbnb's $10M</h3>
                    <p style={{
                        fontFamily: 'var(--font-mazzard-soft)',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '22px',
                        letterSpacing: '0%',
                        color: '#6B7280'
                    }}>
                        A new home on the Hudson River with incredible views. The house was a collaboration between our office and the homeowner who has a background in architecture and design. Given the nature of the site we pulled the house apart in order to create a variety of indoor and outdoor experiences.
                    </p>
                </div>
                {/* Two Smaller Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white p-0">
                        <img src="/assets/image-8.png" alt="Architecture" className="w-full h-56 object-cover rounded-2xl mb-4" />
                        <span className="block mb-1" style={{
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            fontSize: '16px',
                            lineHeight: '28.5px',
                            letterSpacing: '-5%',
                            color: '#88B056'
                        }}>Architecture</span>
                        <h3 className="mb-1" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 700, fontSize: '24px', lineHeight: '32px', color: '#111' }}>WTF Happened to the Winners of Airbnb's $10M</h3>
                        <p style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 400, fontSize: '16px', lineHeight: '26px', color: '#6B7280' }}>
                            One witch, Sirius, The Sufficient Hyperplane, has medium, warm-toned skin, a chiseled.
                        </p>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white p-0">
                        <img src="/assets/image-9.png" alt="Lifestyle" className="w-full h-56 object-cover rounded-2xl mb-4" />
                        <span className="block mb-1" style={{
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            fontSize: '16px',
                            lineHeight: '28.5px',
                            letterSpacing: '-5%',
                            color: '#DA6969'
                        }}>Lifestyle</span>
                        <h3 className="mb-1" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 700, fontSize: '24px', lineHeight: '32px', color: '#111' }}>WTF Happened to the Winners of Airbnb's $10M</h3>
                        <p style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 400, fontSize: '16px', lineHeight: '26px', color: '#6B7280' }}>
                            One witch, Sirius, The Sufficient Hyperplane, has medium, warm-toned skin, a chiseled.
                        </p>
                    </div>
                </div>
            </section>
            {/* Subscribe Hero Section */}
            <section className="w-full flex items-center justify-center pb-16" style={{ height: '550px', marginBottom: '40px', paddingLeft: '40px', paddingRight: '40px' }}>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1200px',
                    height: '550px',
                    borderRadius: '36px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'url(/assets/subscribe-bg.jpg) center/cover no-repeat',
                }}>
                    {/* Overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(17, 17, 17, 0.65)',
                        zIndex: 1,
                    }} />
                    {/* Content */}
                    <div style={{
                        position: 'relative',
                        zIndex: 2,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <h2 style={{
                            color: 'white',
                            fontFamily: 'var(--font-mazzard-soft)',
                            fontWeight: 400,
                            fontSize: '48px',
                            lineHeight: '110%',
                            marginBottom: '16px',
                            textAlign: 'center',
                        }}>
                            Your atlas to a life<br />
                            <span style={{ fontWeight: 700 }}>with a good design.</span>
                        </h2>
                        <button style={{
                            marginTop: '24px',
                            background: 'white',
                            color: '#111',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px 32px',
                            fontFamily: 'var(--font-inter)',
                            fontWeight: 700,
                            fontSize: '18px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                        }}>Subscribe</button>
                    </div>
                </div>
            </section>
            <section className="w-full flex flex-col items-center pb-16" style={{ paddingLeft: '40px', paddingRight: '40px', marginBottom: '40px' }}>
                <div className="flex flex-col gap-12 w-full max-w-3xl">
                    {articles.slice(0, visibleCount).map((article, idx) => (
                        <div 
                            key={idx}
                            className="flex flex-col md:flex-row items-start gap-8 hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            <img src={article.image} alt={article.category} className="w-full md:w-[350px] h-[220px] object-cover rounded-2xl" />
                            <div>
                                <span className="block mb-1" style={{ color: article.categoryColor, fontFamily: 'Inter', fontWeight: 600, fontSize: '16px', lineHeight: '28.5px', letterSpacing: '-5%' }}>{article.category}</span>
                                <h3 className="mb-1" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 700, fontSize: '24px', lineHeight: '32px', color: '#111' }}>{article.title}</h3>
                                <p style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 400, fontSize: '16px', lineHeight: '26px', color: '#6B7280' }}>{article.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center mt-12">
                    {visibleCount < articles.length && (
                        <button
                            style={{
                                background: '#111',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '12px 32px',
                                fontFamily: 'var(--font-inter)',
                                fontWeight: 700,
                                fontSize: '16px',
                                cursor: 'pointer',
                                marginBottom: '16px',
                            }}
                            onClick={() => setVisibleCount((c) => Math.min(c + 3, articles.length))}
                        >
                            View More
                        </button>
                    )}
                    <span style={{ color: '#BDBDBD', fontFamily: 'var(--font-mazzard-soft)', fontWeight: 400, fontSize: '16px' }}>{articles.length - visibleCount > 0 ? `${articles.length - visibleCount} more articles` : 'No more articles'}</span>
                </div>
            </section>
        </main>
    );
} 