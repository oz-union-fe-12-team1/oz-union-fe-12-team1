export default function Button ({
  children, 
  variant = "",
  size = "s",
  disabled = false,
  ...rest
}) {
  const base = "flex justify-center items-center transition text-white "

  const variants= {
    common: "bg-[#3456AF] hover:bg-[#24469d] disabled:bg-[#214294]",
    cancle: "bg-[#636e8b] hover:bg-[#505b78] disabled:bg-[#495060]",
    confirm: "bg-[#3058bd] hover:bg-[#1f45a5] disabled:bg-[#1c3063]",
  };

  const sizes = {
    sm: "w-24 px-2 py-1 text-sm rounded-[0.4rem]",
    md: "w-32 px-4 py-2 text-base rounded-[0.6rem]",
    lg: "w-40 px-6 py-3 text-lg rounded-[0.7rem]",
  };

  const disabledClasses = disabled ? "cursor-not-allowed opacity-70" : "";

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${disabledClasses}`;

  return (
    <button type="button" className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
