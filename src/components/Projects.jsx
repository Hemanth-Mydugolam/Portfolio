import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projects } from '../data/resumeData';

const types = ['All', 'GenAI', 'ML', 'Research'];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.type === filter);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            From enterprise ML systems to cutting-edge GenAI applications and bioinformatics tools.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-2 mb-10"
        >
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === type
                  ? 'bg-violet-600/20 border border-violet-500/40 text-violet-300'
                  : 'glass glass-hover text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              layout
              className="card cursor-pointer group relative overflow-hidden"
              onClick={() => setSelected(project)}
            >
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.color} opacity-60 group-hover:opacity-100 transition-opacity`}
              />

              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${project.color} text-white`}
                >
                  {project.type}
                </span>
                <span className="text-2xl">{project.icon}</span>
              </div>

              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-violet-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400 text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-slate-500 text-xs px-1">+{project.tags.length - 3}</span>
                )}
              </div>

              <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                <span className="text-violet-400 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Details <ChevronRight size={13} />
                </span>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 text-slate-500 hover:text-white transition-colors"
                  >
                    <GithubIcon size={15} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/Hemanth-Mydugolam"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 text-sm"
          >
            <GithubIcon size={16} /> View All on GitHub
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className="bg-dark-700 border border-white/10 rounded-3xl p-8 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white glass rounded-xl transition-colors"
              >
                <X size={18} />
              </button>

              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selected.color} flex items-center justify-center text-2xl mb-4`}
              >
                {selected.icon}
              </div>

              <h3 className="text-white text-2xl font-bold mb-2">{selected.title}</h3>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${selected.color} text-white inline-block mb-4`}
              >
                {selected.type}
              </span>

              <p className="text-slate-300 leading-relaxed mb-5">{selected.description}</p>

              <div className="mb-5">
                <h4 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-3">Highlights</h4>
                <ul className="flex flex-col gap-2">
                  {selected.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {selected.link && (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 text-sm w-full justify-center"
                >
                  <GithubIcon size={16} /> View on GitHub
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
