'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const loaderRef = useRef(null);
  const loaderTextRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    // gsap.context() es la forma recomendada de usar GSAP en React.
    // Agrupa todas las animaciones y facilita la limpieza cuando el componente se desmonta.
    const ctx = gsap.context(() => {
      // 1. Animación del Preloader
      gsap
        .timeline()
        .to(loaderTextRef.current, { opacity: 0, duration: 0.5, delay: 1 })
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power2.inOut',
        });

      // 2. Animación del Hero con Scroll
      // Estado inicial de la imagen (más grande y un poco desplazada para evitar bordes)
      gsap.set(heroImageRef.current, { scale: 1.25, yPercent: -10 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: '+=100%', // La animación durará lo que tarde el usuario en scrollear el 100% de la altura de la ventana
            scrub: true, // Conecta la animación directamente al scroll
            pin: true, // ¡Esta es la propiedad mágica que fija la sección!
          },
        })
        .to(heroImageRef.current, { scale: 1, yPercent: 0, ease: 'none' }, 0) // La imagen vuelve a su tamaño original
        .to(heroTextRef.current, { opacity: 0, y: -150, ease: 'power1.in' }, 0); // El texto se desvanece y sube

      // 3. Animación para las secciones de contenido
      // Usamos una clase común para seleccionar todas las secciones que queremos animar
      gsap.utils.toArray('.gsap-section').forEach((section) => {
        gsap.from(section as HTMLElement, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section as HTMLElement,
            start: 'top 85%', // La animación empieza cuando el 85% de la sección es visible
            toggleActions: 'play none none none',
          },
        });
      });
    });

    return () => ctx.revert(); // Función de limpieza que revierte todas las animaciones del contexto.
  }, []);

  return (
    <>
      {/* Preloader de carga */}
      <div
        ref={loaderRef}
        className="fixed top-0 left-0 w-full h-full bg-pink-50 z-50 flex items-center justify-center"
      >
        <div ref={loaderTextRef} className="animate-pulse">
          <Image
            src="/logos/arisa-logo-bg-white.jpg"
            alt="Logo Arisa Bikinis"
            width={300}
            height={80}
            className="w-40 h-auto mx-auto"
            priority
          />
        </div>
      </div>

      <main>
        {/* Secciones minimalistas con imagen de fondo y CTA en la parte inferior */}
        {[
          {
            img: '/images/hero-three.webp',
            cta: 'Descubre la nueva colección',
            link: '/catalogo',
          },
          {
            img: '/images/hero-one.webp',
            cta: 'Ver productos destacados',
            link: '/catalogo',
          },
          {
            img: '/images/hero-two.webp',
            cta: 'Conoce nuestra historia',
            link: '/nosotros',
          },
          {
            img: '/images/hero-four.webp',
            cta: 'Contáctanos',
            link: '/#contacto',
          },
        ].map((section, idx) => (
          <section
            key={idx}
            className="relative h-screen w-full flex items-end justify-center overflow-hidden snap-start"
            style={{
              backgroundImage: `url('${section.img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 w-full flex justify-center pb-30">
              <Link href={section.link}>
                <span className="block px-8 py-4 border border-white rounded text-white text-lg font-semibold bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 shadow-lg">
                  {section.cta}
                </span>
              </Link>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
