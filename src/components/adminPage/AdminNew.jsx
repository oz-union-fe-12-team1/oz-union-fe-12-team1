import Chart from 'react-apexcharts';

export function AdminNew({ data }) {
  // 오늘
  const today = new Date();
  // const todayYear = today.getFullYear().toString().slice(2);
  // const todayMonth = (today.getMonth() + 1).padStart(2, '0');
  // const todayDay = String(createDate.getDate()).padStart(2, '0');
  // const todayHour = String(createDate.getHours()).padStart(2, '0');
  // const todayMinute = String(createDate.getMinutes()).padStart(2, '0');

  // 일주일 담은 배열
  const weekWhile = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().slice(0, 10);
  });
  console.log(weekWhile[0]);
  //"created_at": "2025-09-30T16:54:20.190Z"
  //Wed Oct 01 2025 02:04:15 GMT+0900 (한국 표준시)

  const todaySignUp = data.items.filter((user) => {
    const createDate = new Date(user.created_at).toLocaleDateString();
    // const year = createDate.getFullYear().toString().slice(2);
    // const month = String(createDate.getMonth() + 1).padStart(2, '0');
    // const day = String(createDate.getDate()).padStart(2, '0');
    // const hour = String(createDate.getHours()).padStart(2, '0');
    // const minute = String(createDate.getMinutes()).padStart(2, '0');

    return createDate === today;
  });

  const todayCount = todaySignUp.length;
  const totalCount = data.items.length;

  const percentage = todaySignUp.length > 0 ? (todayCount / totalCount) * 100 : 0;

  const options = {
    chart: {
      type: 'radialBar',
      sparkline: {
        enabled: false,
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: '70%',
        },
        track: {
          show: true,
          margin: 0,
        },
        dataLabels: {
          name: {
            fontSize: '18px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: false,
            label: '전체',
            formatter: function () {
              return totalCount;
            },
          },
        },
      },
    },
    labels: ['신규 회원'],
    stroke: {
      lineCap: 'round',
    },
  };

  const series = [Math.round(percentage)];

  return (
    <div className="flex  overflow-x-hidden overflow-y-hidden w-full h-full">
      <div className="flex justify-between items-center w-full h-full">
        <div className="flex items-start h-full">
          <h2 className="text-lg font-bold w-full">유저 가입 현황</h2>
        </div>
        <Chart options={options} series={series} type="radialBar" height={170} />
        <div className="flex flex-col items-end justify-end h-full">
          <p>
            전체 가입자 수:&nbsp;&nbsp;
            <span className="text-[#941010] font-bold text-[2rem]">{totalCount}</span> 명
          </p>
          <p>
            오늘 가입자 수:&nbsp;&nbsp;
            <span className="text-[#007f00] font-bold text-[2rem]">{todayCount}</span> 명
          </p>
        </div>
      </div>
    </div>
  );
}
