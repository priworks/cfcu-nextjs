'use client'

import React, { useEffect, useState } from 'react'
import { useClient } from 'sanity'
import { Box, Card, Stack, Text, Flex } from '@sanity/ui'
import { ChevronDownIcon, ChevronRightIcon, LinkIcon } from '@sanity/icons'
import { useRouter } from 'next/navigation'
const TreeItem = ({ node, level = 0 }: { node: any; level?: number }) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Navigate to the page in Sanity Studio
    router.push(`/studio/structure/subpages;subpages;${node._id}`)
  }

  return (
    <Stack space={3}>
      <Card padding={2} radius={2} onClick={() => setIsOpen(!isOpen)}>
        <Stack space={3}>
          <Flex align="center">
            {node.children.length > 0 &&
              (isOpen ? (
                <ChevronDownIcon fontSize={25} style={{ cursor: 'pointer' }} />
              ) : (
                <ChevronRightIcon fontSize={25} style={{ cursor: 'pointer' }} />
              ))}
            <Text
              size={level === 0 ? 3 : 2}
              style={{ marginLeft: '5px', cursor: 'pointer' }}
              weight={isOpen ? 'bold' : 'regular'}
            >
              {node.title}
            </Text>
            <Box
              style={{ marginLeft: '10px', cursor: 'pointer' }}
              onClick={handleLinkClick}
            >
              <LinkIcon fontSize={25} />
            </Box>
          </Flex>
        </Stack>
      </Card>
      {isOpen && node.children.length > 0 && (
        <Box paddingLeft={4}>
          <Stack space={3}>
            {node.children.map((child: any) => (
              <TreeItem key={child._id} node={child} level={level + 1} />
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  )
}

export const PageHierarchyView = () => {
  const [pages, setPages] = useState([])
  const client = useClient()

  useEffect(() => {
    const fetchPages = async () => {
      const result = await client.fetch(`
        *[_type == "subPage"] {
          _id,
          title,
          parent->{_id, title}
        }
      `)
      setPages(result)
    }
    fetchPages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const buildTree = (pages: any[]) => {
    const tree: any[] = []
    const map: Record<string, any> = {}

    pages.forEach((page) => {
      map[page._id] = { ...page, children: [] }
    })

    pages.forEach((page) => {
      if (page.parent) {
        map[page.parent._id].children.push(map[page._id])
      } else {
        tree.push(map[page._id])
      }
    })

    return tree
  }

  const treeData = buildTree(pages)

  return (
    <Box padding={4}>
      <Text weight="semibold" size={3}>
        Subpages Hierarchy
      </Text>
      <Box marginTop={4}>
        <Stack space={3}>
          {treeData.map((node) => (
            <TreeItem key={node._id} node={node} />
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
