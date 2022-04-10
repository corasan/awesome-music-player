import React from 'react'

export default function Icon({
  color = '#000',
  height = 26,
  width = 26,
  children,
  style,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      {children}
    </svg>
  )
}

export interface IconProps {
  color?: string
  children?: React.ReactNode
  height?: number
  width?: number
  style?: React.CSSProperties
}
