import Icon, { IconProps } from './Icon'

export default function Pause({ color = '#000', width = 40, height = 40 }: IconProps) {
  return (
    <>
      <Icon width={width} height={height}>
        <path
          fill={color}
          d="M16.5 20C15.67 20 15 19.33 15 18.5V5.5C15 4.67 15.67 4 16.5 4C17.33 4 18 4.67 18 5.5V18.5C18 19.33 17.33 20 16.5 20Z"
        />
        <path
          fill={color}
          d="M7.5 20C6.67 20 6 19.33 6 18.5V5.5C6 4.67 6.67 4 7.5 4C8.33 4 9 4.67 9 5.5V18.5C9 19.33 8.33 20 7.5 20Z"
        />
      </Icon>
    </>
  )
}
