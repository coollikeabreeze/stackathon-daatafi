import React from "react";
import { useState } from "react";

const DropDowns = (props) => {

  const dummyData = [
    {value: 1, name: "A"},
    {value: 2, name: "B"},
    {value: 3, name: "C"}
  ]

  const [selectedValue, setSelectedValue] = useState('')

  return (
    <div>
      <select value={selectedValue} onChange={(e)=> setSelectedValue(e.target.value)}>
        {dummyData.map((item,idx) =>
          <option key={idx} value={item.value}>{item.name}</option>)}
      </select>
      <p>{selectedValue}</p>
    </div>
  )
}

export default DropDowns

// import React from "react";
// import { useState } from "react";

// const DropDowns = (props) => {


//   const [selectedValue, setSelectedValue] = useState('')
//   return (
//     <div>
//       <select value={selectedValue} onChange={(e => setSelectedValue(e.target.value))}>
//         {props.genres.map((item,idx) =>
//           <option key={idx} value={item.value}>{item.name}</option>)}
//       </select>
//       <p>{selectedValue}</p>
//     </div>
//   )
// }

// export default DropDowns
