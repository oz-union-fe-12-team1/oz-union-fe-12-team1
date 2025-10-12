// "YYYY-MM-DD HH:MM" (Asia/Seoul)
export function formatSeoul(date) {
  const fmt = new Intl.DateTimeFormat('sv-SE', {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: false,
    timeZone: 'Asia/Seoul',
  });
  const d = date instanceof Date ? date : new Date(date);
  return fmt.format(d);
}

export function nowSeoulString() {
  return formatSeoul(new Date());
}
