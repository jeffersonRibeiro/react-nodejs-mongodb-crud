const storage = () => {
  const key = 'state';
  
  return {
    persist: (data) => localStorage.setItem(key, data),
    get: () => localStorage.getItem(key),
  }

}

export default storage;