import { useNavigation } from '@remix-run/react'
import { memo, useCallback, useEffect, useState } from 'react'
import Button from 'app/components/form/Button'
import useCaptcha from 'app/hooks/useCaptcha'

function ConfirmOrderButton() {
  const navigation = useNavigation()

  return (
    <Button
      type='submit'
      className='w-full'
      disabled={navigation.state === 'loading'}
      loading={navigation.state === 'submitting'}
    >
      Confirm order
    </Button>
  )
}

export default memo(ConfirmOrderButton)
