import React from 'react'
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost'
import { gql } from 'apollo-boost'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'


const client = new ApolloClient({
    uri: "http://127.0.0.1:5000/graphql",
})

const Home = (props) => (
  <ApolloProvider client={client}>
    <Recipes />
  </ApolloProvider>
);

ReactDOM.render(<Home />, document.getElementById("root"))

function Recipes() {
    const { loading, error, data } = useQuery(gql`
    {
        recipeList {
            edges {
                node {
                    name
                    author
                }
            }
        }
      }
    `);
    if (loading) return <p>Loading...</p>;
    if (error) return <p> Error :( </p>;

    return data.recipeList.edges.map((edge, i) => (
        <div key={i} class="recipe">
            <h3>{edge.node.name}</h3>
            <p>{edge.node.author}</p>
        </div>
    ));
}

export default Home