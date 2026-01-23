import { NextSeo } from 'next-seo'
import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

const Landing = () => {
  const videoRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleVideoEnd = () => {
      router.push('/home')
    }

    videoElement.addEventListener('ended', handleVideoEnd)

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd)
    }
  }, [router])
  return (
    <>
      <NextSeo
        title="Nava - Midwest's Trusted Wholesale Distributor"
        description="Experience reliable wholesale distribution with Nava. Smart AI-driven ordering, competitive pricing, and dedicated support for your business."
        openGraph={{
          type: 'website',
        }}
      />
      <div className="landing-section" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center'
      }}>

        <video ref={videoRef} className="video-bg desktop-video" autoPlay muted playsInline>
            <source src="/nava_video_desktop.mp4" type="video/mp4" />
        </video>
        <video className="video-bg mobile-video" autoPlay muted playsInline>
            <source src="/nava_mobile.mp4" type="video/mp4" />
        </video>
        
      </div>

 
    </>
  )
}

export default Landing
