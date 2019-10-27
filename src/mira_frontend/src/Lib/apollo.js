import ApolloClient from 'apollo-client'
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import routes from "./routes"

import { accessHeader } from "./headers";
import { checkLoggedIn } from "./token";


const httpLink = createHttpLink({
  uri: routes.graphql,
})

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: checkLoggedIn() ? accessHeader() : "",
		}
	}
});


export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})
