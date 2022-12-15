export function checkResponse(response: Response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}