import React, {useState} from 'react'
import axios from 'axios';
import routes from "../Lib/routes";


import {
	checkLoggedIn,
	getAccessToken,
	getRefreshToken,
	setAccessToken,
	setRefreshToken,
	deleteAccessToken,
	deleteRefreshToken
} from "./token";
import { accessHeader, refreshHeader } from "./headers";

const AuthContext = React.createContext()

function AuthProvider(props) {
    const [data, setData] = useState({
        accessToken: getAccessToken(),
        refreshToken: getRefreshToken(),
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
       headers: {Authorization: refreshHeader()}
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
						defaultData.userInfo = email;

            setAccessToken(result.data.access_token);
					  setRefreshToken(result.data.refresh_token);
            setData(defaultData);
        } else {
            defaultData.errorMsg = result.data.message;
            setData(defaultData);
        }
      })
    }

    const register = (email, password) => { 
			let defaultData = {
        accessToken: "",
        refreshToken: "",
        isLoggedIn: false,
        errorMsg: "",
        statusCode: null,
        userInfo: null
      };

			axios.post(routes.graphql_register, {
				email: email,
				password: password
			}, {
				validateStatus: null
			}).then(result => {
				if (result.status === 200) {
					login(email, password)
				} else {
					defaultData.errorMsg = result.data.message;
					setData(defaultData)
				} 
			})
		}
    const logout = () => {
      deleteRefreshToken();
      deleteAccessToken();
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
        <AuthContext.Provider value={{data, login, logout, register, accessHeader}} {...props} />
    )
}

const useAuth = () => React.useContext(AuthContext)

export {AuthProvider, useAuth }
