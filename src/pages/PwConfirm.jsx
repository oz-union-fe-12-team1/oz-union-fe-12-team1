import LoginModal from '../components/ui/LoginModal';
import { LoginInput } from '../components/ui/LoginInput';
import { useState } from 'react';
import LoginButton from '../components/ui/LoginButtons';
import { useNavigate } from 'react-router-dom';
import { newError } from '../utils/validate';
import Button from '../components/ui/Button';
import { LoginInputPassword } from '../components/ui/LoginInputPassword';
import Header from '../components/ui/Header';
import { useConfirmPasswordReset, usePasswordReset } from '../api/auth';

export function PwConfirm() {
  const navigate = useNavigate();
  const openModal = true;
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirm: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirm: false,
  });

  const [isPopup, setIsPopup] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const { passwordResetMutate } = usePasswordReset();
  const { confirmPasswordResetMutate } = useConfirmPasswordReset();

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      email: true,
      password: true,
      confirm: true,
    });

    const payload = {
      email: form.email,
      new_password: form.password,
      new_password_check: form.confirm,
    };
    confirmPasswordResetMutate(payload, {
      onSuccess: () => alert('성공띠'),
      onError: () => alert('실패띠...'),
    });
  }

  const errors = newError(form);

  // const users = [{ email: 'test@gmail.com' }, { email: 'test1@gmail.com' }];

  function emailConfirm() {
    // const value = String(email || '')
    //   .trim()
    //   .toLowerCase();
    // if (!value) {
    //   setPopupMessage('이메일을 입력하세요.');
    //   return;
    // }
    // const confirm = users.some((user) => (user.email || '').toLowerCase() === value);
    // if (confirm) {
    //   setPopupMessage('확인되었습니다.');
    //   setIsInput(true);
    // } else {
    //   setPopupMessage('존재하지 않는 이메일입니다.');
    // }
    // setIsPopup(true);

    const payload = form.email;
    if (!payload) {
      setPopupMessage('이메일을 입력하세요.');
      return;
    }
    passwordResetMutate(payload, {
      onSuccess: () => {
        alert('확인되었습니다.');
        setIsInput(true);
      },
      onError: () => alert('존재하지않는 이메일 입니다.'),
    });
  }

  const forms = form.password.length && form.confirm.length;
  const noError = !errors.password && !errors.confirm;
  const onButton = noError && forms;

  const footer = () => {
    return (
      <div className="flex flex-col buttons w-full gap-2 pt-3">
        <LoginButton
          type="submit"
          variant={onButton ? 'common' : 'cancel'}
          size="md"
          form="pwConfirmForm"
          disabled={!onButton}
        >
          변경하기
        </LoginButton>
        <div className="text-[12px]">
          비밀번호 생각났어요!
          <button onClick={() => navigate('/')} type="button" className="text-blue-500 font-bold">
            돌아가기
          </button>
        </div>
      </div>
    );
  };

  const emailfooter = () => {
    return (
      <div className="mt-6">
        <Button variant="common" size="md" onClick={() => setIsPopup(false)}>
          닫기
        </Button>
      </div>
    );
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <main className="flex-1 bg-[#090909] p-4 min-h-0 overflow-hidden">
        <div className="grid h-full grid-cols-[4fr_1fr] gap-4 min-w-0">
          <div className="grid grid-rows-[auto_1fr] gap-4 min-h-0 min-w-0">
            <Header />
            <div className="grid grid-rows-[1fr_2fr] gap-4 min-h-0 min-w-0">
              <div className="grid grid-cols-[3fr_2fr] gap-4 min-h-0 min-w-0">
                <div className="bg-[#22222295] shadow-3d rounded-lg p-6 flex flex-col overflow-y-auto min-w-0"></div>
                <div className="flex items-center justify-center rounded-lg bg-[#22222295] shadow-3d p-6 overflow-y-auto min-w-0"></div>
              </div>
              <div className="grid grid-cols-[1fr_2fr] gap-4 min-h-0 min-w-0">
                <div className="flex bg-[#22222295] items-center justify-center shadow-3d rounded-lg min-w-0"></div>
                <div className="flex items-center justify-center rounded-lg bg-[#22222295] p-6 relative  overflow-x-auto custom-scroll shadow-3d min-w-0"></div>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col bg-[#22222295] shadow-3d rounded-lg overflow-hidden min-w-0"></div>
        </div>
      </main>

      <LoginModal openModal={openModal} title={'비밀번호 찾기'} footer={footer()}>
        <form id="pwConfirmForm" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2">
            <LoginInput
              label={'이메일'}
              type={'email'}
              placeholder="이메일을 입력하세요"
              value={form.email}
              onChange={(e) => {
                setForm((email) => ({ ...email, email: e.target.value }));
              }}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              error={touched.email ? errors.email : ''}
            ></LoginInput>
            <button
              type="button"
              className="flex justify-center items-center w-auto h-[30px] border-[1px] text-neutral-300
                rounded-[5px] p-[2px] border-[#3f3f3f] bg-[#3f3f3f90] hover:bg-[#22222295] pr-1 pl-1 disabled:hover:bg-[#3f3f3f90]"
              disabled={!form.email || errors.email}
              onClick={() => emailConfirm(form.email)}
            >
              이메일 확인
            </button>
          </div>
          <LoginInputPassword
            label={'비밀번호'}
            placeholder="비밀번호 입력"
            value={form.password}
            disabled={!isInput}
            onChange={(e) => {
              const next = e.target.value;
              setForm((password) => ({ ...password, password: next }));
              setTouched((t) => ({ ...t, password: true }));
            }}
            error={touched.password ? errors.password : ''}
          />
          <LoginInputPassword
            label={'비밀번호 확인'}
            placeholder="비밀번호 입력 확인"
            value={form.confirm}
            disabled={!isInput}
            onChange={(e) => {
              const next = e.target.value;
              setForm((confirm) => ({ ...confirm, confirm: next }));
              setTouched((t) => ({ ...t, confirm: true }));
            }}
            error={touched.confirm ? errors.confirm : ''}
          />
        </form>
      </LoginModal>

      <LoginModal
        title={'이메일 확인'}
        openModal={isPopup}
        footer={emailfooter()}
        onClose={() => setIsPopup(false)}
      >
        {popupMessage}
      </LoginModal>
    </div>
  );
}
