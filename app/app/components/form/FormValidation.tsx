import { createContext, useContext } from 'react'

import type { FlatErrors } from 'valibot'

import { useActionData } from '@remix-run/react'

const FormValidationContext = createContext<FlatErrors<any> | undefined>(
  undefined,
)

type FormValidationProps = {
  children: React.ReactNode
}

export default function FormValidation({ children }: FormValidationProps) {
  const actionData = useActionData<FlatErrors<any>>()

  return (
    <FormValidationContext.Provider value={actionData}>
      {children}
    </FormValidationContext.Provider>
  )
}

export function useFieldError(name: string) {
  const actionData = useContext(FormValidationContext)
  return actionData?.nested?.[name]?.join(', ')
}
