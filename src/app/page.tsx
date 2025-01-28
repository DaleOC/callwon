'use client'

import React, { useState, useEffect } from 'react';
import {
  Menu, X, ArrowRight, Mail, Linkedin, Shield, Cpu, MessageSquare, BarChart,
  ChartLine, Code, Network, Settings2, Terminal, Circle, CogIcon
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import TerminalBox from '../components/Terminal';


const Website = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [isVisible, setIsVisible] = useState({});
  const [gearSpeed, setGearSpeed] = useState(8);

  useEffect(() => {
    // Generate growth data for chart
    const data = Array.from({ length: 15 }, (_, i) => ({
      month: `Month ${i + 1}`,
      growth: Math.floor(10 + i * 20 + Math.random() * 20),
    }));

    setChartData(data);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              hero: true,
            }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(document.getElementById('hero'));

    return () => observer.disconnect();
  }, []);



  // Effect for gear animation
  useEffect(() => {
    if (isVisible.automation) {
      const speedInterval = setInterval(() => {
        setGearSpeed(prev => {
          if (prev > 1) return prev - 0.5;
          clearInterval(speedInterval);
          return prev;
        });
      }, 1000);

      return () => clearInterval(speedInterval);
    }
  }, [isVisible.automation]);

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
            <div className="flex items-center">
              <img
                src="/logow.svg"
                alt="Call Won Logo"
                className="w-15 h-8"
              />
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
          <div
            className={`transform transition-all duration-1000 ${
              isVisible.hero ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <h1 className="text-6xl font-bold text-[#4A4A4A] mb-6">Empowering Growth</h1>
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
                <YAxis domain={[0, 'dataMax + 10']} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#D6DE23"
                  strokeWidth={5}
                  dot={false}
                  strokeDasharray={`${
                    isVisible.hero
                      ? chartData.reduce((total, _, index) => total + (index === 0 ? 0 : 50), 0)
                      : 0
                  }, ${chartData.reduce((total, _, index) => total + (index === 0 ? 0 : 50), 0)}`}
                  strokeDashoffset={
                    isVisible.hero
                      ? 0
                      : -chartData.reduce((total, _, index) => total + (index === 0 ? 0 : 50), 0)
                  }
                  animationDuration={2000}
                  animationEasing="linear"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>

      {/* Automation Section */}
      <section id="automation" className="py-20 bg-[#2A2A2A]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible.automation ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h2 className="text-4xl font-bold text-white mb-6">
                Boost Productivity with Automation
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Streamline processes to unlock your team's full potential.
              </p>
              <p className="text-gray-300 mb-6">
                Call Won helps businesses scale by automating repetitive tasks, allowing your team to focus on what matters most. Our solutions are tailored to meet your specific needs.
              </p>
              <p className="text-gray-300">
                Whether building from scratch or augmenting an existing team, our expertise in automation and personalization ensures efficient and scalable growth.
              </p>
            </div>
            <div className="relative h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`w-64 h-64 transition-all duration-1000 animate-spin-slow ${isVisible.automation ? 'opacity-100 scale-100' : 'opacity-0 scale-80'
                    }`}
                >
                  <CogIcon className="w-full h-full text-[#D6DE23]" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="w-96 h-96 rounded-full border-4 border-[#D6DE23] animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section id="ai" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible.ai ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}>
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#D6DE23]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#7623DE]/10 rounded-full blur-3xl"></div>

                {/* Terminal window */}
                <TerminalBox />
              </div>
            </div>

            <div className={`transform transition-all duration-1000 ${isVisible.ai ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
              <h2 className="text-4xl font-bold text-[#4A4A4A] mb-6">
                Integrated AI
              </h2>
              <h3 className="text-2xl font-bold text-[#D6DE23] mb-4">
                AI-Powered Personalization at Scale
              </h3>
              <p className="text-gray-600 mb-6">
                Deliver impactful customer experiences with data-driven precision.
              </p>
              <p className="text-gray-600 mb-8">
                With our fine-tuned generative AI solutions, we enable businesses to achieve
                high levels of personalization for prospects and ideal customers. We implement
                AI with data safeguards, offering self-hosted models that keep your sensitive
                data secure.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section id="services" className="py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Driving Results Through Expertise
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h3 className="text-center text-gray-600 mb-10">Trusted by Industry Leaders</h3>
          <div className="flex justify-around items-center flex-wrap gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-32 h-16 bg-white rounded-lg shadow-md flex items-center justify-center">
                <span className="text-gray-400">Logo {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
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
      <section className="py-20 bg-[#2A2A2A]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Solution Partners</h2>
            <p className="text-xl text-gray-300">Working together to deliver excellence</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-8 bg-white/5 backdrop-blur-lg rounded-lg text-center border border-white/10 hover:border-white/20 transition-colors">
                <div className="w-24 h-24 mx-auto mb-4 bg-[#D6DE23]/10 rounded-full flex items-center justify-center">
                  <Shield className="w-12 h-12 text-[#D6DE23]" />
                </div>
                <h4 className="text-lg font-bold text-white">Partner {i + 1}</h4>
                <p className="text-gray-400">Integration Partner</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-[#2A2A2A] rounded-lg shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-12">
                <h3 className="text-3xl font-bold text-white mb-6">Let's Work Together</h3>
                <p className="text-gray-300 mb-8">
                  Connect with us to transform your sales and marketing efforts.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-[#D6DE23]" />
                    <span className="text-gray-300">contact@callwon.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Linkedin className="w-6 h-6 text-[#D6DE23]" />
                    <span className="text-gray-300">CallWon</span>
                  </div>
                </div>
              </div>

              <div className="p-12 bg-white">
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
      <footer className="bg-[#1A1A1A] py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src="/logow.svg"
                  alt="Call Won Logo"
                  className="w-15 h-8"
                />
              </div>
              <p className="text-gray-400 max-w-md mb-6">
                Stay updated with the latest strategies and insights for boosting your sales and marketing efforts.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-[#D6DE23] transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-[#D6DE23] transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#D6DE23]">Sales Automation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D6DE23]">Generative AI</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D6DE23]">Data Enrichment</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D6DE23]">Campaign Management</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to get the latest updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D6DE23]"
                />
                <button className="bg-[#D6DE23] text-white px-6 py-2 rounded-r-lg hover:bg-[#4A4A4A] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500">
            © 2024 Call Won. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Website;
