import { useState } from 'react';
import LoginModal from '../components/ui/LoginModal';
import { LoginInput } from '../components/ui/LoginInput';
import LoginButton from '../components/ui/LoginButtons';

export function Login() {
  const openModal = true;
  const [form, setForm] = useState({
    email: '',
    name: '',
    birth: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState({});

  function handleSubmit() {
    setError();
  }

  const footer = () => {
    return (
      <div>
        <div className="buttons flex flex-col buttons w-full gap-2 pt-6">
          <LoginButton
            type="submit"
            variant="cancle"
            size="md"
            form="loginForm"
          >
            로그인
          </LoginButton>
          <button className="flex justify-center items-center h-[40px] bg-[#f2f2f2] rounded-[0.6rem]">
            <img className="w-6" src=".\src\assets\pngegg.png" alt="google" />
            구글로 시작하기
          </button>
        </div>

        <div className="flex justify-between mt-4">
          <div>
            처음이신가요? <span>회원가입</span>
          </div>
          <div>비밀번호 찾기</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      <header className="flex h-16 items-center bg-slate-900 px-6 text-white">
        <h1 className="text-lg font-medium"></h1>
      </header>
      <main className="flex-1 bg-slate-100 p-4">
        <div className="grid h-full grid-cols-[3fr_1fr] gap-4">
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

      <LoginModal openModal={openModal} title="로그인" footer={footer()}>
        <form
          id="loginForm"
          className="flex flex-col gap-1 mt-2"
          onSubmit={handleSubmit}
        >
          <div>
            <LoginInput
              label={'이메일'}
              type={'email'}
              placeholder="이메일을 입력하세요"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} //state 업데이트
              // onBlur={} //유효성검사 메세지 출력
              error={error.email}
            />
          </div>
          <LoginInput
            label={'비밀번호'}
            type={'password'}
            placeholder="비밀번호 입력"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} //state 업데이트
            // onBlur={} //유효성검사 메세지 출력
            error={error.password}
          />
        </form>
      </LoginModal>
    </div>
  );
}
