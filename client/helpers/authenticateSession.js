const jwtDecode = require('jwt-decode')

const AuthenticateSession = async () => {
  const token = window.sessionStorage.getItem('token')

    if(token){
      const settings = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        method: 'POST',
      }
  
      const fetchResponse = await fetch('http://localhost:443/login', settings)
      const res = await fetchResponse.json()
      if(res.status === 'success') {
        const tokenData = jwtDecode(token)
        const jsonResp = {
          success: true, 
          id: res.data.id, 
          avatar: res.data.avatar, 
          username: res.data.username,
          token: token
        }
        return jsonResp
      } else {
        window.sessionStorage.removeItem('token')
        return {success: false}
      }
    } else {
      window.sessionStorage.removeItem('token')
      return {success: false}
    }
}

export default  AuthenticateSession