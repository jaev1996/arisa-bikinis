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

      <main className="bg-white text-black">
        {/* Hero principal */}
        <section
          ref={heroSectionRef}
          className="relative h-screen flex items-center justify-center text-white overflow-hidden"
        >
          <div
            ref={heroImageRef}
            className="absolute top-0 left-0 w-full h-full bg-cover"
            style={{
              backgroundImage: `url('/images/hero.jpg')`,
              backgroundPosition: 'center 60%',
            }}
          />
          <div className="bg-black/40 w-full h-full absolute top-0 left-0 z-10" />
          <div ref={heroTextRef} className="z-20 text-center max-w-xl px-4 w-full">
            <h1 className="text-6xl sm:text-6xl font-extrabold mb-6 drop-shadow-lg text-primary">
              ARISA BIKINIS
            </h1>
            <h2 className="text-xl sm:text-3xl font-semibold mb-4 text-white drop-shadow font-mono">
              Descubre tu estilo bajo el sol
            </h2>
            <p className="mb-8 text-base sm:text-lg text-white drop-shadow font-mono">
              Bikinis con personalidad, para mujeres auténticas. Vive el verano
              con confianza y estilo.
            </p>
            <Link
              href="/catalogo"
              className="bg-accent hover:bg-primary hover:text-secondary transition-all duration-300 px-4 sm:px-6 py-2 sm:py-3 rounded text-primary font-semibold text-sm sm:text-base"
            >
              Ver Catálogo
            </Link>
          </div>
        </section>

        {/* Categorías */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 text-center gsap-section">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">
            Explora nuestras categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              { nombre: 'Bikinis', imagen: '/images/cat-bikini.jpeg' },
              { nombre: 'Enterizos', imagen: '/images/cat-enterizo.jpeg' },
              { nombre: 'Trikinis', imagen: '/images/cat-trikini.jpeg' },
            ].map((cat) => (
              <Link href={`/catalogo?tipo=${cat.nombre.toLowerCase()}`} key={cat.nombre}>
                <div className="rounded overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                  <img
                    src={cat.imagen}
                    alt={cat.nombre}
                    className="w-full h-56 sm:h-[400px] object-cover"
                  />
                  <div className="bg-black text-white p-2 sm:p-4 font-semibold text-base sm:text-lg">
                    {cat.nombre}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ¿Quiénes somos? */}
        <section className="bg-accent/20 py-12 sm:py-20 px-4 sm:px-6 gsap-section">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <img src="/images/about-us.jpeg" alt="Nosotros" className="w-full h-56 sm:h-[400px] object-cover rounded-lg shadow-md mb-6 md:mb-0" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                ¿Quiénes somos?
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-4 font-mono">
                En <strong>Arisa Bikinis</strong>, celebramos la belleza y la
                autenticidad de cada mujer. Diseñamos trajes de baño que combinan
                estilo, comodidad y confianza, con materiales de calidad y diseños
                que se adaptan a ti.
              </p>
              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-mono">
                Nacimos en Venezuela con una sola misión: que cada mujer se sienta
                increíble en su propia piel, ya sea en la playa, en la piscina o
                en la ciudad. Únete a nuestra comunidad y lleva el sol contigo.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Nueva Colección */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 text-center bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white rounded-lg shadow-lg mt-8 gsap-section">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
              ¡Nueva Colección Próximamente!
            </h2>
            <p className="text-lg sm:text-2xl mb-6 font-semibold font-mono">
              Prepárate para descubrir los diseños más frescos y atrevidos de
              Arisa Bikinis. Muy pronto disponible.
            </p>
            <div className="flex justify-center">
              <span className="inline-block bg-white text-pink-600 font-bold px-6 py-3 rounded-full text-lg shadow-lg animate-pulse">
                Coming Soon
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
