import React from 'react'

function SupportText(url) {
      return (
        <div>
            <h1>Support page</h1>
            <div id="description">
                <p>This is a page for getting support and stuff.</p>
            </div>
        </div>
    )
}

const Support = ({match}) => (
  <React.Fragment>
    <SupportText />
  </React.Fragment>
);

export default Support