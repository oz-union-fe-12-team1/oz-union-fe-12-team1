import { useState } from "react";
import { Input } from "./ui/Input";

export function SignIn () {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassWord] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //이메일 유효성 검사
  const handleEmail = () => {
    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }
  };
  
  //비밀번호 유효성 검사
  const handlePassword = (e) => {
    setPassWord(e.target.value);

    if (e.target.value.length <6) {
      setPasswordError("비밀번호는 최소 6자리 이상이어야 합니다.");
    } else if (!/[a-zA-Z]/.test(e.target.value) || !/[0-9]/.test(e.target.value)) {
      setPasswordError("영문과 숫자를 모두 포함해야 합니다.");
    } else {
      setPasswordError("");
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-black">이메일 유효성 검사 시 멘트 출력</h1>
      <Input
        label="이메일"
        type="text"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e)=> setEmail(e.target.value)} //state 업데이트
        onBlur={handleEmail} //유효성검사 메세지 출력
        error={emailError}
      />

      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={handlePassword} //유효성검사 메세지 출력
        error={passwordError}
      />
    </div>
  )
}