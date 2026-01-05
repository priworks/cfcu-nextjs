import React, { useEffect, useMemo, useState } from 'react'
import { useClient } from 'sanity'
import {
  Card,
  Flex,
  Stack,
  Text,
  TextInput,
  Badge,
  Select,
  Button,
} from '@sanity/ui'
import { IntentLink } from 'sanity/router'

type RedirectRow = {
  _key?: string
  source?: string
  destination?: string
  permanent?: boolean
  _createdAt?: string
}

type SortOption = 'alphabetical' | 'oldest' | 'newest'

export default function RedirectSearchView() {
  const client = useClient()
  const [q, setQ] = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const [rows, setRows] = useState<RedirectRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('alphabetical')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        setLoading(true)
        setError(null)

        // Because your editor uses documentId(redirects.name),
        // the doc id is likely "redirects" (same as redirects.name).
        const docId = 'redirects' // or redirects.name if you can import it here

        const data = await client.fetch<RedirectRow[]>(
          `*[_id == $id][0].redirects[]{_key, source, destination, permanent, _createdAt}`,
          { id: docId },
        )

        if (!cancelled) setRows(data || [])
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Failed to load redirects')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [client])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQ(q)
    }, 3000)

    return () => clearTimeout(timer)
  }, [q])

  // Reset to page 1 when search or sort changes
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedQ, sortBy])

  const filtered = useMemo(() => {
    const needle = debouncedQ.trim().toLowerCase()
    if (!needle) return rows
    return rows.filter((r) => {
      const s = (r.source || '').toLowerCase()
      const d = (r.destination || '').toLowerCase()
      return s.includes(needle) || d.includes(needle)
    })
  }, [debouncedQ, rows])

  const sorted = useMemo(() => {
    const items = [...filtered]

    switch (sortBy) {
      case 'alphabetical':
        return items.sort((a, b) => {
          const srcA = (a.source || '').toLowerCase()
          const srcB = (b.source || '').toLowerCase()
          return srcA.localeCompare(srcB)
        })
      case 'oldest':
        return items.sort((a, b) => {
          const dateA = a._createdAt ? new Date(a._createdAt).getTime() : 0
          const dateB = b._createdAt ? new Date(b._createdAt).getTime() : 0
          return dateA - dateB
        })
      case 'newest':
        return items.sort((a, b) => {
          const dateA = a._createdAt ? new Date(a._createdAt).getTime() : 0
          const dateB = b._createdAt ? new Date(b._createdAt).getTime() : 0
          return dateB - dateA
        })
      default:
        return items
    }
  }, [filtered, sortBy])

  const totalPages = Math.ceil(sorted.length / itemsPerPage)

  const paginated = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return sorted.slice(startIndex, endIndex)
  }, [sorted, currentPage, itemsPerPage])

  return (
    <Stack space={4} padding={4}>
      <Flex gap={3}>
        <Card flex={[1, 2, 3]}>
          <TextInput
            value={q}
            onChange={(e) => setQ(e.currentTarget.value)}
            placeholder="Search by source or destination…"
          />
        </Card>
        <Card flex={1}>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.currentTarget.value as SortOption)}
          >
            <option value="alphabetical">Sort: A-Z</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="newest">Sort: Newest First</option>
          </Select>
        </Card>
      </Flex>

      {loading && <Text muted>Loading redirects…</Text>}

      {error && (
        <Card padding={3} tone="critical">
          <Text>{error}</Text>
        </Card>
      )}

      {!loading && !error && (
        <Flex justify="space-between" align="center">
          <Text size={1} muted>
            Showing{' '}
            {sorted.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
            {Math.min(currentPage * itemsPerPage, sorted.length)} of{' '}
            {sorted.length}
            {debouncedQ && ` (filtered from ${rows.length} total)`}
          </Text>
          {totalPages > 1 && (
            <Flex gap={2} align="center">
              <Button
                text="Previous"
                mode="ghost"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              />
              <Text size={1} muted>
                Page {currentPage} of {totalPages}
              </Text>
              <Button
                text="Next"
                mode="ghost"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
              />
            </Flex>
          )}
        </Flex>
      )}

      <Stack space={2}>
        {paginated.map((r, i) => (
          <Card
            key={r._key ?? `${r.source}-${i}`}
            padding={3}
            border
            radius={2}
          >
            <Flex direction="column" gap={2}>
              <Flex gap={2} align="center" justify="space-between">
                <Flex gap={2} align="center">
                  <Text size={1}>
                    <strong>Source:</strong> {r.source || '—'}
                  </Text>
                  {typeof r.permanent === 'boolean' &&
                    (r.permanent ? (
                      <Badge tone="positive">301</Badge>
                    ) : (
                      <Badge>302</Badge>
                    ))}
                </Flex>
                <IntentLink
                  intent="edit"
                  params={{
                    id: 'redirects',
                    type: 'redirects',
                    path: `redirects[_key=="${r._key}"]`,
                  }}
                >
                  <Button
                    text="Edit"
                    mode="ghost"
                    tone="primary"
                    fontSize={1}
                  />
                </IntentLink>
              </Flex>
              <Text size={1}>
                <strong>Destination:</strong> {r.destination || '—'}
              </Text>
            </Flex>
          </Card>
        ))}
      </Stack>
    </Stack>
  )
}
