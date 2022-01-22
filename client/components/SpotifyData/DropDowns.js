import React from "react";
import { useState } from "react";

const DropDowns = (props) => {

  const genres = props.genres

  const [selectedValue, setSelectedValue] = useState('')

  return (
    <div>
      <select value={selectedValue} onChange={(e => setSelectedValue(e.target.value))}>
        {genres.map((item,idx) =>
          <option key={idx} value={item.value}>{item.name}</option>)}
      </select>
      <p>{selectedValue}</p>
    </div>
  )
}

export default DropDowns
