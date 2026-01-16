export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  // Array of month names
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]

  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.error('Failed to copy: ', err)
      return false
    }
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch (err) {
      console.error('Failed to copy: ', err)
      document.body.removeChild(textArea)
      return false
    }
  }
}

export function externalOnClick(e: any, href: string, showPdfPageLeaveAlert: boolean = false) {
  // If showPdfPageLeaveAlert is false, skip all alerts

      if (showPdfPageLeaveAlert) {
      const confirmed = confirm(
        'You will be linking to another website not owned or operated by Community Financial Credit Union. Community Financial Credit Union has no responsibility, and neither endorses the information, content, presentation, or accuracy nor makes any warranty, express or implied, regarding any external site. We encourage you to review the privacy and security policies of the external site, which may differ from those at Community Financial Credit Union.\n\nDo you want to continue?',
      )
        if (!confirmed) {
          e.preventDefault()
          return// Prevent navigation if user cancels
        }
      }
  
  // Skip alert for cfcu. URLs (except mailto) and Sanity CDN URLs
  if (href && ((href.includes('cfcu.') && !href.includes('mailto:')) || href.includes('cdn.sanity'))) {
    return
  }

  if (href.includes('mailto:')) {
      const confirmed = confirm(
    'Email is not a secure form of communication. Please do not email us sensitive information such as your account number, tax identification number,  or card information.',
  )
  if (!confirmed) {
    e.preventDefault()
    return// Prevent navigation if user cancels
  }
    return
  }

  const confirmed = confirm(
    'You will be linking to another website not owned or operated by Community Financial Credit Union. Community Financial Credit Union has no responsibility, and neither endorses the information, content, presentation, or accuracy nor makes any warranty, express or implied, regarding any external site. We encourage you to review the privacy and security policies of the external site, which may differ from those at Community Financial Credit Union.\n\nDo you want to continue?',
  )
  if (!confirmed) {
    e.preventDefault() // Prevent navigation if user cancels
  }
}
