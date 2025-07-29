"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import productos from "@/data/products.json";



export default function CatalogoPage() {
  const [categoria, setCategoria] = useState("");
  const [talla, setTalla] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const porPagina = 4;

  // Banner images (usar rutas públicas)
  const bannerImages = [
    "/banner/banner-01.webp",
    "/banner/banner-02.webp",
    "/banner/banner-03.webp"
  ];

  // Filtros
  let filtrados = productos.filter((p) => {
    return (
      (!categoria || p.tipo === categoria) &&
      (!talla || p.tallas.includes(talla)) &&
      (!busqueda || p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    );
  });

  // Paginación
  const totalPaginas = Math.ceil(filtrados.length / porPagina);
  const productosPagina = filtrados.slice((pagina - 1) * porPagina, pagina * porPagina);

  // Animación grid
  const gridAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
  };
  const itemAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="p-4 max-w-7xl mx-auto">
      {/* Banner/Slider */}
      <section className="mb-8">
        <div className="w-full h-56 sm:h-80 rounded-lg overflow-hidden flex gap-2">
          {bannerImages.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt={`Banner ${i + 1}`}
              className="object-cover w-1/3 h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
            />
          ))}
        </div>
      </section>

          {/* Filtros y búsqueda */}
          <section className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <select
                className="border rounded px-2 py-1"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                <option value="Bikini">Bikini</option>
                <option value="Enterizo">Enterizo</option>
                <option value="Trikini">Trikini</option>
              </select>
              <select
                className="border rounded px-2 py-1"
                value={talla}
                onChange={(e) => setTalla(e.target.value)}
              >
                <option value="">Todas las tallas</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="border rounded px-2 py-1 w-full sm:w-64"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </section>

          {/* Grid de productos */}
          <motion.section
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            variants={gridAnim}
            initial="hidden"
            animate="visible"
          >
            {productosPagina.map((p) => (
              <motion.div
                key={p.id}
                className="bg-white rounded-lg shadow hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col"
                variants={itemAnim}
              >
                <Link href={`/producto/${p.id}`} className="block">
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <Link href={`/producto/${p.id}`} className="font-bold text-lg text-pink-600 hover:underline mb-2">
                    {p.nombre}
                  </Link>
                  <p className="text-sm text-neutral-700 mb-2">{p.descripcion}</p>
                  <p className="text-xs mb-2">Tallas: {p.tallas.join(", ")}</p>
                  <p className="font-bold text-pink-600 text-lg">${p.precio}</p>
                </div>
              </motion.div>
            ))}
          </motion.section>

          {/* Paginación */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              className="px-3 py-1 rounded bg-pink-600 text-white disabled:bg-neutral-300"
              disabled={pagina === 1}
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
            >
              Anterior
            </button>
            <span className="px-2">Página {pagina} de {totalPaginas}</span>
            <button
              className="px-3 py-1 rounded bg-pink-600 text-white disabled:bg-neutral-300"
              disabled={pagina === totalPaginas}
              onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            >
              Siguiente
            </button>
          </div>
        </main>
      );
    }
