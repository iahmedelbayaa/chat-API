export const baseUrl = `http://localhost:3000/api/v1`

export const postRequest = async (url, body) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body
    });
    const data = await response.json()
    if (!response.ok) {
        let message;
        if (data?.message) {
            message = data.message
        } else {
            message = data;
        }
        return {error : true , message}
    }
    return data
}

export const getRequest = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      let message = "an error ocurred ....";
      if (data?.message) {
        message = data.message;
      } 
      return { error: true, message };
    }

    return data;
  } catch (error) {
    console.error('Error during fetch:', error);
    return { error: true, message: 'Error during fetch' };
  }
};
