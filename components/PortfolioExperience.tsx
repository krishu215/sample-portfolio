"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Pulse Commerce",
    description:
      "Modern commerce experience with high-performance storefront interactions and analytics.",
    stack: ["Next.js", "TypeScript", "Stripe"],
  },
  {
    title: "Nova Story Lab",
    description:
      "Immersive product storytelling website using layered motion and WebGL-inspired visuals.",
    stack: ["Three.js", "GSAP", "Tailwind"],
  },
  {
    title: "Flowboard",
    description:
      "Workflow dashboard for distributed teams with clean UX and focused micro-interactions.",
    stack: ["React", "Node.js", "PostgreSQL"],
  },
];

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Three.js",
  "GSAP",
  "Tailwind CSS",
  "UI Engineering",
  "Performance",
];

export default function PortfolioExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;

    if (!root || !canvas) return;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: true });
    if (!gl) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      context: gl,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const group = new THREE.Group();
    scene.add(group);

    // Wireframe object used for pointer and scroll-driven motion.
    const outerGeometry = new THREE.IcosahedronGeometry(1.1, 3);
    const outerMaterial = new THREE.MeshStandardMaterial({
      color: 0xb7ff62,
      wireframe: true,
      roughness: 0.25,
      metalness: 0.72,
      transparent: true,
      opacity: 0.9,
    });
    const outerMesh = new THREE.Mesh(outerGeometry, outerMaterial);
    group.add(outerMesh);

    const innerGeometry = new THREE.IcosahedronGeometry(0.75, 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x6ce8ff,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    group.add(innerMesh);

    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const keyLight = new THREE.PointLight(0xb7ff62, 5, 12);
    keyLight.position.set(2.5, 2, 3);
    scene.add(keyLight);

    const pointer = { x: 0, y: 0 };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);

    const animate = () => {
      outerMesh.rotation.x += 0.0014;
      outerMesh.rotation.y += 0.0018;
      innerMesh.rotation.x -= 0.001;
      innerMesh.rotation.y -= 0.0015;
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointer.y * 0.2, 0.04);
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, pointer.x * 0.2, 0.04);

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    const animationContext = gsap.context(() => {
      // Timeline maps the 3D transform progression to the scroll journey.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        })
        .to(group.rotation, { x: Math.PI * 0.7, y: Math.PI * 1.1, ease: "none" })
        .to(group.position, { x: -1.1, y: -0.2, ease: "none" }, 0)
        .to(group.scale, { x: 0.8, y: 0.8, z: 0.8, ease: "none" }, 0)
        .to(group.rotation, { x: Math.PI * 1.35, y: Math.PI * 2.2, ease: "none" })
        .to(group.position, { x: 1.2, y: 0.4, ease: "none" }, "<")
        .to(group.scale, { x: 1.1, y: 1.1, z: 1.1, ease: "none" }, "<")
        .to(group.rotation, { x: Math.PI * 2.1, y: Math.PI * 3.2, ease: "none" })
        .to(group.position, { x: 0.1, y: -0.5, ease: "none" }, "<");

      gsap.from(".reveal", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".reveal-group",
          start: "top 75%",
        },
      });
    }, root);

    return () => {
      animationContext.revert();
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      outerGeometry.dispose();
      outerMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <main ref={rootRef} className="site-grid relative overflow-hidden">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen opacity-85"
      />

      <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-black/30 px-5 py-4 backdrop-blur-xl sm:px-7">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">
            AK<span className="text-lime-300">.</span>
          </a>
          <ul className="hidden gap-6 text-sm text-zinc-400 sm:flex">
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="transition hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section id="home" className="relative z-10 flex min-h-screen items-center px-5 pt-24 sm:px-7">
        <div className="mx-auto w-full max-w-7xl">
          <p className="section-label mb-5">Creative Frontend Developer</p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
            Crafting digital products
            <span className="text-gradient block">with motion and depth.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
            I design and build high-quality web experiences with modern UI systems, thoughtful
            performance, and interactive 3D visuals.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-lime-300 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-200"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold transition hover:border-white/50"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="relative z-10 flex min-h-screen items-center px-5 py-28 sm:px-7">
        <div className="reveal-group mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="reveal">
            <p className="section-label">01 / About</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              Turning ideas into elegant, high-performing interfaces.
            </h2>
          </div>
          <article className="glass-card reveal rounded-3xl p-8 sm:p-10">
            <p className="text-lg leading-8 text-zinc-300">
              I focus on production-ready frontend systems that balance aesthetics and engineering.
              My work combines reusable architecture, smooth interactions, and measurable outcomes.
            </p>
          </article>
        </div>
      </section>

      <section id="skills" className="relative z-10 flex min-h-screen items-center px-5 py-28 sm:px-7">
        <div className="reveal-group mx-auto w-full max-w-7xl">
          <div className="reveal mb-10">
            <p className="section-label">02 / Skills</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              Modern tools for modern experiences.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill, index) => (
              <article key={skill} className="glass-card reveal rounded-2xl p-5">
                <p className="text-sm text-zinc-500">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 text-xl font-medium">{skill}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="relative z-10 flex min-h-screen items-center px-5 py-28 sm:px-7"
      >
        <div className="reveal-group mx-auto w-full max-w-7xl">
          <div className="reveal mb-10">
            <p className="section-label">03 / Projects</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              Selected product and experience work.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article key={project.title} className="glass-card reveal rounded-3xl p-6">
                <div className="mb-16 flex items-center justify-between">
                  <p className="text-sm text-zinc-500">{String(index + 1).padStart(2, "0")}</p>
                  <span className="text-lime-300">↗</span>
                </div>
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <p className="mt-3 leading-7 text-zinc-400">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 flex min-h-[70vh] items-center px-5 py-24 sm:px-7">
        <div className="reveal-group mx-auto w-full max-w-7xl">
          <article className="glass-card reveal rounded-3xl p-8 sm:p-14">
            <p className="section-label">04 / Contact</p>
            <h2 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
              Let&apos;s build your next
              <span className="text-gradient block">high-impact digital product.</span>
            </h2>
            <a
              href="mailto:hello@portfolio.dev"
              className="mt-9 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
            >
              hello@portfolio.dev
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
