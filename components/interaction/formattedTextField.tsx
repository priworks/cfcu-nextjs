import { type ReactNode } from 'react'

import { applySuperscripts } from '@/lib/applySuperscripts'

const FormattedTextField = ({
  children,
  text,
}: {
  children?: ReactNode
  text?: ReactNode
}): ReactNode => {
  if (text) {
    return applySuperscripts(text)
  }

  return applySuperscripts(children)
}

export default FormattedTextField
