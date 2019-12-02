export default async (method, body, token, url) => {
    const settings = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        ...body
      })
    }
    return await fetch(url, settings)
}