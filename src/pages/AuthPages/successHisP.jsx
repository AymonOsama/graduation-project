import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Award, Users, Zap, Target } from 'lucide-react';

const SuccessHistory = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const [expandedSection, setExpandedSection] = useState(null);

  // Team Members
  const team = [
    { name: 'Ahmed Al-Rashid', role: 'Founder & CEO', emoji: '👨‍💼', bio: 'Visionary leader with 15+ years in tech' },
    { name: 'Fatima Al-Dosari', role: 'CTO', emoji: '👩‍💻', bio: 'Tech innovator and product strategist' },
    { name: 'Mohammed Al-Otaibi', role: 'CFO', emoji: '📊', bio: 'Finance expert and business strategist' },
    { name: 'Layla Al-Habib', role: 'Head of Design', emoji: '🎨', bio: 'UX/UI specialist and creative director' },
  ];

  // Challenges Data
  const challenges = [
    {
      year: '2020',
      title: 'Market Entry Challenge',
      desc: 'Entering a highly competitive market with established players was our first major hurdle.',
      solution: 'We focused on building unique features that solve real customer problems.',
      icon: '🚀'
    },
    {
      year: '2021',
      title: 'Technology Scaling',
      desc: 'Rapid growth required completely rebuilding our infrastructure to handle millions of comparisons.',
      solution: 'Invested heavily in cloud architecture and AI-driven comparison algorithms.',
      icon: '⚙️'
    },
    {
      year: '2022',
      title: 'User Trust & Credibility',
      desc: 'Convincing users that our comparisons were unbiased and reliable was challenging.',
      solution: 'Implemented transparent methodology and third-party audits of our data.',
      icon: '🔐'
    },
    {
      year: '2023',
      title: 'Regional Expansion',
      desc: 'Expanding across MENA region with different languages and market dynamics.',
      solution: 'Built local teams and adapted platform for regional preferences.',
      icon: '🌍'
    },
  ];

  // Milestones
  const milestones = [
    { year: '2020', event: 'Company Founded', users: '1K' },
    { year: '2021', event: '1 Million Users', users: '1M' },
    { year: '2022', event: 'Series A Funding', users: '5M' },
    { year: '2023', event: 'Regional Leader', users: '15M' },
    { year: '2024', event: 'Global Expansion', users: '50M+' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* HERO SECTION */}
      <motion.section
        style={{ opacity }}
        className="pt-32 pb-20 px-6 md:px-12 text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <motion.div 
            className="h-[2px] w-12 bg-blue-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
          <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-sm">
            Our Journey
          </span>
          <motion.div 
            className="h-[2px] w-12 bg-blue-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black mb-6 text-slate-900"
        >
          How <span className="text-blue-600">Comparo</span> Changed <span className="text-blue-600">Everything</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto font-medium mb-12"
        >
          A story of innovation, challenges, and building a platform that helps millions make smarter decisions.
        </motion.p>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} className="mx-auto text-blue-600" />
        </motion.div>
      </motion.section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-24 py-20">

        {/* FOUNDING STORY SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
                  The Beginning <span className="text-blue-600">2020</span>
                </h2>
              </motion.div>
              <p className="text-slate-600 text-lg leading-relaxed">
                Comparo was born from a simple frustration. Our founder Ahmed Al-Rashid spent hours comparing product specifications, reading conflicting reviews, and second-guessing his purchase decisions. He realized millions faced the same problem.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                With a small team of 3 developers and a vision to simplify decision-making, we launched Comparo from a small office in Riyadh. Our first comparison tool compared just 50 products, but the feedback was overwhelming.
              </p>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block px-6 py-3 bg-blue-100 border-2 border-blue-600 rounded-lg text-blue-600 font-black text-lg"
              >
                🎯 First Goal: 10,000 Users
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-400 to-cyan-500 h-80 flex items-center justify-center"
            >
              <div className="text-9xl">🏢</div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* MILESTONES TIMELINE */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-slate-900 text-center"
          >
            Our <span className="text-blue-600">Growth Timeline</span>
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            {milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-blue-600 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-6 md:gap-12">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center flex-shrink-0 font-black text-xl shadow-lg"
                  >
                    {milestone.year}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                      {milestone.event}
                    </h3>
                    <p className="text-blue-600 font-bold text-lg">
                      📈 {milestone.users} Active Users
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CHALLENGES SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-slate-900 text-center"
          >
            The <span className="text-blue-600">Challenges We Faced</span>
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            {challenges.map((challenge, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 border-2 border-slate-200 hover:border-blue-600 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-6xl">{challenge.icon}</div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-black text-sm"
                  >
                    {challenge.year}
                  </motion.div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-slate-600 mb-4 font-medium">
                  {challenge.desc}
                </p>
                <motion.div
                  initial={{ maxHeight: 0, opacity: 0 }}
                  whileInView={{ maxHeight: 100, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="pt-4 border-t-2 border-blue-200"
                >
                  <p className="text-blue-600 font-bold">
                    ✅ Solution: {challenge.solution}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* TEAM SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-slate-900 text-center"
          >
            Meet the <span className="text-blue-600">Leadership Team</span>
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -15, scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-200 hover:border-blue-600 transition-all text-center group"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  className="text-7xl mb-4 group-hover:scale-125 transition-transform"
                >
                  {member.emoji}
                </motion.div>
                <h3 className="text-xl font-black text-slate-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-bold mb-3">
                  {member.role}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* KEY ACHIEVEMENTS */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48" />
          </div>

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-black mb-12 text-center"
            >
              Key Achievements
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {[
                { icon: '🌟', title: '4.9/5 Star Rating', desc: 'from 1M+ reviews' },
                { icon: '🚀', title: '50M+ Users', desc: 'across MENA region' },
                { icon: '💰', title: '$50M+ Revenue', desc: 'in annual transactions' },
                { icon: '🏆', title: '15 Awards', desc: 'for innovation & design' },
              ].map((achievement, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30 text-center"
                >
                  <div className="text-6xl mb-4">{achievement.icon}</div>
                  <h3 className="text-2xl font-black mb-2">{achievement.title}</h3>
                  <p className="text-white/80">{achievement.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* VISION FOR FUTURE */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12 pb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-slate-900 text-center"
          >
            Our Vision for the <span className="text-blue-600">Future</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-12 border-2 border-blue-200 shadow-xl"
          >
            <p className="text-xl text-slate-600 leading-relaxed mb-6">
              We're not stopping here. By 2025, we aim to expand into 50+ countries, introduce AI-powered personalized recommendations, and become the world's most trusted comparison platform. Our mission is clear: <span className="font-black text-blue-600">empower billions to make confident decisions.</span>
            </p>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-black text-lg"
            >
              🌍 The Best is Yet to Come
            </motion.div>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
};

export default SuccessHistory;