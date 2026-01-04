
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, 
  Smartphone, 
  Palette, 
  Video, 
  Camera, 
  Scissors, 
  PenTool,
  ArrowUpRight,
  Sparkles,
  Code2,
  Youtube,
  Clapperboard,
  ShieldAlert,
  Bot
} from 'lucide-react';
import { Service } from '../types';

const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Video Editor',
    description: 'Professional post-production for social media, commercials, and cinematic projects.',
    icon: 'Scissors',
    features: ['Color Grading', 'Sound Design', 'Motion Graphics', 'Dynamic Cuts']
  },
  {
    id: '2',
    title: 'Videographer',
    description: 'Capturing high-quality visual stories with professional lighting and composition.',
    icon: 'Video',
    features: ['4K Production', 'Event Coverage', 'Documentary Style', 'Drone Shots']
  },
  {
    id: '3',
    title: 'Photographer',
    description: 'High-end photography for brands, portraits, and architectural showcases.',
    icon: 'Camera',
    features: ['Product Shoots', 'Portraiture', 'Retouching', 'Lighting Expert']
  },
  {
    id: '4',
    title: 'Graphic Designer',
    description: 'Creating visual identities that resonate and stand out in digital landscapes.',
    icon: 'PenTool',
    features: ['Logo Design', 'Brand Guides', 'Typography', 'Print Media']
  },
  {
    id: '5',
    title: 'Content Creator',
    description: 'Crafting compelling digital content across platforms to build and engage communities.',
    icon: 'Sparkles',
    features: ['Storytelling', 'Social Strategy', 'Brand Voice', 'Trend Analysis']
  },
  {
    id: '6',
    title: 'Programmer',
    description: 'Developing complex software solutions, automation tools, and robust backend systems.',
    icon: 'Code2',
    features: ['Architecture', 'Problem Solving', 'Algorithm Design', 'Optimization']
  },
  {
    id: '7',
    title: 'Animator',
    description: 'Creating high-quality 2D and 3D animations, motion graphics, and character-driven visual stories.',
    icon: 'Clapperboard',
    features: ['2D/3D Animation', 'Character Rigging', 'Motion Design', 'Visual Storytelling']
  },
  {
    id: '8',
    title: 'Hacking',
    description: 'Ethical hacking and cybersecurity assessments to fortify digital infrastructure.',
    icon: 'ShieldAlert',
    features: ['Penetration Testing', 'Security Audits', 'Vulnerability Scan', 'Network Defense']
  },
  {
    id: '9',
    title: 'Make Robot',
    description: 'Designing and building intelligent robotic systems and automation hardware.',
    icon: 'Bot',
    features: ['Arduino / ESP32', 'Sensor Integration', 'Mechanical Design', 'Automation']
  },
  {
    id: '10',
    title: 'YouTuber',
    description: 'Building and managing a successful video channel from scripting to audience growth.',
    icon: 'Youtube',
    features: ['Channel Growth', 'Script Writing', 'SEO Optimization', 'Thumbnail Design']
  },
  {
    id: '11',
    title: 'Web Development',
    description: 'Building high-performance, responsive web applications with modern tech.',
    icon: 'Layout',
    features: ['React / Next.js', 'Clean Code', 'Performance', 'SEO Ready']
  },
  {
    id: '12',
    title: 'UI/UX Design',
    description: 'Intuitive user experiences designed for maximum engagement and conversion.',
    icon: 'Palette',
    features: ['Wireframing', 'Prototyping', 'User Research', 'Design Systems']
  }
];

const IconMap: { [key: string]: any } = {
  Layout, Smartphone, Palette, Video, Camera, Scissors, PenTool, Sparkles, Code2, Youtube, Clapperboard, ShieldAlert, Bot
};

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const Icon = IconMap[service.icon] || Layout;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative flex flex-col min-h-[500px] p-8 md:p-10 bg-[#0d162d] border border-white/5 hover:border-blue-500/30 rounded-[3rem] transition-all duration-700 overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-colors" />
      
      {/* Icon Area */}
      <div className="relative mb-12">
        <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-blue-500/5">
          <Icon size={32} />
        </div>
        
        {/* Large Decorative Icon Background */}
        <Icon size={180} className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] group-hover:rotate-12 transition-all duration-1000 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col">
        <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:text-blue-400 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-gray-400 mb-10 text-base leading-relaxed font-light">
          {service.description}
        </p>
        
        <div className="mt-auto space-y-4">
          <p className="text-[10px] mono text-blue-500/60 uppercase tracking-[0.3em] font-bold">Capabilities</p>
          <div className="grid grid-cols-1 gap-3">
            {service.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-sm mono text-gray-500 group-hover:text-gray-300 transition-colors">
                <div className="w-1.5 h-[1px] bg-blue-500" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Arrow */}
      <div className="absolute bottom-10 right-10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <div className="w-10 h-10 border border-blue-500/50 rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors">
          <ArrowUpRight size={20} />
        </div>
      </div>
      
      {/* Vertical ID line */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-500 mono font-bold text-sm tracking-widest uppercase">03. Expertise</span>
            <div className="h-[1px] w-12 bg-blue-500/50" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none">
            My <br />
            <span className="text-blue-500">Services</span>
          </h2>
        </div>
        <p className="text-gray-500 max-w-sm text-sm mono leading-relaxed border-l border-white/10 pl-6 hidden md:block uppercase tracking-wider">
          Blending technical precision with artistic vision to deliver premium digital products and media.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {SERVICES.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
      </div>
    </motion.section>
  );
};

export default Services;
