import React from "react";
import { reverse } from 'named-urls'

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import useStyles from "./styles"

import routes from "../Lib/routes"


export default function Header() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        <Link color="textPrimary" className={classes.link} href={reverse(routes.recipes)}>
                        Recepticon
                        </Link>
                    </Typography>
                    <nav>
                        <Link variant="button" color="textPrimary" className={classes.link} href={reverse(routes.addRecipe)}>
                        Add Recipe
                        </Link>
                        <Link variant="button" color="textPrimary" className={classes.link} href={reverse(routes.recipes)}>
                        Recipes
                        </Link>
                        <Link variant="button" color="textPrimary" href={reverse(routes.api)} className={classes.link}>
                        API
                        </Link>
                        <Link variant="button" color="textPrimary"  href={reverse(routes.support)} className={classes.link}>
                        Support
                        </Link>
                    </nav>
                    <Button href="#" color="primary" variant="outlined" className={classes.link}>
                    Login
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}
