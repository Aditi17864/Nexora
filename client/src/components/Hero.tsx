import DashboardPreview from './DashboardPreview';

const Hero = () => {
  const avatars = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
  ];

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Text Content */}
          <div className="flex-1 max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="text-base">✦</span>
              Built for Students. Designed for Impact.
            </div>

            {/* Headline */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Manage Every Committee.{' '}
              <br />
              Track Every Event.{' '}
              <br />
              <span className="text-red-600">Empower</span> Every Student.
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Nexora is a smart and modern platform to manage committees, events, tasks, and members — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 mb-10">
              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-red-100 active:scale-95">
                Get Started
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button className="flex items-center gap-2.5 text-gray-700 hover:text-gray-900 font-medium px-4 py-3 transition-colors group">
                <span className="w-9 h-9 rounded-full border-2 border-gray-300 group-hover:border-gray-400 flex items-center justify-center transition-colors">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Watch Video
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  'bg-red-400',
                  'bg-blue-400',
                  'bg-purple-400',
                  'bg-green-400',
                ].map((color, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {['A', 'R', 'S', 'M'][i]}
                  </div>
                ))}
              </div>
              <div>
                <span className="text-gray-900 font-bold">2K+</span>
                <span className="text-gray-500 text-sm ml-1">Students and 100+ Committees</span>
                <br />
                <span className="text-gray-500 text-sm">trust Nexora</span>
              </div>
            </div>
          </div>

          {/* Right: Dashboard Preview */}
          <div className="flex-1 w-full lg:w-auto">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;