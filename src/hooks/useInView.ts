import { useInView as useFramerInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'


export function useInView(options = { once: true, threshold: 0.1 }) {
  const ref = useRef(null)
  const isInView = useFramerInView(ref, options)

  return [ref, isInView] as const
}
