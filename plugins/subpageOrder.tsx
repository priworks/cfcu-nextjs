import React, { useEffect, useState, useCallback } from 'react'
import { useClient } from 'sanity'
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration'
import { GripVertical } from 'lucide-react'

interface ChildDocument {
  _id: string
  _type: string
  title: string
  parent: any
  order: number
}

export function CustomDocumentView(props: any) {
  console.log('CustomDocumentView props:', props)
  const { displayed } = props.document
  const [childDocuments, setChildDocuments] = useState<ChildDocument[]>([])
  const [enabled, setEnabled] = useState(false)
  const [isPending, setIsPending] = useState(false) // Update 1: Added pending state
  const client = useClient({ apiVersion: '2021-03-25' })

  const fetchChildDocuments = useCallback(() => {
    if (displayed?._id) {
      const query = `*[
        _type in ["subPage", "otherDocumentType"] && 
        parent._ref == $id &&
        !(_id in path('drafts.**'))
      ] | order(order asc) {
        _id,
        _type,
        title,
        parent,
        order
      }`
      const params = { id: displayed?._id }

      client
        .fetch(query, params)
        .then((results) => {
          console.log('Fetched published child documents:', results)
          setChildDocuments(results)
          setEnabled(true)
        })
        .catch((err) => {
          console.error('Error fetching child documents:', err)
        })
    }
  }, [displayed?._id, client])

  useEffect(() => {
    fetchChildDocuments()
    return () => {
      setEnabled(false)
    }
  }, [fetchChildDocuments])

  const onDragEnd = async (result: any) => {
    if (!result.destination) {
      return
    }

    const items = Array.from(childDocuments)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setChildDocuments(items)

    // Update order in Sanity
    const transaction = client.transaction()
    items.forEach((item, index) => {
      transaction.patch(item._id, (patch) => patch.set({ order: index }))
    })

    setIsPending(true) // Update 2: Set pending state to true before transaction
    try {
      await transaction.commit()

      // Update only the current (parent) document to trigger revalidation
      await client
        .patch(displayed._id)
        .set({ lastOrderUpdate: new Date().toISOString() })
        .commit()

      console.log('Parent document updated for revalidation')
      fetchChildDocuments() // Refresh the list to get the updated order
      setIsPending(false) // Update 2: Set pending state to false after successful transaction
    } catch (err) {
      setIsPending(false) // Update 2: Set pending state to false after failed transaction
      console.error('Error updating order:', err)
    }
  }

  const onDragStart = () => {
    console.log('Drag started')
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100)
    }
  }

  if (!displayed) {
    return <div>No document to display</div>
  }

  return (
    <div className="p-4 relative">
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        {enabled ? (
          <Droppable droppableId="list">
            {(provided: any) => (
              <ul
                className="list-none pl-0"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {childDocuments.map((childDoc, index) => (
                  <Draggable
                    key={childDoc._id}
                    draggableId={childDoc._id}
                    index={index}
                    isDragDisabled={isPending} // Update 3: Disable dragging when pending
                  >
                    {(provided: any, snapshot: any) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`mb-2 p-2 border-gray-300 border rounded cursor-move ${
                          snapshot.isDragging ? 'shadow-lg' : ''
                        } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`} // Update 3: Add styles for pending state
                      >
                        <div className={'flex items-center gap-x-[8px]'}>
                          <GripVertical
                            color={isPending ? 'lightgray' : 'gray'}
                            size={20}
                          />
                          <span className={'text-[16px]'}>
                            {childDoc.order + 1}. {childDoc.title}
                          </span>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        ) : (
          <div>Loading...</div>
        )}
      </DragDropContext>
      {isPending && ( // Update 4: Add loading indicator
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 cursor-wait"></div>
      )}
    </div>
  )
}
