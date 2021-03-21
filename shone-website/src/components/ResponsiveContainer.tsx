import PropTypes from 'prop-types'
import React from 'react'

function ResponsiveContainer({ children }): JSX.Element {
  return <main className="container mx-auto xs:mx-4">{children}</main>
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ResponsiveContainer
