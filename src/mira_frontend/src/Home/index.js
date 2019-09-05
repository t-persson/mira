import React from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from "@apollo/react-hooks"
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';


const CREATE_RECIPE = gql`
    mutation CreateRecipe($name: String!, $ingredient_id: List!, $steps: String!,
                          $description: String!, $author: String!, $tag_id: List!,
                          $portions: Int!) {
        createRecipe(name: $name, ingredient_id: $ingredient_id, steps: $steps,
                     description: $description, author: $author, tag_id: $tag_id,
                     portions: $portions) {
            id
            name
            ingredient_id
            steps
            description
            author
            tag_id
            portions
        }
    }
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fullWidth: true,
    display: 'flex',
    wrap: 'nowrap'
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

const faking_it = [
  {
    value: 'beef',
    label: 'Beef',
  },
  {
    value: 'milk',
    label: 'Milk',
  },
  {
    value: 'carrot',
    label: 'Carrot',
  },
  {
    value: 'cucumber',
    label: 'Cucumber',
  },
];

function Home() {
    const classes = useStyles();
    const [addRecipe, {data}] = useMutation(CREATE_RECIPE);

    const [values, setValues] = React.useState({
        name: "",
        ingredient_id: [],
        steps: "",
        description: "",
        author: "",
        tag_id: [],
        portions: ""
    });
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="name"
                label="Name"
                fullWidth
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                helperText="Name of your recipe."
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="author"
                label="Author"
                fullWidth
                className={classes.textField}
                value={values.author}
                onChange={handleChange('author')}
                helperText="Author of the recipe."
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="description"
                label="Description"
                fullWidth
                multiline
                rows="4"
                className={classes.textField}
                value={values.description}
                onChange={handleChange('description')}
                margin="normal"
                helperText="Describe your recipe."
                variant="outlined"
            />
            <TextField
                id="steps"
                label="Steps"
                fullWidth
                multiline
                rows="20"
                className={classes.textField}
                value={values.steps}
                onChange={handleChange('steps')}
                margin="normal"
                helperText="Each step in your recipe."
                variant="outlined"
            />

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="ingredient_id">Ingredients</InputLabel>
                <Select
                  multiple
                  value={values.ingredient_id}
                  onChange={handleChange("ingredient_id")}
                  input={<Input id="ingredient_id" />}
                  MenuProps={MenuProps}
                >
                  {faking_it.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>

         </form>
    );
}

export default Home