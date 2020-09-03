export function formatDate(tstamp) {
  if(tstamp) {
    const d = new Date(tstamp)
    
    if(d.toString() !== "Invalid Date" && tstamp) {
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
      // return d.toUTCString()
      // return d.toISOString()
    } else {
      return d.toString()
    }
  } else {
    return "Invalid Date"
  }
}