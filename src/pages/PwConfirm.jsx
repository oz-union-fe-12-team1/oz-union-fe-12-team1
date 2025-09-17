import LoginModal from '../components/ui/LoginModal';
import { LoginInput } from '../components/ui/LoginInput';
import { useState } from 'react';
import LoginButton from '../components/ui/LoginButtons';
import { useNavigate } from 'react-router-dom';

export function PwConfirm() {
  const navigate = useNavigate();
  const openModal = true;
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState({});

  const footer = () => {
    return (
      <div className="flex flex-col buttons w-full gap-2 pt-6">
        <LoginButton
          type="submit"
          variant={'common'}
          size="md"
          form="pwConfirmForm"
        >
          변경하기
        </LoginButton>
        <div>
          비밀번호 생각났어요!
          <button
            onClick={() => navigate('/')}
            type="button"
            className="text-[#3058bd] font-bold"
          >
            돌아가기
          </button>
        </div>
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

      <LoginModal
        openModal={openModal}
        title={'비밀번호 찾기'}
        footer={footer()}
      >
        <form id="pwConfirmForm" action="">
          <div className="flex justify-between gap-2">
            <LoginInput
              label={'이메일'}
              type={'email'}
              placeholder="이메일을 입력하세요"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} //state 업데이트
              // onBlur={} //유효성검사 메세지 출력
              error={error.email}
            ></LoginInput>
            <button
              type="button"
              className="flex justify-center items-center w-auto h-[35px] border-[1px]
                rounded-[5px] p-[2px] border-gray-400 bg-gray-200 hover:bg-gray-400 pr-1 pl-1"
            >
              이메일 확인
            </button>
          </div>
          <LoginInput
            label={'비밀번호'}
            type={'password'}
            placeholder="비밀번호 입력"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} //state 업데이트
            // onBlur={} //유효성검사 메세지 출력
            error={error.password}
          ></LoginInput>
          <LoginInput
            label={'비밀번호 확인'}
            type={'password'}
            placeholder="비밀번호 입력 확인"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })} //state 업데이트
            // onBlur={} //유효성검사 메세지 출력
            error={error.confirm}
          ></LoginInput>
        </form>
      </LoginModal>
    </div>
  );
}
