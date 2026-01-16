const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({
  addUtilities,
  matchUtilities,
  theme,
  e,
}: {
  addUtilities: any
  matchUtilities: any
  theme: any
  e: any
}) {
  const convertToVw = (px: any) => `${((px / 1440) * 100).toFixed(4)}vw`
  const calculateMaxPx = (px: any) => Math.round((px / 1440) * 1800)

  const clampableProperties = {
    p: 'padding',
    px: ['padding-left', 'padding-right'],
    py: ['padding-top', 'padding-bottom'],
    pt: 'padding-top',
    pr: 'padding-right',
    pb: 'padding-bottom',
    pl: 'padding-left',
    m: 'margin',
    mx: ['margin-left', 'margin-right'],
    my: ['margin-top', 'margin-bottom'],
    mt: 'margin-top',
    mr: 'margin-right',
    mb: 'margin-bottom',
    ml: 'margin-left',
    w: 'width',
    h: 'height',
    'max-w': 'max-width',
    'max-h': 'max-height',
    'min-w': 'min-width',
    'min-h': 'min-height',
    gap: 'gap',
    'gap-x': 'column-gap',
    'gap-y': 'row-gap',
    text: 'font-size',
    leading: 'line-height',
    tracking: 'letter-spacing',
    rounded: 'border-radius',
    left: 'left',
    right: 'right',
    top: 'top',
    bottom: 'bottom',
    calc: 'calc',
  }

  Object.entries(clampableProperties).forEach(([key, properties]) => {
    matchUtilities(
      {
        [`clamp-${key}`]: (value: any) => {
          const pixelValue = parseInt(value)
          if (isNaN(pixelValue)) return {}

          const styles: { [key: string]: string } = {}
          if (Array.isArray(properties)) {
            properties.forEach((prop) => {
              styles[prop] =
                `clamp(0px, ${convertToVw(pixelValue)}, ${calculateMaxPx(pixelValue)}px)`
            })
          } else {
            styles[properties] =
              `clamp(0px, ${convertToVw(pixelValue)}, ${calculateMaxPx(pixelValue)}px)`
          }
          return styles
        },
      },
      { values: theme(`clamp${key.charAt(0).toUpperCase() + key.slice(1)}`) },
    )
  })
})
