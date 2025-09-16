import NyangLoading from '../components/NyangLoading';

export default function LoadingPage() {
  return (
    <NyangLoading
      fullscreen
      imgSrc="/images/nyangbiseo-loading.png"
      label="냥비서가 정보를 모으는 중..."
      tip="잠시만 기다려 주세요."
    />
  );
}
