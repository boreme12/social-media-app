const sanitiseTime = (timeValue, units) => {
  return timeValue === 1 
    ? `${timeValue} ${units} ago`
    : `${timeValue} ${units}s ago`
}

export default (createdAt) => {
  const millis = new Date() - new Date(createdAt)
  const minutes = Math.floor(millis / 60000);
  const hours = (minutes / 60).toFixed(0)
  const days = (hours / 24).toFixed(0)

  if(minutes < 1) {
    return 'Just now'
  } else if(minutes < 60) {
    return sanitiseTime(minutes, 'minute')
  } else if(hours < 24){
    return sanitiseTime(hours, 'hour')
  } else {
    return sanitiseTime(days, 'day')
  }
}