
interface prop {

    onchange: (event: React.ChangeEvent<HTMLInputElement>)=>void
}

function SearchBar({onchange}:prop) {

   

  return (
    <div>
        <input type="text" className='w-[500px] h-[50px] bg-[white] rounded-4xl p-4' placeholder='جست و جو بین مخاطبین ...'  onChange={onchange}/>
    </div>
  )
}

export default SearchBar