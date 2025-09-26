import { useState } from "react";
import Button from "../ui/Button";
import { adminData } from "./adminData";
import { Input } from '../ui/Input';
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "../../store/useDebounce";
import { useUserSearch } from "../../api/admin";


export default function Admin () {
  const [mode, setMode] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue);

  const { userSearchData, userSearchIsLoading, userSearchIsError } = useUserSearch(debouncedValue);


  const filteredUsers = mode === "connecting"
    ? adminData.items.filter((u) => u.is_active)
    : adminData.items;

  const searchedUser = debouncedValue ? (userSearchData ?? []) : filteredUsers;

  return (<>
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="flex w-45">
          <label className="sr-only">조건 선택</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full border rounded px-3 py-1"
          >
            <option value="" disabled hidden>조건 선택</option>
            <option value="all">전체 유저 조회</option>
            <option value="connecting">접속 중인 유저 조회</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <Input
            label="유저 검색"
            type="text"
            placeholder="유저를 검색하세요"
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
            classNames="rounded-sm border px-3 py-1"
          />
          {/* rounded-sm border px-3 */}
          <IoSearch />
        </div>
      </div>
      <div className="w-full overflow-x-auto custom-scroll">
        <div className="rounded-lg overflow-hidden shadow-md border border-table w-full  max-w-[80rem] mx-auto  h-[20rem] overflow-y-scroll">
          <table className="rounded-lg overflow-hidden w-full border ">
            <thead>
              <tr className="bg-[#222222]">
                <th className="border border-table p-2 text-center">ID</th>
                <th className="border border-table p-2 text-center">접속여부</th>
                <th className="border border-table p-2 text-center">관리자</th>
                <th className="border border-table p-2 text-center">이름</th>
                <th className="border border-table p-2 text-center">이메일</th>
                <th className="border border-table p-2 text-center">가입일시</th>
                <th className="border border-table p-2 text-center">계정차단</th>
              </tr>
            </thead>
            <tbody>
              {userSearchIsLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    로딩 중입니다.
                  </td>
                </tr>
              ) : userSearchIsError ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    조회 중 오류 발생
                  </td>
                </tr>
              ) : searchedUser.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    조회된 유저가 없습니다.
                  </td>
                </tr>
              ) : (
                searchedUser.map((user) => (
                <tr 
                  key={user.id}
                >
                  <td className="border border-table p-2 text-center bg-[#222222]">{user.id}</td>
                  <td className="border border-table">{user.is_active ? 
                  <div className="m-auto border  rounded-2xl bg-[#34cf20] w-3.5 h-3.5 shadow-[0_0_5px_#34cf20]"></div>
                  : <div className="m-auto border  rounded-2xl bg-[#cf2020] w-3.5 h-3.5 shadow-[0_0_5px_#909090]"></div>
                  }</td>
                  <td className={`border p-2 text-center border-table ${user.is_superuser && "text-red-500" }`}>{user.is_superuser ? "◯" : "✕" }</td>
                  <td className="border border-table p-2 text-center">{user.username}</td>
                  <td className="border border-table p-2 text-center overflow-hidden">{user.email}</td>
                  <td className="border border-table p-2 text-center">{user.created_at.slice(2, -9).replace("T", "/").replace(/-/g,'/')}</td>
                  <td className="border border-table w-[5rem] h-full text-center align-middle p-1">
                    <Button size="vsm" variant="common">차단</Button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </>)
}
