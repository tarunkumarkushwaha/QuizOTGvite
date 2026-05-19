import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../MyContext';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import TimerIcon from '@mui/icons-material/Timer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import FilterListIcon from '@mui/icons-material/FilterList';

const Leaderboard = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('global');
    const [subject, setSubject] = useState('');
    const [subjects, setSubjects] = useState(["javascript"]);
    const [loading, setLoading] = useState(true);
    const { backendURL, accessToken, authFetch } = useContext(Context);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            try {
                const endpoint = subject
                    ? `/leaderboard/subject/${subject}`
                    : `/leaderboard/${filter}`;

                const response = await authFetch(endpoint);
                const result = await response.json();
                setData(result || []);
                let filteredSubjects = result.map((item, i) => item.subject)
                // console.log(result)
                if (filter == "global") { setSubjects(filteredSubjects) }
            } catch (err) {
                console.error("Fetch error:", err);
            }
            setLoading(false);
        };
        fetchLeaderboard();
    }, [filter, subject, backendURL]);

    const topThree = data?.slice(0, 3) || [];
    const rest = data?.slice(3) || [];

    return (
        <div className="min-h-screen mt-12 bg-slate-50 py-6 md:py-10 px-4 font-sans text-slate-900">
            <div className="max-w-5xl mx-auto">

                <div className="text-center mb-8 md:mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-4">
                        <EmojiEventsIcon className="text-yellow-600 !text-3xl md:!text-4xl" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
                        {subject ? `${subject} Rankings` : 'Top Performers'}
                    </h1>

                    <div className="flex flex-col items-center gap-4 mt-6">

                        <div className="inline-flex p-1 bg-slate-200/50 rounded-xl border border-slate-200 overflow-x-auto max-w-full">
                            {['global', 'weekly', 'monthly'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => { setFilter(tab); setSubject(''); }}
                                    className={`px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${filter === tab && !subject ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full max-w-xs">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FilterListIcon className="text-slate-400 !text-sm" />
                            </div>
                            <select
                                value={subject}
                                onChange={(e) => { setSubject(e.target.value); e.target.value ? setFilter('') : setFilter('global'); }}
                                className="block w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            >
                                <option value="">All Subjects</option>
                                {subjects.map(sub => (
                                    <option key={sub} value={sub}>{sub}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col md:flex-row md:items-end justify-center gap-6 mb-12">

                    {topThree[1] && <PodiumItem user={topThree[1]} rank={2} color="slate" />}

                    {topThree[0] && <PodiumItem user={topThree[0]} rank={1} color="yellow" isWinner />}

                    {topThree[2] && <PodiumItem user={topThree[2]} rank={3} color="orange" />}
                </div>


                {rest.length > 0 && <>
                    <div className="hidden md:block bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider text-center">Rank</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Player</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider text-center">Score</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider text-center">Accuracy</th>
                                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {rest.map((row, index) => (
                                    <TableRow key={row._id} row={row} rank={index + 4} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden space-y-3">
                        {rest.map((row, index) => (
                            <div key={row._id} className="bg-white p-4 rounded-2xl border border-slate-200 flex justify-between items-center shadow-sm">
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-slate-400 w-6 text-sm">#{index + 4}</span>
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600">
                                        {row.username[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm">{row.username}</p>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{row.subject}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-blue-600">{row.score}</p>
                                    <p className="text-[10px] text-slate-400 font-bold">{row.timeTaken}s</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>}

                {loading && (
                    <div className="p-10 text-center text-slate-400 italic animate-pulse">
                        Refreshing rankings...
                    </div>
                )}
            </div>
        </div>
    );
};

const PodiumItem = ({ user, rank, color, isWinner }) => {
    const iconColors = {
        slate: 'text-slate-400',
        yellow: 'text-yellow-500',
        orange: 'text-orange-400'
    };

    return (
        <div className={`w-full md:w-1/3 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center transition-all ${isWinner ? 'md:-translate-y-6 md:scale-105 border-yellow-200 bg-gradient-to-b from-yellow-50 to-white ring-4 ring-yellow-400/10' : ''}`}>
            <div className="relative inline-block mb-2">
                {rank === 1 ? <EmojiEventsIcon className={`${iconColors[color]} !text-6xl`} /> : <MilitaryTechIcon className={`${iconColors[color]} !text-5xl`} />}
                {isWinner && <StarIcon className="absolute -top-2 -right-2 text-yellow-400 animate-pulse !text-sm" />}
            </div>
            <h3 className="font-bold text-slate-800 truncate">{user.username}</h3>
            <p className={`font-black my-1 ${isWinner ? 'text-4xl text-yellow-600' : 'text-2xl text-blue-600'}`}>{user.score}</p>
            <div className="flex justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                <span>{user.timeTaken}s</span>
                <span>•</span>
                <span>{((user.correctAnswers / user.totalQuestions) * 100).toFixed(0)}% Acc</span>
            </div>
        </div>
    );
};

const TableRow = ({ row, rank }) => (
    <tr className="hover:bg-slate-50 transition-colors group">
        <td className="px-8 py-5 text-center font-bold text-slate-400">#{rank}</td>
        <td className="px-8 py-5">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
                    {row.username[0].toUpperCase()}
                </div>
                <div>
                    <p className="font-bold text-slate-700 leading-none">{row.username}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{row.subject}</p>
                </div>
            </div>
        </td>
        <td className="px-8 py-5 text-center">
            <span className="inline-block px-4 py-1 rounded-lg bg-blue-50 text-blue-700 font-black text-lg">
                {row.score}
            </span>
        </td>
        <td className="px-8 py-5">
            <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                    <CheckCircleIcon className="!text-sm" />
                    {((row.correctAnswers / row.totalQuestions) * 100).toFixed(0)}%
                </div>
            </div>
        </td>
        <td className="px-8 py-5 text-right">
            <div className="flex items-center justify-end gap-1.5 text-slate-500 font-medium">
                <TimerIcon className="!text-lg text-slate-300" />
                <span>{row.timeTaken}s</span>
            </div>
        </td>
    </tr>
);

export default Leaderboard;