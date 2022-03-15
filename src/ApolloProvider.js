import React from "react";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import authReducer, { initialState } from "./authReducer";
import { AuthProvider } from "./authContext";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  uri: "https://socialize-socialmedia.herokuapp.com/",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default (
  <ApolloProvider client={client}>
    <AuthProvider initialState={initialState} reducer={authReducer}>
      <App />
    </AuthProvider>
  </ApolloProvider>
);
