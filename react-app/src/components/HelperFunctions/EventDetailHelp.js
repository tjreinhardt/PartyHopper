export const averageReviews = (reviewsList) => {
  let sum = 0;
  if (reviewsList.length === 0) return
  if (reviewsList.length === 1) return reviewsList[0].rating - 1
  if (reviewsList.length === 2) return (((reviewsList[0].rating - 1) + reviewsList[1].rating) / 2)
  if (reviewsList.length >= 3) {
    let newArray = []
    for (let i = 0; i < reviewsList.length; i++) {
      newArray.push(reviewsList[i].rating)
      let newValue = reviewsList[i].rating
      sum += newValue
    }
    return sum / reviewsList.length - 1
  }
  return ((sum / reviewsList.length)).toFixed(2)
}


export const timeConversion = (startTime) => {
  let parts = startTime.split(":")
  console.log(parts[0], "parts[0]")
  if (parts[0] === '00') {
    return `${(Number(parts[0])) + 12}:${parts[1]} AM`
  }
  else if (parts[0] > 12) {
    return `${(parts[0]) - 12}:${parts[1]} PM`
  } else return `${startTime} AM`
}

export const dateConversion = (startDate) => {
  let parts = startDate.split("-")
  let year = parts[0]
  let month = parts[1]
  let day = parts[2]
  let removeZeroes;
  if (parts[1].startsWith('0')) {
    removeZeroes = parts[1].split("0")
    removeZeroes.shift()
    removeZeroes = removeZeroes[0]
  } else removeZeroes = month

  let monthsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  for (let i = 0; i < months.length; i++) {
    if (`${monthsNumber[i]}` === removeZeroes) {
      return `${months[i]} ${day}, ${year}`
    }
  }
}


export const colors = {
  'yellow': "rgb(219, 142, 0)",
  'gray': "#a9a9a9"
}
