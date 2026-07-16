// Database Jadwal Kamu
const dailySchedule = [
    { id: 1, start: "05:00", end: "05:30", category: "Pagi", title: "Subuh", desc: "Bangun Pagi & Shalat Subuh", icon: "fa-solid fa-mosque", color: "text-amber-400" },
    { id: 2, start: "05:30", end: "06:00", category: "Pagi", title: "Fisik", desc: "Olahraga Pagi (Kardio/Peregangan)", icon: "fa-solid fa-running", color: "text-teal-400" },
    { id: 3, start: "06:00", end: "07:00", category: "Pagi", title: "Persiapan", desc: "Bersih-bersih Diri & Sarapan Sehat", icon: "fa-solid fa-shower", color: "text-sky-400" },
    { id: 4, start: "07:00", end: "08:30", category: "Pagi", title: "Belajar (Sesi 1)", desc: "Core English Grammar (Teori & Pemahaman)", icon: "fa-solid fa-book-open", color: "text-indigo-400" },
    { id: 5, start: "08:30", end: "09:00", category: "Pagi", title: "Jeda", desc: "Istirahat Ringan & Peregangan Otak", icon: "fa-solid fa-mug-hot", color: "text-rose-400" },
    { id: 6, start: "09:00", end: "10:30", category: "Pagi", title: "Belajar (Sesi 2)", desc: "Praktik Berbicara & Simulasi Interview", icon: "fa-solid fa-comments", color: "text-violet-400" },
    
    { id: 7, start: "10:30", end: "12:30", category: "Siang", title: "Istirahat Siang", desc: "Shalat Dzuhur, Makan Siang & Santai", icon: "fa-solid fa-utensils", color: "text-emerald-400" },
    { id: 8, start: "12:30", end: "13:00", category: "Siang", title: "Power Nap", desc: "Tidur Siang Singkat (Maks 30 Menit)", icon: "fa-solid fa-bed", color: "text-blue-400" },
    { id: 9, start: "13:00", end: "15:30", category: "Siang", title: "Bug Hunting (Sesi 1)", desc: "Analisis & Pencarian Celah Keamanan", icon: "fa-solid fa-bug", color: "text-red-400" },
    { id: 10, start: "15:30", end: "16:00", category: "Siang", title: "Ashar", desc: "Istirahat & Shalat Ashar", icon: "fa-solid fa-mosque", color: "text-amber-400" },
    
    { id: 11, start: "16:00", end: "18:30", category: "Sore & Malam", title: "Santai Sore", desc: "Istirahat, Olahraga Ringan, atau Hobi", icon: "fa-solid fa-tree", color: "text-green-400" },
    { id: 12, start: "18:30", end: "19:00", category: "Sore & Malam", title: "Maghrib", desc: "Shalat Maghrib & Makan Malam", icon: "fa-solid fa-mosque", color: "text-amber-400" },
    { id: 13, start: "19:00", end: "19:30", category: "Sore & Malam", title: "Waktu Bebas", desc: "Melepaskan Penat / Me Time", icon: "fa-solid fa-gamepad", color: "text-fuchsia-400" },
    { id: 14, start: "19:30", end: "20:00", category: "Sore & Malam", title: "Isya", desc: "Shalat Isya", icon: "fa-solid fa-mosque", color: "text-amber-400" },
    { id: 15, start: "20:00", end: "21:30", category: "Sore & Malam", title: "Bug Hunting (Sesi 2)", desc: "Lanjutan Hunting, Eksploitasi, & Reporting", icon: "fa-solid fa-laptop-code", color: "text-cyan-400" },
    
    { id: 16, start: "21:30", end: "22:00", category: "Tidur", title: "Persiapan Tidur", desc: "Matikan Layar Laptop/HP, Rileksasi", icon: "fa-solid fa-moon", color: "text-indigo-300" },
    { id: 17, start: "22:00", end: "23:59", category: "Tidur", title: "Tidur", desc: "Istirahat Total (Target 7 Jam Tidur)", icon: "fa-solid fa-z", color: "text-slate-500" },
    { id: 18, start: "00:00", end: "05:00", category: "Tidur", title: "Tidur", desc: "Istirahat Total (Target 7 Jam Tidur)", icon: "fa-solid fa-z", color: "text-slate-500" }
];

// Load status checklist dari LocalStorage
let checkedTasks = JSON.parse(localStorage.getItem('checkedTasks')) || {};
let savedDate = localStorage.getItem('savedDate') || "";

// Reset Otomatis jika ganti hari kalender
const todayStr = new Date().toDateString();
if (savedDate !== todayStr) {
    checkedTasks = {};
    localStorage.setItem('checkedTasks', JSON.stringify(checkedTasks));
    localStorage.setItem('savedDate', todayStr);
}

// Render data jadwal ke halaman
function renderRoutine() {
    const container = document.getElementById('routine-container');
    container.innerHTML = "";

    const categories = ["Pagi", "Siang", "Sore & Malam", "Tidur"];
    
    categories.forEach(cat => {
        const catFiltered = dailySchedule.filter(item => item.category === cat);
        if (catFiltered.length === 0) return;

        const section = document.createElement('section');
        section.className = "bg-slate-900/60 p-5 rounded-2xl border border-slate-800 backdrop-blur-sm";
        
        const header = document.createElement('h2');
        header.className = "text-lg font-bold text-slate-400 mb-4 flex items-center gap-2 tracking-wider uppercase text-xs";
        header.innerHTML = `<span class="h-2 w-2 rounded-full bg-emerald-500"></span> ${cat}`;
        section.appendChild(header);

        const listContainer = document.createElement('div');
        listContainer.className = "space-y-3";

        catFiltered.forEach(item => {
            const uniqueKey = `task-${item.id}`;
            const isChecked = checkedTasks[uniqueKey] ? 'checked' : '';
            const opacityClass = checkedTasks[uniqueKey] ? 'opacity-30 line-through border-slate-800' : 'border-slate-700/50';

            const card = document.createElement('div');
            card.id = `card-${item.id}`;
            card.className = `flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border transition-all duration-300 hover:bg-slate-800/70 ${opacityClass}`;
            
            card.innerHTML = `
                <div class="flex items-center gap-4 flex-1">
                    <!-- Jam Sesi -->
                    <div class="text-xs font-mono font-semibold bg-slate-800 px-2.5 py-1 rounded-md text-emerald-300 shrink-0">
                        ${item.start} - ${item.end}
                    </div>

                    <!-- Informasi Aktivitas -->
                    <div>
                        <h3 class="font-semibold text-sm md:text-base flex items-center gap-2 text-slate-100">
                            <i class="${item.icon} ${item.color} text-sm"></i> ${item.title}
                        </h3>
                        <p class="text-xs md:text-sm text-slate-400 mt-0.5">${item.desc}</p>
                    </div>
                </div>

                <!-- Checkbox Interaktif yang Pasti Muncul -->
                <div class="flex items-center pl-4">
                    <input type="checkbox" id="check-${item.id}" ${isChecked} onchange="toggleTask('${uniqueKey}', ${item.id})" 
                        class="w-6 h-6 rounded cursor-pointer accent-emerald-500 bg-slate-800 border-slate-700 focus:ring-emerald-500 focus:ring-2">
                </div>
            `;
            listContainer.appendChild(card);
        });

        section.appendChild(listContainer);
        container.appendChild(section);
    });
    
    updateActiveCard();
}

// Logika menyimpan status checklist dan mengubah style baris (buram & tercoret)
function toggleTask(uniqueKey, itemId) {
    checkedTasks[uniqueKey] = !checkedTasks[uniqueKey];
    localStorage.setItem('checkedTasks', JSON.stringify(checkedTasks));
    
    const card = document.getElementById(`card-${itemId}`);
    if (checkedTasks[uniqueKey]) {
        card.classList.add('opacity-30', 'line-through');
        card.classList.replace('border-slate-700/50', 'border-slate-800');
    } else {
        card.classList.remove('opacity-30', 'line-through');
        card.classList.replace('border-slate-800', 'border-slate-700/50');
    }
}

// Deteksi jam aktif saat ini
function updateActiveCard() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = (currentHour * 60) + currentMinute;

    dailySchedule.forEach(item => {
        const card = document.getElementById(`card-${item.id}`);
        if (!card) return;

        const [startHour, startMin] = item.start.split(':').map(Number);
        const [endHour, endMin] = item.end.split(':').map(Number);

        const startTimeInMinutes = (startHour * 60) + startMin;
        let endTimeInMinutes = (endHour * 60) + endMin;

        let isCurrent = false;

        // Handle jam melewati tengah malam
        if (endTimeInMinutes < startTimeInMinutes) {
            isCurrent = (currentTimeInMinutes >= startTimeInMinutes || currentTimeInMinutes < endTimeInMinutes);
        } else {
            isCurrent = (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes);
        }

        if (isCurrent) {
            card.classList.add('active-session');
        } else {
            card.classList.remove('active-session');
        }
    });
}

// Jam digital
function startClock() {
    setInterval(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('live-clock').innerText = `${hours}:${minutes}:${seconds}`;
        
        if (seconds === "00") {
            updateActiveCard();
        }
    }, 1000);
}

window.onload = () => {
    renderRoutine();
    startClock();
};
