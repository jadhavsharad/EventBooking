import axios from 'axios';
import authHeader from './authHeader';

const APIURL = 'http://localhost:8000/api/';

class UserService {
  getPublicContent() {
    return axios.get(APIURL + 'all');
  }

  getUserBoard() {
    return axios
      .get(APIURL + 'admin', { headers: authHeader() })
      .then(response => {
        const data =
        {
          message: response.data,
          status: response.status
        }
        return data
      })
      .catch(err => {
        const data = {
          message: err.response.data.message,
          statusCode: err.response.status
        }
        return data
      })
  }

  getAdminBoard() {
    return axios
      .get(APIURL + 'admin', { headers: authHeader() })
      .then(response => {
        const data =
        {
          message: response.data,
          status: response.status
        }
        return data
      })
      .catch(err => {
        const data = {
          message: err.response.data.message,
          statusCode: err.response.status
        }
        return data
      })
  }
}

const userServiceInstance = new UserService();
export default userServiceInstance