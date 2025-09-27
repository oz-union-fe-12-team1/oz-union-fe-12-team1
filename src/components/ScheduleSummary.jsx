import { summaryData } from "../api/dummySummary"

export default function ScheduleSummary () {

  return (<>
    <div className="w-full h-auto justify-center items-center border border-[#444] p-3 rounded-xl select-none break-keep text-light">
      {summaryData[0].data.summary}
    </div>
  </>)
}