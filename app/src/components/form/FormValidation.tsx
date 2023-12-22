import { createContext, useContext } from 'react'
import type { FlatErrors } from 'valibot'

const FormValidationContext = createContext<FlatErrors<any> | undefined>(
  undefined,
)

type FormValidationProps = {
  errors: FlatErrors
  children: React.ReactNode
}

export default function FormValidation({
  errors,
  children,
}: FormValidationProps) {
  return (
    <FormValidationContext.Provider value={errors}>
      {children}
    </FormValidationContext.Provider>
  )
}

export function useFieldError(name: string) {
  const actionData = useContext(FormValidationContext)
  return actionData?.nested?.[name]?.join(', ')
}
