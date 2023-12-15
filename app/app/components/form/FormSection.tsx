type FormSectionProps = {
  title: React.ReactNode
  children?: React.ReactNode
}

export default function FormSection({ title, children }: FormSectionProps) {
  return (
    <section>
      <div className='mb-6'>
        <h2 className='text-lg font-medium leading-7'>{title}</h2>
      </div>
      <div className='grid grid-cols-3 gap-x-4 gap-y-6'>{children}</div>
    </section>
  )
}
