'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Mail, Linkedin, Shield, Cpu, MessageSquare, BarChart, ChartLine, Code, Network } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Website = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    // Generate growth data for chart
    const data = Array.from({ length: 12 }, (_, i) => ({
      month: `Month ${i + 1}`,
      growth: Math.floor(100 + (i * 15) + Math.random() * 20)
    }));

    // Animate data loading
    let index = 0;
    const interval = setInterval(() => {
      if (index < data.length) {
        setChartData(prev => [...prev, data[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Components
  const ServiceCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      <Icon className="w-12 h-12 text-[#D6DE23] mb-4" />
      <h3 className="text-xl font-bold mb-3 text-[#4A4A4A]">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  const TeamMember = ({ name, role, image }) => (
    <div className="text-center">
      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
        <img src={`/api/placeholder/128/128`} alt={name} className="w-full h-full object-cover" />
      </div>
      <h4 className="text-lg font-bold text-[#4A4A4A]">{name}</h4>
      <p className="text-gray-600">{role}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#D6DE23] rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">C</span>
              </div>
              <span className="text-xl font-bold text-[#4A4A4A]">Call Won</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-[#4A4A4A] hover:text-[#D6DE23]">Features</a>
              <a href="#solutions" className="text-[#4A4A4A] hover:text-[#D6DE23]">Solutions</a>
              <a href="#team" className="text-[#4A4A4A] hover:text-[#D6DE23]">Team</a>
              <a href="#contact" className="text-[#4A4A4A] hover:text-[#D6DE23]">Contact</a>
              <button className="bg-[#D6DE23] text-white px-6 py-2 rounded-lg hover:bg-[#4A4A4A] transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible.hero ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h1 className="text-6xl font-bold text-[#4A4A4A] mb-6">
                Empowering Growth
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Transform your business with AI-powered automation and personalization.
              </p>
              <button className="bg-[#D6DE23] text-white px-8 py-4 rounded-lg hover:bg-[#4A4A4A] transition-colors">
                Get Started
              </button>
            </div>

            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="growth"
                    stroke="#D6DE23"
                    strokeWidth={3}
                    dot={{ fill: '#D6DE23' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Section */}
      <section id="automation" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible.automation ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h2 className="text-4xl font-bold text-[#4A4A4A] mb-6">
                Boost Productivity with Automation
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Streamline processes to unlock your team's full potential.
              </p>
              <p className="text-gray-600 mb-6">
                Call Won helps businesses scale by automating repetitive tasks, allowing your team to focus on what matters most. Our solutions are tailored to meet your specific needs.
              </p>
              <p className="text-gray-600">
                Whether building from scratch or augmenting an existing team, our expertise in automation and personalization ensures efficient and scalable growth.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 animate-spin-slow">
                  <Code className="w-full h-full text-[#D6DE23]" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 animate-spin-reverse">
                  <Network className="w-full h-full text-[#4A4A4A]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section id="ai" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96">
              {/* Add AI visualization animation here */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Neural network animation */}
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Add animated SVG paths for neural network */}
                  </svg>
                </div>
              </div>
            </div>

            <div className={`transform transition-all duration-1000 ${isVisible.ai ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <h2 className="text-4xl font-bold text-[#4A4A4A] mb-6">
                Integrated AI
              </h2>
              <h3 className="text-2xl font-bold text-[#4A4A4A] mb-4">
                AI-Powered Personalization at Scale
              </h3>
              <p className="text-gray-600 mb-6">
                Deliver impactful customer experiences with data-driven precision.
              </p>
              <p className="text-gray-600">
                With our fine-tuned generative AI solutions, we enable businesses to achieve high levels of personalization for prospects and ideal customers. We implement AI with data safeguards, offering self-hosted models that keep your sensitive data secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#4A4A4A] mb-4">
              Driving Results Through Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We help you streamline processes, engage customers, and scale efficiently
              with advanced tools and strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={Cpu}
              title="Sales Automation"
              description="Streamline repetitive tasks to maximize your team's productivity and focus on high-impact activities."
            />
            <ServiceCard
              icon={MessageSquare}
              title="Generative AI"
              description="Implement fine-tuned AI models for scalable, secure personalization tailored to your business needs."
            />
            <ServiceCard
              icon={ChartLine}
              title="Data Enrichment"
              description="Enhance your customer data with actionable insights to drive better targeting and decision-making."
            />
            <ServiceCard
              icon={Network}
              title="Campaign Management"
              description="Develop and optimize multi-channel campaigns for maximum reach and engagement."
            />
            <ServiceCard
              icon={Code}
              title="Content Development"
              description="Create impactful collateral that supports your sales and marketing efforts, driving conversions."
            />
            <ServiceCard
              icon={Shield}
              title="Secure AI Models"
              description="Deploy self-hosted AI solutions with data safeguards to protect sensitive information."
            />
          </div>
        </div>
      </section>

      {/* Client Logo Ribbon */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-center text-gray-600 mb-10">Trusted by Industry Leaders</h3>
          <div className="flex justify-around items-center flex-wrap gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-32 h-16 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-400">Logo {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#4A4A4A] mb-4">Our Team</h2>
            <p className="text-xl text-gray-600">Meet the experts behind our success</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <TeamMember name="John Doe" role="CEO" />
            <TeamMember name="Jane Smith" role="CTO" />
            <TeamMember name="Mike Johnson" role="Head of AI" />
            <TeamMember name="Sarah Williams" role="Head of Sales" />
          </div>
        </div>
      </section>

      {/* Solution Partners */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#4A4A4A] mb-4">Solution Partners</h2>
            <p className="text-xl text-gray-600">Working together to deliver excellence</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-lg text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full"></div>
                <h4 className="text-lg font-bold text-[#4A4A4A]">Partner {i + 1}</h4>
                <p className="text-gray-600">Integration Partner</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="bg-[#4A4A4A] p-12 text-white">
                <h3 className="text-3xl font-bold mb-6">Let's Work Together</h3>
                <p className="mb-8"/>
                  Connect with us to transform your sales and marketing efforts.
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Mail className="w-6 h-6" />
                      <span>contact@callwon.com</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Linkedin className="w-6 h-6" />
                      <span>CallWon</span>
                    </div>
                  </div>
              </div>

              <div className="p-12">
                <form className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D6DE23]"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D6DE23]"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D6DE23] resize-none"
                    ></textarea>
                  </div>
                  <button className="w-full bg-[#D6DE23] text-white px-6 py-3 rounded-lg hover:bg-[#4A4A4A] transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-[#D6DE23] rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">C</span>
                </div>
                <span className="text-xl font-bold text-[#4A4A4A]">Call Won</span>
              </div>
              <p className="text-gray-600 max-w-md mb-6">
                Stay updated with the latest strategies and insights for boosting your sales and marketing efforts.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#D6DE23] transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#D6DE23] transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-[#4A4A4A] mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#D6DE23]">Sales Automation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#D6DE23]">Generative AI</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#D6DE23]">Data Enrichment</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#D6DE23]">Campaign Management</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-[#4A4A4A] mb-4">Newsletter</h4>
              <p className="text-gray-600 mb-4">Subscribe to get the latest updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-[#D6DE23]"
                />
                <button className="bg-[#D6DE23] text-white px-6 py-2 rounded-r-lg hover:bg-[#4A4A4A] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
            © 2024 Call Won. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Website;