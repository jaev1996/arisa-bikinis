"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

// Variantes de animación para las secciones
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function NosotrosPage() {
  return (
    <main className="bg-white text-neutral-800">
      {/* Sección Hero */}
      <section className="relative h-[80vh] flex items-center justify-center text-center text-white overflow-hidden bg-pink-100">
        {/* Usamos next/image para optimización, asumiendo que la imagen está en /public/images/ */}
        <Image
          src="/images/hero-bikini.jpeg"
          alt="Fondo de playa para la sección Sobre Nosotros"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
          priority
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <motion.div
          className="relative z-20 p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Nuestra Esencia
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow">
            Más que bikinis, creamos confianza y celebramos tu autenticidad.
          </p>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        {/* Sección 1: Sobre Nosotros */}
        <motion.section
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">Sobre Arisa</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              En <strong>Arisa Bikinis</strong>, celebramos la belleza y la autenticidad de cada mujer. Nacimos en Venezuela con la misión de diseñar trajes de baño que no solo se vean espectaculares, sino que también se sientan como una segunda piel.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              Creemos que la confianza es el mejor accesorio. Por eso, cada pieza está pensada para realzar tu figura y permitirte vivir cada momento bajo el sol con total libertad y estilo.
            </p>
          </div>
          <div className="order-1 md:order-2 h-80 md:h-96 relative flex items-center justify-center bg-white rounded-lg shadow-xl">
            <Image
              src="/images/logo-arisa.png"
              alt="Logo Arisa"
              fill
              style={{ objectFit: "contain" }}
              className="p-8"
              priority
            />
          </div>
        </motion.section>

        {/* Sección 2: Confección */}
        <motion.section
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="h-80 md:h-96 relative">
            <Image src="/images/about-us.jpeg" alt="Detalle de tela y confección de un bikini" layout="fill" objectFit="cover" className="rounded-lg shadow-xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-pink-600 mb-4">Calidad y Diseño</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Cada bikini Arisa es el resultado de un meticuloso proceso de diseño y confección. Seleccionamos cuidadosamente telas de la más alta calidad, que ofrecen protección UV, durabilidad y un ajuste perfecto.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              Nuestros artesanos combinan técnicas tradicionales con tendencias modernas para crear piezas únicas. Desde el primer boceto hasta la última costura, ponemos nuestro corazón en cada detalle.
            </p>
          </div>
        </motion.section>

        {/* Sección 3: Contacto */}
        <motion.section className="text-center bg-pink-50/50 py-12 px-6 rounded-2xl" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <h2 className="text-3xl font-bold text-pink-600 mb-4">Ponte en Contacto</h2>
          <p className="text-neutral-700 leading-relaxed max-w-2xl mx-auto mb-8">¿Tienes preguntas o simplemente quieres saludarnos? Nos encantaría saber de ti. Encuéntranos en nuestras redes sociales o envíanos un correo.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-x-12 gap-y-6 text-lg">
            <a href="mailto:contacto@arisabikinis.com" className="text-pink-600 hover:underline font-semibold">contacto@arisabikinis.com</a>
            <a href="https://instagram.com/arisabikinis" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline font-semibold">@ArisaBikinis</a>
            <span className="text-pink-600 font-semibold">+1 (234) 567-890</span>
          </div>
        </motion.section>
      </div>
    </main>
  );
}