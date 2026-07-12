import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center max-w-xl z-10 space-y-6">
        
        <h1 className="text-9xl font-black tracking-extrawide text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse select-none">
          404
        </h1>

       
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
            Page not found
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto">
            Sorry! The page you are looking for may have been deleted, or you may have used an incorrect URL.
          </p>
        </div>

        
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-zinc-950 bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-95 text-center"
          >
           Back to Home
          </Link>
          
          <Link
            href="/all-craft" 
            className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 rounded-xl transition-all duration-300 active:scale-95 text-center"
          >
            Explore categories
          </Link>
        </div>
      </div>

     
      <div className="absolute bottom-8 text-xs text-zinc-600 tracking-widest uppercase pointer-events-none">
        Karushala • Crafting Futures
      </div>
    </div>
  );
}