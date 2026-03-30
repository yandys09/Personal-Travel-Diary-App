import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = React.useState("");

  // ""
  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()])
      setInputValue("")
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  }


  return (
    <div>
      {/* {JSON.stringify(tags)} */}
      {
        tags.length > 0 && (
          <div className='flex items-center gap-2 flex-wrap mt-2'>
            {
              tags.map((tag, index) => {
                return (
                  <span key={index} className='flex items-center gap-2 text-sm text-cyan-600 bg-cyan-200/40 px-3 py-1 rounded-sm/'>
                    <FaLocationDot className='text-sm' /> {tag}
                    <button onClick={() => handleRemoveTag(tag)} className='cursor-pointer'>
                      <IoMdClose  />
                    </button>
                  </span>
                )
              }
              )
            }
          </div>
        )
      }
      <div className='flex items-center gap-4 mt-3'>
        <input type="text" className='text-sm bg-transparent border border-slate-200 px-3 py-2 rounded-sm outline-none ' value={inputValue} placeholder='Add Locations' onChange={handleInputChange} onKeyDown={handleKeyDown} />
        <button className='w-8 h-8 flex items-center justify-center rounded-sm border border-cyan-500 hover:bg-cyan-500' onClick={addNewTag}>
          <IoMdAdd className='text-2xl text-cyan-500 hover:text-white' />
        </button>
      </div>
    </div>
  )
}

export default TagInput