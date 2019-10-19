import React from 'react'

function ApiText(url) {
      return (
        <div>
            <h1>API Description</h1>
            <div id="description">
                <p>This is a page for getting descriptions of the API.</p>
            </div>
        </div>
    )
}

const Api = ({match}) => (
  <React.Fragment>
    <ApiText />
  </React.Fragment>
);

export default Api