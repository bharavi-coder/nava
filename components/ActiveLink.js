import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'

const ActiveLink = ({
  children,
  className,
  activeClassName = 'active',
  ...props
}) => {
  const { asPath } = useRouter()

  // normalize function: strip query, hash, and trailing slashes
  const normalize = (p) => {
    if (!p) return ''
    // If href is an object (Next Link supports objects), try pathname
    const str = typeof p === 'string' ? p : (p.pathname || '')
    return str.split('?')[0].split('#')[0].replace(/\/+$|\/$/g, '') || '/'
  }

  const current = normalize(asPath)
  const hrefToCheck = normalize(props.as || props.href)
  const isActive = current === hrefToCheck

  return (
    <Link
      {...props}
      className={clsx(className, isActive && activeClassName)}
    >
      {children}
    </Link>
  )
}

export default ActiveLink
