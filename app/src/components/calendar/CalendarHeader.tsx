"use client";

interface CalendarHeaderProps {
  dates: Date[];
  showMonthLabel?: boolean;
}

export function CalendarHeader({ dates, showMonthLabel = true }: CalendarHeaderProps) {
  const monthNames = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
  ];

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
      <div className="flex">
        {/* Unit name column */}
        <div className="w-48 flex-shrink-0 border-r border-gray-200 bg-gray-50 px-4 py-2">
          <div className="text-sm font-semibold text-gray-900">Unidad</div>
        </div>

        {/* Date columns */}
        <div className="flex-1 flex">
          {dates.map((date, index) => {
            const isToday =
              date.toDateString() === new Date().toDateString();
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;

            return (
              <div
                key={index}
                className={`
                  flex-1 min-w-[60px] px-2 py-2 text-center border-r border-gray-200
                  ${isToday ? "bg-teal-50" : isWeekend ? "bg-gray-50" : "bg-white"}
                `}
              >
                <div className={`text-xs font-medium ${isToday ? "text-teal-600" : "text-gray-500"}`}>
                  {dayNames[date.getDay()]}
                </div>
                <div className={`text-sm font-semibold ${isToday ? "text-teal-700" : "text-gray-900"}`}>
                  {date.getDate()}
                </div>
                {showMonthLabel && date.getDate() === 1 && (
                  <div className="text-[10px] text-gray-500 mt-1">
                    {monthNames[date.getMonth()]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
