export function AdminNew (data) {
  const today = new Date().setMilliseconds(0,10);
  const todaySignUp = data.items.filter((user) => {
    const createDate = new Date(user.created_at).toISOString().slice(0,10);
    return createDate === today;
  })
  return (<>
  </>)
}