import Icon, { IconProps } from './Icon'

export default function StepBackward({
  color = '#000',
  width = 44,
  height = 44,
  style,
}: IconProps) {
  return (
    <>
      <Icon width={width} height={height} style={style}>
        <path fill={color} d="M10 12L18 6V18L10 12Z" clipRule="evenodd" fillRule="evenodd"></path>
        <path
          fill={color}
          d="M8 18C9.1 18 10 17.1 10 16V8C10 6.9 9.1 6 8 6C6.9 6 6 6.9 6 8V16C6 17.1 6.9 18 8 18Z"
        ></path>
      </Icon>
    </>
  )
}
