import { useState } from "react";
import { quizData } from "../../api/dummyQuiz"
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";


export function Quiz () {
  const [page, setPage] = useState(0);
  const [selectOption, setSelectOption] = useState();
  const data = quizData.data[page];
  const [message, setMessage] = useState("과연 정답은?")
  

  const handleBackgroundColor=(option)=>{
    if (selectOption === undefined) return "bg-blue-200";
    if (selectOption === option) {
      return option === data.answer ? "bg-[#45ee4b]" : "bg-[#bf4b4b]";
    }
    return "bg-gray-200";
  }

  const handleOptionClick = (option) => {
    setSelectOption(option);
    if (option === data.answer) {
      setMessage("정답입니다! 다음 문제를 풀어봅시다!");
    } else {
      setMessage("아쉽지만 오답이네요.. 다른 답을 골라볼까요?");
    }
  };


  return (<>
    <div className="flex justify-between w-full">
      
      <button
        onClick={()=>{
          page>0 && setPage(prev=>prev-1);
          setSelectOption(undefined);
          setMessage("과연 정답은?");
        }}
        disabled={page===0}
        className={`${page===0 && "opacity-20"} p-10`}
      >
        <AiFillCaretLeft size={40}/>
      </button>

      <div className="flex flex-col w-full h-full items-center  justify-between">
        <h1 className="text-[1.8rem] font-semibold select-none">
          {data.id}.&nbsp;&nbsp;{data.question}
        </h1>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col justify-around w-full select-none lg:flex-row gap-5 items-center">
            {data.options.map((option, idx)=>(
              <p 
                key={idx}
                className={`shadow-md rounded-2xl px-4 py-1 text-[1.4rem] text-center max-w-[12rem] min-w-[7rem] ${handleBackgroundColor(option)}
                  `}
                onClick={()=>(
                  handleOptionClick(option)
                )}
              >
                {option}
              </p>
            ))}
          </div>

          <p className="text-[1.4rem] text-[#999]">
            {message}
          </p>

        </div>
        
      </div>


      <button
        onClick={()=>{
          quizData.data.length>page && setPage(prev=>prev+1);
          setSelectOption(undefined);
          setMessage("과연 정답은?");
        }}
        disabled={page===quizData.data.length-1}
        className={`${page===quizData.data.length-1 && "opacity-20"} p-10`}
      >
        <AiFillCaretRight size={40}/>
      </button>
    </div>
  </>)
}


