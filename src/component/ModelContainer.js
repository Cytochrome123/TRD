import React from 'react'
// import CompletedCourses from '../../pages/CompletedCourses'

const ModelContainer = ({visible, onClose, children}) => {

    const handleclose = (e) => {
        if (e.target.id ==="toBeClose") {
            
            onClose()
        }
    }

    
    if (!visible) {
        return null
    }
  return (
    <div id='toBeClose' onClick={handleclose}   className='fixed inset-0  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50'>
       {/* <CompletedCourses /> */}
       {children}
    </div>
  )
}

export default ModelContainer