import { useEffect, useRef, useState } from 'react';
import { NextSeo } from 'next-seo'
import Link from '../components/ActiveLink'
import Layout from '../components/Layout'
import Image from '../components/Image'
import styles from '../styles/Home.module.scss'
import SimpleSlider from '../components/SimpleSlider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { submitSupplyChainForm } from '../services/supplyChainService';
import InputMask from 'react-input-mask';

const Home = () => {
  const fadeLeftRefs = useRef([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',// last 10 digits (validation)
    phoneFull: '',  // full 12 digits (+91xxxxxxxxxx)
    businessName: '',
    businessType: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [invalidFields, setInvalidFields] = useState({});
  const [loading, setLoading] = useState(false);
  //const [isFullscreen, setIsFullscreen] = useState(false);


  const [activeSlide, setActiveSlide] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [brandsCount, setBrandsCount] = useState(0);
  const [storesCount, setStoresCount] = useState(0);
  const counterSectionRef = useRef(null);



 
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const invalid = {};
    const newErrors = {};

    if (!formData.firstName.trim()) {
      invalid.firstName = true;
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      invalid.lastName = true;
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      invalid.email = true;
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      invalid.email = true;
      newErrors.email = 'Enter a valid email address';
    }

    // if (!formData.phone) {
    //   newErrors.phone = 'Phone number is required';
    // } else if (!/^\d{10}$/.test(formData.phone)) {
    //   newErrors.phone = 'Phone number must be 10 digits';
    // }

    if (!formData.phone) {
      invalid.phone = true;
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      invalid.phone = true;
      newErrors.phone = 'Phone number must be 10 digits';
    }



    if (!formData.businessName.trim()) {
      invalid.businessName = true;
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.businessType.trim()) {
      invalid.businessType = true;
      newErrors.businessType = 'Business type is required';
    }

    setInvalidFields(invalid);
    setErrors(newErrors);

    return Object.keys(invalid).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setInvalidFields((prev) => ({
      ...prev,
      [name]: false,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await submitSupplyChainForm(formData);

      if (response?.success) {
        toast.success(response.message || "Form submitted successfully");

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          phoneFull: "",
          businessName: "",
          businessType: "",
          message: "",
        });

        setErrors({});
        setInvalidFields({});
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const isAnyFieldFilled = () => {
    return Object.values(formData).some(
      (value) => value && value.toString().trim() !== ''
    );
  };




  // const row1 = categories.filter(cat => cat.direction === 'left');
  // const row2 = categories.filter(cat => cat.direction === 'right');


  const mainSectionRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    const mainSection = mainSectionRef.current;

    if (!mainSection || cards.length === 0) return;

    let rafId = null;
    let ticking = false;

    const updateCards = () => {
      const viewportWidth = window.innerWidth;

      // Disable effect on mobile/tablet
      if (viewportWidth < 993) {
        cards.forEach((card) => {
          if (card) {
            card.classList.add(styles.visible);
            card.style.transform = "none";
            card.style.top = "0";
            card.style.position = "relative";
          }
        });
        ticking = false;
        return;
      }

      const sectionRect = mainSection.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const windowHeight = window.innerHeight;

      // Calculate active card based on scroll position
      let activeCard = 0;
      const sectionEndTrigger = -sectionHeight + windowHeight;
      if (sectionTop <= 50 && sectionTop > sectionEndTrigger) {
        const scrolled = Math.abs(sectionTop - 50);
        const cardHeight = 250; // Distance to scroll before next card overlays
        activeCard = Math.min(Math.floor(scrolled / cardHeight), cards.length - 1);
      } else if (sectionTop <= sectionEndTrigger) {
        // Section has scrolled past its end — keep last card overlayed
        activeCard = cards.length - 1;
      } else if (sectionTop > 50) {
        activeCard = 0;
      }

      const cardSpacing = 280; // Space between cards when not overlaying
      const overlayOffset = 100; // Offset when cards overlay

      // Update each card position
      cards.forEach((card, index) => {
        if (!card) return;

        card.classList.add(styles.visible);
        card.style.position = "absolute";
        card.style.left = "0";
        card.style.right = "0";
        card.style.transition = "all 0.7s ease-out";
        card.style.zIndex = index + 1;

        let topPosition = 0;

        // Initially, all cards are stacked vertically with full spacing
        if (activeCard === 0) {
          topPosition = index * cardSpacing;
        }
        // As we scroll, cards start to overlay
        else if (index < activeCard) {
          // Cards that should be overlaying
          topPosition = index * overlayOffset;
        } else if (index === activeCard) {
          // Current active card moving to overlay position
          topPosition = index * overlayOffset;
        } else {
          // Cards below active card - still in normal position
          const overlayedCards = activeCard;
          topPosition = (overlayedCards * overlayOffset) + ((index - overlayedCards) * cardSpacing);
        }

        card.style.top = `${topPosition}px`;
        card.style.transform = "translateY(0)";
        card.style.opacity = "1";
      });
      // ensure wrapper is positioned so absolutely positioned cards don't affect layout
      const cardsWrapper = cardsWrapperRef.current;
      if (cardsWrapper) {
        const firstCard = cards[0];
        if (firstCard) {
          const cardHeight = firstCard.offsetHeight;
          const cardGap = 30;
          // keep wrapper just tall enough for the visible stacked area to avoid huge section height
          const visible = Math.max(1, Math.min(cards.length, 2));
          cardsWrapper.style.position = 'relative';
          cardsWrapper.style.minHeight = `${cardHeight + (visible - 1) * cardGap}px`;
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateCards);
        ticking = true;
      }
    };

    // Initial update
    updateCards();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateCards, { passive: true });

  //     const handleFullscreenChange = () => {
  //   if (!document.fullscreenElement) {
  //     document.body.classList.remove('fullscreen-mode');
  //   }
  // };

 // document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCards);
    //  document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);


   


  // Typewriter heading
    const headingRef = useRef(null);
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [headingVisible, setHeadingVisible] = useState(false);

    const fullText = `The Midwest's Trusted
    Partner To
    Empower Local
    Businesses`;


  const contactRef = useRef(null)
  const footerRef = useRef(null)
  const [hideGetTouch] = useState(false)

  useEffect(() => {
    if (!contactRef.current && !footerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.fadeLeftVisible);
          } else {
            // Remove class when element is no longer intersecting to reverse animation
            entry.target.classList.remove(styles.fadeLeftVisible);
          }
        });
      },
      {
        threshold: 0.3
      }
    );

    fadeLeftRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [])


  // Trigger typewriter when heading is visible
  useEffect(() => {
    if (!headingRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          setVisionVisible(true);
          setMissionVisible(true);
          observer.disconnect(); // run once
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(headingRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!headingVisible || currentIndex >= fullText.length) return;

    const timeout = setTimeout(() => {
      setDisplayedText((prev) => prev + fullText[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, 50);

    return () => clearTimeout(timeout);
  }, [headingVisible, currentIndex, fullText]);


  // Parallax states
  const sliderRef = useRef(null)
  const [translateX, setTranslateX] = useState(0) // initial offset

  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const webSectionRef = useRef(null);
  const [visionVisible, setVisionVisible] = useState(false);
  const [missionVisible, setMissionVisible] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      // Slider parallax effect
      if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight

        const start = windowHeight
        const end = windowHeight * 0.3

        const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1)
        setTranslateX(1 * (1 - progress))
      }

      const vh = window.innerHeight

      // Use section position to toggle both Vision and Mission together (desktop & mobile)
      if (webSectionRef.current) {
        const sr = webSectionRef.current.getBoundingClientRect()
        const shouldShow = sr.top <= vh * 0.5 && sr.bottom > 0
        setVisionVisible(shouldShow)
        setMissionVisible(shouldShow)
      } else {
        // fallback: check elements individually
        const checkAtHalf = (el, setFn) => {
          if (!el) return
          const r = el.getBoundingClientRect()
          if (r.top <= vh * 0.5 && r.bottom > 0) {
            setFn(true)
          } else {
            setFn(false)
          }
        }

        checkAtHalf(visionRef.current, setVisionVisible)
        checkAtHalf(missionRef.current, setMissionVisible)
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, []);

  // Counter Animation Effect
  useEffect(() => {
    if (!counterSectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate counters
          const animateCounter = (start, end, setter, duration = 2000) => {
            const startTime = Date.now();
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const value = Math.floor(start + (end - start) * progress);
              setter(value);
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            animate();
          };

          animateCounter(0, 4, setYearsCount);
          animateCounter(0, 30, setBrandsCount);
          animateCounter(0, 80, setStoresCount);

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(counterSectionRef.current);

    return () => observer.disconnect();
  }, []);

  // const addToRefs = (el, index) => {
  //   if (el && !cardsRef.current.includes(el)) {
  //     cardsRef.current[index] = el;
  //   }
  // };

  const addToRefs = (el, index) => {
  if (el && !cardsRef.current[index]) {
    cardsRef.current[index] = el;
  }
};

  const cardsData = [
    {
      id: 1,
      icon: '/icon_smart_ai.svg',
      width: 44,
      height: 44,
      title: 'Smart AI Driven Ordering',
      text: 'Our AI-powered platform streamlines ordering by providing real-time stock visibility, simplified purchasing, and a logistics network that ensures accurate, timely deliveries, keeping your operations running smoothly.'
    },
    {
      id: 2,
      icon: '/icon_schedule.svg',
      width: 44,
      height: 44,
      title: 'On Schedule Fulfillment ',
      text: 'Consistent, predictable deliveries tailored to the needs of your business.'
    },
    {
      id: 3,
      icon: '/icon_clear.svg',
      width: 44,
      height: 44,
      title: 'Clear, Competitive Pricing',
      text: 'Honest, transparent pricing that helps retailers stay profitable.'
    },
    {
      id: 4,
      icon: '/icon_dedicate.svg',
      width: 48,
      height: 48,
      title: 'Dedicated Client Care ',
      text: 'A knowledgeable, responsive support team committed to your success.'
    },
    {
      id: 5,
      icon: '/icon_wide_rage.svg',
      width: 44,
      height: 44,
      title: 'Wide Range Product Selection',
      text: 'A constantly evolving catalog featuring today\'s highest demand items and trusted brands.'
    }
  ];


const slides = [
  { src: '/gas_stations.jpg', caption: 'Gas Stations', href: '' },
  { src: '/convenience_stores.jpg', caption: 'Convenience Stores', href: '' },
  { src: '/liquor_stores.jpg', caption: 'Liquor Stores', href: '' },
  { src: '/retail_shops.jpg', caption: 'Retail Shops', href: '' },
  { src: '/grocery_markets.jpg', caption: 'Grocery Markets', href: '' },
  { src: '/small_businesses.jpg', caption: 'Small Businesses', href: '' },
  { src: '/retail_shops.jpg', caption: 'Independent Retailers', href: '' },
];

  return (
    <Layout>
      <NextSeo
        title="Nava"
        description=""
        openGraph={{
          type: 'website',
        }}
      />
      <div className="homebanner homepage">
        {/* <figure className='bannerImage'>
          <Image src="/hm_banner1.jpg" width={1440} height={945} alt="NextSSS" />
        </figure> */}
       <figure className="bannerImage">
          <picture>
           
             <source
              media="(max-width: 567px)"
              srcSet="/homebannernew_mob.jpg"
            />

            {/*
             <source
              media="(max-width:900px)"
              srcSet="/ipadtruck.jpg"
            /> */}

          
            <Image
              src="/homebannernew.jpg"
              width={1440}
              height={945}
              alt="NextSSS"
              priority
              style={{ width: '100%', height: 'auto' }}
            />
          </picture>
        </figure>
        <div className="bannerText">
          <div className="container">
            <div className="bannerDesc">
              <span className="tagLineBtn">Trusted by Retailers Across the US</span>
              <p className="title"> Redefining wholesale for a new era. </p>
              <span> We provide top-selling products, competitive prices, and fast, reliable fulfillment to businesses across the Chicagoland area and beyond. </span>
              <Link href='/customer-application' className="btn_comman btn_primary"> Start Your Journey
                 <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.3623 8.06836H12.7758" stroke="white" strokeWidth="1.34478" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.06836 3.36328L12.7751 8.07L8.06836 12.7767" stroke="white" strokeWidth="1.34478" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/*<div className="scroll_img marquee">
        <Image src="/marquee_img.png" width={1440} height={72} alt="" />
      </div>*/}
      
      <div className="aboutSection sectionpadding" id="about" ref={mainSectionRef}>
        <div className="container"> 
          <div className="about-grid"> 
            <div className="about-content p_fnt26"> 
              <h2 className="hd2">What We Do</h2> 
              <p> 
                Nava Distributors is a trusted, family-owned wholesale distributor providing businesses with dependable supply, modern ordering tools, and exceptional service. Our focus is helping retailers stay stocked, competitive, and profitable. 
              </p> 
              <p> 
                For over four years, Nava Wholesale has proudly served the Chicagoland area as a leading wholesale distributor. Our mission is to provide retailers with top-selling products, competitive pricing, and dependable service that keeps them ahead in today&apos;s fast-paced marketplace. 
              </p> 
              <Link href="/customer-application" className='btn_comman'>Partner With Nava</Link>
            </div> 
            <div className="about-cards"> 
              <div className='Home_cardsWrapper' ref={cardsWrapperRef}> 
                {cardsData.map((card, index) => (
                  <div 
                    key={card.id} 
                    className="info-card" 
                    ref={(el) => addToRefs(el, index)} 
                    data-index={index}
                  > 
                  <div className="cardtitlebox">
                    <div className="icon-circle"> 
                      <span className="counter">{String(index + 1).padStart(2, '0')}</span>
                    </div> 
                    <h4 className='hd24'>{card?.title}</h4> 
                    </div>
                    <p> 
                      {card?.text} 
                    </p> 
                  </div>
                ))} 
              </div> 
            </div> 
          </div> 
        </div> 
      </div>
      <div className="counter-section sectionpadding" ref={counterSectionRef}>
        <div className="container">
          <div className="counter-grid">
            <div className="counter-item">
              <h3 className="counter-number">{yearsCount}+</h3>
              <p className="counter-label">Years in Business</p>
            </div>
            <div className="counter-item">
              <h3 className="counter-number">{brandsCount}+</h3>
              <p className="counter-label">Partnered Brands</p>
            </div>
            <div className="counter-item">
              <h3 className="counter-number">{storesCount}+</h3>
              <p className="counter-label">Stores</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="who_we_are-section sectionpadding"
        style={{
          backgroundImage: `url(${slides[activeSlide].src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <div className="container">
          <h2 className="hd2 text-center">Who We Serve</h2>
          <div className='p_fnt26 maxwidth990 text-center'>
            <p>Whether you operate a single storefront or a multi-location business, NAVA provides a dependable partnership built on performance and trust. With NAVA, you gain more than a distributor, you gain a long-term partner.</p>
          </div>
        </div>

        <div className="industrial_traing">
          <div className="container- comman_slider">
            <div ref={sliderRef} style={{ overflow: 'hidden' }}>
              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  transform: `translateX(${translateX}px)`,
                  transition: 'transform 0.3s ease-out',
                  willChange: 'transform'
                }}
              >
                <SimpleSlider
                  items={slides}
                  onAfterChange={setActiveSlide}
                />
              </div></div>
          </div>
        </div>
        <div className={`sticky-get-touch ${hideGetTouch ? 'hide' : ''}`}>
          <Link className="btn_get_touch" href="#contact">
            <span>
              <i>
                <Image src="/btn_icon.svg" width={58} height={58} alt="" />
              </i>
              <strong>Get in Touch</strong>
            </span>
          </Link>
        </div>

      </div>





      <div className="websection-section sectionpadding" ref={webSectionRef}>
        <div className="container">
          <div className="row align-items-center- fnt26">
            <div className="col-lg-7">
              <h2
                ref={headingRef}
                className="hd74"
                style={{
                  minHeight: '220px',
                  position: 'relative',
                }}
              >
                {displayedText}

                {currentIndex < fullText.length && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '3px',
                      height: '1em',
                      background: 'currentColor',
                      marginLeft: '4px',
                      animation: 'blink 0.7s infinite',
                      verticalAlign: 'bottom'
                    }}
                  />
                )}

                <style>{`
                  @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                  }
                `}</style>
              </h2>
             {currentIndex === fullText.length && (
                <a href="#core_values" className="whiteBorderBtn fadeInBtn">
                  Learn More
                </a>
              )}
            </div>
            <div className="col-lg-5 p_fnt26">

              {/* Mission Statement - Blurred Initially */}
              <div
                ref={missionRef}
                className="info-box"
                style={{
                  transition: 'all 1s ease-out',
                  opacity: missionVisible ? 1 : 0.5,
                  filter: missionVisible ? 'blur(0px)' : 'blur(8px)',
                  transform: missionVisible ? 'translateY(0)' : 'translateY(50px)'
                }}
              >
                <div className="info-icon">
                  <Image src="/icon_mission.svg" width={39} height={48} alt="" />
                </div>
                <div className="info-content">
                  <h3 className='hd34 colorwite'>Mission Statement</h3>
                  <p>To provide fast, reliable, and affordable wholesale supply powered by family values, modern technology, and a commitment to long-term partnerships.</p>
                </div>
              </div>

              {/* Vision Statement - Always Visible */}
              <div
                ref={visionRef}
                className="info-box"
                style={{
                  transition: 'all 1s ease-out',
                  opacity: visionVisible ? 1 : 0.5,
                  filter: visionVisible ? 'blur(0px)' : 'blur(8px)',
                  transform: visionVisible ? 'translateY(0)' : 'translateY(50px)'
                }}
              >
                <div className="info-icon">
                  <Image src="/icon_vision.svg" width={41} height={41} alt="" />
                </div>
                <div className="info-content">
                  <h3 className='hd34 colorwite'>Vision Statement</h3>
                  <p>To become the most trusted, technology-driven wholesale distributor in the region, known for reliability, transparency, and exceptional service.</p>
                </div>
              </div>

         
            </div>
          </div>
        </div>
      </div>


      <div className="core_values-section sectionpadding" id="core_values">
        <div className="container">
          <div className="maxwidth770 p_fnt26">
            <h2 className="hd2">Core Values</h2>
            <p>Nava Distributors is a trusted, family-owned wholesale distributor providing businesses with dependable supply, modern ordering tools, and exceptional service. </p>
              <p>Our focus is helping retailers stay stocked, competitive, and profitable. For over four years, Nava Wholesale has proudly served the Chicagoland area as a leading wholesale distributor.</p>
          </div>
          <div className="list_values">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="custom-card">
                  <div className="icon-box">
                    <span className='icon_inno'></span>
                  </div>
                  <div>
                    <h3 className="hd26">Innovation</h3>
                    <p>We embrace technology that makes the wholesale experience smarter.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="custom-card">
                  <div className="icon-box">
                    <span className='icon_integrity'></span>
                  </div>
                  <div>
                    <h3 className="hd26">Integrity</h3>
                    <p>We operate with honesty, accountability, and respect in every interaction.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="custom-card">
                  <div className="icon-box">
                    <span className='icon_reliability'></span>
                  </div>
                  <div>
                    <h3 className="hd26">Reliability</h3>
                    <p>Precision, consistency, and dependable delivery define how we serve.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="custom-card">
                  <div className="icon-box">
                    <span className='icon_growth'></span>
                  </div>
                  <div>
                    <h3 className="hd26">Growth</h3>
                    <p>We succeed when our customers succeed and your progress fuels ours.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="product_categories-section sectionpadding" id="products">
        <div className="container">
          <div className="maxwidth990 p_fnt26 text-center">
            <h2 className="hd2">Our Products</h2>
            <p>Whether you operate a single storefront or a multi-location business, Nava provides a dependable partnership built on performance and trust. With Nava, you gain more than a distributor, you gain a long-term partner.</p>
            <div>
              <Link className="btn_comman btn_primary2" href="/product-catalog">Explore Products</Link>
            </div>
          </div>
        </div>
        <div className="marquee">
          <div className="marquee__track">
            <Image src="/marquee_img.png" width={1440} height={72} alt="" />
            <Image src="/marquee_img.png" width={1440} height={72} alt="" />
            <Image src="/marquee_img.png" width={1440} height={72} alt="" />
            <Image src="/marquee_img.png" width={1440} height={72} alt="" />
          </div>
        </div>
      </div>
      {/* <div className="categories sectionpadding paddtop0">

        <div className="slider-wrapper">
          <div className="slider-track scroll-left">
            {[...categories, ...categories].map((category, index) => (
              <div key={`row1-${index}`} className="category-card">
                <img
                  src={category.image}
                  alt={category.title}
                  className="category-image"
                />
                <div className="category-overlay"></div>
                <div className="category-content">
                  <h3 className="category-title">{category.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="slider-wrapper">
          <div className="slider-track scroll-right">
            {[...categories, ...categories].map((category, index) => (
              <div key={`row2-${index}`} className="category-card">
                <img
                  src={category.image}
                  alt={category.title}
                  className="category-image"
                />
                <div className="category-overlay"></div>
                <div className="category-content">
                  <h3 className="category-title">{category.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div> */}
      
      <div
        className="hm_contact-section sectionpadding"
        id="contact"
        ref={contactRef}
      >
        <div className="container">
          <div>
            <div className="row align-items-center">
              <div className="col-lg-6 col-sm-12">
                <div className="p_fnt26 maxwidth580">
                  <h2 className="hd2">Ready to upgrade <br />your supply chain?</h2>
                  <p>Have a question or need a quote?<br />
                    Fill out the form and a member of our team will get back to you shortly.</p>
                  <div className="address">
                    <ul className="contactDetail">
                      <li>
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        <a href="https://www.google.com/maps/place/111+S+Lombard+Rd+%23+2,+Addison,+IL+60101,+USA/@41.9263186,-88.0248963,567m/data=!3m2!1e3!4b1!4m6!3m5!1s0x880fad68bd400001:0xbdf111d4a11aec78!8m2!3d41.9263146!4d-88.0223214!16s%2Fg%2F11mbn7crsh?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D" target="_blank" rel="noopener noreferrer">111 S Lombard Rd Ste 2 Addison, IL 60101</a>
                      </li>
                      <li>
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        <Link href="tel:+18476604308">+1 (847) 660-4308</Link>
                      </li>
                      <li>
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                        <Link href="mailto:support@navadistributor.com">support@navadistributor.com</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="formContect">
                  <div className="formarea">
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label className="lable_text">First Name<span className="required">*</span></label>
                            {/* <input type="text" placeholder="" name="txtfname" maxLength="200" minLength="2" className="form-control required" /> */}
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className={`form-control ${invalidFields.firstName ? styles.inputError : ''}`}
                            />
                            {errors.firstName && (
                              <small className="text-danger">{errors.firstName}</small>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label className="lable_text">Last Name<span className="required">*</span></label>
                            {/* <input type="text" placeholder="" name="txtfname" maxLength="200" minLength="2" className="form-control required" /> */}
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className={`form-control ${invalidFields.lastName ? styles.inputError : ''}`}
                            />
                            {errors.lastName && (
                              <small className="text-danger">{errors.lastName}</small>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label className="lable_text">Email<span className="required">*</span></label>
                            {/* <input type="text" placeholder="" name="txtemail" maxLength="200" minLength="2" className="form-control required email" /> */}
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`form-control ${invalidFields.email ? styles.inputError : ''}`}
                            />
                            {errors.email && (
                              <small className="text-danger">{errors.email}</small>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label className="lable_text">Primary Number<span className="required">*</span></label>
                            {/* <input type="text" placeholder="" name="txtphone" maxLength="10" minLength="10" className="form-control required number" /> */}
                            {/* <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              maxLength="10"
                              className={`form-control ${invalidFields.phone ? styles.inputError : ''}`}
                            /> */}

                            <InputMask
                              mask="+01 (999) - 9999 - 999"
                              value={formData.phoneFull}
                              onChange={(e) => {
                                const digitsOnly = e.target.value.replace(/\D/g, '');

                                // Full number including country code (01xxxxxxxxxx)
                                const fullNumber = digitsOnly;

                                // Last 10 digits only
                                const last10 = digitsOnly.slice(-10);

                                setFormData((prev) => ({
                                  ...prev,
                                  phone: last10,         // for validation
                                  phoneFull: fullNumber // for API
                                }));

                                setErrors((prev) => ({ ...prev, phone: '' }));
                                setInvalidFields((prev) => ({ ...prev, phone: false }));
                              }}
                            >
                              {(inputProps) => (
                                <input
                                  {...inputProps}
                                  type="text"
                                  className={`form-control ${errors.phone ? styles.inputError : ''}`}
                                  // className={`form-control ${invalidFields.phone ? styles.inputError : ''}`}
                                  placeholder="+01 (xxx) - xxxx - xxx"
                                />
                              )}
                            </InputMask>
                            {errors.phone && (
                              <small className="text-danger">{errors.phone}</small>
                            )}

                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label className="lable_text">Business Name<span className="required">*</span></label>
                            <input type="text" placeholder="" name="businessName" value={formData.businessName} onChange={handleChange}
                              maxLength="10" minLength="10" className={`form-control ${invalidFields.businessName ? styles.inputError : ''}`} />
                            {errors.businessName && (
                              <small className="text-danger">{errors.businessName}</small>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label className="lable_text">Business Type<span className="required">*</span></label>
                            <input type="text" placeholder="" name="businessType" value={formData.businessType} onChange={handleChange}
                              maxLength="200" minLength="2" className={`form-control ${invalidFields.businessType ? styles.inputError : ''}`} />
                            {errors.businessType && (
                              <small className="text-danger">{errors.businessType}</small>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label className="lable_text">Message</label>
                            {/* <textarea className="form-control" rows="4" placeholder="" name="txtcomment" maxLength="500"></textarea> */}
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              className="form-control"
                              rows="4"
                            />
                            {errors.message && (
                              <small className="text-danger">{errors.message}</small>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">Required fields are marked as <span className="required">*</span></div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="btnarea text-right">
                            <button type="submit" className={`btn_comman btn_primary2 ${loading || !isAnyFieldFilled() ? 'btn_disabled' : ''}`}
                              disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />


      <style
          dangerouslySetInnerHTML={{
                    __html: `
      header .headermain .logo .inner_logo {
        display: block !important;
      }
      header .headermain .logo .home_logo {
        display: none !important;
      }
       
          header .headermain nav.navbar .navbar-toggler .navbar-toggler-icon{color: #14565B; background-image: url(../download1.svg);}
          

           @media (min-width: 993px) {
              header .headermain nav.navbar .navigation .navbar-nav .nav-item .nav-link:hover, header .headermain nav.navbar .navigation .navbar-nav .nav-item .nav-link.active {
                  color: #fff !important;
              }
              header .headermain nav.navbar .navigation .navbar-nav .nav-item,
              header .headermain nav.navbar .navigation .navbar-nav .nav-item .nav-link{color:#fff !important;}
           }
    `,
                }}
            />

    </Layout>
  )
}

export default Home;
