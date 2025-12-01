

interface prop {
    onclick: (e :React.ChangeEvent<HTMLInputElement>)=>void
}

function SearchBar({onclick}:prop) {


  return (
    <div className="w-[50%] flex justify-center items-center">
        <input type="text" className='w-[100%] min-w-[150px] h-[50px] text-[12px] bg-[white] rounded-4xl p-4' placeholder='جست و جو نام یا شماره همراه ...'  onChange={onclick}/>
        
    </div>
  )
}

export default SearchBar