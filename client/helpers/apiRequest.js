export default async (method, token, url, body) => {
  let settings

  if(typeof body !== 'undefined'){
    settings = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        ...body
      })
    }
  } else{
    settings = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    }
  }
    return fetch(url, settings)
}