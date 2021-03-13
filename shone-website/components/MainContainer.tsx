import React from 'react'

export default function MainResponsiveContainer({ children }): JSX.Element {
  return <main className="container mx-auto">{children}</main>
}
