import { motion } from 'framer-motion';
import { ExternalLink, Quote, BookOpen, TrendingUp } from 'lucide-react';
import { publications } from '../data/resumeData';

const typeColors = {
  'Journal Article': 'from-violet-500 to-purple-600',
  'Preprint': 'from-blue-500 to-cyan-600',
};

export default function Publications() {
  return (
    <section id="publications" className="py-24 relative">
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

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
            Research Output
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Publications & <span className="gradient-text">Research</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Peer-reviewed contributions to pain neuroscience and bioinformatics research.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          {[
            { label: 'Publications', value: '6', icon: BookOpen, color: 'text-violet-400' },
            { label: 'Total Citations', value: '7', icon: Quote, color: 'text-cyan-400' },
            { label: 'h-index', value: '1', icon: TrendingUp, color: 'text-emerald-400' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card text-center">
              <Icon size={22} className={`${color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-slate-400 text-sm">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Technical Contributions card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 to-cyan-600/5 p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-base flex-shrink-0">
              🔬
            </div>
            <h3 className="text-white font-bold">Technical Research Contributions</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            Behind these publications, I built the computational pipelines that enabled the research — including
            automated <span className="text-violet-300 font-medium">calcium imaging</span> and{' '}
            <span className="text-violet-300 font-medium">MEA analysis pipelines</span>, intelligent automation
            workflows for high-throughput data processing, and custom segmentation algorithms for{' '}
            <span className="text-violet-300 font-medium">human DRG cells</span>,{' '}
            <span className="text-violet-300 font-medium">spinal cord cells</span>, and{' '}
            <span className="text-violet-300 font-medium">axon tracing</span>.
          </p>
        </motion.div>

        {/* Publications list */}
        <div className="grid md:grid-cols-2 gap-4">
          {publications.map((pub, i) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              className="card group hover:border-violet-500/30 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2 flex-shrink-0">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${typeColors[pub.type] || 'from-slate-600 to-slate-700'} text-white whitespace-nowrap`}
                  >
                    {pub.type}
                  </span>
                  {pub.citations > 0 && (
                    <div className="flex items-center gap-1 text-amber-400">
                      <Quote size={13} />
                      <span className="text-sm font-bold">{pub.citations}</span>
                    </div>
                  )}
                  <span className="text-slate-500 text-xs font-medium">{pub.year}</span>
                </div>

                <div className="flex-1">
                  <h3 className="text-white font-semibold leading-snug mb-1.5 group-hover:text-violet-300 transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-violet-300 text-sm font-medium mb-3">
                    {pub.journal}
                    {pub.volume && (
                      <span className="text-slate-400 font-normal"> · {pub.volume}</span>
                    )}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <a
            href="https://scholar.google.com/citations?user=DSp-f2QAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 text-sm"
          >
            <ExternalLink size={15} /> View on Google Scholar
          </a>
        </motion.div>
      </div>
    </section>
  );
}
