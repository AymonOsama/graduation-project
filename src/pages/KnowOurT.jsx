import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Twitter, Award, Briefcase, Heart, Code } from 'lucide-react';

const KnowOurTeam = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  // Team Members Data
  const teamMembers = [
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      role: 'Founder & CEO',
      emoji: '👨‍💼',
      bio: 'Visionary leader with 15+ years in tech. Built Comparo from a simple idea to a platform trusted by millions.',
      specialty: 'Business Strategy & Leadership',
      expertise: ['Product Vision', 'Business Growth', 'Team Leadership', 'Market Analysis'],
      achievements: [
        '🏆 Founded Comparo in 2020',
        '🚀 Grew to 50M+ users in 4 years',
        '💰 Raised $50M+ in funding',
        '🌍 Expanded to 50+ countries'
      ],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'ahmed@comparo.com'
      }
    },
    {
      id: 2,
      name: 'Fatima Al-Dosari',
      role: 'Chief Technology Officer',
      emoji: '👩‍💻',
      bio: 'Tech innovator specializing in AI and machine learning. Architected Comparo\'s intelligent comparison engine.',
      specialty: 'AI & Product Architecture',
      expertise: ['AI/ML', 'System Architecture', 'Database Design', 'Cloud Infrastructure'],
      achievements: [
        '🤖 Built AI comparison engine',
        '⚡ Optimized for 100M+ queries/day',
        '🔒 Implemented security protocols',
        '📊 Created analytics dashboard'
      ],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'fatima@comparo.com'
      }
    },
    {
      id: 3,
      name: 'Mohammed Al-Otaibi',
      role: 'Chief Financial Officer',
      emoji: '👨‍💼',
      bio: 'Finance strategist with expertise in scaling startups. Manages investments and operational efficiency.',
      specialty: 'Finance & Business Operations',
      expertise: ['Financial Planning', 'Investor Relations', 'Budget Management', 'Growth Strategy'],
      achievements: [
        '💵 Managed $50M funding rounds',
        '📈 Achieved profitability in Year 3',
        '🏛️ Built investor partnerships',
        '💼 Expanded to new markets'
      ],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mohammed@comparo.com'
      }
    },
    {
      id: 4,
      name: 'Layla Al-Habib',
      role: 'Head of Design',
      emoji: '👩‍🎨',
      bio: 'Award-winning UX/UI designer. Created Comparo\'s intuitive interface loved by millions of users.',
      specialty: 'UX/UI Design & Brand',
      expertise: ['UX Research', 'UI Design', 'Brand Strategy', 'User Experience'],
      achievements: [
        '🎖️ Won 5+ design awards',
        '😊 98% user satisfaction',
        '🌟 Redesigned platform 3x',
        '♿ Implemented accessibility standards'
      ],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'layla@comparo.com'
      }
    },
    {
      id: 5,
      name: 'Omar Al-Enezi',
      role: 'Head of Marketing',
      emoji: '👨‍💼',
      bio: 'Growth hacker who scaled Comparo from 0 to 50M users. Expert in digital marketing and brand building.',
      specialty: 'Growth & Marketing',
      expertise: ['Digital Marketing', 'Brand Strategy', 'User Acquisition', 'Community Growth'],
      achievements: [
        '🎯 Acquired 50M users',
        '📢 Built community of 5M',
        '🏅 Won marketing awards',
        '🌐 60+ country presence'
      ],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'omar@comparo.com'
      }
    },
    {
      id: 6,
      name: 'Sara Al-Dosari',
      role: 'Head of Customer Success',
      emoji: '👩‍💼',
      bio: 'Customer advocate focused on ensuring every user gets the best experience. Leads support and community teams.',
      specialty: 'Customer Experience & Support',
      expertise: ['Customer Support', 'Community Management', 'User Education', 'Feedback Analysis'],
      achievements: [
        '😊 99% customer satisfaction',
        '⚡ <2 hour response time',
        '🎓 Trained 100+ support staff',
        '🏆 Won customer service award'
      ],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sara@comparo.com'
      }
    },
    {
      id: 7,
      name: 'Khaled Al-Shammari',
      role: 'Lead Product Manager',
      emoji: '👨‍💼',
      bio: 'Product strategist who shapes Comparo\'s roadmap. Focuses on features users actually love and need.',
      specialty: 'Product Management & Strategy',
      expertise: ['Product Strategy', 'Feature Development', 'User Research', 'Roadmap Planning'],
      achievements: [
        '🚀 Launched 50+ features',
        '📊 Increased engagement 300%',
        '👥 Led cross-team collaboration',
        '💡 Ideated viral features'
      ],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'khaled@comparo.com'
      }
    },
    {
      id: 8,
      name: 'Noor Al-Harbi',
      role: 'Head of Engineering',
      emoji: '👩���💻',
      bio: 'Engineering leader managing 100+ developers. Built systems that handle millions of comparisons daily.',
      specialty: 'Engineering & Infrastructure',
      expertise: ['Team Leadership', 'System Design', 'Performance Optimization', 'DevOps'],
      achievements: [
        '👥 Built team of 100+ engineers',
        '🔧 99.99% uptime',
        '⚡ <100ms response time',
        '🔄 Released 2x per week'
      ],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'noor@comparo.com'
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20 px-6 md:px-12 text-center relative z-10"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
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
            Our Amazing Team
          </span>
          <motion.div 
            className="h-[2px] w-12 bg-blue-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black mb-6 text-slate-900"
        >
          Meet the Minds Behind <span className="text-blue-600">Comparo</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto font-medium mb-12"
        >
          A diverse team of innovators, creators, and problem-solvers dedicated to making smarter shopping a reality.
        </motion.p>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl"
        >
          👥
        </motion.div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-20 py-20">

        {/* TEAM GRID */}
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
            className="text-4xl md:text-5xl font-black text-slate-900 text-center"
          >
            Leadership <span className="text-blue-600">Team</span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ y: -15, scale: 1.05 }}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedMember(member)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-slate-200 hover:border-blue-600 transition-all cursor-pointer group"
              >
                {/* Header Image */}
                <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    animate={{
                      scale: hoveredId === member.id ? 1.2 : 1,
                      rotate: hoveredId === member.id ? 10 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-7xl"
                  >
                    {member.emoji}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-bold text-xs mb-2">
                      {member.role}
                    </p>
                    <p className="text-slate-600 text-xs font-semibold">
                      {member.specialty}
                    </p>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-2 pt-3 border-t border-slate-200">
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href={member.social.linkedin}
                      className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-all"
                      title="LinkedIn"
                    >
                      <Linkedin size={16} />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href={member.social.twitter}
                      className="text-blue-400 hover:text-blue-500 p-2 rounded-lg hover:bg-blue-50 transition-all"
                      title="Twitter"
                    >
                      <Twitter size={16} />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href={`mailto:${member.social.email}`}
                      className="text-slate-600 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-all"
                      title="Email"
                    >
                      <Mail size={16} />
                    </motion.a>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMember(member)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-bold text-xs hover:shadow-lg transition-all"
                  >
                    View Profile
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* VALUES SECTION */}
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
            className="text-4xl md:text-5xl font-black text-slate-900 text-center"
          >
            Our Core <span className="text-blue-600">Values</span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { icon: Code, title: 'Innovation', desc: 'Pushing boundaries to create solutions that matter' },
              { icon: Heart, title: 'Integrity', desc: 'Honest, transparent, and ethical in everything we do' },
              { icon: Award, title: 'Excellence', desc: 'Striving for the highest quality in all we create' },
              { icon: Briefcase, title: 'Collaboration', desc: 'Strong teamwork and diverse perspectives' }
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-600 transition-all shadow-lg group"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow"
                  >
                    <Icon size={24} />
                  </motion.div>
                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* CULTURE SECTION */}
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
            className="text-4xl md:text-5xl font-black text-slate-900 text-center"
          >
            Our <span className="text-blue-600">Culture</span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                title: '🚀 Innovation First',
                desc: 'We encourage experimentation and learning from failures. Our best features often come from bold ideas that our team members propose.'
              },
              {
                title: '👥 Inclusive & Diverse',
                desc: 'We celebrate diverse backgrounds, perspectives, and experiences. Our team comes from 20+ countries and speaks 30+ languages.'
              },
              {
                title: '⚡ Fast-Moving & Agile',
                desc: 'We move fast but not recklessly. Quick decisions, rapid iterations, and continuous improvement are at our core.'
              },
              {
                title: '💪 Growth Mindset',
                desc: 'Everyone on our team is learning and growing. We invest in training, mentorship, and career development for all.'
              }
            ].map((culture, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-blue-600 transition-all shadow-lg"
              >
                <h3 className="text-xl font-black text-slate-900 mb-4">
                  {culture.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {culture.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

      </div>

      {/* MEMBER MODAL */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="text-6xl mb-4">{selectedMember.emoji}</div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">
                    {selectedMember.name}
                  </h2>
                  <p className="text-blue-600 font-bold mb-1">
                    {selectedMember.role}
                  </p>
                  <p className="text-slate-600 font-semibold text-sm">
                    {selectedMember.specialty}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedMember(null)}
                  className="text-2xl text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0 ml-4"
                >
                  ✕
                </motion.button>
              </div>

              {/* Bio */}
              <p className="text-slate-600 text-base leading-relaxed mb-6 pb-6 border-b border-slate-200">
                {selectedMember.bio}
              </p>

              {/* Expertise */}
              <div className="mb-6">
                <h3 className="text-xl font-black text-slate-900 mb-3">
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.expertise.map((exp, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg font-bold text-xs"
                    >
                      {exp}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h3 className="text-xl font-black text-slate-900 mb-3">
                  Key Achievements
                </h3>
                <div className="space-y-2">
                  {selectedMember.achievements.map((achievement, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg text-sm"
                    >
                      <span className="text-xl">{achievement.split(' ')[0]}</span>
                      <span className="font-bold text-slate-800">
                        {achievement.slice(2)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 flex-wrap">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={selectedMember.social.linkedin}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={selectedMember.social.twitter}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-400 text-white rounded-lg font-bold hover:bg-blue-500 transition-colors text-sm"
                >
                  <Twitter size={18} />
                  Twitter
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={`mailto:${selectedMember.social.email}`}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-600 text-white rounded-lg font-bold hover:bg-slate-700 transition-colors text-sm"
                >
                  <Mail size={18} />
                  Email
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KnowOurTeam;