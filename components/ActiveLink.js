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

  // pages/index.tsx or pages/about.tsx will be matched via props.href
  // pages/[slug].js will be matched via props.as
  return (
    <Link
      {...props}
      className={clsx(
        className,
        (asPath === props.href || asPath === props.as) && activeClassName
      )}
    >
      {children}
    </Link>
  )
}

export default ActiveLink
