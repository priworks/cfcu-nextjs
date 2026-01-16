'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'
import { StudioProvider, StudioLayout } from 'sanity'
import { createGlobalStyle } from 'styled-components'

export default function Studio() {
  const GlobalStyles = createGlobalStyle`
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`
  return (
    <NextStudio config={config}>
      <StudioProvider config={config}>
        <GlobalStyles />
        {/* Put components here and you'll have access to the same React hooks as Studio gives you when writing plugins */}
        <StudioLayout />
      </StudioProvider>
    </NextStudio>
  )
}
