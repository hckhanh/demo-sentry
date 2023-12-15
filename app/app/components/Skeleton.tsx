import clsx from 'clsx'

type SkeletonProps = {
  loading: boolean
  className?: string
  children?: React.ReactNode
}

export default function Skeleton({
  className,
  loading,
  children,
}: SkeletonProps) {
  return loading ? (
    <span
      className={clsx('animate-pulse rounded-full bg-slate-200', className)}
    />
  ) : (
    children
  )
}
