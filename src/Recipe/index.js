import React from 'react'
import Button from '@material-ui/core/Button';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import routes from "../Lib/routes"


const RECIPE_DETAILS = gql`
    query Recipe($id: ID!) {
        recipe(id: $id) {
            id
            name
            author
            description
            steps
        }
    }
`;

function RecipeDetails(url) {
    let id = url.id;
    const { loading, error, data } = useQuery(RECIPE_DETAILS, {
        variables: {id},
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p> Error :( </p>;

    let recipe = data.recipe;
    let steps_as_list = recipe.steps.split('\n').map((item, i) => {
        return <li key={i}>{item}</li>;
    });

    return (
        <div key={ recipe.id }>
            <h1>{ recipe.name }</h1>
            <div id="description">
                <h3>{ recipe.description }</h3>
            </div>
            <ol>
                { steps_as_list }
            </ol>
            <small>Author: { recipe.author }</small>
        </div>
    )
}

const Recipe = ({match}) => (
  <React.Fragment>
    <Button href={routes.recipes}>Back to recipes</Button>
    <RecipeDetails id={match.params.id} />
  </React.Fragment>
);

export default Recipe