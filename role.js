// role.js - Logic for Start Academy Single Page App

const startApp = (function() {
  // 47 Olympic Sports Database
  const sportsData = [
    { name: 'السباحة', en: 'Swimming', category: 'individual', icon: '🏊' },
    { name: 'كرة الماء', en: 'Water Polo', category: 'team', icon: '🤽' },
    { name: 'الغطس', en: 'Diving', category: 'individual', icon: '🤿' },
    { name: 'السباحة الفنية', en: 'Artistic Swimming', category: 'team', icon: '🏊‍♀️' },
    { name: 'ماراثون السباحة', en: 'Marathon Swimming', category: 'individual', icon: '🏊‍♂️' },
    { name: 'الرماية بالقوس', en: 'Archery', category: 'individual', icon: '🏹' },
    { name: 'ألعاب القوى', en: 'Athletics', category: 'individual', icon: '🏃' },
    { name: 'تنس الريشة', en: 'Badminton', category: 'individual', icon: '🏸' },
    { name: 'كرة السلة', en: 'Basketball', category: 'team', icon: '🏀' },
    { name: 'الملاكمة', en: 'Boxing', category: 'individual', icon: '🥊' },
    { name: 'البريكينغ', en: 'Breaking', category: 'individual', icon: '🕺' },
    { name: 'التجديف بالكانوي', en: 'Canoeing', category: 'individual', icon: '🛶' },
    { name: 'ركوب الدراجات', en: 'Cycling', category: 'individual', icon: '🚴' },
    { name: 'الفروسية', en: 'Equestrian', category: 'individual', icon: '🏇' },
    { name: 'المبارزة', en: 'Fencing', category: 'individual', icon: '🤺' },
    { name: 'هوكي الميدان', en: 'Field Hockey', category: 'team', icon: '🏑' },
    { name: 'كرة القدم', en: 'Football', category: 'team', icon: '⚽' },
    { name: 'الجولف', en: 'Golf', category: 'individual', icon: '⛳' },
    { name: 'الجمباز', en: 'Gymnastics', category: 'individual', icon: '🤸' },
    { name: 'كرة اليد', en: 'Handball', category: 'team', icon: '🤾' },
    { name: 'الجودو', en: 'Judo', category: 'individual', icon: '🥋' },
    { name: 'الخماسي الحديث', en: 'Modern Pentathlon', category: 'individual', icon: '🏃‍♂️' },
    { name: 'التجديف', en: 'Rowing', category: 'individual', icon: '🚣' },
    { name: 'الرجبي السباعي', en: 'Rugby Sevens', category: 'team', icon: '🏉' },
    { name: 'الشراع', en: 'Sailing', category: 'individual', icon: '⛵' },
    { name: 'الرماية', en: 'Shooting', category: 'individual', icon: '🎯' },
    { name: 'التزلج على اللوح', en: 'Skateboarding', category: 'individual', icon: '🛹' },
    { name: 'التسلق الرياضي', en: 'Sport Climbing', category: 'individual', icon: '🧗' },
    { name: 'ركوب الأمواج', en: 'Surfing', category: 'individual', icon: '🏄' },
    { name: 'تنس الطاولة', en: 'Table Tennis', category: 'individual', icon: '🏓' },
    { name: 'التايكوندو', en: 'Taekwondo', category: 'individual', icon: '🥋' },
    { name: 'التنس', en: 'Tennis', category: 'individual', icon: '🎾' },
    { name: 'الترايثلون', en: 'Triathlon', category: 'individual', icon: '🚴‍♂️' },
    { name: 'الكرة الطائرة', en: 'Volleyball', category: 'team', icon: '🏐' },
    { name: 'رفع الأثقال', en: 'Weightlifting', category: 'individual', icon: '🏋️' },
    { name: 'المصارعة', en: 'Wrestling', category: 'individual', icon: '🤼' },
    { name: 'التزلج على المنحدرات', en: 'Alpine Skiing', category: 'individual', icon: '⛷️' },
    { name: 'البياثلون', en: 'Biathlon', category: 'individual', icon: '🎿' },
    { name: 'الزلاجات الجماعية', en: 'Bobsleigh', category: 'team', icon: '🛷' },
    { name: 'التزلج الريفي', en: 'Cross-Country Skiing', category: 'individual', icon: '🎿' },
    { name: 'الكيرلنج', en: 'Curling', category: 'team', icon: '🥌' },
    { name: 'التزلج الفني', en: 'Figure Skating', category: 'individual', icon: '⛸️' },
    { name: 'التزلج الحر', en: 'Freestyle Skiing', category: 'individual', icon: '⛷️' },
    { name: 'هوكي الجليد', en: 'Ice Hockey', category: 'team', icon: '🏒' },
    { name: 'الزحافات الثلجية', en: 'Luge', category: 'individual', icon: '🛷' },
    { name: 'التزلج النوردي', en: 'Nordic Combined', category: 'individual', icon: '🎿' },
    { name: 'التزلج السريع القصير', en: 'Short Track Speed Skating', category: 'individual', icon: '⛸️' },
    { name: 'السباق الصدري', en: 'Skeleton', category: 'individual', icon: '🛷' },
    { name: 'القفز التزلجي', en: 'Ski Jumping', category: 'individual', icon: '⛷️' },
    { name: 'التزلج على الثلوج', en: 'Snowboard', category: 'individual', icon: '🏂' },
    { name: 'التزلج السريع', en: 'Speed Skating', category: 'individual', icon: '⛸️' }
  ];

  let currentCategory = 'all';
  let searchQuery = '';
  let currentSportView = '';
  
  // Storage references
  let currentRole = localStorage.getItem('start_academy_user_role') || '';
  
  // Athletes Storage
  let clubAthletes = JSON.parse(localStorage.getItem('start_academy_club_athletes'));
  if (!clubAthletes) {
    clubAthletes = [
      { name: 'أحمد محمد', sport: 'السباحة', coach: '', level: 'متقدم', phone: '01012345678', addedBy: 'club' },
      { name: 'محمود علي', sport: 'كرة القدم', coach: '', level: 'مبتدئ', phone: '01123456789', addedBy: 'club' }
    ];
    localStorage.setItem('start_academy_club_athletes', JSON.stringify(clubAthletes));
  }

  // Coaches Storage
  let clubCoaches = JSON.parse(localStorage.getItem('start_academy_club_coaches'));
  if (!clubCoaches) {
    clubCoaches = [
      { name: 'كابتن حسام', sport: 'السباحة', phone: '01234567890' },
      { name: 'كابتن طارق', sport: 'كرة القدم', phone: '01098765432' }
    ];
    localStorage.setItem('start_academy_club_coaches', JSON.stringify(clubCoaches));
  }

  // Helper: Show/Hide views cleanly
  function showView(viewId) {
    const views = ['view-login', 'view-role', 'view-athlete', 'view-sports', 'view-placeholder', 
                   'view-coach-options', 'view-club', 'view-club-players', 'view-club-all-players', 'view-club-coaches'];
    views.forEach(v => {
      const el = document.getElementById(v);
      if (el) el.classList.add('hide');
    });
    const target = document.getElementById(viewId);
    if(target) {
      target.classList.remove('hide');
      target.classList.remove('fade-in');
      void target.offsetWidth; // trigger reflow
      target.classList.add('fade-in');
    }
  }

  // Helper: UI Config based on Role
  function configureUIForRole() {
    const settingsBtn = document.getElementById('settings-button-container');
    const globalAddAthleteBtn = document.getElementById('btn-add-global-athlete');
    const specificAddAthleteBtn = document.getElementById('btn-add-specific-athlete');
    const backBtnAllAthletes = document.getElementById('btn-back-all-athletes');

    if (!currentRole) {
      if (settingsBtn) settingsBtn.classList.add('hide');
      return;
    }
    
    if (settingsBtn) settingsBtn.classList.remove('hide');

    // Default states
    if (globalAddAthleteBtn) globalAddAthleteBtn.classList.add('hide');
    if (specificAddAthleteBtn) specificAddAthleteBtn.classList.add('hide');

    if (currentRole === 'club') {
      if (globalAddAthleteBtn) globalAddAthleteBtn.classList.remove('hide');
      if (specificAddAthleteBtn) specificAddAthleteBtn.classList.remove('hide');
      if (backBtnAllAthletes) backBtnAllAthletes.onclick = () => startApp.goBack('club');
    } else if (currentRole === 'coach') {
      if (backBtnAllAthletes) backBtnAllAthletes.onclick = () => startApp.goBack('coach-options');
    }
  }

  // Main Router
  function routeUser() {
    configureUIForRole();

    if (!currentRole) {
      showView('view-role');
    } else if (currentRole === 'athlete') {
      showView('view-athlete');
    } else if (currentRole === 'coach') {
      showView('view-coach-options');
    } else if (currentRole === 'club') {
      showView('view-club');
    }
  }

  return {
    init: function() {
      // If we land on the page, keep login view if not logged in.
      if(!currentRole) {
        showView('view-login');
      } else {
        routeUser();
      }
    },

    // --- Login / Navigation ---
    handleLogin: function(e) {
      e.preventDefault();
      if (!currentRole) {
        showView('view-role');
      } else {
        routeUser();
      }
    },

    selectRole: function(role) {
      if (currentRole) {
        alert('لقد قمت باختيار دورك مسبقاً.');
        return;
      }
      currentRole = role;
      localStorage.setItem('start_academy_user_role', role);
      routeUser();
    },

    goBack: function(to) {
      if (to === 'login') showView('view-login');
      else if (to === 'role') showView('view-role');
      else if (to === 'athlete') showView('view-athlete');
      else if (to === 'sports') showView('view-sports');
      else if (to === 'coach-options') showView('view-coach-options');
      else if (to === 'club') showView('view-club');
    },

    toggleSettings: function(e) {
      if (e) e.stopPropagation();
      const dropdown = document.getElementById('settings-dropdown');
      if (dropdown) {
        dropdown.style.display = (dropdown.style.display === 'none' || dropdown.style.display === '') ? 'block' : 'none';
      }
    },

    closeSettings: function() {
      const dropdown = document.getElementById('settings-dropdown');
      if (dropdown) dropdown.style.display = 'none';
    },

    confirmRoleChange: function() {
      if (confirm('هل أنت متأكد من تسجيل الخروج وتغيير نوع الحساب؟')) {
        this.closeSettings();
        localStorage.clear();
        window.location.reload();
      }
    },

    routeUser: function() {
      routeUser();
    },

    // --- Placeholders ---
    goToPlaceholder: function(title, backTo) {
      document.getElementById('placeholder-title').innerText = title;
      document.getElementById('btn-ph-back').onclick = () => this.goBack(backTo);
      showView('view-placeholder');
    },

    // --- Add Athlete Modal ---
    openAddAthleteModal: function(preSelectedSport = null) {
      const modal = document.getElementById('add-athlete-modal');
      const sportSelect = document.getElementById('athlete-sport');
      
      // Populate sports dropdown if empty
      if(sportSelect && sportSelect.options.length <= 1) {
        sportsData.forEach(s => {
          const opt = document.createElement('option');
          opt.value = s.name;
          opt.innerText = s.name;
          sportSelect.appendChild(opt);
        });
      }

      if(sportSelect) {
        sportSelect.value = preSelectedSport ? preSelectedSport : '';
        this.populateCoachesForSport(sportSelect.value);
      }
      
      if(modal) modal.style.display = 'flex';
    },

    closeAddAthleteModal: function() {
      const modal = document.getElementById('add-athlete-modal');
      if(modal) modal.style.display = 'none';
      const form = document.getElementById('add-athlete-form');
      if(form) form.reset();
      document.getElementById('coach-assignment-container').classList.add('hide');
    },

    populateCoachesForSport: function(sport) {
      const coachSelect = document.getElementById('athlete-coach');
      const container = document.getElementById('coach-assignment-container');
      
      if(!coachSelect || !container) return;

      if (!sport || currentRole !== 'club') {
        container.classList.add('hide');
        return;
      }

      const availableCoaches = clubCoaches.filter(c => c.sport === sport);
      
      if(availableCoaches.length > 0) {
        coachSelect.innerHTML = '<option value="">بدون مدرب (اختياري)</option>';
        availableCoaches.forEach(c => {
          const opt = document.createElement('option');
          opt.value = c.name;
          opt.innerText = c.name;
          coachSelect.appendChild(opt);
        });
        container.classList.remove('hide');
      } else {
        container.classList.add('hide');
        coachSelect.innerHTML = '<option value="">بدون مدرب</option>';
      }
    },

    saveAthlete: function(e) {
      e.preventDefault();
      
      const name = document.getElementById('athlete-name').value.trim();
      const sport = document.getElementById('athlete-sport').value;
      const coach = document.getElementById('athlete-coach').value || '';
      const level = document.getElementById('athlete-level').value;
      const phone = document.getElementById('athlete-phone').value.trim();
      
      if(name && sport && level && phone) {
        const newAthlete = { 
          name, 
          sport, 
          coach: currentRole === 'club' ? coach : '', 
          level, 
          phone,
          addedBy: currentRole
        };
        
        clubAthletes.push(newAthlete);
        localStorage.setItem('start_academy_club_athletes', JSON.stringify(clubAthletes));
        
        this.closeAddAthleteModal();
        this.showToast(`تمت إضافة اللاعب ${name} بنجاح!`);
        
        // Refresh specific view if open
        if (!document.getElementById('view-club-all-players').classList.contains('hide')) {
          this.filterAllAthletes(); 
        } else if (!document.getElementById('view-club-players').classList.contains('hide')) {
          this.goToClubPlayers(sport); 
        }
      }
    },

    // --- Add Coach Modal ---
    openAddCoachModal: function() {
      const modal = document.getElementById('add-coach-modal');
      const sportSelect = document.getElementById('coach-sport');
      
      if(sportSelect && sportSelect.options.length <= 1) {
        sportsData.forEach(s => {
          const opt = document.createElement('option');
          opt.value = s.name;
          opt.innerText = s.name;
          sportSelect.appendChild(opt);
        });
      }
      if(modal) modal.style.display = 'flex';
    },

    closeAddCoachModal: function() {
      const modal = document.getElementById('add-coach-modal');
      if(modal) modal.style.display = 'none';
      const form = document.getElementById('add-coach-form');
      if(form) form.reset();
    },

    saveCoach: function(e) {
      e.preventDefault();
      const name = document.getElementById('coach-name').value.trim();
      const sport = document.getElementById('coach-sport').value;
      const phone = document.getElementById('coach-phone').value.trim();
      
      if(name && sport && phone) {
        clubCoaches.push({ name, sport, phone });
        localStorage.setItem('start_academy_club_coaches', JSON.stringify(clubCoaches));
        
        this.closeAddCoachModal();
        this.showToast(`تمت إضافة المدرب ${name} بنجاح!`);
        
        if (!document.getElementById('view-club-coaches').classList.contains('hide')) {
          this.filterAllCoaches();
        }
      }
    },

    showToast: function(message) {
      const toast = document.getElementById('toast-message');
      if(toast) {
        toast.innerText = message;
        toast.classList.remove('opacity-0');
        toast.classList.add('opacity-100');
        setTimeout(() => {
          toast.classList.remove('opacity-100');
          toast.classList.add('opacity-0');
        }, 3000);
      }
    },

    // --- Sports Selection Logic ---
    goToSportsList: function() {
      showView('view-sports');
      document.getElementById('searchInput').value = '';
      searchQuery = '';
      this.setCategory('all');
      
      const btnBack = document.getElementById('btn-sports-back');
      if (btnBack) {
        if (currentRole === 'athlete') {
          btnBack.onclick = () => this.goBack('athlete');
        } else if (currentRole === 'club') {
          btnBack.onclick = () => this.goBack('club');
        }
      }
    },

    setCategory: function(cat) {
      currentCategory = cat;
      const tabs = ['all', 'individual', 'team'];
      tabs.forEach(t => {
        const el = document.getElementById(`tab-${t}`);
        if (!el) return;
        el.className = t === cat ? 
          'px-6 py-3 rounded-full font-bold transition-all bg-primary text-white shadow-md whitespace-nowrap min-h-[50px]' : 
          'px-6 py-3 rounded-full font-bold transition-all bg-white text-textMuted shadow-sm hover:shadow-md whitespace-nowrap min-h-[50px]';
      });
      this.renderSports();
    },

    filterSports: function() {
      const input = document.getElementById('searchInput');
      searchQuery = input.value.toLowerCase().trim();
      this.renderSports();
    },

    renderSports: function() {
      const grid = document.getElementById('sportsGrid');
      const noResults = document.getElementById('noResults');
      
      const filtered = sportsData.filter(s => {
        const matchesSearch = s.name.includes(searchQuery) || s.en.toLowerCase().includes(searchQuery);
        const matchesCategory = currentCategory === 'all' || s.category === currentCategory;
        return matchesSearch && matchesCategory;
      });

      if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hide');
      } else {
        noResults.classList.add('hide');
        grid.innerHTML = filtered.map(s => `
          <button class="sport-btn p-4 flex flex-col items-center justify-center text-center w-full" onclick="startApp.selectSport('${s.name}')" role="listitem">
            <span class="text-4xl mb-3">${s.icon}</span>
            <span class="font-bold text-textMain text-sm md:text-base">${s.name}</span>
            <span class="text-xs text-textMuted mt-1">${s.en}</span>
          </button>
        `).join('');
      }
    },

    selectSport: function(sportName) {
      if (currentRole === 'club' || currentRole === 'coach') {
        this.goToClubPlayers(sportName);
      }
    },

    // --- Specific Sport Players Logic ---
    goToClubPlayers: function(sportName) {
      currentSportView = sportName;
      document.getElementById('club-players-title').innerText = `لاعبو ${sportName}`;
      
      const searchInput = document.getElementById('sportAthletesSearchInput');
      if(searchInput) searchInput.value = '';
      
      this.filterSportAthletes();
      showView('view-club-players');
    },

    filterSportAthletes: function() {
      const input = document.getElementById('sportAthletesSearchInput');
      const query = input ? input.value.toLowerCase().trim() : '';
      
      const filtered = clubAthletes.filter(athlete => {
        const matchesSport = athlete.sport === currentSportView;
        const matchesQuery = athlete.name.includes(query) || 
                             athlete.level.includes(query) || 
                             athlete.phone.includes(query);
        return matchesSport && matchesQuery;
      });

      this.renderSportAthletes(filtered);
    },

    renderSportAthletes: function(data) {
      const listContainer = document.getElementById('club-players-list');
      const noResults = document.getElementById('sportAthletesNoResults');
      
      if(!listContainer) return;
      listContainer.innerHTML = '';
      
      if (data.length === 0) {
        noResults.classList.remove('hide');
      } else {
        noResults.classList.add('hide');
        data.forEach((athlete, i) => {
          const card = document.createElement('div');
          card.className = 'soft-card p-4 flex items-center justify-between fade-in';
          card.style.animationDelay = `${i * 0.05}s`;
          card.innerHTML = `
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                ${athlete.name.charAt(0)}
              </div>
              <div>
                <h3 class="font-bold text-textMain text-lg">${athlete.name}</h3>
                <p class="text-sm text-textMuted mt-1">المستوى: ${athlete.level} ${athlete.coach ? '| مدرب: ' + athlete.coach : ''}</p>
              </div>
            </div>
            <button class="bg-gray-50 text-primary hover:bg-blue-50 border border-transparent hover:border-blue-100 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap">عرض الملف</button>
          `;
          listContainer.appendChild(card);
        });
      }
    },

    // --- All Athletes Logic ---
    goToAllAthletes: function() {
      const searchInput = document.getElementById('allAthletesSearchInput');
      if(searchInput) searchInput.value = '';
      this.filterAllAthletes();
      showView('view-club-all-players');
    },

    filterAllAthletes: function() {
      const input = document.getElementById('allAthletesSearchInput');
      const query = input ? input.value.toLowerCase().trim() : '';
      
      // If coach, they can see global list (for now, as per instruction)
      const filtered = clubAthletes.filter(athlete => {
        return athlete.name.includes(query) || 
               athlete.sport.includes(query) || 
               athlete.level.includes(query);
      });

      this.renderAllAthletes(filtered);
    },

    renderAllAthletes: function(data) {
      const tbody = document.getElementById('all-athletes-tbody');
      const noResults = document.getElementById('allAthletesNoResults');
      
      if(!tbody) return;
      tbody.innerHTML = '';

      if (data.length === 0) {
        noResults.classList.remove('hide');
        tbody.parentElement.parentElement.classList.add('hide');
      } else {
        noResults.classList.add('hide');
        tbody.parentElement.parentElement.classList.remove('hide');
        
        data.forEach((athlete, index) => {
          const tr = document.createElement('tr');
          tr.className = 'hover:bg-blue-50/50 transition-colors fade-in';
          tr.style.animationDelay = `${index * 0.05}s`;
          tr.innerHTML = `
            <td class="p-4 border-b border-gray-50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-blue-100 text-primary rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  ${athlete.name.charAt(0)}
                </div>
                <span class="font-bold text-textMain">${athlete.name}</span>
              </div>
            </td>
            <td class="p-4 border-b border-gray-50 text-textMuted">${athlete.sport}</td>
            <td class="p-4 border-b border-gray-50">
              <span class="px-3 py-1 rounded-full text-xs font-bold ${
                athlete.level === 'متقدم' ? 'bg-green-100 text-green-700' :
                athlete.level === 'متوسط' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }">${athlete.level}</span>
            </td>
            <td class="p-4 border-b border-gray-50">
              <button class="bg-gray-50 text-primary hover:bg-blue-100 px-3 py-1.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap">
                عرض
              </button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      }
    },

    // --- All Coaches Logic ---
    goToAllCoaches: function() {
      const searchInput = document.getElementById('coachesSearchInput');
      if(searchInput) searchInput.value = '';
      this.filterAllCoaches();
      showView('view-club-coaches');
    },

    filterAllCoaches: function() {
      const input = document.getElementById('coachesSearchInput');
      const query = input ? input.value.toLowerCase().trim() : '';
      
      const filtered = clubCoaches.filter(coach => {
        return coach.name.includes(query) || 
               coach.sport.includes(query) || 
               coach.phone.includes(query);
      });

      this.renderAllCoaches(filtered);
    },

    renderAllCoaches: function(data) {
      const listContainer = document.getElementById('coaches-list');
      const noResults = document.getElementById('coachesNoResults');
      
      if(!listContainer) return;
      listContainer.innerHTML = '';
      
      if (data.length === 0) {
        noResults.classList.remove('hide');
      } else {
        noResults.classList.add('hide');
        data.forEach((coach, i) => {
          const card = document.createElement('div');
          card.className = 'soft-card p-4 flex items-center justify-between fade-in';
          card.style.animationDelay = `${i * 0.05}s`;
          card.innerHTML = `
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                ${coach.name.charAt(0)}
              </div>
              <div>
                <h3 class="font-bold text-textMain text-lg">${coach.name}</h3>
                <p class="text-sm text-textMuted mt-1">الرياضة: ${coach.sport} | التواصل: <span dir="ltr">${coach.phone}</span></p>
              </div>
            </div>
            <button class="bg-gray-50 text-primary hover:bg-blue-50 border border-transparent hover:border-blue-100 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap">تعديل</button>
          `;
          listContainer.appendChild(card);
        });
      }
    }
  };
})();

// Initialize safely
document.addEventListener('DOMContentLoaded', () => {
  window.startApp = startApp;

  // Settings dropdown click outside handler
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('settings-dropdown');
    const btn = document.getElementById('settings-toggle-btn');
    if (dropdown && dropdown.style.display === 'block') {
      if (!dropdown.contains(e.target) && (!btn || !btn.contains(e.target))) {
        dropdown.style.display = 'none';
      }
    }
  });

  // Start the application safely
  startApp.init();
});
