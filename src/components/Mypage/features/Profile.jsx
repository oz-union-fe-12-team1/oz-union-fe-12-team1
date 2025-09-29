// src/Mypage/features/Profile.jsx
export default function Profile({ username, email, birthdate, image }) {
  const name = username || '';
  const mail = email || '';
  const bday = birthdate || '';
  const img = image || '/images/nyangbiseo-sunglasses.png';

  return (
    <div className="flex items-center gap-4">
      <img
        src={img}
        alt="profile"
        className="w-20 h-20 rounded-full object-cover border border-white/10"
      />
      <div>
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-sm text-neutral-300">{mail}</div>
        <div className="text-sm text-neutral-400 mt-1">생년월일: {bday || '-'}</div>
      </div>
    </div>
  );
}
