import { createImageUrlBuilder } from '@sanity/image-url'
import { dataset, projectId } from './sanity.api'

const imageBuilder = createImageUrlBuilder({ projectId, dataset })

class SafeImageUrlBuilder {
  private builder: any | null

  constructor(source: any) {
    if (!source || !source.asset) {
      console.warn('Image source is missing')
      this.builder = null
    } else {
      try {
        this.builder = imageBuilder.image(source)
      } catch (error) {
        console.error('Error creating image URL:', error)
        this.builder = null
      }
    }
  }

  url(): string {
    return this.builder ? this?.builder?.url() : ''
  }

  // Implement other methods that you commonly use
  width(w: number): SafeImageUrlBuilder {
    if (this.builder) {
      this.builder = this.builder.width(w)
    }
    return this
  }

  height(h: number): SafeImageUrlBuilder {
    if (this.builder) {
      this.builder = this.builder.height(h)
    }
    return this
  }

  quality(q: number): SafeImageUrlBuilder {
    if (this.builder) {
      this.builder = this.builder.quality(q)
    }
    return this
  }

  // Add any other methods you commonly use
  // For example:
  fit(
    f: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min',
  ): SafeImageUrlBuilder {
    if (this.builder) {
      this.builder = this.builder.fit(f)
    }
    return this
  }

  auto(a: 'format'): SafeImageUrlBuilder {
    if (this.builder) {
      this.builder = this.builder.auto(a)
    }
    return this
  }
}

export const urlForImage = (source: any): SafeImageUrlBuilder => {
  return new SafeImageUrlBuilder(source)
}
