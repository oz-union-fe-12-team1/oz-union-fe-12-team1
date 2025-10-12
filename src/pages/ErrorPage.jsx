import ErrorView from '../components/ErrorView';

export default function ErrorPage() {
  return <ErrorView status={404} homeHref="/" onRetry={() => window.location.reload()} />;
}
