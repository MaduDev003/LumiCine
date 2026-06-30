type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MovieDetailPage({ params }: Props) {
  const { id } = await params;

  return (
     <main className="w-full py-8">
            <div className="px-6 flex justify-center pt-8 pb-20">
                <div className="w-full max-w-275 mx-auto px-6">
                  <h1>Filme {id}</h1>
                </div>
            </div>  
          </main>
    
  );
}