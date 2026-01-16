import { useEffect, useState, useCallback } from 'react'
import { useClient } from 'sanity'
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration'

interface ChildDocument {
  _id: string
  _type: string
  title: string
  parent: any
  order: number
}

export function CustomDocumentView(props: any) {
  const { document } = props
  const [childDocuments, setChildDocuments] = useState<ChildDocument[]>([])
  const client = useClient({ apiVersion: '2021-03-25' })

  const fetchChildDocuments = useCallback(() => {
    if (document._id) {
      const query = `*[_type in ["subPage", "otherDocumentType"] && parent._ref == $id] | order(order asc){
        _id,
        _type,
        title,
        parent,
        order
      }`
      const params = { id: document._id }

      client
        .fetch(query, params)
        .then((results) => {
          setChildDocuments(results)
        })
        .catch((err) => {
          console.error('Error fetching child documents:', err)
        })
    }
  }, [document._id, client])

  useEffect(() => {
    fetchChildDocuments()
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
    try {
      await Promise.all(
        items.map((item, index) =>
          client.patch(item._id).set({ order: index }).commit(),
        ),
      )

      fetchChildDocuments() // Refresh the list to get the updated order
    } catch (err) {
      console.error('Error updating order:', err)
    }
  }

  if (!document) {
    return <div>No document to display</div>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Custom View for {document.title}
      </h2>
      <pre className="bg-gray-100 p-4 rounded mb-4">
        {JSON.stringify(document, null, 2)}
      </pre>
      <h3 className="text-xl font-bold mb-2">Child Pages:</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
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
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-2 p-2 bg-gray-100 rounded cursor-move"
                    >
                      {childDoc.title} (Type: {childDoc._type}, Order:{' '}
                      {childDoc.order})
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
