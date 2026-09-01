import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Globe, Download, ArrowRight, ArrowUpRight, Code, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero
      gsap.from(".hero-el", {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.12, ease: "power3.out", delay: 0.2
      });

      // Section Titles
      gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
          scrollTrigger: { trigger: title, start: "top 85%" },
          y: 40, opacity: 0, duration: 1, ease: "power3.out"
        });
      });

      // About
      gsap.from(".about-text", {
        scrollTrigger: { trigger: ".about-section", start: "top 75%" },
        y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2
      });

      // Timeline
      gsap.utils.toArray(".timeline-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          x: i % 2 === 0 ? -50 : 50, opacity: 0, duration: 1, ease: "power3.out"
        });
        
        gsap.from(card.querySelector(".timeline-point"), {
          scrollTrigger: { trigger: card, start: "top 85%" },
          scale: 0, opacity: 0, duration: 0.5, ease: "back.out(1.7)", delay: 0.2
        });
      });

      // Skills
      gsap.utils.toArray(".skill-card").forEach((card) => {
        const targetPercent = parseInt(card.dataset.percent, 10);
        const counter = card.querySelector(".skill-counter");
        const circle = card.querySelector(".skill-circle");
        
        gsap.to(counter, {
          scrollTrigger: { trigger: ".skills-section", start: "top 75%" },
          innerHTML: targetPercent, duration: 2, ease: "power2.inOut", snap: { innerHTML: 1 },
          onUpdate: function() { counter.innerHTML = Math.round(this.targets()[0].innerHTML) + "%"; }
        });
        
        const circumference = 2 * Math.PI * 38;
        const offset = circumference - (targetPercent / 100) * circumference;
        gsap.fromTo(circle, 
          { strokeDashoffset: circumference },
          {
            scrollTrigger: { trigger: ".skills-section", start: "top 75%" },
            strokeDashoffset: offset, duration: 2, ease: "power2.inOut"
          }
        );
      });
      
      // Education
      gsap.from(".edu-card", {
        scrollTrigger: { trigger: ".edu-section", start: "top 80%" },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out"
      });

      // Contact
      gsap.from(".contact-el", {
        scrollTrigger: { trigger: ".contact-section", start: "top 80%" },
        y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out"
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-background text-foreground" ref={mainRef}>
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Navbar */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 rounded-[2rem] px-6 py-3 flex items-center justify-between md:justify-center gap-8 w-[90%] md:w-auto ${scrolled ? 'bg-background/80 backdrop-blur-xl shadow-lg border border-foreground/5' : 'bg-transparent'}`}>
        <div className="font-bold text-xl tracking-tighter">MD.</div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#about" className="hover:text-accent transition-colors lift-hover">À propos</a>
          <a href="#experience" className="hover:text-accent transition-colors lift-hover">Expérience</a>
          <a href="#skills" className="hover:text-accent transition-colors lift-hover">Compétences</a>
          <a href="#contact" className="hover:text-accent transition-colors lift-hover">Contact</a>
        </div>
        <a href="/CV_Mouhamadou_Diouf.pdf" download className="hidden md:flex items-center gap-2 bg-foreground text-background px-5 py-2 rounded-full text-sm font-bold magnetic-btn hover:bg-accent transition-colors">
          Télécharger CV <Download size={16} />
        </a>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center items-center pt-20 pb-10 px-4 md:px-8 bg-foreground text-background overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem]">
        {/* Subtle geometric gradient for Preset C */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-accent/10 opacity-60"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="hero-el w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-accent bg-primary/10 flex items-center justify-center mb-8 overflow-hidden">
            <span className="text-4xl md:text-5xl font-sans font-bold text-background/80">MD</span>
          </div>
          
          <h1 className="hero-el text-5xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tighter mb-4 leading-tight">
            Mouhamadou Diouf
          </h1>
          
          <p className="hero-el text-2xl md:text-4xl font-serif italic text-primary/80 mb-10">
            Product Owner tech-first & AI Product Builder
          </p>
          
          <div className="hero-el flex flex-wrap justify-center gap-4 md:gap-8 mb-12 font-mono text-sm md:text-base text-primary/60">
            <div className="flex items-center gap-2"><span className="text-accent">]</span> 3 ans d'expérience</div>
            <div className="flex items-center gap-2"><span className="text-accent">]</span> 3 produits shippés</div>
            <div className="flex items-center gap-2"><span className="text-accent">]</span> Dakar, Sénégal</div>
          </div>
          
          <div className="hero-el flex flex-col sm:flex-row items-center gap-4">
            <a href="/CV_Mouhamadou_Diouf.pdf" download className="bg-accent text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 magnetic-btn">
              Télécharger CV <Download size={20} />
            </a>
            <a href="#contact" className="border border-primary/20 text-primary px-8 py-4 rounded-full font-bold flex items-center gap-2 magnetic-btn hover:bg-primary/5 transition-colors">
              Me contacter <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2px_2fr] gap-12 md:gap-16 items-start">
          <h2 className="section-title text-4xl md:text-6xl font-serif italic tracking-tight text-foreground md:text-right sticky top-32">
            Le<br />Manifeste.
          </h2>
          
          <div className="hidden md:block w-full h-full bg-accent/20 rounded-full relative">
            <div className="absolute top-0 left-0 w-full h-32 bg-accent rounded-full"></div>
          </div>
          
          <div className="about-text text-lg md:text-xl leading-relaxed text-foreground/80 space-y-6 font-medium">
            <p>
              Product Owner tech-first chez <span className="text-foreground font-bold">Auryntix</span>, agence de croissance digitale et IA basée à Dakar — et avant d'écrire une roadmap, je sais ce qu'il y a dedans : j'écris aussi le code qui la réalise. 
            </p>
            <p>
              Ma conviction : <span className="bg-accent/10 text-accent px-1 rounded-sm">l'IA n'est pas une fonctionnalité qu'on ajoute à la fin, c'est une décision d'architecture qu'on prend au départ</span>. 
            </p>
            <p>
              Je termine actuellement un Master en Data Science & IA à la Swiss UMEF University, avec déjà 3 produits shippés depuis Dakar.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 md:py-32 px-6 md:px-12 bg-primary/30 rounded-[2rem] md:rounded-[3rem] mx-2 md:mx-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-4xl md:text-6xl font-serif italic mb-20 text-center">La Timeline</h2>
          
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-accent/20 transform md:-translate-x-1/2"></div>
            
            <div className="space-y-16">
              {/* Exp 1 */}
              <div className="timeline-card relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="hidden md:block text-right pr-12">
                  <span className="font-mono text-accent text-lg">2025 – Présent</span>
                </div>
                <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-accent rounded-full transform md:-translate-x-1/2 timeline-point ring-4 ring-background"></div>
                <div className="md:pl-12 pl-8">
                  <div className="md:hidden font-mono text-accent text-sm mb-2">2025 – Présent</div>
                  <h3 className="text-2xl font-bold font-sans mb-1">Product Owner tech-first</h3>
                  <p className="text-foreground/60 mb-4 font-mono text-sm">Auryntix</p>
                  <p className="text-foreground/80">
                    Cadrage stratégique, roadmap, coordination des sprints. Pilotage de bout en bout de la refonte digitale de MCE Sénégal (cahier des charges → cadrage budgétaire → développement → QA technique).
                  </p>
                </div>
              </div>

              {/* Exp 2 */}
              <div className="timeline-card relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="md:hidden font-mono text-accent text-sm mb-2 pl-8">2024 – Présent</div>
                <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-accent rounded-full transform md:-translate-x-1/2 timeline-point ring-4 ring-background"></div>
                <div className="md:pr-12 pl-8 md:pl-0 md:text-right order-last md:order-first">
                  <h3 className="text-2xl font-bold font-sans mb-1">Créateur & Développeur</h3>
                  <p className="text-foreground/60 mb-4 font-mono text-sm">Liggeyo / Olèle Systems</p>
                  <p className="text-foreground/80">
                    Développement de Liggeyo, plateforme SaaS LMS marque blanche (lancement en 24h, paiements Wave/Orange Money). Gestion des cycles de production et migrations SQL. Déploiement d'Olèle Systems (olelesystems.company).
                  </p>
                </div>
                <div className="hidden md:block pl-12">
                  <span className="font-mono text-accent text-lg">2024 – Présent</span>
                </div>
              </div>

              {/* Exp 3 */}
              <div className="timeline-card relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="hidden md:block text-right pr-12">
                  <span className="font-mono text-accent text-lg">2023 – 2024</span>
                </div>
                <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-accent rounded-full transform md:-translate-x-1/2 timeline-point ring-4 ring-background"></div>
                <div className="md:pl-12 pl-8">
                  <div className="md:hidden font-mono text-accent text-sm mb-2">2023 – 2024</div>
                  <h3 className="text-2xl font-bold font-sans mb-1">Créateur solo</h3>
                  <p className="text-foreground/60 mb-4 font-mono text-sm">Personal OS</p>
                  <p className="text-foreground/80">
                    Conception, développement et déploiement d'un dashboard IA pour étudiants et entrepreneurs africains (tâches, finances, habitudes) intégrant un assistant IA via Groq.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="skills-section py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="section-title text-4xl md:text-6xl font-serif italic mb-16">Grille de Maîtrise.</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { name: "Next.js / React / TS", percent: "95" },
            { name: "Supabase / SQL / RLS", percent: "90" },
            { name: "IA (Claude, Groq, RAG)", percent: "90" },
            { name: "Python / Data / Pandas", percent: "85" },
            { name: "Product Ownership", percent: "95" }
          ].map((skill, i) => (
            <div key={i} className="skill-card bg-primary/20 p-6 rounded-3xl flex flex-col items-center text-center hover:bg-primary/40 transition-colors lift-hover" data-percent={skill.percent}>
              <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" className="stroke-foreground/10" strokeWidth="6" fill="none" />
                  <circle cx="50" cy="50" r="38" className="skill-circle stroke-accent" strokeWidth="6" fill="none" strokeLinecap="round" style={{ strokeDasharray: 238.76, strokeDashoffset: 238.76 }} />
                </svg>
                <div className="absolute font-mono font-bold text-xl text-foreground skill-counter">0%</div>
              </div>
              <h4 className="font-bold text-sm leading-tight">{skill.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="edu-section py-24 md:py-32 px-6 md:px-12 bg-foreground text-background rounded-[2rem] md:rounded-[3rem] mx-2 md:mx-6 mb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-4xl md:text-6xl font-serif italic mb-16 text-primary">Fondations.</h2>
          
          <div className="space-y-6">
            <div className="edu-card bg-background/5 border border-primary/10 p-8 md:p-10 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-background/10 transition-colors">
              <div>
                <h3 className="text-2xl font-bold mb-2">Master Data Science & IA</h3>
                <p className="text-primary/70 font-mono text-sm">Swiss UMEF University, Dakar</p>
              </div>
              <div className="font-mono text-accent bg-accent/10 px-4 py-2 rounded-full w-fit">2025 – 2027 (En cours)</div>
            </div>

            <div className="edu-card bg-background/5 border border-primary/10 p-8 md:p-10 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-background/10 transition-colors">
              <div>
                <h3 className="text-2xl font-bold mb-2">Licence Pro. SID</h3>
                <p className="text-primary/70 font-mono text-sm">Statistiques & Informatique Décisionnelle — BEM Dakar</p>
              </div>
              <div className="flex flex-col md:items-end gap-2">
                <div className="font-mono text-primary/50 text-sm">Mention Très Bien</div>
                <div className="font-mono text-accent bg-accent/10 px-4 py-2 rounded-full w-fit">2025</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <h2 className="contact-el text-5xl md:text-7xl font-serif italic mb-12">Travaillons ensemble.</h2>
        
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <a href="mailto:dioufmouha71@gmail.com" className="contact-el group flex items-center gap-3 bg-primary/30 px-6 py-4 rounded-full font-mono text-sm hover:bg-accent hover:text-white transition-all lift-hover">
            <Mail size={18} /> dioufmouha71@gmail.com
          </a>
          <a href="https://github.com/LeM2003" target="_blank" rel="noreferrer" className="contact-el group flex items-center gap-3 bg-primary/30 px-6 py-4 rounded-full font-mono text-sm hover:bg-accent hover:text-white transition-all lift-hover">
            <Code size={18} /> GitHub
          </a>
          <a href="https://linkedin.com/in/mouhamadoudiouf" target="_blank" rel="noreferrer" className="contact-el group flex items-center gap-3 bg-primary/30 px-6 py-4 rounded-full font-mono text-sm hover:bg-accent hover:text-white transition-all lift-hover">
            <Briefcase size={18} /> LinkedIn
          </a>
          <a href="https://mouhamadou-portfolio.vercel.app" target="_blank" rel="noreferrer" className="contact-el group flex items-center gap-3 bg-primary/30 px-6 py-4 rounded-full font-mono text-sm hover:bg-accent hover:text-white transition-all lift-hover">
            <Globe size={18} /> Portfolio
          </a>
        </div>
        
        <div className="contact-el">
          <a href="mailto:dioufmouha71@gmail.com" className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-10 py-5 rounded-full font-bold text-lg magnetic-btn hover:bg-accent transition-colors">
            Démarrer un projet <ArrowUpRight size={20} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary/50 py-12 px-6 rounded-t-[3rem] md:rounded-t-[4rem] mx-2 md:mx-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-bold text-primary text-xl">Mouhamadou Diouf.</div>
        <div className="font-mono text-sm flex items-center gap-2">
          Fait avec le vibe coding <span className="text-accent">© 2026</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-sm bg-background/5 px-4 py-2 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          En ligne
        </div>
      </footer>
    </div>
  );
}
