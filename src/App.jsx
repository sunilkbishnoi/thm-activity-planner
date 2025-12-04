import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Type, RefreshCw, BarChart2, Info, Trash2, Check, X, Download, CalendarPlus, Edit3 } from 'lucide-react';

// --- PIXEL FONT DATA (5x7 approx) ---
const PIXEL_FONT = {
  'A': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'B': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
  'C': [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,1]],
  'D': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
  'E': [[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  'F': [[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0]],
  'G': [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'H': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'I': [[1,1,1],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],
  'J': [[0,0,0,0,1],[0,0,0,0,1],[0,0,0,0,1],[0,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'K': [[1,0,0,0,1],[1,0,0,1,0],[1,0,1,0,0],[1,1,0,0,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
  'L': [[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  'M': [[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'N': [[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'O': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'P': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0]],
  'Q': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[0,1,1,1,1]],
  'R': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
  'S': [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0]],
  'T': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  'U': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'V': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0]],
  'W': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,1,0,1,1],[1,0,0,0,1]],
  'X': [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],
  'Y': [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  'Z': [[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  ' ': [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
  '0': [[0,1,1,1,0],[1,0,0,1,1],[1,0,1,0,1],[1,1,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  '1': [[0,0,1,0,0],[0,1,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,1,1,1,0]],
  '2': [[0,1,1,1,0],[1,0,0,0,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]],
  '3': [[0,1,1,1,0],[1,0,0,0,1],[0,0,0,0,1],[0,0,1,1,0],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  '4': [[0,0,0,1,0],[0,0,1,1,0],[0,1,0,1,0],[1,0,0,1,0],[1,1,1,1,1],[0,0,0,1,0],[0,0,0,1,0]],
  '5': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  '6': [[0,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  '7': [[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  '8': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  '9': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1],[0,0,0,0,1],[0,0,0,0,1],[0,1,1,1,0]],
};

const COLORS = {
  0: 'bg-[#3e4856]', 
  1: 'bg-[#ffc61a]', 
  2: 'bg-[#81d82f]', 
  3: 'bg-[#21811a]', 
};

// Uses local time construction to avoid UTC timezone issues
const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Start week on Monday (1)
const getVisualDayIndex = (date) => {
  const day = date.getDay(); // 0 (Sun) - 6 (Sat)
  return (day === 0 ? 6 : day - 1);
};

// Returns weeks starting on MONDAY
const refineCalendarGeneration = (year) => {
  const weeks = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  
  let iterator = new Date(startDate);
  const currentDay = iterator.getDay(); 
  const daysToSubtract = currentDay === 0 ? 6 : currentDay - 1;
  iterator.setDate(iterator.getDate() - daysToSubtract);
  
  while (iterator <= endDate || getVisualDayIndex(iterator) !== 0) { 
      const currentWeek = [];
      for (let i = 0; i < 7; i++) {
        if (iterator.getFullYear() === year) {
           currentWeek.push(new Date(iterator));
        } else {
           currentWeek.push(null); 
        }
        iterator.setDate(iterator.getDate() + 1);
      }
      weeks.push(currentWeek);
      if (weeks.length > 54) break; 
  }
  return weeks;
};

// --- GOOGLE CALENDAR HELPERS ---

const generateGoogleCalendarUrl = (date, count) => {
  const title = `Complete ${count} TryHackMe Tasks`;
  const details = `Keep your streak alive! Target: ${count} tasks. Generated by Activity Planner.`;
  
  // Format Date YYYYMMDD
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const dateStr = `${y}${m}${d}`;
  
  // Next day for all-day event end
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);
  const ny = nextDay.getFullYear();
  const nm = String(nextDay.getMonth() + 1).padStart(2, '0');
  const nd = String(nextDay.getDate()).padStart(2, '0');
  const nextDateStr = `${ny}${nm}${nd}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dateStr}/${nextDateStr}&details=${encodeURIComponent(details)}`;
};

const generateICSFile = (scheduleList) => {
  if (scheduleList.length === 0) return;

  let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ActivityPlanner//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

  scheduleList.forEach((item) => {
    const { date, intensity } = item;
    const count = intensity; // 1, 2, or 3
    
    // Format Date YYYYMMDD
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const dateStr = `${y}${m}${d}`;
    
    // Unique ID logic
    const uid = `${dateStr}-thm-${Math.random().toString(36).substr(2, 9)}@activityplanner`;

    icsContent += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dateStr}T000000Z
DTSTART;VALUE=DATE:${dateStr}
SUMMARY:Complete ${count} TryHackMe Tasks
DESCRIPTION:Target: ${count} tasks today to maintain your pattern.
STATUS:CONFIRMED
TRANSP:TRANSPARENT
END:VEVENT
`;
  });

  icsContent += `END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'tryhackme_schedule.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const App = () => {
  const [year, setYear] = useState(2025);
  const [activityMap, setActivityMap] = useState({});
  const [textInput, setTextInput] = useState("THM01");
  const [brushColor, setBrushColor] = useState(3);
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  
  const weeks = useMemo(() => refineCalendarGeneration(year), [year]);
  
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIndex) => {
      const firstValidDay = week.find(d => d !== null);
      if (firstValidDay) {
        const month = firstValidDay.getMonth();
        if (month !== lastMonth) {
          labels.push({ monthIndex: month, weekIndex });
          lastMonth = month;
        }
      }
    });
    return labels;
  }, [weeks]);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const handleCellClick = (date) => {
    if (!date) return;
    const key = formatDateKey(date);
    const currentVal = activityMap[key] || 0;
    
    setActivityMap(prev => ({
      ...prev,
      [key]: currentVal === brushColor ? 0 : brushColor
    }));
  };

  const handleClearClick = () => {
    if (isConfirmingClear) {
      setActivityMap({});
      setIsConfirmingClear(false);
    } else {
      setIsConfirmingClear(true);
      setTimeout(() => setIsConfirmingClear(false), 3000);
    }
  };

  const applyTextToGrid = () => {
    const upperText = textInput.toUpperCase();
    const newMap = { ...activityMap };
    let currentWeekIndex = 2; 

    for (let char of upperText) {
      const charMatrix = PIXEL_FONT[char] || PIXEL_FONT[' '];
      const charWidth = charMatrix[0].length;
      
      for (let r = 0; r < 7; r++) { 
        for (let c = 0; c < charWidth; c++) {
           if (charMatrix[r][c] === 1) {
             const targetWeekIndex = currentWeekIndex + c;
             if (targetWeekIndex < weeks.length) {
                const targetDate = weeks[targetWeekIndex][r];
                if (targetDate) {
                  newMap[formatDateKey(targetDate)] = 3; 
                }
             }
           }
        }
      }
      currentWeekIndex += charWidth + 1; 
    }
    setActivityMap(newMap);
  };

  const calculateTotal = () => {
    return Object.keys(activityMap)
      .filter(k => k.startsWith(year.toString()))
      .reduce((acc, key) => {
         const val = activityMap[key];
         return acc + (val > 0 ? val : 0);
      }, 0);
  };

  const getTodayTask = () => {
    const today = new Date();
    const key = formatDateKey(today);
    const val = activityMap[key] || 0;
    return { count: val, date: today };
  };

  const todayTask = getTodayTask();
  const isTodayInView = todayTask.date.getFullYear() === year;

  const scheduleList = useMemo(() => {
    const list = [];
    Object.entries(activityMap).forEach(([dateStr, val]) => {
       if (val > 0 && dateStr.startsWith(year.toString())) {
         const [y, m, d] = dateStr.split('-').map(Number);
         const date = new Date(y, m - 1, d); 
         list.push({ date, intensity: val });
       }
    });
    return list.sort((a,b) => a.date - b.date);
  }, [activityMap, year]);

  return (
    <div className="min-h-screen bg-[#111827] text-slate-200 p-4 font-sans flex flex-col items-center">
      
      {/* --- TITLE HEADER --- */}
      <div className="w-full max-w-5xl mb-6 flex items-center justify-center md:justify-start gap-3">
         <div className="bg-green-600/20 p-2 rounded-lg border border-green-500/30">
            <Edit3 className="text-green-400" size={24} />
         </div>
         <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            TryHackMe Yearly Activity Planner
         </h1>
      </div>

      {/* --- CONTROLS --- */}
      <div className="w-full max-w-5xl mb-8 bg-[#1f2937] p-4 rounded-lg border border-slate-700 flex flex-wrap gap-4 items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
           <Type className="text-slate-400" size={18} />
           <input 
              type="text" 
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="bg-slate-900 border border-slate-600 rounded px-3 py-1 font-mono uppercase tracking-widest text-sm focus:ring-2 focus:ring-[#81d82f] outline-none"
              placeholder="TEXT"
              maxLength={12}
           />
           <button onClick={applyTextToGrid} className="bg-[#21811a] hover:bg-[#2f9e25] text-white px-3 py-1 rounded text-sm font-bold flex items-center gap-1">
             <RefreshCw size={14}/> Generate
           </button>
        </div>
        
        <div className="flex items-center gap-3">
           <span className="text-xs text-slate-400 uppercase font-bold">Brush:</span>
           {[0, 1, 2, 3].map(lvl => (
             <button 
               key={lvl}
               onClick={() => setBrushColor(lvl)}
               className={`w-6 h-6 rounded border ${brushColor === lvl ? 'border-white scale-110' : 'border-transparent'} ${COLORS[lvl]}`}
             />
           ))}
           <div className="h-6 w-[1px] bg-slate-600 mx-1"></div>
           
           <button 
             onClick={handleClearClick} 
             className={`text-xs px-3 py-1.5 rounded-md border transition-all flex items-center gap-2 ml-2
               ${isConfirmingClear 
                 ? 'bg-red-600 text-white border-red-500 animate-pulse font-bold' 
                 : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border-red-500/20'}
             `}
           >
             {isConfirmingClear ? <><Check size={14}/> Confirm Clear?</> : <><Trash2 size={14}/> Clear All Activity</>}
           </button>
        </div>
      </div>

      {/* --- VISUAL CLONE --- */}
      <div className="w-full max-w-[950px]">
        <div className="flex items-center gap-2 mb-4">
           <BarChart2 className="text-[#596a82]" size={24} />
           <h2 className="text-xl font-medium text-slate-200">Yearly activity</h2>
        </div>

        <div className="bg-[#18202d] rounded-lg border border-[#2d3748] overflow-hidden shadow-2xl">
          
          <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="bg-[#212c3d] rounded px-3 py-2 flex items-center gap-3 border border-[#2d3748]">
              <span className="text-xs font-bold text-slate-300 mr-1">Key</span>
              {[0, 1, 2, 3].map(lvl => (
                <div key={lvl} className="flex items-center gap-2">
                   <div className={`w-3 h-3 rounded-[2px] ${COLORS[lvl]}`}></div>
                   <span className="text-[11px] text-slate-400">
                     {lvl === 0 ? 'No activity' : lvl === 3 ? '≥ 3 events' : `${lvl} event${lvl > 1 ? 's' : ''}`}
                   </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6">
               <div className="flex items-center text-slate-400 hover:text-white cursor-pointer select-none">
                  <ChevronLeft size={16} onClick={() => setYear(y => y - 1)}/>
                  <span className="mx-2 font-bold text-lg">{year}</span>
                  <ChevronRight size={16} onClick={() => setYear(y => y + 1)}/>
               </div>

               <div className="bg-[#212c3d] px-4 py-2 rounded border border-[#2d3748]">
                  <span className="text-xs text-slate-400 mr-2">Total events this year</span>
                  <span className="text-lg font-bold text-white">{calculateTotal()}</span>
               </div>
            </div>
          </div>

          <div className="px-6 pb-6 pt-2 overflow-x-auto">
             <div className="min-w-[800px] flex">
                
                <div className="flex flex-col gap-[3px] pt-[20px] mr-2 text-[10px] text-slate-400 font-medium">
                   <span className="h-[12px] flex items-center">Mon</span>
                   <span className="h-[12px] flex items-center opacity-0">Tue</span>
                   <span className="h-[12px] flex items-center">Wed</span>
                   <span className="h-[12px] flex items-center opacity-0">Thu</span>
                   <span className="h-[12px] flex items-center">Fri</span>
                   <span className="h-[12px] flex items-center opacity-0">Sat</span>
                   <span className="h-[12px] flex items-center">Sun</span>
                </div>

                <div className="flex flex-col gap-1 relative">
                   <div className="flex text-[10px] text-slate-400 font-bold mb-1 h-4 relative w-full">
                      {monthLabels.map((m, idx) => (
                        <span key={idx} className="absolute" style={{ left: `${m.weekIndex * 15}px` }}>
                          {monthNames[m.monthIndex]}
                        </span>
                      ))}
                   </div>

                   <div className="flex gap-[3px]">
                      {weeks.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-[3px]">
                          {week.map((date, dayIdx) => {
                             const isActiveDate = date !== null;
                             const key = isActiveDate ? formatDateKey(date) : null;
                             const intensity = key ? (activityMap[key] || 0) : 0;
                             
                             return (
                               <div
                                 key={dayIdx}
                                 onClick={() => handleCellClick(date)}
                                 className={`w-[12px] h-[12px] rounded-[2px] transition-colors
                                    ${isActiveDate ? 'cursor-pointer hover:ring-1 hover:ring-white' : 'opacity-0 pointer-events-none'}
                                    ${isActiveDate ? COLORS[intensity] : ''}
                                 `}
                                 title={isActiveDate ? `${date.toDateString()}: ${intensity} tasks` : ''}
                               ></div>
                             );
                          })}
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-[#1f2937] py-3 text-center border-t border-[#2d3748]">
             <p className="text-xs text-slate-400">
               Activity events are measured by the number of machines started, questions answered or file downloads.
             </p>
          </div>
        </div>
      </div>

      {/* --- SCHEDULE --- */}
      <div className="w-full max-w-[950px] mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
         
         <div className="md:col-span-1 bg-[#18202d] rounded-lg p-6 border border-[#2d3748] flex flex-col items-center text-center shadow-lg">
            <h3 className="text-sm uppercase tracking-wider text-slate-400 font-bold mb-4">Today's Target</h3>
            {todayTask && todayTask.count > 0 ? (
               <>
                 <div className={`w-16 h-16 rounded-lg mb-4 flex items-center justify-center text-2xl font-bold text-slate-900 ${COLORS[todayTask.count]}`}>
                    {todayTask.count}
                 </div>
                 <p className="text-white text-lg font-medium">Complete <span className="text-[#81d82f]">{todayTask.count} tasks</span></p>
                 <p className="text-sm text-slate-400 mt-1">{todayTask.date.toDateString()}</p>
                 {!isTodayInView && <p className="text-xs text-yellow-500 mt-2">(You are viewing {year})</p>}
               </>
            ) : (
               <>
                 <div className="w-16 h-16 rounded-lg mb-4 flex items-center justify-center text-2xl bg-[#3e4856] text-slate-500">
                   zZ
                 </div>
                 <p className="text-slate-300">Rest Day</p>
                 <p className="text-xs text-slate-500 mt-2">{todayTask.date.toDateString()}</p>
               </>
            )}
         </div>

         <div className="md:col-span-2 bg-[#18202d] rounded-lg p-6 border border-[#2d3748] shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm uppercase tracking-wider text-slate-400 font-bold">Upcoming Schedule for {year}</h3>
              <button 
                onClick={() => generateICSFile(scheduleList)}
                disabled={scheduleList.length === 0}
                className="flex items-center gap-2 text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded transition-colors disabled:opacity-50"
                title="Download calendar file for Phone/Outlook/Google"
              >
                <Download size={12} /> Export to Calendar
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto max-h-[180px] custom-scrollbar pr-2 space-y-2">
               {scheduleList.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-4">
                    No activity planned for {year}. <br/>
                    Try generating text or painting on the grid!
                  </p>
               ) : (
                  scheduleList.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-[#212c3d] p-3 rounded border border-[#2d3748] text-sm hover:border-slate-500 transition-colors">
                       <div className="flex items-center gap-3">
                          <Calendar size={14} className="text-slate-500"/>
                          <span className="font-mono text-slate-300">{item.date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 uppercase font-bold">Target:</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-slate-900 ${COLORS[item.intensity]}`}>
                             {item.intensity === 3 ? '3+ Tasks' : `${item.intensity} Tasks`}
                          </span>
                          <a 
                             href={generateGoogleCalendarUrl(item.date, item.intensity)} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="text-slate-500 hover:text-green-400 p-1"
                             title="Add to Google Calendar"
                          >
                            <CalendarPlus size={14} />
                          </a>
                       </div>
                    </div>
                  ))
               )}
            </div>
         </div>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #18202d; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3e4856; 
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default App;