export default function formatSeconds(time: number) {
  var hr = ~~(time / 3600)
  var min = ~~((time % 3600) / 60)
  var sec = time % 60
  var sec_min = ''
  if (hr > 0) {
    sec_min += '' + hr + ':' + (min < 10 ? '0' : '')
  }
  sec_min += '' + min + ':' + (sec < 10 ? '0' : '')
  sec_min += '' + sec
  return sec_min
}
