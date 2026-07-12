
export default function Loading() {
 
  const skeletonCards = Array.from({ length: 8 });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-zinc-950 min-h-screen">
      
      <div className="space-y-2 mb-12 flex flex-col items-center">
        <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse"></div>
        <div className="h-8 w-64 bg-zinc-800 rounded animate-pulse"></div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skeletonCards.map((_, index) => (
          <div 
            key={index} 
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-4 animate-pulse"
          >
           
            <div className="w-full h-48 bg-zinc-800 rounded-xl"></div>
            
            
            <div className="space-y-3">
              <div className="h-4 bg-zinc-800 rounded w-2/3"></div>
              <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
            </div>
            
            
            <div className="h-10 bg-zinc-800 rounded-lg w-full mt-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}