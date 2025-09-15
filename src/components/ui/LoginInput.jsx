export function LoginInput({
  label,
  type,
  error, //ex: 유효성 검사 부적합 시 메세지 출력
  onChange, // 타이핑할 때마다 바로바로 실행하는 거.
  onBlur, // onFocus 반대, input에서 포커스가 빠져나갔을 때 실행.
  // 사용자가 입력을 마치고, Focus가 해제됐을 때.
  // ex: 유효성 검사 바로바로 할 때 =  Controlled Component일 떄 쓰면 좋음.
  ...rest
}) {
  const id = rest.id || `input-${Math.random().toString(36).slice(2, 11)}`;

  const errorMessage = error
    ? "text-red-500 text-sm mt-1"
    : "text-white text-sm mt-1";

  return (
    <div>
      {label && (
        <label htmlFor={id} className="opacity-0 sr-only">
          {label}
        </label>
      )}
      <div className="flex flex-col">
        <input
          id={id}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          className="border px-3 rounded-sm"
          {...rest}
        />
        <div className={errorMessage}>{error}</div>
      </div>
    </div>
  );
}
