type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MovieDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="p-10 text-white">
      <h1>Filme {id}</h1>
    </main>
  );
}