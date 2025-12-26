import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'

const ActiveLink = ({
  children,
  className,
  activeClassName = 'active',
  ...props
}) => {
  const router = useRouter()
  const { asPath } = router

  const normalize = (p) => {
    if (!p) return ''
    const str = typeof p === 'string' ? p : (p.pathname || '')
    return str.split('?')[0].split('#')[0].replace(/\/+$|\/$/g, '') || '/'
  }

  const current = normalize(asPath)
  const hrefToCheck = normalize(props.as || props.href)
  const isActive = current === hrefToCheck

  const scrollToElement = (id) => {
    const el = document.getElementById(id)
    if (!el) return

    // Dynamically calculate header height based on screen size
    const header = document.querySelector('header')
    const viewportWidth = window.innerWidth
    
    let headerOffset
    if (header) {
      // Get actual header height
      const actualHeaderHeight = header.offsetHeight
      
      // Adjust offset based on viewport
      if (viewportWidth >= 992) {
        // Desktop
        headerOffset = actualHeaderHeight - 180
      } else if (viewportWidth >= 768) {
        // Tablet
        headerOffset = actualHeaderHeight - 100
      } else {
        // Mobile
        headerOffset = actualHeaderHeight - 50
      }
    } else {
      headerOffset = 70
    }
    
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    })
  }

  const handleClick = async (e) => {
    const href = props.href

    if (typeof href === 'string' && href.startsWith('#')) {
      e.preventDefault()
      const id = href.replace('#', '')

      // Close mobile menu if open
      const navbarCollapse = document.getElementById('navbarSupportedContent')
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = window.bootstrap?.Collapse?.getInstance(navbarCollapse)
        if (bsCollapse) {
          bsCollapse.hide()
        } else {
          navbarCollapse.classList.remove('show')
        }
      }

      // Scroll immediately
      scrollToElement(id)
    } else if (typeof href === 'string' && href.includes('#')) {
      // Handle URLs like "/#about"
      e.preventDefault()
      const [path, hash] = href.split('#')
      const id = hash

      // Close mobile menu if open
      const navbarCollapse = document.getElementById('navbarSupportedContent')
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = window.bootstrap?.Collapse?.getInstance(navbarCollapse)
        if (bsCollapse) {
          bsCollapse.hide()
        } else {
          navbarCollapse.classList.remove('show')
        }
      }

      // Check if we're already on the target page
      if (router.pathname === path || (path === '/' && router.pathname === '/')) {
        // Already on the page, scroll immediately
        scrollToElement(id)
      } else {
        // Navigate to the page first, then scroll
        await router.push(path)
        setTimeout(() => {
          scrollToElement(id)
        }, 100)
      }
    }
  }

  return (
    <Link {...props} legacyBehavior>
      <a
        onClick={handleClick}
        className={clsx(className, isActive && activeClassName)}
      >
        {children}
      </a>
    </Link>
  )
}

export default ActiveLink