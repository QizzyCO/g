
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Website',
    description: 'Modern online store with product filtering, cart, and payment system.',
    image: 'https://picsum.photos/seed/shop/800/600',
    tags: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: '2',
    title: 'Portfolio Website',
    description: 'Personal portfolio to showcase my design and coding projects.',
    image: 'https://picsum.photos/seed/portfolio/800/600',
    tags: ['React', 'Tailwind', 'Framer'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: '3',
    title: 'Weather App',
    description: 'Responsive app showing real-time weather using API integration.',
    image: 'https://picsum.photos/seed/weather/800/600',
    tags: ['Next.js', 'API', 'Charts'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: '4',
    title: 'Blog Platform',
    description: 'Clean and simple blogging platform with markdown support.',
    image: 'https://picsum.photos/seed/blog/800/600',
    tags: ['Node.js', 'MongoDB', 'React'],
    githubUrl: '#',
    liveUrl: '#'
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-[#0d162d] border border-white/10 hover:border-blue-500/40 rounded-3xl overflow-hidden transition-all duration-500"
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
        />
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] mono uppercase tracking-wider rounded-md border border-blue-500/20">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-2">{project.description}</p>
        
        <div className="flex gap-3">
          <a href={project.githubUrl} className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all">
            <Github size={16} /> GitHub
          </a>
          <a href={project.liveUrl} className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-500/10">
            <ExternalLink size={16} /> Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-500/50">Featured Work</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">A showcase of my recent projects demonstrating expertise in full-stack development, modern frameworks, and creative problem-solving.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </motion.section>
  );
};

export default Projects;