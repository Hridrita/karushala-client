interface PageProps {
  params: Promise<{ id: string }>; 
}

const CraftDetailsPage = async ({ params }: PageProps) => {
  
  const { id } = await params;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <h1 className="text-2xl font-bold">Craft Details</h1>
      <p className="text-zinc-400 mt-2">Showing details for Craft ID: {id}</p>
    </div>
  );
};

export default CraftDetailsPage;