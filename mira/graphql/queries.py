"""Queries 2020."""

RECIPELIST = '''
{
  recipeList {
    edges {
      node {
        id
        name
        description
        author
      }
    }
  }
}
'''

RECIPE = '''
{
  recipe (id: "%s") {
    name
    description
    author
    steps
    portions
    ingredients {
      name
      amount
      measuredIn
    }
    tags {
      edges {
        node {
          name
        }
      }
    }
  }
}
'''
