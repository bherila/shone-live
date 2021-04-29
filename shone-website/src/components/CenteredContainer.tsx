import React from 'react'

export default function CenteredContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex w-full justify-center">{children}</div>
}
