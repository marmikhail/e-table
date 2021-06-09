import axios from "axios"

const API_URL = "https://etable-server.herokuapp.com"

async function getInfo(request) {
  const { data: info } = await axios.get(`${API_URL}/${request}`)
  return info
}

  const getter = { getInfo}
  
  export default getter;
