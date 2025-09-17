import { useEffect, useState } from 'react';
import Label from './common/Label';

export default function MypageEdit({
  defaultUsername,
  defaultBirthdate,
  defaultProfileImage,
  onSubmit,
  onAskDelete,
  onPreview,
}) {
  const [username] = useState(defaultUsername);
  const [birthdate, setBirthdate] = useState(defaultBirthdate); // YYYY-MM-DD
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [profileFileName, setProfileFileName] = useState('');

  useEffect(() => {
    return () => {
      if (profileImage?.startsWith?.('blob:')) URL.revokeObjectURL(profileImage);
    };
  }, [profileImage]);

  return (
    <div className="space-y-4">
      <Label>이미지 변경</Label>
      <div className="flex items-center gap-2">
        {profileFileName && (
          <span className="text-sm text-slate-700 max-w-[60%] truncate">{profileFileName}</span>
        )}
        <input
          id="profile-file"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setProfileFileName(file.name);
            const url = URL.createObjectURL(file);
            setProfileImage(url);
            onPreview?.(url);
          }}
        />
        <label htmlFor="profile-file" className="btn cursor-pointer">파일선택</label>
      </div>

      <Label>생년월일 변경</Label>
      <div className="flex gap-2">
        <input
          className="input flex-1"
          placeholder="YYYY-MM-DD"
          type="text"
          inputMode="numeric"
          pattern="\d{4}-\d{2}-\d{2}"
          value={birthdate}
          onChange={(e) =>
            setBirthdate(
              e.target.value
                .replace(/[^\d-]/g, '')
                .replace(/^(\d{4})(\d)/, '$1-$2')
                .replace(/^(\d{4}-\d{2})(\d)/, '$1-$2')
                .slice(0, 10),
            )
          }
        />
        <button
          className="btn"
          onClick={async () => {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
              alert('생년월일은 YYYY-MM-DD 형식이어야 합니다.');
              return;
            }
            await onSubmit({ username, profile_image: profileImage, birthdate });
            alert('적용되었습니다.');
          }}
        >
          적용
        </button>
      </div>

      <Label>비밀번호 변경</Label>
      <div className="space-y-2">
        <input className="input" placeholder="현재 비밀번호" type="password" />
        <input className="input" placeholder="새로운 비밀번호" type="password" />
        <div className="flex gap-2">
          <input className="input flex-1" placeholder="새로운 비밀번호 확인" type="password" />
          <button className="btn" onClick={() => alert('적용되었습니다.')}>적용</button>
        </div>
      </div>

      <button className="text-xs text-slate-700 underline" onClick={onAskDelete}>
        회원탈퇴
      </button>
    </div>
  );
}
