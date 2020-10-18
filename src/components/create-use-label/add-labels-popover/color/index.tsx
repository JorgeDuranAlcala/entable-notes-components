import React from 'react'

export default function Color({ color, onClick, className, editColor, setColorOnMouse, chooseColorToEdit }: any) {
  return (
    <div
      className={`${className} hover:scale-125 hover:shadow-md transition-all rounded-full p-2 cursor-pointer mr-2`}
      onClick={() => (editColor ? chooseColorToEdit(color) : onClick(color))}
      onMouseOver={() => setColorOnMouse && setColorOnMouse(color)}
      onMouseLeave={() => setColorOnMouse && setColorOnMouse('')}
      style={{ backgroundColor: color }}
    ></div>
  )
}
