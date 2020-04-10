import React, { useState, useMemo, useRef } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from '../../packages/slate-react/dist'

import { motion } from 'framer-motion'

let i = 0

const initialValue = [
  {
    type: 'text',
    id: `${++i}element`,
    children: [
      {
        id: `${i}leaf`,
        text: 'First Item',
      },
    ],
  },
  {
    type: 'text',
    id: `${++i}element`,
    children: [
      {
        id: `${i}leaf`,
        text: 'Second Item ',
      },
    ],
  },
]

const toSlateValue = value => value.map(v => ({ ...v }))

const SwapAnimation = () => {
  const [value, setValue] = useState(initialValue)
  const renderElement = props => <Element {...props} />

  const nodeKeysRef = useRef({})

  const withKeys = editor => {
    const { findKey } = editor
    editor.findKey = element => {
      const { id } = element
      if (!nodeKeysRef.current[id]) {
        nodeKeysRef.current[id] = findKey(element)
      }
      return nodeKeysRef.current[id]
    }
    return editor
  }

  const editor = useMemo(() => withKeys(withReact(createEditor()), []))

  const swap = () => setValue([value[1], value[0]])
  return (
    <Slate editor={editor} value={toSlateValue(value)}>
      <Editable renderElement={renderElement} />
      <div onClick={swap}>SWAP</div>
    </Slate>
  )
}

const Element = ({ attributes, children, element }) => {
  return (
    <motion.div positionTransition {...attributes}>
      {children}
    </motion.div>
  )
}

export default SwapAnimation
