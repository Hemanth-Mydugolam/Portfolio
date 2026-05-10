import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { education, certifications } from '../data/resumeData';

export default function Education() {
  return (
    <section id="education" className="py-24 relative">
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-emerald-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Academic Background
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-slate-300 text-sm font-semibold uppercase tracking-wider mb-6"
            >
              <GraduationCap size={16} className="text-violet-400" />
              Degrees
            </motion.h3>
            <div className="flex flex-col gap-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="card group relative overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b ${edu.color}`}
                  />
                  <div className="pl-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${edu.color} flex items-center justify-center text-xl flex-shrink-0`}
                      >
                        {edu.icon}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1">
                        <Calendar size={12} />
                        {edu.period}
                      </div>
                    </div>
                    <h3 className="text-white font-bold leading-snug mb-1">{edu.degree}</h3>
                    <p className="text-violet-300 text-sm font-medium mb-3">{edu.school}</p>
                    <ul className="flex flex-col gap-1.5">
                      {edu.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-slate-400 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-slate-300 text-sm font-semibold uppercase tracking-wider mb-6"
            >
              <Award size={16} className="text-amber-400" />
              Certifications
            </motion.h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="card group text-center hover:border-violet-500/30 transition-all"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg`}
                  >
                    {cert.icon}
                  </div>
                  <h4 className="text-white font-semibold text-sm leading-snug mb-1">{cert.name}</h4>
                  <p className="text-slate-400 text-xs">{cert.issuer}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
