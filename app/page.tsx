'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-white text-black">
      {/* Hero principal */}
      <section
        className="relative min-h-[70vh] sm:h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ 
          backgroundImage: `url('/images/hero-bikini.jpeg')`,
          backgroundPosition: 'center 60%', // centra la modelo en móviles
        }}
      >
        <div className="bg-black/40 w-full h-full absolute top-0 left-0 z-0" />
        <motion.div
          className="z-10 text-center max-w-xl px-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 drop-shadow-lg text-pink-600">Arisa Bikinis</h1>
          <h2 className="text-xl sm:text-3xl font-bold mb-4 text-white drop-shadow">Descubre tu estilo bajo el sol</h2>
          <p className="mb-8 text-base sm:text-lg text-white drop-shadow">Bikinis con personalidad, para mujeres auténticas. Vive el verano con confianza y estilo.</p>
          <Link
            href="/catalogo"
            className="bg-pink-600 hover:bg-pink-700 px-4 sm:px-6 py-2 sm:py-3 rounded text-white font-semibold transition text-sm sm:text-base"
          >
            Ver Catálogo
          </Link>
        </motion.div>
      </section>

      {/* Categorías */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Explora nuestras categorías</h2>
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
                <div className="bg-black text-white p-2 sm:p-4 font-semibold text-base sm:text-lg">{cat.nombre}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ¿Quiénes somos? */}
      <section className="bg-pink-50 py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <img
            src="/images/about-us.jpeg"
            alt="Nosotros"
            className="w-full h-56 sm:h-[400px] object-cover rounded-lg shadow-md mb-6 md:mb-0"
          />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">¿Quiénes somos?</h2>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-4">
              En <strong>Arisa Bikinis</strong>, celebramos la belleza y la autenticidad de cada mujer. Diseñamos trajes de baño que combinan estilo, comodidad y confianza, con materiales de calidad y diseños que se adaptan a ti.
            </p>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
              Nacimos en Venezuela con una sola misión: que cada mujer se sienta increíble en su propia piel, ya sea en la playa, en la piscina o en la ciudad. Únete a nuestra comunidad y lleva el sol contigo.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Nueva Colección */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 text-center bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white rounded-lg shadow-lg mt-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">¡Nueva Colección Próximamente!</h2>
          <p className="text-lg sm:text-2xl mb-6 font-semibold">Prepárate para descubrir los diseños más frescos y atrevidos de Arisa Bikinis. Muy pronto disponible.</p>
          <div className="flex justify-center">
            <span className="inline-block bg-white text-pink-600 font-bold px-6 py-3 rounded-full text-lg shadow-lg animate-pulse">Coming Soon</span>
          </div>
        </div>
      </section>
    </main>
  );
}
