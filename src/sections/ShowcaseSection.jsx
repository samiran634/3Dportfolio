import { useRef, useState, useEffect } from "react"; 
import { gsap } from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import { useGSAP } from "@gsap/react"; 
 
gsap.registerPlugin(ScrollTrigger); 
 
const AppShowcase = () => { 
  const sectionRef = useRef(null); 
  const carouselRef = useRef(null);
  const videoRef = useRef(null);
  const [currentProject, setCurrentProject] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const projects = [
    {
      id: 'signease',
      title: 'SignEase - Document Signature Platform',
      description: 'An online document signature platform with a friendly UI, built with React-VITE & TailwindCSS for a fast, user-friendly experience.',
      video: '/videos/signEase.mp4',
      link: 'https://sign-ease-pro-frontend.vercel.app/',  
      tags: ['React', 'Vite', 'TailwindCSS'],
      tagColors: [
        'bg-blue-100 text-blue-800',
        'bg-green-100 text-green-800',
        'bg-purple-100 text-purple-800'
      ]
    },
    {
      id: 'quizo',
      title: 'QuizO - Interactive Quiz Game',
      description: 'A fun and engaging quiz game with interactive features and smooth user experience.',
      video: '/videos/QuizO.mp4',
      link: 'https://quize-app-qan3.onrender.com/',  
      tags: ['JavaScript', 'Quiz', 'Interactive'],
      tagColors: [
        'bg-yellow-100 text-yellow-800',
        'bg-orange-100 text-orange-800',
        'bg-amber-100 text-amber-800'
      ],
      bgColor: 'bg-[#FFEFDB]'
    },
    {
      id: 'myshop',
      title: 'MyShop - eCommerce Platform',
      description: 'A complete eCommerce website built with core JavaScript and modern features for seamless shopping experience.',
      video: '/videos/MyShop.mp4',
      link: 'https://shoping-hut.netlify.app/',  
      tags: ['Vanilla JS', 'eCommerce', 'Shopping'],
      tagColors: [
        'bg-red-100 text-red-800',
        'bg-pink-100 text-pink-800',
        'bg-rose-100 text-rose-800'
      ],
      bgColor: 'bg-[#FFE7EB]'
    }
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for mobile viewport detection
  useEffect(() => {
    if (!isMobile || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [currentProject, isMobile]);

  // Reset video loaded state when project changes
  useEffect(() => {
    setIsVideoLoaded(false);
    setIsHovered(false);
  }, [currentProject]);

  const shouldLoadVideo = isMobile ? isInViewport : isHovered;

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };
 
  useGSAP(() => { 
    // Animation for the main section 
    gsap.fromTo( 
      sectionRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.5 } 
    ); 
 
    // Animation for card transitions
    gsap.fromTo(
      carouselRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, [currentProject]); 
 
  const currentProjectData = projects[currentProject];

  return ( 
    <div id="work" ref={sectionRef} className="app-showcase min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-600 py-20"> 
      <div className="max-w-6xl mx-auto px-6 w-full"> 
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h1>
          <p className="text-xl text-gray-200">Explore my latest work and creations</p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-50 rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-50 rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Project Card */}
          <div ref={carouselRef} className="mx-8">
            <div 
              className="bg-black rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]"
              onMouseEnter={() => !isMobile && setIsHovered(true)}
              onMouseLeave={() => !isMobile && setIsHovered(false)}
            >
              {/* Video Section */}
              <div ref={videoRef} className={`relative overflow-hidden ${currentProjectData.bgColor || 'bg-gray-100'}`}>
                {/* Placeholder/Thumbnail */}
                <div className={`w-full h-80 md:h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center transition-opacity duration-300 ${shouldLoadVideo && isVideoLoaded ? 'opacity-0 absolute inset-0' : 'opacity-100'}`}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                      <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">
                      {isMobile ? 'Video will load when in view' : 'Hover to preview'}
                    </p>
                  </div>
                </div>

                {/* Actual Video */}
                {shouldLoadVideo && (
                  <video 
                    key={currentProjectData.id}
                    src={currentProjectData.video} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    onLoadedData={handleVideoLoad}
                    className={`w-full h-80 md:h-96 object-cover transition-opacity duration-300 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Live Site Link */}
                <a
                  href={currentProjectData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <span>View Live</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              
              {/* Content Section */}
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-0">
                    {currentProjectData.title}
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>{currentProject + 1}</span>
                    <span>/</span>
                    <span>{projects.length}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
                  {currentProjectData.description}
                </p>
                
                {/* Technology Tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {currentProjectData.tags.map((tag, index) => (
                    <span 
                      key={tag}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${currentProjectData.tagColors[index]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Visit Website Button */}
                <div className="flex justify-center md:justify-start">
                  <a
                    href={currentProjectData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
                  >
                    <span>Visit Website</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-12 space-x-3">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProject(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentProject 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div> 
    </div> 
  ); 
}; 
 
export default AppShowcase;