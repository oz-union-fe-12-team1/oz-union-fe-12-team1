import { quizData } from "../../api/dummyQuiz"

export function Quiz () {
  const data = quizData.data;
  return (<>
      {data.map((quiz)=>(
        <h1>{quiz.id}.</h1>
        ))}
  </>)
}