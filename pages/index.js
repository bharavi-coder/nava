import { useEffect, useRef, useState } from 'react';
import { NextSeo } from 'next-seo'
import Link from '../components/ActiveLink'
import Layout from '../components/Layout'
import Image from '../components/Image'   
import styles from '../styles/Home.module.scss'
import SimpleSlider from '../components/SimpleSlider'
 
 


const Home = () => {

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
      image: '/beverages.jpg',
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
      title: 'Candy & Sweet',
      image: '/beverages.jpg',
      direction: 'right'
    },
    {
      id: 6,
      title: 'Gum & Mint',
      image: '/gum_and_mint.jpg',
      direction: 'right'
    }
  ];

     const row1 = categories.filter(cat => cat.direction === 'left');
  const row2 = categories.filter(cat => cat.direction === 'right');

  const mainSectionRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    
    // Show first 2 cards initially
    if (cards[0]) cards[0].classList.add(styles.visible);
    if (cards[1]) cards[1].classList.add(styles.visible);

    let rafId = null;
    let ticking = false;

    const updateCards = () => {
      const mainSection = mainSectionRef.current;
      const cardsWrapper = cardsWrapperRef.current;
      
      if (!mainSection || !cardsWrapper) {
        ticking = false;
        return;
      }

      const viewportWidth = window.innerWidth;

      // Disable parallax effect on tablets / mobile (only apply on desktop >= 1200px)
      if (viewportWidth < 993) {
        // Ensure all cards are visible and reset any transforms
        cards.forEach((card) => {
          if (card) {
            card.classList.add(styles.visible);
          }
        });

        if (cardsWrapper) {
          cardsWrapper.style.transform = 'translate3d(0, 0, 0)';
        }

        ticking = false;
        return;
      }

      const sectionRect = mainSection.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const windowHeight = window.innerHeight;
      
      // Only process when section is in viewport
      if (sectionTop > windowHeight || sectionRect.bottom < 0) {
        ticking = false;
        return;
      }
      
      // Calculate scroll progress within the section (0 to 1)
      // Progress = 0 when section just enters viewport
      // Progress = 1 when section is about to leave viewport
      // Multiply by 0.5 to slow down the scroll speed (scroll takes twice as long)
      const rawProgress = -sectionTop / (sectionHeight - windowHeight);
      const scrollProgress = Math.max(0, Math.min(1, rawProgress * 2));
      
      // Calculate how many cards should be visible based on scroll progress
      const totalCards = cards.length;
      const visibleCards = Math.floor(scrollProgress * (totalCards - 2)) + 2; // Start with 2 visible
      
      // Show cards based on scroll progress
      cards.forEach((card, index) => {
        if (card && index < visibleCards) {
          card.classList.add(styles.visible);
        }
      });
      
      // Translate cards wrapper for smooth scroll effect
      if (cards[0]) {
        const cardHeight = cards[0].offsetHeight;
        const cardGap = 30; // Match your CSS gap
        
        // Calculate total scrollable distance (we need to scroll through all cards except the first 2)
        const maxTranslate = (totalCards - 2) * (cardHeight + cardGap);
        const translateY = -scrollProgress * maxTranslate;
        
        // Use translate3d for better performance
        cardsWrapper.style.transform = `translate3d(0, ${translateY}px, 0)`;
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

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);



    const contactRef = useRef(null)
    const footerRef = useRef(null)
    const [hideGetTouch, setHideGetTouch] = useState(false)

    useEffect(() => {
    if (!contactRef.current && !footerRef.current) return

    const observer = new IntersectionObserver(
        (entries) => {
        const shouldHide = entries.some(entry => entry.isIntersecting)
        setHideGetTouch(shouldHide)
        },
        {
        threshold: 0.5 // 50% visibility
        }
    )

    if (contactRef.current) observer.observe(contactRef.current)
    if (footerRef.current) observer.observe(footerRef.current)

    return () => observer.disconnect()
    }, [])




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

            const progress = Math.min(Math.max((start - rect.top) / (start - end), 0),1)

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

  const addToRefs = (el, index) => {
    if (el && !cardsRef.current.includes(el)) {
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
      width: 38,
      height: 38,
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
      width: 38,
      height: 38,
      title: 'Dedicated Client Care ',
      text: 'A knowledgeable, responsive support team committed to your success.'
    },
    { 
      id: 5, 
      icon: '/icon_wide_rage.svg',
      width: 44,
      height: 44,
      title: 'Wide Rage Product Selection',
      text: 'A constantly evolving catalog featuring today’s highest demand items and trusted brands.'
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
        <figure className='bannerImage'>
            <Image src="/hm_banner1.jpg" width={1440} height={945} alt="NextSSS" />
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
    <div className="scroll_img marquee">
        <Image src="/marquee_img.png" width={1440} height={72} alt="" />
    </div>
    <div className="aboutSection sectionpadding bg_blue" id="about" ref={mainSectionRef}>
        <div className="container">
            <div className="about-grid">
                <div className="about-content p_fnt26">
                    <h2 className='hd2'><span>About Us</span>What We Do</h2>
                    <p>
                        Nava Distributors is a trusted, family-owned wholesale distributor providing businesses with dependable supply, modern ordering tools, and exceptional service. Our focus is helping retailers stay stocked, competitive, and profitable.
                    </p>
                    <p>
                        For over four years, Nava Wholesale has proudly served the Chicagoland area as a leading wholesale distributor. Our mission is to provide retailers with top-selling products, competitive pricing, and dependable service that keeps them ahead in today’s fast-paced marketplace.
                    </p>
                </div>

                <div className="about-cards">
                    <div className='Home_cardsWrapper'  ref={cardsWrapperRef}>
                    {cardsData.map((card, index) => (
                                    <div 
                                      key={card.id} 
                                     className="info-card"
                                      ref={(el) => addToRefs(el, index)}
                                      data-index={index}
                                    >
                                      <div className="icon-circle">
                                      <Image
                                            src={card.icon}
                                            width={card.width}
                                            height={card.height}
                                            alt={card.title}
                                        />
                                    </div>
                                     <h4 className='hd24'>{card?.title}</h4>
                                        <p>
                                            {card?.text}
                                        </p>
                                    </div>
                                  ))}
                                  </div>
                    {/* <div className="info-card">
                        <div className="icon-circle">
                            <Image src="/icon_smart_ai.svg" width={44} height={44} alt="" />
                        </div>
                        <h4 className='hd24'>Smart AI Driven Ordering</h4>
                        <p>
                            Our AI-powered platform streamlines ordering by providing real-time stock visibility, simplified purchasing, and a logistics network that ensures accurate, timely deliveries, keeping your operations running smoothly.
                        </p>
                    </div>

                    <div className="info-card">
                        <div className="icon-circle">
                            <Image src="/icon_wide_rage.svg" width={38} height={38} alt="" />
                        </div>
                        <h4 className='hd24'>Wide Rage Product Selection</h4>
                        <p>
                            A constantly evolving catalog featuring today’s highest demand items and trusted brands.
                        </p>
                    </div> */}
                </div>

            </div>
        </div>
    </div>
    <div className="who_we_are-section sectionpadding">
        <div className="container">
            <h2 className='hd2'><span>About Us</span>Who We Serve</h2>
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
                <SimpleSlider items={[ { src: '/gas_stations.jpg' , width: 501, height: 326, alt: 'Gas Stations' , caption: 'Core Engineering' , href: '/courses' }, { src: '/gas_stations.jpg' , width: 501, height: 326, alt: 'Convenience Stores' , caption: 'Convenience Stores' , href: '/courses' }, { src: '/gas_stations.jpg' , width: 501, height: 326, alt: 'Liquor Stores' , caption: 'Liquor Stores' , href: '/courses' }, { src: '/gas_stations.jpg' , width: 501, height: 326, alt: 'Liquor Stores' , caption: 'Liquor Stores' , href: '/courses' }, ]} />
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
            <h2 className="hd74">
              The Midwest&apos;s Trusted <br />
              Partner To <br />
              Empower Local <br />
              Businesses
            </h2>
          </div>
          <div className="col-lg-6 p_fnt26">
            {/* Vision Statement - Always Visible */}
            <div className="info-box">
              <div className="info-icon">
                <img src="/icon_vision.png" width={41} height={41} alt="" />
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
                <img src="/icon_mission.png" width={39} height={48} alt="" />
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
            <h2 className='hd2'>Core Values</h2>
            <p>We pride ourselves on operational excellence, reliability, and customer-first service. When you choose Nava Wholesale, you gain more than a supplier you gain a strategic partner committed to your store’s growth.</p>
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
             <h2 className='hd2'><span>Our Products</span>Product Categories</h2>
             <p>Explore our wide selection of high demand products, carefully curated to meet the needs of your business and customers.</p>
             <div>
                <Link className="btn_comman btn_primary2" href="#">Explore Products</Link>
             </div>
         </div>
     </div>
 </div>
<div className="categories sectionpadding paddtop0">
  {/* First Row - Left to Right */}
  <div className="slider-wrapper">
    <div className="slider-track scroll-left">
      {[...row1, ...row1, ...row1, ...row1].map((category, index) => (
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
      {[...row2, ...row2, ...row2, ...row2].map((category, index) => (
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
                        <h2 className='hd2'><span>Contact Us</span>Ready to upgrade <br />your supply chain?</h2>
                        <p>Have a question or need a quote?<br />
                            Fill out the form and a member of our team will get back to you shortly.</p>
                        <div className="address">
                            <ul className="contactDetail">
                                <li>
                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                    111 S Lombard Rd Ste 2 Addison, IL 60101
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
                            <form>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label className="lable_text">First Name*</label>
                                            <input type="text" placeholder="" name="txtfname" maxLength="200" minLength="2" className="form-control required" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label className="lable_text">Last Name*</label>
                                            <input type="text" placeholder="" name="txtfname" maxLength="200" minLength="2" className="form-control required" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label className="lable_text">Email*</label>
                                            <input type="text" placeholder="" name="txtemail" maxLength="200" minLength="2" className="form-control required email" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label className="lable_text">Primary Number</label>
                                            <input type="text" placeholder="" name="txtphone" maxLength="10" minLength="10" className="form-control required number" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label className="lable_text">Business Name*</label>
                                            <input type="text" placeholder="" name="txtbusinessname" maxLength="10" minLength="10" className="form-control required" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label className="lable_text">Business Type*</label>
                                            <input type="text" placeholder="" name="txtbusinesstype" maxLength="200" minLength="2" className="form-control required" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label className="lable_text">Message</label>
                                            <textarea className="form-control" rows="4" placeholder="" name="txtcomment" maxLength="500"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">Required fields are marked as *</div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="btnarea text-right">
                                            <button className="btn_comman btn_primary1">Submit</button>
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

    </Layout>
  )
}

export default Home
