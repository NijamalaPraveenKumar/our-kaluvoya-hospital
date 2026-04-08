/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Stethoscope, 
  Activity, 
  Thermometer, 
  Droplets, 
  Zap, 
  Wind, 
  ShieldCheck, 
  Star, 
  ChevronRight,
  Menu,
  X,
  Award,
  Users,
  HeartPulse,
  ArrowUpRight,
  Scissors,
  AlertCircle,
  ExternalLink,
  ChevronUp
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useMotionValueEvent } from "motion/react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === "pointer");
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div 
        className="custom-cursor"
        animate={{ 
          x: position.x, 
          y: position.y,
          scale: isPointer ? 1.5 : 1,
          borderColor: isPointer ? "rgba(197, 160, 89, 0.8)" : "rgba(197, 160, 89, 0.3)"
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      />
      <div 
        className="custom-cursor-dot"
        style={{ left: position.x, top: position.y }}
      />
    </>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Treatments", href: "#treatments" },
    { name: "Procedures", href: "#procedures" },
    { name: "Diagnostics", href: "#diagnostics" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-700 ${
        (isScrolled || isMobileMenuOpen) ? "glass py-4" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-start group cursor-pointer"
        >
          <span className="font-serif text-xl md:text-2xl tracking-[0.2em] gold-text-gradient uppercase leading-tight transition-transform duration-500 group-hover:scale-105">
            Kaluvoya Hospital
          </span>
          <div className="flex flex-col items-start mt-1">
            <span className="font-serif text-[9px] md:text-[10px] tracking-[0.4em] text-white uppercase font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
              24/7 Emergency
            </span>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-12">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] uppercase tracking-[0.3em] text-slate-400 hover:text-gold-300 transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a
            href="tel:9492664007"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-8 py-3 border border-gold-500/30 text-gold-400 text-[10px] uppercase tracking-[0.3em] hover:bg-gold-500 hover:text-navy-950 transition-all duration-500 rounded-sm font-semibold"
          >
            Emergency
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-gold-400 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 w-full h-screen bg-navy-950 z-[9999] flex flex-col items-center justify-center p-8"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-gold-400 p-2 hover:scale-110 transition-transform"
            >
              <X size={32} strokeWidth={1} />
            </button>

            <div className="flex flex-col items-center space-y-8 w-full max-w-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif italic text-white hover:text-gold-400 transition-colors tracking-wide"
                >
                  {link.name}
                </a>
              ))}
              <motion.a
                href="tel:9492664007"
                animate={{ 
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    "0 0 0px rgba(212, 175, 55, 0)",
                    "0 0 20px rgba(212, 175, 55, 0.4)",
                    "0 0 0px rgba(212, 175, 55, 0)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full text-center px-12 py-5 bg-gold-500 text-navy-950 text-xs uppercase tracking-[0.4em] font-bold rounded-sm luxury-shadow mt-8"
              >
                Emergency Call
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with Parallax and Slow Zoom */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: "easeOut" }}
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        {/* Cinematic Dark Overlay Layers */}
        <div className="absolute inset-0 bg-navy-950/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-navy-950/80 to-navy-950 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,8,16,0.6)_100%)] z-10" />
        
        <img 
          src="https://images.unsplash.com/photo-1615461066870-40b124f293db?auto=format&fit=crop&q=80&w=2000" 
          alt="Premium Medical Background"
          className="w-full h-full object-cover grayscale opacity-40"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Content Container - Optimized for Laptop View */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-8 text-center flex flex-col items-center justify-center h-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ opacity }}
          className="flex flex-col items-center w-full"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] mb-10 tracking-tight max-w-5xl">
            The Art of <br className="hidden md:block" />
            <span className="italic font-light gold-text-gradient">Exceptional Care.</span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg lg:text-xl max-w-xl lg:max-w-2xl mx-auto mb-16 font-light leading-relaxed tracking-wide">
            Where clinical precision meets human empathy. Experience a new standard of healthcare excellence at Kaluvoya Hospital.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-8 w-full sm:w-auto">
            <motion.a 
              href="https://wa.me/919492664007"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full sm:w-72 px-10 py-6 bg-gold-500 text-navy-950 font-bold uppercase tracking-[0.3em] text-[10px] overflow-hidden transition-all duration-500 rounded-sm luxury-shadow flex items-center justify-center gap-3"
            >
              <MessageCircle size={16} />
              Book Consultation
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </motion.a>
            
            <motion.a 
              href="tel:9492664007"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-72 px-10 py-6 bg-transparent border border-white/20 text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-navy-950 transition-all duration-500 rounded-sm flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              <Phone size={16} />
              Call Now
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5"
      >
        <span className="text-[8px] tracking-[0.5em] text-gold-500/30 uppercase font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold-500/30 to-transparent" />
      </motion.div>
    </section>
  );
};

const DoctorSection = () => {
  return (
    <section id="about" className="py-40 bg-navy-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative group mb-20 lg:mb-0"
          >
            <div className="absolute -inset-6 border border-gold-500/10 translate-x-6 translate-y-6 transition-transform duration-1000 group-hover:translate-x-3 group-hover:translate-y-3" />
            <div className="relative aspect-[4/5] overflow-hidden luxury-shadow">
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070" 
                alt="Dr. Rajesh Pancheti"
                className="w-full h-full object-cover transition-all duration-1000 scale-110 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute glass luxury-shadow z-20 flex items-center gap-4 md:gap-6 p-5 md:p-8 xl:p-10 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 md:left-auto md:right-0 md:translate-x-6 md:translate-y-6 xl:-bottom-12 xl:-right-12 xl:translate-x-0 xl:translate-y-0 w-[85%] max-w-[280px] md:w-auto md:max-w-none"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full gold-bg-gradient flex items-center justify-center text-navy-950 shrink-0">
                  <Award className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <p className="text-gold-200 font-serif text-xl md:text-2xl">MBBS</p>
                  <p className="text-slate-500 text-[7px] md:text-[9px] uppercase tracking-[0.3em] font-bold mt-1">General Practitioner</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-gold-400 tracking-[0.4em] text-[10px] uppercase mb-6 font-semibold">The Visionary</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-10 leading-[1.1]">
              Crafting Health <br />
              <span className="italic font-light gold-text-gradient">with Precision.</span>
            </h2>
            
            <div className="space-y-8 text-slate-400 font-light leading-relaxed text-lg mb-16 tracking-wide">
              <div className="mb-8">
                <p className="text-white font-serif text-3xl italic mb-2">Dr. Rajesh Pancheti</p>
                <p className="text-gold-200 font-serif text-xl">MBBS</p>
              </div>
              
              <p className="text-slate-300">
                Dr. Rajesh Pancheti is a dedicated and experienced medical professional with a strong background in general medicine and patient care. With experience across reputed hospitals in India and abroad, he is known for accurate diagnosis, compassionate care, and commitment to patient well-being.
              </p>

              <div className="pt-8 space-y-6">
                <p className="text-gold-400 text-[10px] uppercase tracking-[0.4em] font-bold">Professional Experience</p>
                <div className="space-y-4">
                  {[
                    "EX.R.M.O., A.K.G Hospital, Kannur, Kerala",
                    "Ex General Practitioner, Rahima Medical Poly Clinic, Saudi Arabia"
                  ].map((exp, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2.5 shrink-0 group-hover:scale-150 transition-transform duration-500" />
                      <p className="text-slate-400 text-base group-hover:text-white transition-colors duration-500">{exp}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-12 pt-12 border-t border-white/5">
              {[
                { val: "17+", label: "Years Experience" },
                { val: "1k+", label: "Patients Treated" },
                { val: "24/7", label: "Trusted Care" }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-4xl font-serif text-gold-300 mb-2">{stat.val}</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SpecialTreatmentsSection = () => {
  const treatments = [
    { id: "01", name: "Toxic Fevers", icon: <Thermometer size={24} strokeWidth={1} />, desc: "Expert management of complex and acute fever conditions." },
    { id: "02", name: "Heart & Kidney", icon: <HeartPulse size={24} strokeWidth={1} />, desc: "Integrated care for cardiovascular and renal health conditions." },
    { id: "03", name: "Respiratory Diseases", icon: <Wind size={24} strokeWidth={1} />, desc: "Comprehensive treatment for chronic and acute lung ailments." },
    { id: "04", name: "Asthma Treatment", icon: <Wind size={24} strokeWidth={1} />, desc: "Specialized care for asthma management and respiratory relief." },
    { id: "05", name: "Diabetes & Thyroid", icon: <Activity size={24} strokeWidth={1} />, desc: "Advanced endocrine care for hormonal and metabolic balance." },
    { id: "06", name: "Poisoning Cases", icon: <AlertCircle size={24} strokeWidth={1} />, desc: "Critical emergency response for poisoning and toxicity." },
    { id: "07", name: "BP Management", icon: <HeartPulse size={24} strokeWidth={1} />, desc: "Precision control of hypertension and blood pressure levels." },
    { id: "08", name: "Snake Bite Care", icon: <ShieldCheck size={24} strokeWidth={1} />, desc: "Emergency treatment and recovery for snake bite incidents." },
    { id: "09", name: "Joint & Knee Pain", icon: <Activity size={24} strokeWidth={1} />, desc: "Relief and therapy for chronic joint and knee discomfort." },
    { id: "10", name: "Gastrointestinal", icon: <Activity size={24} strokeWidth={1} />, desc: "Specialized care for complex digestive system diseases." },
    { id: "11", name: "Minor Bite Injuries", icon: <ShieldCheck size={24} strokeWidth={1} />, desc: "Prompt medical attention for various minor bite wounds." },
    { id: "12", name: "Neurological Care", icon: <Zap size={24} strokeWidth={1} />, desc: "Management of epilepsy and various neurological disorders." },
  ];

  return (
    <section id="treatments" className="py-40 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold-400 tracking-[0.6em] text-[10px] uppercase mb-6 font-semibold"
          >
            Advanced Expertise
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-serif text-white"
          >
            Special Treatments.
          </motion.h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {treatments.map((treatment, idx) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group glass p-12 relative overflow-hidden transition-all duration-700 hover:bg-white/[0.04]"
            >
              <div className="absolute top-0 right-0 p-8 text-gold-500/[0.03] font-serif text-8xl group-hover:text-gold-500/[0.06] transition-all duration-700 group-hover:-translate-y-2 group-hover:translate-x-2">
                {treatment.id}
              </div>
              
              <div className="w-16 h-16 bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-gold-400 mb-10 group-hover:gold-bg-gradient group-hover:text-navy-950 transition-all duration-700 rounded-sm">
                {treatment.icon}
              </div>
              
              <h3 className="text-2xl font-serif text-white mb-6 group-hover:text-gold-300 transition-colors tracking-wide">
                {treatment.name}
              </h3>
              
              <p className="text-slate-400 font-light leading-relaxed tracking-wide mb-10 text-sm">
                {treatment.desc}
              </p>
              
              <div className="flex items-center gap-3 text-gold-500 text-[9px] uppercase tracking-[0.3em] font-bold opacity-40 group-hover:opacity-100 transition-all duration-500">
                Learn More <ArrowUpRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MinorProceduresSection = () => {
  const procedures = [
    { id: "01", name: "Fat Lump Removal", icon: <Scissors size={24} strokeWidth={1} />, desc: "Precise surgical removal of lipomas and fatty tissue lumps." },
    { id: "02", name: "Cyst Removal", icon: <Scissors size={24} strokeWidth={1} />, desc: "Expert excision of sebaceous and other types of cysts." },
    { id: "03", name: "Abscess Treatment", icon: <ShieldCheck size={24} strokeWidth={1} />, desc: "Clinical drainage and management of localized infections." },
    { id: "04", name: "Circumcision", icon: <Scissors size={24} strokeWidth={1} />, desc: "Safe and professional minor surgical procedure." },
  ];

  return (
    <section id="procedures" className="py-40 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold-400 tracking-[0.6em] text-[10px] uppercase mb-6 font-semibold"
          >
            Clinical Precision
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-serif text-white"
          >
            Minor Procedures.
          </motion.h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {procedures.map((proc, idx) => (
            <motion.div
              key={proc.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group glass p-12 relative overflow-hidden transition-all duration-700 hover:bg-white/[0.04]"
            >
              <div className="absolute top-0 right-0 p-8 text-gold-500/[0.03] font-serif text-8xl group-hover:text-gold-500/[0.06] transition-all duration-700 group-hover:-translate-y-2 group-hover:translate-x-2">
                {proc.id}
              </div>
              
              <div className="w-16 h-16 bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-gold-400 mb-10 group-hover:gold-bg-gradient group-hover:text-navy-950 transition-all duration-700 rounded-sm">
                {proc.icon}
              </div>
              
              <h3 className="text-2xl font-serif text-white mb-6 group-hover:text-gold-300 transition-colors tracking-wide">
                {proc.name}
              </h3>
              
              <p className="text-slate-400 font-light text-sm leading-relaxed tracking-wide mb-10">
                {proc.desc}
              </p>
              
              <div className="flex items-center gap-3 text-gold-500 text-[9px] uppercase tracking-[0.3em] font-bold opacity-40 group-hover:opacity-100 transition-all duration-500">
                Learn More <ArrowUpRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DiagnosticsSection = () => {
  const facilities = [
    { id: "01", name: "Oxygen Monitoring", icon: <Wind size={24} strokeWidth={1} />, desc: "Continuous and precise tracking of blood oxygen levels." },
    { id: "02", name: "X-Ray", icon: <Zap size={24} strokeWidth={1} />, desc: "X-ray is a form of high-energy electromagnetic radiation" },
    { id: "03", name: "ECG", icon: <HeartPulse size={24} strokeWidth={1} />, desc: "Advanced cardiac monitoring for heart rhythm evaluation." },
    { id: "04", name: "Thyroid Tests", icon: <Activity size={24} strokeWidth={1} />, desc: "Comprehensive screening for thyroid function and health." },
    { id: "05", name: "Liver Tests", icon: <Droplets size={24} strokeWidth={1} />, desc: "Detailed laboratory analysis of liver function and enzymes." },
    { id: "06", name: "Kidney Tests", icon: <Droplets size={24} strokeWidth={1} />, desc: "Precise evaluation of renal function and kidney health." },
  ];

  return (
    <section id="diagnostics" className="py-40 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold-400 tracking-[0.6em] text-[10px] uppercase mb-6 font-semibold"
          >
            Advanced Facilities
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-serif text-white"
          >
            Facilities & Diagnostics.
          </motion.h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {facilities.map((facility, idx) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group glass p-12 relative overflow-hidden transition-all duration-700 hover:bg-white/[0.04]"
            >
              <div className="absolute top-0 right-0 p-8 text-gold-500/[0.03] font-serif text-8xl group-hover:text-gold-500/[0.06] transition-all duration-700 group-hover:-translate-y-2 group-hover:translate-x-2">
                {facility.id}
              </div>
              
              <div className="w-16 h-16 bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-gold-400 mb-10 group-hover:gold-bg-gradient group-hover:text-navy-950 transition-all duration-700 rounded-sm">
                {facility.icon}
              </div>
              
              <h3 className="text-2xl font-serif text-white mb-6 group-hover:text-gold-300 transition-colors tracking-wide">
                {facility.name}
              </h3>
              
              <p className="text-slate-400 font-light leading-relaxed tracking-wide mb-10 text-sm">
                {facility.desc}
              </p>
              
              <div className="flex items-center gap-3 text-gold-500 text-[9px] uppercase tracking-[0.3em] font-bold opacity-40 group-hover:opacity-100 transition-all duration-500">
                Learn More <ArrowUpRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Suresh Kumar",
      role: "Patient",
      content: "Very good treatment and quick response. Dr. Rajesh sir is extremely professional and the hospital environment is very clean and premium.",
      rating: 5
    },
    {
      name: "Anitha Reddy",
      role: "Patient",
      content: "Doctor is friendly and explains clearly. He doesn't prescribe unnecessary medicines. Highly recommended for general checkups.",
      rating: 5
    },
    {
      name: "Venkatesh P.",
      role: "Patient",
      content: "The best medical care in Kaluvoya. The diagnostic facilities are top-notch and the staff is very courteous.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-40 bg-navy-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <p className="text-gold-400 tracking-[0.6em] text-[10px] uppercase mb-6 font-semibold">Testimonials</p>
            <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">The Patient Experience.</h2>
          </div>
          <div className="flex items-center gap-8 glass p-8 luxury-shadow">
            <Users size={40} strokeWidth={1} className="text-gold-400" />
            <div className="text-left">
              <p className="text-3xl font-serif text-white leading-none">1000+</p>
              <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-bold mt-2">Happy Patients</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 1 }}
              className="glass p-12 relative flex flex-col justify-between group hover:bg-white/[0.04] transition-all duration-700"
            >
              <div>
                <div className="flex gap-1.5 mb-10">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-gold-500 text-gold-500" />
                  ))}
                </div>
                
                <p className="text-slate-300 italic font-light text-xl mb-12 leading-relaxed tracking-wide">
                  "{t.content}"
                </p>
              </div>
              
              <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                <div className="w-12 h-12 rounded-full border border-gold-500/20 flex items-center justify-center text-gold-300 font-serif text-xl bg-gold-500/5">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-white font-serif text-lg tracking-wide">{t.name}</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-bold mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 lg:py-40 bg-navy-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-gold-400 tracking-[0.6em] text-[10px] uppercase mb-4 lg:mb-6 font-semibold">Get In Touch</p>
            <h2 className="text-4xl md:text-7xl font-serif text-white mb-8 lg:mb-16 leading-tight">Initiate Your <br /><span className="italic gold-text-gradient">Journey.</span></h2>
            
            <div className="space-y-8 lg:space-y-12">
              {[
                { icon: <Phone size={22} strokeWidth={1} />, label: "Call Us Directly", val: "+91 94926 64007", href: "tel:9492664007" },
                { icon: <MapPin size={22} strokeWidth={1} />, label: "Visit Our Hospital", val: "Kaluvoya, Nellore", href: "https://maps.google.com/?q=GC65+9M9,+Kaluvoya,+Andhra+Pradesh+524343" },
                { icon: <MessageCircle size={22} strokeWidth={1} />, label: "WhatsApp Consultation", val: "Chat with Dr. Rajesh", href: "https://wa.me/919492664007" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 lg:gap-8 group">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 glass flex items-center justify-center text-gold-400 shrink-0 group-hover:gold-bg-gradient group-hover:text-navy-950 transition-all duration-700">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.4em] text-slate-500 mb-1 lg:mb-2 font-bold">{item.label}</p>
                    <a 
                      href={item.href} 
                      target={item.href.startsWith('http') ? "_blank" : undefined}
                      rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                      className="text-xl lg:text-2xl font-serif text-white hover:text-gold-300 transition-colors tracking-wide"
                    >
                      {item.val}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 lg:mt-20 flex flex-col sm:flex-row gap-4 lg:gap-8">
              <motion.a 
                href="https://wa.me/919492664007"
                whileHover={{ scale: 1.02 }}
                className="px-10 lg:px-12 py-5 lg:py-6 bg-gold-500 text-navy-950 font-bold uppercase tracking-[0.3em] text-[10px] rounded-sm transition-all duration-500 text-center luxury-shadow"
              >
                Book via WhatsApp
              </motion.a>
              <motion.a 
                href="https://maps.app.goo.gl/9xoiwicqKanQqs5z7"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="px-10 lg:px-12 py-5 lg:py-6 border border-white/10 text-white font-bold uppercase tracking-[0.3em] text-[10px] rounded-sm hover:bg-white hover:text-navy-950 transition-all duration-500 text-center flex items-center justify-center gap-3"
              >
                <MapPin size={14} />
                Get Directions
              </motion.a>
            </div>
          </motion.div>

          {/* Map Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[250px] lg:h-[400px] w-full group"
          >
            <div className="absolute -inset-4 lg:-inset-8 border border-gold-500/5 translate-x-4 lg:translate-x-8 translate-y-4 lg:translate-y-8 rounded-xl transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-6" />
            <div className="glass w-full h-full overflow-hidden relative luxury-shadow rounded-xl border border-white/5 cursor-pointer">
              {/* Clickable Overlay */}
              <a 
                href="https://maps.app.goo.gl/9xoiwicqKanQqs5z7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-20"
              >
                <span className="sr-only">Open in Google Maps</span>
              </a>

              <iframe 
                src="https://www.google.com/maps?q=Dr+Rajesh+Hospital+Kaluvoya&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: "grayscale(1) invert(1) contrast(1.2) opacity(0.4)" }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-all duration-700 group-hover:opacity-60 group-hover:scale-105"
              ></iframe>

              <div className="absolute bottom-4 left-4 lg:top-8 lg:left-8 glass p-4 lg:p-6 luxury-shadow rounded-lg border border-white/10 z-30 pointer-events-none">
                <p className="text-gold-300 font-serif text-lg lg:text-xl tracking-wide">Kaluvoya Hospital</p>
                <p className="text-[8px] lg:text-[9px] uppercase tracking-[0.4em] text-slate-500 font-bold mt-1 lg:mt-2">Nellore, Andhra Pradesh</p>
              </div>

              {/* Open in Google Maps Button Overlay */}
              <div className="absolute bottom-4 right-4 z-30">
                <motion.a
                  href="https://maps.app.goo.gl/9xoiwicqKanQqs5z7"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-navy-950/80 backdrop-blur-md border border-gold-500/30 text-gold-400 text-[9px] uppercase tracking-[0.2em] font-bold rounded-full flex items-center gap-2 hover:bg-gold-500 hover:text-navy-950 transition-all duration-500"
                >
                  <ExternalLink size={12} />
                  Open in Google Maps
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 bg-navy-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
          <div className="flex flex-col items-center lg:items-start">
            <span className="font-serif text-3xl tracking-[0.25em] gold-text-gradient uppercase leading-tight">Kaluvoya</span>
            <span className="font-serif text-3xl tracking-[0.25em] gold-text-gradient uppercase leading-tight">Hospital</span>
          </div>
          
          <div className="flex gap-16">
            {["Privacy Policy", "Terms of Service", "Legal"].map((link) => (
              <a key={link} href="#" className="text-[10px] uppercase tracking-[0.4em] text-slate-600 hover:text-gold-400 transition-colors font-bold">
                {link}
              </a>
            ))}
          </div>
          
          <div className="flex flex-col items-center lg:items-end gap-4">
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-700 font-bold">
              &copy; {new Date().getFullYear()} Dr. Rajesh Pancheti.
            </p>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-800 font-bold">
              Kaluvoya Hospital Website Designed and Created by{" "}
              <a href="mailto:praveenkumarnijamala@gmail.com" className="text-gold-600 hover:text-gold-400 transition-colors lowercase">
                praveenkumarnijamala@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-[2px] bg-gold-500 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(212, 175, 55, 0.2)" }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[90] w-12 h-12 rounded-full glass border border-gold-500/30 flex items-center justify-center text-gold-400 luxury-shadow transition-colors"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <div className="relative selection:bg-gold-500/20">
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main>
        <Hero />
        <DoctorSection />
        <SpecialTreatmentsSection />
        <MinorProceduresSection />
        <DiagnosticsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
