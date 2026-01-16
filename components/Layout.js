import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  useEffect(() => {
    // Detect fullscreen changes (F11, Fullscreen API, Mac Command+Control+F)
    const checkFullscreen = () => {
      const isFullscreen = 
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        (window.innerHeight === screen.height && window.innerWidth === screen.width);
      
      if (isFullscreen) {
        document.body.classList.add('fullscreen-mode');
      } else {
        document.body.classList.remove('fullscreen-mode');
      }
    };

    // Listen for both standard and webkit fullscreen events
    window.addEventListener('resize', checkFullscreen);
    document.addEventListener('fullscreenchange', checkFullscreen);
    document.addEventListener('webkitfullscreenchange', checkFullscreen);
    
    // Initial check
    checkFullscreen();
    
    return () => {
      window.removeEventListener('resize', checkFullscreen);
      document.removeEventListener('fullscreenchange', checkFullscreen);
      document.removeEventListener('webkitfullscreenchange', checkFullscreen);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="maincontent">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
