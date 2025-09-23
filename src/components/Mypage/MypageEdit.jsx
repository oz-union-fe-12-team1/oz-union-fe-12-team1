import { useEffect, useState } from 'react';
import Label from './common/Label';
import Modal from '../ui/Modal';

export default function MypageEdit({
  defaultUsername,
  defaultBirthdate,
  defaultProfileImage,
  onSubmit,
  onAskDelete,
  onPreview,
}) {
  const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(new Date());

  const [username, setUsername] = useState(defaultUsername ?? '');
  const [birthdate, setBirthdate] = useState(defaultBirthdate ?? '');
  const [profileImage, setProfileImage] = useState(defaultProfileImage ?? '');
  const [profileFileName, setProfileFileName] = useState('');

  // 알림 모달 상태
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState('알림');
  const [infoMessage, setInfoMessage] = useState('');
  const showInfo = (message, title = '알림') => {
    setInfoTitle(title);
    setInfoMessage(message);
    setInfoOpen(true);
  };
  const closeInfo = () => setInfoOpen(false);

  useEffect(() => {
    return () => {
      if (profileImage?.startsWith?.('blob:')) URL.revokeObjectURL(profileImage);
    };
  }, [profileImage]);

  const applyProfile = async () => {
    if (!username.trim()) {
      showInfo('닉네임을 입력하세요.');
      return;
    }
    await onSubmit({ username: username.trim(), profile_image: profileImage, birthdate });
    showInfo('적용되었습니다.');
  };

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
            if (profileImage?.startsWith?.('blob:')) URL.revokeObjectURL(profileImage);
            setProfileFileName(file.name);
            const url = URL.createObjectURL(file);
            setProfileImage(url);
            onPreview?.(url);
          }}
        />
        <label htmlFor="profile-file" className="btn cursor-pointer">
          파일선택
        </label>
      </div>
      <div>
        <Label>닉네임 변경</Label>
        <input
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="닉네임을 입력하세요."
        />
        <button type="button" className="btn" onClick={applyProfile} disabled={!username.trim()}>
          적용
        </button>
      </div>

      <Label>생년월일 변경</Label>
      <div className="flex gap-2">
        <input
          className="input flex-1"
          type="date"
          value={birthdate} // today로 채우지 말고 그대로
          onChange={(e) => setBirthdate(e.target.value)}
          min="1900-01-01"
          max={today}
        />

        <button
          className="btn"
          onClick={async () => {
            if (!birthdate) {
              showInfo('생년월일을 선택해 주세요.');
              return;
            }
            await onSubmit({ username, profile_image: profileImage, birthdate });
            showInfo('적용되었습니다.');
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
          <button type="button" className="btn" onClick={() => showInfo('적용되었습니다.')}>
            적용
          </button>
        </div>
      </div>

      <button className="text-xs text-slate-700 underline" onClick={onAskDelete}>
        회원탈퇴
      </button>
      <Modal
        openModal={infoOpen}
        title={infoTitle}
        onClose={closeInfo}
        footer={
          <button type="button" className="btn" onClick={closeInfo}>
            확인
          </button>
        }
      >
        <p className="mt-2 text-sm text-slate-800">{infoMessage}</p>
      </Modal>
    </div>
  );
}
