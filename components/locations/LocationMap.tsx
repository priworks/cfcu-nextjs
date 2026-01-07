'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import dynamic from 'next/dynamic'
import { clsx } from 'clsx'
import 'mapbox-gl/dist/mapbox-gl.css'
import Image from 'next/image'
import { LocationPage, ATMLocation } from '@/types/sanity'
import { urlForImage } from '@/lib/sanity.image'
import Link from 'next/link'
import Button from '@/components/global/ui/Button'
import { gsap } from 'gsap'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import LocationCard from './map/LocationCard'
import ATMCard from './map/AtmCard'
import { PortableText } from '@portabletext/react'
import { WysiwygComopentsMin } from '@/lib/portabletTextComponents'

// Replace with your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const DynamicSearchBox = dynamic(
  //@ts-ignore
  () => import('@mapbox/search-js-react').then((mod) => mod.SearchBox),
  { ssr: false },
)

interface MapViewProps {
  locations: LocationPage[]
  initialCenter?: [number, number]
  initialZoom?: number
  atmLocations?: ATMLocation[]
}

interface PopupPosition {
  left: number
  top: number
}

export default function MapView({
  locations,
  initialCenter = [-84.5, 43.5],
  initialZoom = 6.5,
  atmLocations,
}: MapViewProps) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [selectedLocation, setSelectedLocation] = useState<LocationPage | null>(
    null,
  )
  const [selectedMobilePopup, setSelectedMobilePopup] =
    useState<LocationPage | null>(null)

  const [selectedMobileAtmPopup, setSelectedMobileAtmPopup] =
    useState<ATMLocation | null>(null)

  const [popupPosition, setPopupPosition] = useState<PopupPosition | null>(null)
  const popupRef = useRef<mapboxgl.Popup | null>(null)
  const [showATMs, setShowATMs] = useState(false)
  const [selectedATM, setSelectedATM] = useState<ATMLocation | null>(null)

  const popupGradient = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (!popupGradient.current) return
    if (!selectedMobilePopup && !selectedMobileAtmPopup) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        popupGradient.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: 'linear' },
      )
    })

    return () => {
      ctx.revert()
    }
  }, [selectedMobilePopup, selectedMobileAtmPopup])

  // Update popup position when map moves
  useEffect(() => {
    if (!map.current) return

    const updatePosition = () => {
      if (selectedLocation) {
        const markerPosition = [
          selectedLocation.coordinates.longitude,
          selectedLocation.coordinates.latitude,
        ]
        const point = map.current!.project(
          markerPosition as mapboxgl.LngLatLike,
        )

        setPopupPosition({
          left: point.x + 30, // Offset to account for marker width
          top: point.y - 20, // Offset to align with marker
        })
      } else if (selectedATM) {
        const markerPosition = [selectedATM.longitude, selectedATM.latitude]
        const point = map.current!.project(
          markerPosition as mapboxgl.LngLatLike,
        )

        setPopupPosition({
          left: point.x + 30, // Offset to account for marker width
          top: point.y - 20, // Offset to align with marker
        })
      }
    }

    // Update position initially and on map events
    updatePosition()
    map.current.on('move', updatePosition)
    map.current.on('zoom', updatePosition)

    return () => {
      if (map.current) {
        map.current.off('move', updatePosition)
        map.current.off('zoom', updatePosition)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation, selectedATM])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: initialCenter,
      zoom: initialZoom,
      scrollZoom: false,
    })

    map.current.addControl(new mapboxgl.NavigationControl({}), 'top-right')
    map.current.addControl(
      new mapboxgl.AttributionControl({
        compact: true,
      }),
      'bottom-right',
    )

    map.current.on('load', () => {
      setMapLoaded(true)
    })

    return () => {
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []
      map.current?.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle markers
  useEffect(
    () => {
      if (!map.current || !mapLoaded || locations.length === 0) return

      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []

      locations.forEach((location) => {
        const marker = document.createElement('div')
        const isActive = location.title === selectedLocation?.title
        marker.className = `marker cursor-pointer`
        marker.innerHTML = `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22.5" cy="17.5" r="7.5" fill="white"/>
        <path d="M21.498 40.5913L21.4973 40.5908C21.222 40.3987 17.6758 37.8807 14.2035 33.8132C10.7243 29.7375 7.3751 24.1718 7.375 17.8753C7.37947 13.9978 8.92178 10.2804 11.6636 7.53859C14.4053 4.79685 18.1226 3.25455 22 3.25C25.8774 3.25455 29.5947 4.79685 32.3364 7.53859C35.0783 10.2805 36.6206 13.998 36.625 17.8756C36.6248 24.172 33.2757 29.7376 29.7965 33.8132C26.3242 37.8807 22.778 40.3987 22.5027 40.5908L22.502 40.5913C22.3549 40.6943 22.1796 40.7496 22 40.7496C21.8204 40.7496 21.6451 40.6943 21.498 40.5913ZM25.3334 12.8862C24.3467 12.2269 23.1867 11.875 22 11.875C20.4087 11.875 18.8826 12.5071 17.7574 13.6324C16.6321 14.7576 16 16.2837 16 17.875C16 19.0617 16.3519 20.2217 17.0112 21.2084C17.6705 22.1951 18.6075 22.9642 19.7039 23.4183C20.8003 23.8724 22.0067 23.9912 23.1705 23.7597C24.3344 23.5282 25.4035 22.9568 26.2426 22.1176C27.0818 21.2785 27.6532 20.2094 27.8847 19.0455C28.1162 17.8817 27.9974 16.6753 27.5433 15.5789C27.0892 14.4825 26.3201 13.5455 25.3334 12.8862Z" fill="${isActive ? '#800080' : '#F56600'}" stroke="white"/>
      </svg>`

        const newMarker = new mapboxgl.Marker(marker)
          .setLngLat([
            location.coordinates.longitude,
            location.coordinates.latitude,
          ])
          .addTo(map.current!)

        newMarker.getElement().addEventListener('click', () => {
          if (window.innerWidth > 1024) {
            setSelectedLocation(location)
            setSelectedATM(null)
            // Calculate initial position for the popup
            const point = map.current!.project([
              location.coordinates.longitude,
              location.coordinates.latitude,
            ])
            setPopupPosition({
              left: point.x + 20,
              top: point.y - 20,
            })
          } else {
            setSelectedMobilePopup(location)
          }
        })

        markersRef.current.push(newMarker)
      })

      atmLocations?.forEach((atm: any) => {
        const marker = document.createElement('div')
        const isActive = atm.name === selectedATM?.name
        marker.className = `marker group cursor-pointer ${showATMs ? 'block' : 'hidden'}`
        // Use a different marker style for ATMs
        marker.innerHTML = `<svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg" >
<rect x="0.5" y="0.5" width="34" height="32" rx="4.5" fill=${isActive ? '"#FFFFFF"' : '"#008566"'}/>
<rect x="0.5" y="0.5" width="34" height="32" rx="4.5" stroke=${isActive ? '"#008566"' : '"#FFFFFF"'}/>
<path d="M26.5 9H8.5C8.10218 9 7.72064 9.15804 7.43934 9.43934C7.15804 9.72064 7 10.1022 7 10.5V22.5C7 22.8978 7.15804 23.2794 7.43934 23.5607C7.72064 23.842 8.10218 24 8.5 24H26.5C26.8978 24 27.2794 23.842 27.5607 23.5607C27.842 23.2794 28 22.8978 28 22.5V10.5C28 10.1022 27.842 9.72064 27.5607 9.43934C27.2794 9.15804 26.8978 9 26.5 9ZM26.5 10.5V12.75H8.5V10.5H26.5ZM26.5 22.5H8.5V14.25H26.5V22.5ZM25 20.25C25 20.4489 24.921 20.6397 24.7803 20.7803C24.6397 20.921 24.4489 21 24.25 21H21.25C21.0511 21 20.8603 20.921 20.7197 20.7803C20.579 20.6397 20.5 20.4489 20.5 20.25C20.5 20.0511 20.579 19.8603 20.7197 19.7197C20.8603 19.579 21.0511 19.5 21.25 19.5H24.25C24.4489 19.5 24.6397 19.579 24.7803 19.7197C24.921 19.8603 25 20.0511 25 20.25ZM19 20.25C19 20.4489 18.921 20.6397 18.7803 20.7803C18.6397 20.921 18.4489 21 18.25 21H16.75C16.5511 21 16.3603 20.921 16.2197 20.7803C16.079 20.6397 16 20.4489 16 20.25C16 20.0511 16.079 19.8603 16.2197 19.7197C16.3603 19.579 16.5511 19.5 16.75 19.5H18.25C18.4489 19.5 18.6397 19.579 18.7803 19.7197C18.921 19.8603 19 20.0511 19 20.25Z"  fill=${isActive ? '"#008566"' : '"#FFFFFF"'}/>
</svg>
`

        const newMarker = new mapboxgl.Marker(marker)
          .setLngLat([atm.longitude, atm.latitude])
          .addTo(map.current!)

        newMarker.getElement().addEventListener('click', () => {
          if (window.innerWidth > 1024) {
            setSelectedATM(atm)
            setSelectedLocation(null)
            const point = map.current!.project([atm.longitude, atm.latitude])
            setPopupPosition({
              left: point.x + 20,
              top: point.y - 20,
            })
            // Create a popup for ATM locations
            if (popupRef.current) {
              popupRef.current.remove()
            }

            popupRef.current = new mapboxgl.Popup({ offset: 25 })
              .setLngLat([atm.longitude, atm.latitude])
              .setHTML(
                `
            <div class="p-4">
              <h3 class="font-bold">${atm.name}</h3>
              <p class="text-gray-600">${atm.address}</p>
            </div>
          `,
              )
              .addTo(map.current!)
          } else {
            setSelectedMobileAtmPopup(atm)
          }
        })

        markersRef.current.push(newMarker)
      })
      return () => {
        markersRef.current.forEach((marker) => marker.remove())
        markersRef.current = []
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      locations,
      mapLoaded,
      selectedLocation,
      showATMs,
      initialCenter,
      initialZoom,
    ],
  )

  return (
    <div
      className={clsx(
        'relative w-full h-[80vh] overflow-hidden transition-opacity  duration-300 ease-linear',
        mapLoaded ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div ref={mapContainer} className="w-full h-full absolute" />

      {mapLoaded && (
        <div
          className={clsx(
            'absolute top-[8px] left-[8px] z-10',
            'lg:w-[450px]',
          )}
        >
          <DynamicSearchBox
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            map={map.current}
            mapboxgl={mapboxgl}
            value={inputValue}
            onChange={(d) => {
              setInputValue(d)
            }}
            options={{
              country: 'US',
              language: 'en',

              proximity: {
                lng: -98.5795,
                lat: 39.8283,
              },
            }}
          />
        </div>
      )}

      <button
        onClick={() => setShowATMs((prev) => !prev)}
        className={clsx(
          'bottom-[72px] right-[8px]',
          'absolute lg:bottom-[64px] z-10 bg-green text-white font-codec-extra-bold rounded-[6px] px-[16px] py-[8px] hidden',
        )}
      >
        Toggle Co-op Network ATM
      </button>

      {selectedLocation && popupPosition && (
        <div
          className={clsx('absolute')}
          style={{
            left: `${popupPosition.left}px`,
            top: `${popupPosition.top}px`,
            transform: 'translate(0%, -50%)', // Center horizontally and position above the point
          }}
        >
          <LocationCard
            data={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            setSelectedATM={setSelectedATM}
            setSelectedMobilePopup={setSelectedMobilePopup}
          />
        </div>
      )}

      {selectedATM && popupPosition && (
        <div
          className={clsx('absolute')}
          style={{
            left: `${popupPosition.left}px`,
            top: `${popupPosition.top}px`,
            transform: 'translate(0%, -50%)', // Center horizontally and position above the point
          }}
        >
          <ATMCard
            data={selectedATM}
            setSelectedLocation={setSelectedLocation}
            setSelectedATM={setSelectedATM}
            setSelectedMobileAtmPopup={setSelectedMobileAtmPopup}
          />
        </div>
      )}

      <style jsx>{`
        .marker {
          cursor: pointer;
        }
        .marker-pin {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          transform: translateY(-50%);
        }
      `}</style>

      {selectedMobilePopup && (
        <>
          <div
            ref={popupGradient}
            onClick={() => setSelectedMobilePopup(null)}
            className={clsx(
              'fixed top-0 left-0 w-full h-full bg-black/80 z-100 opacity-0',
            )}
          />
          <div
            onClick={() => setSelectedMobilePopup(null)}
            className={clsx(
              'fixed top-0 left-0 z-101 w-full h-full flex items-center justify-center',
            )}
          >
            <LocationCard
              data={selectedMobilePopup as LocationPage}
              setSelectedLocation={setSelectedMobilePopup}
              setSelectedATM={setSelectedATM}
              setSelectedMobilePopup={setSelectedMobilePopup}
            />
          </div>
        </>
      )}
      {selectedMobileAtmPopup && (
        <>
          <div
            ref={popupGradient}
            onClick={() => setSelectedMobileAtmPopup(null)}
            className={clsx(
              'fixed top-0 left-0 w-full h-full bg-black/80 z-100 opacity-0',
            )}
          />
          <div
            onClick={() => setSelectedMobileAtmPopup(null)}
            className={clsx(
              'fixed top-0 left-0 z-101 w-full h-full flex items-center justify-center',
            )}
          >
            <ATMCard
              data={selectedMobileAtmPopup}
              setSelectedLocation={setSelectedMobilePopup}
              setSelectedATM={setSelectedATM}
              setSelectedMobileAtmPopup={setSelectedMobileAtmPopup}
            />
          </div>
        </>
      )}
    </div>
  )
}
