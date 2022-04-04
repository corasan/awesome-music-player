export default function formatSeconds(time: number) {
  const t = Number(time.toFixed(0))
  const hr = ~~(t / 3600)
  const min = ~~((t % 3600) / 60)
  const sec = t % 60
  let sec_min = ''
  if (hr > 0) {
    sec_min += '' + hr + ':' + (min < 10 ? '0' : '')
  }
  sec_min += '' + min + ':' + (sec < 10 ? '0' : '')
  sec_min += '' + sec
  return sec_min
}
