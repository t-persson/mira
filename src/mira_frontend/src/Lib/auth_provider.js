import React, {useState} from 'react'
import axios from 'axios';
import routes from "../Lib/routes";

const AuthContext = React.createContext()

function checkLoggedIn() {
  if (localStorage.getItem("refreshToken") && localStorage.getItem("accessToken")) {
    return true;
  } else {
    return false
  }
}

function AuthProvider(props) {
    const [data, setData] = useState({
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
        isLoggedIn: checkLoggedIn(),
        errorMsg: "",
        statusCode: null,
        userInfo: null
    });

    const refresh = (refreshToken) => {
      let defaultData = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isLoggedIn: data.isLoggedIn,
        errorMsg: data.errorMsg,
        statusCode: data.errorCode,
        userInfo: data.userInfo
      };
      axios.post(routes.graphql_refresh, {}, {
       validateStatus: null,
       headers: refreshHeader()
      }).then(result => {
         defaultData.statusCode = result.status;
         if (result.status === 200) {
            defaultData.accessToken = result.data.access_token;
            setData(defaultData);
         } else {
            defaultData.errorMsg = result.data.message;
            setData(defaultData);
         }
      })
    }
    const login = (email, password) => {
      let defaultData = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isLoggedIn: data.isLoggedIn,
        errorMsg: data.errorMsg,
        statusCode: data.errorCode,
        userInfo: data.userInfo
      };
      axios.post(routes.graphql_login, {
        email: email,
        password: password
      }, {
         validateStatus: null
      }).then(result => {
        defaultData.statusCode = result.status;
        if (result.status === 200) {
            defaultData.accessToken = result.data.access_token;
            defaultData.refreshToken = result.data.refresh_token;
            defaultData.isLoggedIn = true;

            localStorage.setItem("refreshToken", result.data.refresh_token);  // DONT USE LOCAL STORAGE.
            localStorage.setItem("accessToken", result.data.access_token);  // DONT USE LOCAL STORAGE.

            setData(defaultData);
        } else {
            defaultData.errorMsg = result.data.message;
            setData(defaultData);
        }
      })
    }
    const register = () => {}
    const logout = () => {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
    }
    const accessHeader = () => {
      return {Authorization: 'Bearer ' + data.accessToken };
    }
    const refreshHeader = () => {
      return {Authorization: 'Bearer ' + data.refreshToken };
    }
    const userInfo = () => {
      let defaultData = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isLoggedIn: data.isLoggedIn,
        errorMsg: data.errorMsg,
        statusCode: data.errorCode,
        userInfo: data.userInfo
      };
      axios.get(routes.graphql_status, {
       validateStatus: null,
       headers: accessHeader()
      }).then(result => {
         defaultData.statusCode = result.status;
         if (result.status === 200) {
            defaultData.userInfo = result.data.data;
            setData(defaultData);
         } else {
            defaultData.errorMsg = result.data.message;
            setData(defaultData);
         }
      })
    }

    if (data.isLoggedIn === true && data.statusCode === 401) {
      refresh(data.refreshToken);
    } else if (data.isLoggedIn && data.userInfo === null) {
      userInfo();
    }

    return (
        <AuthContext.Provider value={{data, login, logout, register}} {...props} />
    )
}

const useAuth = () => React.useContext(AuthContext)

export {AuthProvider, useAuth }