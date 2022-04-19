export const isAuthenticated = () => {
    try {
      if (localStorage.getItem('token') !== null) {
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }