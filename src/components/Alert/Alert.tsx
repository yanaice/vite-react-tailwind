import React from 'react'

interface Props {
  text?: string
  onClose?: () => void
}

const Alert: React.FC<Props> = ({ text, onClose }) => {
  return (
    <div className="absolute left-1/2 bottom-4 transform -translate-x-2/4 transition-transform duration-700 ease-in-out">
      <div className="text-white p-2 border-0 rounded bg-red-500 relative">
        <span className="text-xl inline-block mr-5 align-middle">
          <i className="fas fa-bell" />
        </span>
        <span className="inline-block align-middle mr-8">
          {text}
        </span>
        <button onClick={onClose} className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-2 mr-6 outline-none focus:outline-none">
          <span>×</span>
        </button>
      </div>
    </div>
  )
}

export default Alert