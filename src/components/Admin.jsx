// import { useAdminAccount } from "../store/useAdminAccount";
import { adminData } from "./adminData";

// 마이페이지 완성 후 
// 관리자마이페이지 만들기, 이후 버튼 클릭 시 true 되어 
// 대시보드 출력

export default function Admin () {
  // const { adminAccount, setAdminAccount } = useAdminAccount();
  
  return (<>
    <div className="text-black">
      <table className="border">
        <thead>
          <tr>
            <th className="border">ID</th>
            <th className="border">이름</th>
            <th className="border">이메일</th>
            <th className="border">생년월일</th>
            <th className="border">활성화 여부</th>
            <th className="border">가입일시</th>
            <th className="border">/</th>
          </tr>
        </thead>
        <tbody>
          {adminData.data.users.map((user) => (
            <tr key={user.id}>
              <td className="border">{user.id}</td>
              <td className="border">{user.username}</td>
              <td className="border">{user.email}</td>
              <td className="border">{user.birth_date}</td>
              <td className="border">{user.is_active ? "◯" : "✕" }</td>
              <td className="border">{user.created_at}</td>
              <td className="border">
                <button >계정 차단</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>)
}
