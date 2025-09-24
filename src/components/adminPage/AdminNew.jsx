import Chart from "react-apexcharts";


export function AdminNew({ data }) {
  const today = new Date().toLocaleDateString();

  const todaySignUp = data.items.filter((user) => {
    const createDate = new Date(user.created_at).toLocaleDateString();
    return createDate === today;
  });

  const todayCount = todaySignUp.length;
  const totalCount = data.items.length;

  const percentage = todaySignUp.length > 0 ? (todayCount / totalCount) * 100 : 0;

  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: '전체',
            formatter: function () {
              return totalCount;
            },
          },
        },
      },
    },
    labels: ['오늘 가입자'],
  };

  const series = [Math.round(percentage)];

  return (
    <div className="flex m-1">
      <div className="flex flex-col justify-between">
        <h2 className="text-lg font-bold">유저 가입 현황</h2>
        <div className="text-left flex flex-col gap-1">
          <p>전체 가입자 수:&nbsp;&nbsp;<span className="text-[#d82121] font-bold text-[2rem]">{totalCount}</span></p>
          <p>오늘 가입자 수:&nbsp;&nbsp;<span className="text-[#10b610] font-bold text-[2rem]">{todayCount}</span></p>
        </div>
      </div>
        <Chart options={options} series={series} type="radialBar" height={250} />

    </div>
    
    /* <ul>
        {todaySignUp.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email})
          </li>
        ))}
      </ul> */
  );
}
