"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen_url: string;
  tipo: string;
  tallas: string[];
}

export default function CatalogoPage() {
  const [categoria, setCategoria] = useState("");
  const [talla, setTalla] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const porPagina = 8;
  const gridRef = useRef<HTMLElement>(null);

  // Consulta productos desde Supabase
  useEffect(() => {
    setLoading(true);
    supabase
      .from("productos")
      .select("*")
      .then(({ data, error }) => {
        if (error) {
          setProductos([]);
        } else {
          setProductos(data || []);
        }
        setLoading(false);
      });
  }, []);

  // Resetear a la página 1 cuando cambian los filtros
  useEffect(() => {
    setPagina(1);
  }, [categoria, talla, busqueda]);

  // Scroll al inicio del grid cuando cambia la página
  useEffect(() => {
    if (pagina > 1) {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pagina]);

  // Banner images (usar rutas públicas)
  const bannerImages = [
    "/banner/banner-01.webp",
    "/banner/banner-02.webp",
    "/banner/banner-03.webp"
  ];

  // Filtros
  const filtrados = productos.filter((p) => {
    return (
      (!categoria || p.tipo === categoria) &&
      (!talla || (Array.isArray(p.tallas) && p.tallas.includes(talla))) &&
      (!busqueda || (p.nombre && p.nombre.toLowerCase().includes(busqueda.toLowerCase())))
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

      {/* Contenedor del Catálogo */}
      <div className="bg-white p-4 sm:p-8 rounded-2xl">
        <h2 className="text-4xl font-bold text-primary mb-6 text-center">Nuestro Catálogo</h2>

        {/* Filtros y búsqueda */}
        <section ref={gridRef} className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <select
              className="bg-white border-accent text-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition w-full"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              <option value="Bikini">Bikini</option>
              <option value="Enterizo">Enterizo</option>
              <option value="Trikini">Trikini</option>
            </select>
            <select
              className="bg-white border-accent text-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition w-full"
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
            className="bg-white border-accent text-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition w-full md:w-64"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </section>

        {/* Grid de productos */}
        {loading ? (
          <div className="text-center py-12 text-neutral-400">Cargando productos...</div>
        ) : (
          <motion.section
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            variants={gridAnim}
            initial="hidden"
            animate="visible"
          >
            {productosPagina.map((p) => (
              <motion.div
                key={p.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl hover:shadow-pink-200/50 hover:scale-105 hover:ring-2 hover:ring-primary transition-all duration-300 overflow-hidden flex flex-col"
                variants={itemAnim}
              >
                <Link href={`/producto/${p.id}`} className="relative block">
                  <Image
                    src={p.imagen_url}
                    alt={p.nombre}
                    width={400}
                    height={256}
                    className="w-full h-64 object-contain bg-neutral-100"
                    style={{ width: "100%", height: "16rem", objectFit: "contain", backgroundColor: "#f5f5f5" }}
                    priority={true}
                  />
                  <span className="absolute top-2 right-2 bg-accent/90 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                    {p.tipo}
                  </span>
                </Link>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/producto/${p.id}`} className="font-bold text-lg text-primary hover:underline pr-2">
                      {p.nombre}
                    </Link>
                    <p className="font-bold text-primary text-lg whitespace-nowrap">${p.precio}</p>
                  </div>
                  <p className="text-sm text-neutral-600 font-mono mb-4 flex-grow line-clamp-2">{p.descripcion}</p>
                  <div className="mt-auto">
                    <div className="flex gap-2 flex-wrap">
                      {Array.isArray(p.tallas) && p.tallas.map((talla: string) => (
                        <span key={talla} className="bg-accent text-primary/90 text-xs font-medium px-2.5 py-1 rounded-full">
                          {talla}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.section>
        )}

        {/* Paginación */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            className="py-2 px-4 rounded-md bg-accent text-primary font-mono font-semibold transition-colors duration-300 hover:bg-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed"
            disabled={pagina === 1}
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
          >
            Anterior
          </button>
          <span className="px-4 text-neutral-700 font-medium font-mono">Página {pagina} de {totalPaginas}</span>
          <button
            className="py-2 px-4 rounded-md bg-accent text-primary font-mono font-semibold transition-colors duration-300 hover:bg-primary/90 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed"
            disabled={pagina === totalPaginas}
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
          >
            Siguiente
          </button>
        </div>
      </div>
    </main>
  );
}
