
import React, { useState, useMemo } from 'react';
import { Meeting } from '../types';

interface MeetingsModuleProps {
  meetings: Meeting[];
  loading?: boolean;
  viewType?: 'home' | 'agenda';
}

// Helper to parse meeting time
const getMeetingDate = (m: Meeting): Date => {
  if (m.startTime) return new Date(m.startTime);
  // Parse time string like "14:30" and combine with today's date
  const today = new Date();
  if (m.time) {
    const [hours, minutes] = m.time.split(':').map(Number);
    today.setHours(hours || 0, minutes || 0, 0, 0);
  }
  return today;
};

const formatTime = (m: Meeting): string => {
  if (m.time) return m.time;
  if (m.startTime) {
    return new Date(m.startTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  }
  return '';
};

const MeetingsModule: React.FC<MeetingsModuleProps> = ({ meetings, loading, viewType = 'home' }) => {
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  const arabicMonths = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  // Helper to get today's meetings
  const todayMeetings = useMemo(() => {
    const today = new Date();
    return meetings.filter(m => {
      const mDate = getMeetingDate(m);
      return mDate.getDate() === today.getDate() &&
        mDate.getMonth() === today.getMonth() &&
        mDate.getFullYear() === today.getFullYear();
    }).sort((a, b) => getMeetingDate(a).getTime() - getMeetingDate(b).getTime());
  }, [meetings]);

  // Calendar Grid Logic
  const monthData = useMemo(() => {
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

    return days;
  }, [currentViewDate]);

  const meetingsForSelectedDay = useMemo(() => {
    return meetings.filter(m => {
      const mDate = getMeetingDate(m);
      return mDate.getDate() === selectedDay.getDate() &&
        mDate.getMonth() === selectedDay.getMonth() &&
        mDate.getFullYear() === selectedDay.getFullYear();
    }).sort((a, b) => getMeetingDate(a).getTime() - getMeetingDate(b).getTime());
  }, [meetings, selectedDay]);

  const changeMonth = (offset: number) => {
    setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + offset, 1));
  };

  const handleJoin = (link?: string) => {
    if (link) window.open(link, '_blank');
    else alert('هذا الاجتماع لا يحتوي على رابط انضمام');
  };

  if (viewType === 'home') {
    return (
      <div className="px-5 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">اجتماعات اليوم</h3>
          <span className="text-[10px] font-bold text-emerald bg-emerald/5 px-2 py-0.5 rounded-lg">{todayMeetings.length} اجتماعات</span>
        </div>

        {todayMeetings.length > 0 ? (
          <div className="space-y-3">
            {todayMeetings.map((m) => (
              <div key={m.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-black text-emerald">
                      {formatTime(m)}
                    </span>
                    {m.status === 'Live' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>}
                  </div>
                  <h4 className="text-[13px] font-bold text-gray-900 line-clamp-1">{m.title}</h4>
                  <p className="text-[10px] text-gray-400 font-medium">{m.platform} • {m.participants || m.attendees || 0} مشارك</p>
                </div>
                {m.meetingLink && (
                  <button
                    onClick={() => handleJoin(m.meetingLink)}
                    className="bg-emerald text-white h-9 px-4 rounded-xl text-[11px] font-black shadow-lg shadow-emerald/10 active:scale-95 transition-all"
                  >
                    انضمام
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-xs font-bold">لا توجد اجتماعات مجدولة لهذا اليوم</p>
          </div>
        )}
      </div>
    );
  }

  // Monthly Agenda Tab View
  return (
    <div className="flex flex-col pb-10">
      {/* Monthly Calendar Grid */}
      <div className="bg-white border-b border-gray-100 p-5 sticky top-[68px] z-30 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-black text-gray-900">
            {arabicMonths[currentViewDate.getMonth()]} {currentViewDate.getFullYear()}
          </h3>
          <div className="flex gap-2">
            <button onClick={() => changeMonth(-1)} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400 hover:text-emerald transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
            </button>
            <button onClick={() => changeMonth(1)} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400 hover:text-emerald transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'].map(d => (
            <div key={d} className="text-center text-[10px] font-black text-gray-300 py-1 uppercase">{d}</div>
          ))}
          {monthData.map((date, idx) => {
            if (!date) return <div key={`pad-${idx}`} className="h-10"></div>;

            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected = date.toDateString() === selectedDay.toDateString();
            const hasMeeting = meetings.some(m => {
              const mDate = getMeetingDate(m);
              return mDate.getDate() === date.getDate() &&
                mDate.getMonth() === date.getMonth() &&
                mDate.getFullYear() === date.getFullYear();
            });

            return (
              <button
                key={date.toString()}
                onClick={() => setSelectedDay(date)}
                className={`relative h-11 flex flex-col items-center justify-center rounded-xl transition-all ${isSelected ? 'bg-emerald text-white shadow-lg shadow-emerald/20' : isToday ? 'bg-emerald/10 text-emerald' : 'bg-white text-gray-600'
                  }`}
              >
                <span className="text-[13px] font-black">{date.getDate()}</span>
                {hasMeeting && !isSelected && <div className="absolute bottom-1 w-1 h-1 bg-emerald rounded-full"></div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Agenda Feed */}
      <div className="px-5 py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex flex-col">
            <h4 className="text-[15px] font-black text-gray-900">اجتماعات {selectedDay.getDate()} {arabicMonths[selectedDay.getMonth()]}</h4>
            <span className="text-[10px] font-bold text-gray-400">اليوم المختار</span>
          </div>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        <div className="space-y-4">
          {meetingsForSelectedDay.length > 0 ? (
            meetingsForSelectedDay.map((m) => (
              <div key={m.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-col">
                    <h5 className="text-[14px] font-bold text-gray-900 leading-snug">{m.title}</h5>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[11px] font-black text-emerald">{formatTime(m)}</span>
                      <span className="text-[10px] font-bold text-gray-400">• {m.platform}</span>
                    </div>
                  </div>
                  {m.status === 'Live' && <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>}
                </div>

                {m.location && <p className="text-[11px] text-gray-400 font-medium mb-4 italic">{m.location}</p>}

                {m.meetingLink && (
                  <button
                    onClick={() => handleJoin(m.meetingLink)}
                    className="w-full h-11 bg-emerald text-white rounded-xl text-[12px] font-black shadow-lg shadow-emerald/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
                    انضم للاجتماع
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-200">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-gray-400 text-[13px] font-bold">لا توجد اجتماعات في هذا اليوم</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingsModule;
