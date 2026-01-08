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


  const categories = [
    {
      id: 1,
      title: 'Candy & Sweet',
      image: '/candy_and_sweet.jpg',
      direction: 'left'
    },
    {
      id: 2,
      title: 'Beverages',
      image: '/beverages.jpg',
      direction: 'left'
    },
    {
      id: 3,
      title: 'Chips & Snacks',
      image: '/chips_and_snacks.jpg',
      direction: 'chips_and_snacks'
    },
    {
      id: 4,
      title: 'Convenience Items',
      image: '/convenience_items.jpg',
      direction: 'right'
    },
    {
      id: 5,
      title: 'Gum & Mint',
      image: '/gum_and_mint.jpg',
      direction: 'right'
    }
  ];

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCards);
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
  }, [headingVisible, currentIndex]);


  // Parallax states
  const sliderRef = useRef(null)
  const [translateX, setTranslateX] = useState(200) // initial offset

  const missionRef = useRef(null);
  const [missionVisible, setMissionVisible] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      // Slider parallax effect
      if (!sliderRef.current) return

      const rect = sliderRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      /*
      Start animation when section enters viewport
      End animation when section center reaches viewport center
      */
      const start = windowHeight
      const end = windowHeight * 0.3

      const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1)

      // 200px → 0px
      setTranslateX(200 * (1 - progress))

      if (missionRef.current) {
        const element = missionRef.current;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.7 && rect.bottom > 0) {
          setMissionVisible(true);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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


  

  

  return (
    <Layout>
      <NextSeo
        title="Nava"
        description=""
        openGraph={{
          type: 'website',
        }}
      />
      <div className="homebanner">
        {/* <figure className='bannerImage'>
          <Image src="/hm_banner1.jpg" width={1440} height={945} alt="NextSSS" />
        </figure> */}
        <figure className="bannerImage">
          <picture>
            {/* Small mobile */}
           

            {/* Large mobile / tablet */}
            <source
              media="(max-width: 767px)"
              srcSet="/hm_banner1_mobile.jpg"
            />

            {/* Desktop fallback */}
            <Image
              src="/hm_banner1.jpg"
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
              <p className="title">Redefining wholesale for a new era.</p>
              <span>We provide top-selling products, competitive prices, and fast, reliable fulfillment to businesses across the Chicagoland area and beyond.</span>
            </div>
          </div>
        </div>
      </div>
      {/*<div className="scroll_img marquee">
        <Image src="/marquee_img.png" width={1440} height={72} alt="" />
      </div>*/}
      <div className="marquee">
        <div className="marquee__track">
          <Image src="/marquee_img.png" width={1440} height={72} alt="" />
          <Image src="/marquee_img.png" width={1440} height={72} alt="" />
          <Image src="/marquee_img.png" width={1440} height={72} alt="" />
          <Image src="/marquee_img.png" width={1440} height={72} alt="" />
        </div>
      </div>
      <div className="aboutSection sectionpadding bg_blue" id="about" ref={mainSectionRef}>
  <div className="container"> 
    <div className="about-grid"> 
      <div className="about-content p_fnt26"> 
        <h2 className="hd2"><span>About Us</span>What We Do</h2> 
        <p> 
          Nava Distributors is a trusted, family-owned wholesale distributor providing businesses with dependable supply, modern ordering tools, and exceptional service. Our focus is helping retailers stay stocked, competitive, and profitable. 
        </p> 
        <p> 
          For over four years, Nava Wholesale has proudly served the Chicagoland area as a leading wholesale distributor. Our mission is to provide retailers with top-selling products, competitive pricing, and dependable service that keeps them ahead in today&apos;s fast-paced marketplace. 
        </p> 
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
                <Image src={card.icon} width={card.width} height={card.height} alt={card.title} /> 
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
      <div className="who_we_are-section sectionpadding">
        <div className="container">
          <h2 className="hd2"><span>About Us</span>Who We Serve</h2>
          <div className='p_fnt26 maxwidth990'>
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
                <SimpleSlider items={[{
                  src: '/gas_stations.jpg', width: 501, height: 326, alt: 'Gas Stations', caption: 'Gas Stations', href: '/courses'
                },
                { src: '/convenience_stores.jpg', width: 501, height: 326, alt: 'Convenience Stores', caption: 'Convenience Stores', href: '/courses' },
                { src: '/liquor_stores.jpg', width: 501, height: 326, alt: 'Liquor Stores', caption: 'Liquor Stores', href: '/courses' },
                { src: '/retail_shops.jpg', width: 501, height: 326, alt: 'Retail Shops', caption: 'Retail Shops', href: '/courses' },
                { src: '/grocery_markets.jpg', width: 501, height: 326, alt: 'Grocery Markets', caption: 'Grocery Markets', href: '/courses' },
                { src: '/small_businesses.jpg', width: 501, height: 326, alt: 'Small Businesses', caption: 'Small Businesses', href: '/courses' },
                { src: '/retail_shops.jpg', width: 501, height: 326, alt: 'Independent Retailers', caption: 'Independent Retailers', href: '/courses' },
                ]} />
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





      <div className="websection-section sectionpadding">
        <div className="container">
          <div className="row align-items-center fnt26">
            <div className="col-lg-6">
              <h2
                ref={headingRef}
                className="hd74"
                style={{
                  minHeight: '200px',
                  position: 'relative',
                  whiteSpace: 'pre-line'
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
            </div>
            <div className="col-lg-6 p_fnt26">
              {/* Vision Statement - Always Visible */}
              <div
                ref={missionRef}
                className="info-box"
                style={{
                  transition: 'all 1s ease-out',
                  opacity: missionVisible ? 1 : 0.5,
                  filter: missionVisible ? 'blur(0px)' : 'blur(8px)',
                  transform: missionVisible ? 'translateY(0)' : 'translateY(50px)' // ← NEW LINE ADDED
                }}
              >
                <div className="info-icon">
                  <img src="/icon_vision.svg" width={41} height={41} alt="" />
                </div>
                <div className="info-content">
                  <h3 className='hd34 colorwite'>Vision Statement</h3>
                  <p>To become the most trusted, technology-driven wholesale distributor in the region, known for reliability, transparency, and exceptional service.</p>
                </div>
              </div>

              {/* Mission Statement - Blurred Initially */}
              <div
                ref={missionRef}
                className="info-box"
                style={{
                  transition: 'all 1s ease-out',
                  opacity: missionVisible ? 1 : 0.5,
                  filter: missionVisible ? 'blur(0px)' : 'blur(8px)',
                  transform: missionVisible ? 'translateY(0)' : 'translateY(50px)' // ← NEW LINE ADDED
                }}
              >
                <div className="info-icon">
                  <img src="/icon_mission.svg" width={39} height={48} alt="" />
                </div>
                <div className="info-content">
                  <h3 className='hd34 colorwite'>Mission Statement</h3>
                  <p>To provide fast, reliable, and affordable wholesale supply powered by family values, modern technology, and a commitment to long-term partnerships.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="core_values-section sectionpadding bg_blue">
        <div className="container">
          <div className="maxwidth770 p_fnt26">
            <h2 className="hd2">Core Values</h2>
            <p>We pride ourselves on operational excellence, reliability, and customer-first service. When you choose Nava Wholesale, you gain more than a supplier you gain a strategic partner committed to your store&apos;s growth.</p>
          </div>
          <div className="list_values">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="custom-card">
                  <div className="icon-box">
                    <span className='icon_inno'></span>
                  </div>
                  <h3 className="hd26">Innovation</h3>
                  <p>We embrace technology that makes the wholesale experience smarter.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="custom-card">
                  <div className="icon-box">
                    <span className='icon_integrity'></span>
                  </div>
                  <h3 className="hd26">Integrity</h3>
                  <p>We operate with honesty, accountability, and respect in every interaction.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="custom-card">
                  <div className="icon-box">
                    <span className='icon_reliability'></span>
                  </div>
                  <h3 className="hd26">Reliability</h3>
                  <p>Precision, consistency, and dependable delivery define how we serve.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="custom-card">
                  <div className="icon-box">
                    <span className='icon_growth'></span>
                  </div>
                  <h3 className="hd26">Growth</h3>
                  <p>We succeed when our customers succeed and your progress fuels ours.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="product_categories-section sectionpadding" id="products">
        <div className="container">
          <div className="maxwidth770 p_fnt26">
            <h2 className="hd2"><span>Our Products</span>Product Categories</h2>
            <p>Explore our wide selection of high demand products, carefully curated to meet the needs of your business and customers.</p>
            <div>
              <Link className="btn_comman btn_primary2" href="/product-catalog">Explore Products</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="categories sectionpadding paddtop0">

        {/* First Row - Left to Right */}
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

        {/* Second Row - Right to Left */}
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

      </div>
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
                  <h2 className="hd2"><span>Contact Us</span>Ready to upgrade <br />your supply chain?</h2>
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
    </Layout>
  )
}

export default Home;
