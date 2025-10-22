export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 py-20">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">YouTube Script Creator</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto text-balance">
          Generate engaging YouTube scripts, analyze tone, and replicate writing styles with AI-powered precision
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm border border-white/20">
            AI-Powered Generation
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm border border-white/20">
            Tone Analysis
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm border border-white/20">
            Style Replication
          </div>
        </div>
      </div>
    </div>
  )
}
