import { useState } from "react";
import LoginModal from "../components/ui/LoginModal";
import LoginButton from "../components/ui/LoginButtons";
import { LoginInput } from "../components/ui/LoginInput";

export function SignUp() {
  const openModal = true;
  const [form, setForm] = useState({
    email: "",
    name: "",
    birth: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState({});
  const [agreed, setAgreed] = useState(false);
  console.log(agreed);

  function handleSubmit() {
    setError();
  }

  const footer = () => {
    return (
      <div className="flex flex-col buttons w-full gap-2 pt-6">
        <LoginButton
          type="submit"
          variant={agreed ? "common" : "cancle"}
          size="md"
          disabled={!agreed}
          form="signupForm"
        >
          회원가입
        </LoginButton>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <header className="h-16 bg-slate-900 text-white flex items-center px-6">
        <h1 className="text-lg font-medium"></h1>
      </header>
      <main className="flex-1 bg-slate-100 p-4">
        <div className="h-full grid grid-cols-[3fr_1fr] gap-4">
          <div className="grid grid-rows-[1fr_2fr] gap-4">
            <div className="grid grid-cols-[2fr_1fr] gap-4">
              <div className="bg-white rounded-lg p-6 flex items-center justify-center">
                <span className="text-lg font-medium text-slate-700"></span>
              </div>
              <div className="bg-white rounded-lg p-6 flex items-center justify-center">
                <span className="text-lg font-medium text-slate-700"></span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 flex items-center justify-center">
              <span className="text-xl font-medium text-slate-700"></span>
            </div>
          </div>
          <div className="bg-blue-600 rounded-lg p-6 flex items-center justify-center">
            <span className="text-lg font-medium text-white"></span>
          </div>
        </div>
      </main>

      <LoginModal openModal={openModal} title="회원가입" footer={footer()}>
        <form
          id="signupForm"
          className="flex flex-col gap-1 mt-2"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between">
            <LoginInput
              label={"이메일"}
              type={"email"}
              placeholder="이메일을 입력하세요"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} //state 업데이트
              // onBlur={} //유효성검사 메세지 출력
              error={error.email}
            />
            <button
              type="button"
              className="flex justify-center items-center h-[35px] border-[1px] rounded-[5px] p-[2px] border-gray-400 bg-gray-200 hover:bg-gray-400"
            >
              인증번호 전송
            </button>
          </div>
          <LoginInput
            label={"이름"}
            type={"text"}
            placeholder="이름을 입력하세요"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} //state 업데이트
            // onBlur={} //유효성검사 메세지 출력
            error={error.name}
          />
          <LoginInput
            label={"생년월일"}
            type={"date"}
            placeholder="생년월일 작성"
            value={form.birth}
            onChange={(e) => setForm({ ...form, birth: e.target.value })} //state 업데이트
            // onBlur={} //유효성검사 메세지 출력
            error={error.birth}
          />
          <LoginInput
            label={"비밀번호"}
            type={"password"}
            placeholder="비밀번호 입력"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} //state 업데이트
            // onBlur={} //유효성검사 메세지 출력
            error={error.password}
          />
          <LoginInput
            label={"비밀번호 확인"}
            type={"password"}
            placeholder="비밀번호 입력 확인"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })} //state 업데이트
            // onBlur={} //유효성검사 메세지 출력
            error={error.confirm}
          />
          <div className="flex gap-1">
            <input
              id="cb"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            ></input>
            <label htmlFor="cb" className="select-none">
              개인 정보 수집 이용 동의
            </label>
          </div>
        </form>
      </LoginModal>
    </div>
  );
}
