export async function checkResponse(response: Response) {
  if (!response.ok) {
    const err = await response.json();
    console.error(err);
    return Promise.reject(err);
  }
  
  return response.json();
}
