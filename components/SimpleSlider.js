import Slider from 'react-slick'
import Link from '../components/ActiveLink'
import Image from './Image'
import styles from '../styles/Home.module.scss'

const SimpleSlider = ({ items = [] }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 }
      }
    ]
  }

  return (
    <div className={styles.simpleSlider || ''}>
      <Slider {...settings}>
        {items.map((it, i) => (
          <div key={i}>
            <div className="box_1">
              {(it.href || it.link) ? (
                <Link href={it.href || it.link}>
                  <Image src={it.src} width={it.width || 501} height={it.height || 326} alt={it.alt || ''} />
                  {it.caption ? <div className={styles.slideCaption}>{it.caption}</div> : null}
                </Link>
              ) : (
                <>
                  <Image src={it.src} width={it.width || 501} height={it.height || 326} alt={it.alt || ''} />
                  {it.caption ? <div className={styles.slideCaption}>{it.caption}</div> : null}
                </>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default SimpleSlider
