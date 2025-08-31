import productos from '@/data/products.json';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Props = {
  params: { id: string };
};

export default async function ProductoPage({ params }: Props) {
  const { id } = await params
  const producto = productos.find((p) => p.id === id);


  if (!producto) return notFound();

  return (
    <main className="min-h-screen bg-secondary flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl w-full flex flex-col md:flex-row gap-8">
        {/* Imagen del producto */}
        <div className="flex-1 flex items-center justify-center">
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            width={400}
            height={400}
            className="w-full max-w-xs md:max-w-sm rounded shadow object-contain bg-neutral-100"
          />
        </div>
        {/* Detalles del producto */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">{producto.nombre}</h1>
            <p className="text-2xl text-neutral-700 mb-4 font-mono">{producto.descripcion}</p>
            <p className="mb-2 font-mono text-xl text-neutral-700">
              <span className="font-semibold">Tallas:</span> {producto.tallas?.join(', ')}
            </p>
            <p className="text-4xl font-bold text-primary mb-6">${producto.precio}</p>
          </div>
          <div>
            <button className="w-full bg-accent text-primary font-bold px-6 py-3 rounded-full shadow hover:bg-primary hover:text-accent transition text-lg">
              Comprar ahora
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}