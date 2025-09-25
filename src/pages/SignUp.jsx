import { useEffect, useState } from 'react';
import LoginModal from '../components/ui/LoginModal';
import LoginButton from '../components/ui/LoginButtons';
import { LoginInput } from '../components/ui/LoginInput';
import { useNavigate } from 'react-router-dom';
import { newError } from '../utils/validate';
import Button from '../components/ui/Button';
import { LoginInputPassword } from '../components/ui/LoginInputPassword';

const CONTENT = {
  title: '[필수] 개인정보 수집·이용 동의',
  items: [
    '수집항목: 이메일, 비밀번호, 이름, 생년월일',
    '이용목적: 회원가입, 본인확인, 서비스 제공 및 문의 대응',
    '보유기간: 회원 탈퇴 시 또는 관련 법령에 따른 보관기간 경과 후 파기',
    '동의를 거부할 권리 및 불이익: 동의를 거부할 수 있으나, 서비스 이용이 제한될 수 있습니다.',
  ],
};

export function SignUp() {
  const navigate = useNavigate();
  const openModal = true;
  const [form, setForm] = useState({
    email: '',
    code: '',
    name: '',
    birth: '',
    password: '',
    confirm: '',
  });

  const code = '1q2w3e4r';

  const [touched, setTouched] = useState({
    email: false,
    name: false,
    birth: false,
    password: false,
    confirm: false,
  });
  const [isCodeInput, setIsCodeInput] = useState(true);
  const [isFormInput, setIsFormInput] = useState(true);
  const [isSendModal, setIsSendModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState('');
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [isConsent, setIsConsent] = useState(false);

  const [passwordPower, setPasswordPower] = useState(0);


  const checkPasswordPower = (pw)=> {
    let power = 0;
    if(pw.length >=8) power += 1;
    if(/[A-Za-z]/.test(pw)) power += 1;
    if (/\d/.test(pw)) power += 1;
    setPasswordPower(power);
  }

  useEffect(()=> {
    console.log(passwordPower);
  }, [passwordPower])

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      email: true,
      name: true,
      birth: true,
      password: true,
      confirm: true,
    });
  }

  const errors = newError(form);

  const [agreed, setAgreed] = useState(false);

  const forms =
    form.email.length &&
    form.password.length &&
    form.birth.length &&
    form.password.length &&
    form.confirm.length;
  const noError = !errors.email && !errors.name && !errors.password && !errors.confirm;
  const onButton = agreed && noError && forms;

  const codeConfirm = (emailCode) => {
    if (emailCode === code) {
      setModalConfirm('인증되었습니다.');
      setIsModalConfirm(true);
      setIsFormInput(false);
    } else {
      setModalConfirm('인증번호가 틀립니다.');
      setIsModalConfirm(true);
    }
  };

  const footer = () => {
    return (
      <div className="flex flex-col buttons w-full gap-2 pt-6">
        <LoginButton
          type="submit"
          variant={onButton ? 'common' : 'cancel'}
          size="md"
          disabled={!onButton}
          form="signupForm"
          onClick={() => navigate('/')}
        >
          회원가입
        </LoginButton>
        <div className="text-[12px]">
          생각해보니 가입했었네!?
          <button onClick={() => navigate('/')} type="button" className="text-[#3058bd] font-bold">
            돌아가기
          </button>
        </div>
      </div>
    );
  };

  const close = () => {
    return (
      <div className="mt-6">
        <Button
          variant="common"
          size="md"
          onClick={() => {
            setIsSendModal(false);
            setIsModalConfirm(false);
            setIsConsent(false);
          }}
        >
          닫기
        </Button>
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
        <form id="signupForm" className="flex flex-col gap-1 mt-2" onSubmit={handleSubmit}>
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
            />
            <button
              type="button"
              className="flex justify-center items-center h-[30px] border-[1px]
                rounded-[5px] p-[2px] border-gray-400 bg-gray-200 hover:bg-gray-400 pr-1 pl-1 disabled:hover:bg-gray-200"
              disabled={!(form.email.length && !errors.email)}
              onClick={() => {
                setIsCodeInput(false);
                setIsSendModal(true);
              }}
            >
              인증번호 발송
            </button>
          </div>
          <div className="flex justify-between gap-2">
            <LoginInput
              label={'인증번호'}
              type={'text'}
              placeholder="인증번호를 입력하세요"
              value={form.code}
              onChange={(e) => {
                setForm((code) => ({ ...code, code: e.target.value }));
              }} //state 업데이트
              disabled={isCodeInput}
            />
            <button
              type="button"
              className="flex justify-center items-center h-[30px] border-[1px]
                rounded-[5px] p-[2px] border-gray-400 bg-gray-200 hover:bg-gray-400 pr-1 pl-1 disabled:hover:bg-gray-200"
              disabled={!form.code.length}
              onClick={() => codeConfirm(form.code)}
            >
              인증번호 확인
            </button>
          </div>
          <LoginInput
            label={'이름'}
            type={'text'}
            placeholder="이름을 입력하세요"
            value={form.name}
            onChange={(e) => setForm((name) => ({ ...name, name: e.target.value }))}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            error={touched.name ? errors.name : ''}
            disabled={isFormInput}
          />
          <LoginInput
            label={'생년월일'}
            type={'date'}
            placeholder="생년월일 작성"
            value={form.birth}
            onChange={(e) => setForm((prev) => ({ ...prev, birth: e.target.value }))}
            onBlur={() => setTouched((t) => ({ ...t, birth: true }))}
            error={touched.birth ? errors.birth : ''}
            disabled={isFormInput}
          />
          <div className='flex justify-end gap-1 mr-1'>
            <div className={`${
              passwordPower===0 ? "bg-[#e3e3e3]"
                : passwordPower===1 ? "bg-[#d85a5a]"
                : passwordPower===2 ? "bg-[#ffc848]"
                : passwordPower===3 && "bg-[#72e46a]"
              } w-5 h-[0.15rem]`}>
            </div>
            <div className={`${
              passwordPower===0 ? "bg-[#e3e3e3]"
                : passwordPower===1 ? "bg-[#e3e3e3]"
                : passwordPower===2 ? "bg-[#ffc848]"
                : passwordPower===3 && "bg-[#72e46a]"
              } w-5 h-[0.15rem]`}>
            </div>
            <div className={`${
              passwordPower===0 ? "bg-[#e3e3e3]"
                : passwordPower===1 ? "bg-[#e3e3e3]"
                : passwordPower===2 ? "bg-[#e3e3e3]"
                : passwordPower===3 && "bg-[#72e46a]"
              } w-5 h-[0.15rem]`}>
            </div>
          </div>
          <LoginInputPassword
            label={'비밀번호'}
            placeholder="비밀번호 입력"
            value={form.password}
            onChange={(e) => {
              const next = e.target.value;
              setForm((password) => ({ ...password, password: next }));
              setTouched((t) => ({ ...t, password: true }));
              checkPasswordPower(next)
            }}
            error={touched.password ? errors.password : ''}
            disabled={isFormInput}
          />
          
          <LoginInputPassword
            label={'비밀번호 확인'}
            placeholder="비밀번호 입력 확인"
            value={form.confirm}
            onChange={(e) => {
              const next = e.target.value;
              setForm((confirm) => ({ ...confirm, confirm: next }));
              setTouched((t) => ({ ...t, confirm: true }));
            }}
            error={touched.confirm ? errors.confirm : ''}
            disabled={isFormInput}
          />
          <div className="flex gap-1">
            <input
              id="cb"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            ></input>
            <label htmlFor="cb" className="select-none text-[12px]">
              개인 정보 수집 이용 동의 (필수)
            </label>
            <button
              type="button"
              className="text-[12px] text-blue-500"
              onClick={() => setIsConsent(true)}
            >
              자세히보기
            </button>
          </div>
        </form>
      </LoginModal>

      <LoginModal openModal={isSendModal} footer={close()}>
        인증번호를 발송했습니다.
      </LoginModal>

      <LoginModal openModal={isModalConfirm} footer={close()}>
        {modalConfirm}
      </LoginModal>

      <LoginModal openModal={isConsent} footer={close()}>
        <h1 className="text-[20px] pb-7 font-bold">{CONTENT.title}</h1>
        <ul className="flex flex-col gap-[10px] text-[13px] list-disc ">
          {CONTENT.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </LoginModal>
    </div>
  );
}
