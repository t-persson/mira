import ApolloClient from 'apollo-boost'
import routes from "./routes"


export const client = new ApolloClient({
    uri: routes.graphql,
})