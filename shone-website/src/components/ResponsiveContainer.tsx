import React from 'react'

export default function ResponsiveContainer({ children }): JSX.Element {
  return <main className="container mx-auto xs:mx-4">{children}</main>
}
