import NyangErrorSimple from '../components/NyangError';

export default function ErrorPage() {
  return (
    <NyangErrorSimple
      status={404}
      imgSrc="/images/nyangbiseo-cry.png"
      homeHref="/"
      onRetry={() => window.location.reload()}
    />
  );
}
