export default function LoginButton({
  type = 'button',
  children,
  variant = '',
  disabled = false,
  ...rest
}) {
  const base = 'flex justify-center items-center transition text-white ';

  const variants = {
    common: 'bg-[#2d5b81] hover:bg-[#1b4567] disabled:bg-[#214294]',
    cancel: 'bg-[#636e8b] hover:bg-[#505b78] disabled:bg-[#495060]',
    confirm: 'bg-[#2d5b81] hover:bg-[#1b4567] disabled:bg-[#1c3063]',
    mini: 'bg-[#eee] hover:bg-[#ddd] disabled:bg-[#ccc]',
  };

  const sizes = {
    md: 'w-full px-4 py-2 text-base rounded-[0.6rem]',
    mini: 'h-[30px] w-[30px] p-1 rounded-r-[0.3rem] border border-black',
  };

  const disabledClasses = disabled ? 'cursor-not-allowed opacity-70' : '';

  const classes = `${base} ${variants[variant]} ${sizes['md']} ${disabledClasses}`;

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
