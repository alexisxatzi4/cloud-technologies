export const setItem = (key, data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

export const getItem = (key) => {
  if (typeof window !== 'undefined') {
     return localStorage.getItem(key)
  }
}

export const removeItem = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}



