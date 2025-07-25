export default function ProductoPage({ params }: { params: { id: string } }) {
  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold">Detalle del producto</h1>
      <p className="mt-2">ID del producto: {params.id}</p>
    </main>
  );
}
