import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { reverse } from 'named-urls'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

// CSS imports
import './Recipes.css';

// Local imports
import routes from "../Lib/routes"
import useStyles from "./styles"

const RECIPE_LIST = gql`
    query {
        recipeList {
            edges {
                node {
                    name
                    author
                    description
                    id
                }
            }
        }
    }
`;

function RecipeList() {
    const classes = useStyles();
    const { loading, error, data } = useQuery(RECIPE_LIST);
    if (loading) return <p>Loading...</p>;
    if (error) {
      return <p> Error :( </p>;
		}

    return (
        <main>
            <Container className={classes.cardGrid} maxwidth="md">
                <Grid container spacing={4}>
                    {data.recipeList.edges.map((edge, i) => (
                        <Grid item key={i} xs={12} sm={6} md={4}>
                            <Link href={ reverse(routes.recipe, {"id": edge.node.id}) }>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            { edge.node.name }
                                        </Typography>
                                        <Typography>
                                            { edge.node.description }
                                        </Typography>
                                        <Typography align="right" variant="subtitle2">
                                            Author: { edge.node.author }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
    );
}

const Recipes = (props) => (
    <React.Fragment>
        <RecipeList />
    </React.Fragment>
);

export default Recipes
