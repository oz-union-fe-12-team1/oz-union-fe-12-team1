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
    if (selectOption === undefined) return "bg-[#2d5b81] hover:bg-[#1b4567]";
    if (selectOption === option) {
      return option === data.answer ? "bg-[#379e3b] hover:bg-[#267c29]" : "bg-[#bf4b4b] bg-[#a73939]";
    }
    return "bg-[#333] hover:bg-[#222]";
  }

  const handleOptionClick = (option) => {
    setSelectOption(option);
    if (option === data.answer) {
      setMessage("정답입니다!");
    } else {
      setMessage("아쉽지만 오답이네요.. 다른 답을 골라볼까요?");
    }
  };


  return (<>
    <div className="flex justify-between w-full h-full items-center">
      
      <button
        onClick={()=>{
          page>0 && setPage(prev=>prev-1);
          setSelectOption(undefined);
          setMessage("과연 정답은?");
        }}
        disabled={page===0}
        className={`${page===0 && "opacity-20"} lg:p-10 `}
      >
        <AiFillCaretLeft size={40}/>
      </button>

      <div className="flex flex-col w-full h-[70%] items-center   justify-around gap-10 lg:gap-0">
        <h1 className="text-[1.4rem] font-semibold select-none break-keep lg:text-[1.8rem]">
          {data.id}.&nbsp;&nbsp;{data.question}
        </h1>
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col justify-around w-full select-none lg:flex-row gap-7 items-center">
            {data.options.map((option, idx)=>(
              <p 
                key={idx}
                className={`shadow-md rounded-2xl px-5 py-1 text-[1.4rem] text-center max-w-[14rem] min-w-[7rem] ${handleBackgroundColor(option)}
                  `}
                onClick={()=>(
                  handleOptionClick(option)
                )}
              >
                {option}
              </p>
            ))}
          </div>

          <p className="text-[1.2rem] text-[#999] mb-10 lg:mb-0">
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
        className={`${page===quizData.data.length-1 && "opacity-20"} lg:p-10`}
      >
        <AiFillCaretRight size={40}/>
      </button>
    </div>
  </>)
}


