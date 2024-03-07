import React, { MouseEventHandler } from 'react'

interface btnProps {
  children: string,
  className: string,
  onClick: MouseEventHandler,
  type: "submit" | "reset" | "button" | undefined
}

const Button: React.FC<btnProps> = ({ children, className, onClick, type }) => {
  return (
    <button type={type} className={`${className} flex items-center justify-center py-1 px-3 rounded-md`} onClick={onClick}>{children}</button>
  )
}

export default Button