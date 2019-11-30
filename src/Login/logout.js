import React from 'react';
import { Redirect } from "react-router-dom";
import {useAuth} from "../Lib/auth_provider";
import routes from "../Lib/routes";


export default function SignOut(props) {
  const { logout } = useAuth();
  logout();
  return <Redirect to={routes.recipes} />;
}