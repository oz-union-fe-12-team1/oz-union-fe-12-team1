import { useState } from "react";
import { quizData } from "../../api/dummyQuiz"
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";

export function Quiz () {
  const [page, setPage] = useState(0);
  const data = quizData.data[page];

  return (<>
    <div className="flex justify-between w-full">
      
      <button
        onClick={()=>{
          page>0 && setPage(prev=>prev-1);
        }}
        disabled={page===0}
        className={`${page===0 && "opacity-20"} p-10`}
      >
        <AiFillCaretLeft size={40}/>
      </button>

      <div className="flex flex-col gap-15 w-full items-center">
        <h1 className="text-[1.6rem] font-semibold select-none">
          {data.id}.&nbsp;&nbsp;{data.question}
        </h1>
        <div className="flex justify-around w-full select-none">
          {data.options.map((option)=>(
            <p className="shadow-md rounded-2xl px-4 py-1 bg-blue-200 text-[1.4rem]">{option}</p>
          ))}
        </div>
        <div>
          {data.answer}
        </div>
        
      </div>


      <button
        onClick={()=>{
          quizData.data.length>page && setPage(prev=>prev+1);
        }}
        disabled={page===quizData.data.length-1}
        className={`${page===quizData.data.length-1 && "opacity-20"} p-10`}
      >
        <AiFillCaretRight size={40}/>
      </button>
    </div>
  </>)
}


