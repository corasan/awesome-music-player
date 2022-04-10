import Icon, { IconProps } from './Icon'

export default function Play({ color = '#000', width = 40, height = 40 }: IconProps) {
  return (
    <>
      <Icon width={width} height={height}>
        <path
          fill={color}
          d="M18.51 11.14L6.51 4.13998C5.84 3.74998 5 4.22998 5 4.99998V19C5 19.77 5.84 20.25 6.5 19.86L18.5 12.86C19.17 12.48 19.17 11.52 18.51 11.14Z"
        />
      </Icon>
    </>
  )
}
