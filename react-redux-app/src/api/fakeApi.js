export const fetchWithDelay = async (url, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await fetch(url)
      const data = await response.json()
      resolve(data)
    }, delay)
  })
}
