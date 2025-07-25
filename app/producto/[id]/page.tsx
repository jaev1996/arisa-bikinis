import productos from '@/data/products.json';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return productos.map((producto) => ({
    id: producto.id,
  }));
}

export default function ProductoPage({ params }: Props) {
  const producto = productos.find((p) => p.id === params.id);

  if (!producto) return notFound();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">{producto.nombre}</h1>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full max-w-md mb-6 rounded shadow"
      />
      <p className="mb-2">{producto.descripcion}</p>
      <p className="mb-1">Tallas: {producto.tallas.join(', ')}</p>
      <p className="font-bold text-pink-600 text-lg">${producto.precio}</p>
    </main>
  );
}
