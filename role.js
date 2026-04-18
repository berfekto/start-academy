// role.js - Logic for Start Academy Single Page App (Login -> Roles -> Sports)

const startApp = (function() {
  // Comprehensive Olympic Sports Database (Every Olympic Sport)
  const sportsData = [
    // Summer - Aquatics
    { name: 'السباحة', en: 'Swimming', category: 'individual', icon: '🏊' },
    { name: 'كرة الماء', en: 'Water Polo', category: 'team', icon: '🤽' },
    { name: 'الغطس', en: 'Diving', category: 'individual', icon: '🤿' },
    { name: 'السباحة الفنية', en: 'Artistic Swimming', category: 'team', icon: '🏊‍♀️' },
    { name: 'ماراثون السباحة', en: 'Marathon Swimming', category: 'individual', icon: '🏊‍♂️' },
    
    // Summer - Main
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

    // Winter Sports
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
  
  // Load saved role from LocalStorage (Persistent Identity)
  let currentRole = localStorage.getItem('start_academy_user_role') || '';

  // Persistent Club Athletes Storage
  let clubAthletes = JSON.parse(localStorage.getItem('start_academy_club_athletes'));
  if (!clubAthletes) {
    clubAthletes = [
      { name: 'أحمد محمد', sport: 'السباحة', level: 'متقدم', phone: '01012345678' },
      { name: 'محمود علي', sport: 'كرة القدم', level: 'مبتدئ', phone: '01123456789' },
      { name: 'يوسف مصطفى', sport: 'التنس', level: 'متوسط', phone: '01234567890' },
      { name: 'خالد حسن', sport: 'كرة السلة', level: 'متقدم', phone: '01512345678' },
      { name: 'عمر كمال', sport: 'ألعاب القوى', level: 'مبتدئ', phone: '01098765432' },
      { name: 'طارق سامي', sport: 'الجمباز', level: 'متوسط', phone: '01187654321' },
      { name: 'علي محمود', sport: 'السباحة', level: 'مبتدئ', phone: '01276543210' },
      { name: 'زياد أحمد', sport: 'كرة اليد', level: 'متقدم', phone: '01576543210' },
      { name: 'كريم مصطفى', sport: 'الملاكمة', level: 'متوسط', phone: '01055556666' },
      { name: 'سيف الدين', sport: 'كرة القدم', level: 'متقدم', phone: '01144447777' },
    ];
    localStorage.setItem('start_academy_club_athletes', JSON.stringify(clubAthletes));
  }

  // Utility: Hide all views and show target
  function showView(viewId) {
    const views = ['view-login', 'view-role', 'view-athlete', 'view-sports', 'view-placeholder', 'view-coach-options', 'view-club-options', 'view-club', 'view-club-players', 'view-club-all-players'];
    views.forEach(v => {
      const el = document.getElementById(v);
      if (el) el.classList.add('hide');
    });
    const target = document.getElementById(viewId);
    if(target) {
      target.classList.remove('hide');
      // Re-trigger animation
      target.classList.remove('fade-in');
      void target.offsetWidth;
      target.classList.add('fade-in');
    }
  }

  // Routing function based on Persistent Identity
  function routeUser() {
    const settingsBtn = document.getElementById('settings-button-container');
    console.log('[Debug] Routing user. Current role:', currentRole);

    if (!currentRole) {
      console.log('[Debug] No role found, showing login screen.');
      // User is not logged in / role not set
      if (settingsBtn) settingsBtn.classList.add('hide');
      showView('view-login');
    } else {
      console.log('[Debug] Role locked as:', currentRole);
      // User has a locked role
      if (settingsBtn) settingsBtn.classList.remove('hide');

      if (currentRole === 'athlete') {
        showView('view-athlete');
        hideRoleBackButton('view-athlete');
      } else if (currentRole === 'coach') {
        startApp.goToSportsList(); // Coach directly enters sports list
        hideRoleBackButton('view-sports');
      } else if (currentRole === 'club') {
        showView('view-club');
      }
    }
  }

  // Hide the back button to role selection if the identity is locked
  function hideRoleBackButton(viewId) {
    const view = document.getElementById(viewId);
    if (view) {
      // Find generic goBack('role') button
      const backBtn = view.querySelector('button[onclick="startApp.goBack(\\\'role\\\')"]');
      if (backBtn) backBtn.style.display = 'none';
      
      // Specifically for sports list coach back button handling:
      if (viewId === 'view-sports' && currentRole === 'coach') {
         const sportsBackBtn = document.getElementById('btn-sports-back');
         if (sportsBackBtn) sportsBackBtn.style.display = 'none';
      }
    }
  }

  return {
    init: function() {
      routeUser();
    },

    // --- Login Logic ---
    handleLogin: function(e) {
      e.preventDefault();
      console.log('[Debug] Login form submitted.');
      // On successful login, route user to their permanent dashboard or role selection
      if (!currentRole) {
        console.log('[Debug] Proceeding to role selection.');
        showView('view-role');
      } else {
        routeUser();
      }
    },

    // --- Navigation ---
    goBack: function(to) {
      if (to === 'login') {
        showView('view-login');
      } else if (to === 'role') {
        if (currentRole) {
          alert('هذا الحساب مرتبط بدور ثابت. لتغيير دورك يرجى استخدام الإعدادات.');
          return;
        }
        showView('view-role');
      } else if (to === 'athlete') {
        showView('view-athlete');
      } else if (to === 'sports') {
        showView('view-sports');
      } else if (to === 'coach-options') {
        showView('view-coach-options');
      } else if (to === 'club') {
        showView('view-club');
      }
    },

    // --- Role Selection (First Time Only) ---
    selectRole: function(role) {
      console.log('[Debug] selectRole called with:', role);
      if (currentRole) {
        alert('لقد قمت باختيار دورك مسبقاً ولا يمكن تغييره.');
        return;
      }
      currentRole = role;
      localStorage.setItem('start_academy_user_role', role); // Lock identity
      console.log('[Debug] Role saved to localStorage:', localStorage.getItem('start_academy_user_role'));
      routeUser();
    },

    // --- Settings / Role Switching ---
    toggleSettings: function(e) {
      if (e) e.stopPropagation();
      const dropdown = document.getElementById('settings-dropdown');
      if (dropdown) {
        if (dropdown.style.display === 'none' || dropdown.style.display === '') {
          dropdown.style.display = 'block';
        } else {
          dropdown.style.display = 'none';
        }
      }
    },

    closeSettings: function() {
      const dropdown = document.getElementById('settings-dropdown');
      if (dropdown) dropdown.style.display = 'none';
    },

    confirmRoleChange: function() {
      if (confirm('هل أنت متأكد من تغيير نوع الحساب؟ سيتم إعادة توجيهك لاختيار دورك الجديد.')) {
        this.closeSettings();
        localStorage.clear();
        window.location.reload();
      }
    },

    goToOrientation: function() {
      document.getElementById('placeholder-title').innerText = 'التوجيه الرياضي';
      document.getElementById('btn-ph-back').onclick = () => {
        if (currentRole === 'club') this.goBack('club-options');
        else this.goBack('athlete');
      };
      const phHome = document.getElementById('btn-ph-home');
      if (phHome) phHome.onclick = () => routeUser();
      showView('view-placeholder');
    },

    goToCoachPlaceholder: function(option) {
      document.getElementById('placeholder-title').innerText = option;
      document.getElementById('btn-ph-back').onclick = () => this.goBack('coach-options');
      const phHome = document.getElementById('btn-ph-home');
      if (phHome) phHome.onclick = () => routeUser();
      showView('view-placeholder');
    },

    goToClubPlaceholder: function(option) {
      document.getElementById('placeholder-title').innerText = option;
      document.getElementById('btn-ph-back').onclick = () => this.goBack('club');
      const phHome = document.getElementById('btn-ph-home');
      if (phHome) phHome.onclick = () => routeUser();
      showView('view-placeholder');
    },

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
        if(noResults) noResults.classList.remove('hide');
      } else {
        if(noResults) noResults.classList.add('hide');
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
                <p class="text-sm text-textMuted mt-1">المستوى: ${athlete.level} | التواصل: <span dir="ltr">${athlete.phone}</span></p>
              </div>
            </div>
            <button class="bg-gray-50 text-primary hover:bg-blue-50 border border-transparent hover:border-blue-100 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap">عرض الملف</button>
          `;
          listContainer.appendChild(card);
        });
      }
    },

    goToAllAthletes: function() {
      // Clear previous search
      const searchInput = document.getElementById('allAthletesSearchInput');
      if(searchInput) searchInput.value = '';
      this.filterAllAthletes();
      showView('view-club-all-players');
    },

    filterAllAthletes: function() {
      const input = document.getElementById('allAthletesSearchInput');
      const query = input ? input.value.toLowerCase().trim() : '';
      
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
        if(noResults) noResults.classList.remove('hide');
        tbody.parentElement.parentElement.classList.add('hide'); // Hide table wrapper
      } else {
        if(noResults) noResults.classList.add('hide');
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

    // --- Add Athlete Modal Logic ---
    openAddAthleteModal: function(preSelectedSport = null) {
      const modal = document.getElementById('add-athlete-modal');
      const sportSelect = document.getElementById('athlete-sport');
      
      if(sportSelect && sportSelect.options.length <= 1) {
        sportsData.forEach(s => {
          const opt = document.createElement('option');
          opt.value = s.name;
          opt.innerText = s.name;
          sportSelect.appendChild(opt);
        });
      }

      if(sportSelect && preSelectedSport) {
        sportSelect.value = preSelectedSport;
        // Optionally lock it if adding from a specific sport view
        // sportSelect.disabled = true; 
      } else if (sportSelect) {
        sportSelect.value = '';
        // sportSelect.disabled = false;
      }
      
      if(modal) modal.style.display = 'flex';
    },

    closeAddAthleteModal: function() {
      const modal = document.getElementById('add-athlete-modal');
      if(modal) modal.style.display = 'none';
      const form = document.getElementById('add-athlete-form');
      if(form) form.reset();
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

    saveAthlete: function(e) {
      e.preventDefault();
      
      const name = document.getElementById('athlete-name').value.trim();
      const sportSelect = document.getElementById('athlete-sport');
      const sport = sportSelect.value;
      const level = document.getElementById('athlete-level').value;
      const phone = document.getElementById('athlete-phone').value.trim();
      
      if(name && sport && level && phone) {
        const newAthlete = { name, sport, level, phone };
        clubAthletes.push(newAthlete);
        localStorage.setItem('start_academy_club_athletes', JSON.stringify(clubAthletes));
        
        this.closeAddAthleteModal();
        this.showToast(`تمت إضافة اللاعب ${name} بنجاح!`);
        
        // Dynamically update the correct view
        if (!document.getElementById('view-club-all-players').classList.contains('hide')) {
          this.filterAllAthletes(); 
        } else if (!document.getElementById('view-club-players').classList.contains('hide')) {
          this.goToClubPlayers(sport); // Refresh the specific sport list
        }
      }
    },

    // --- Sports Database Logic ---
    goToSportsList: function() {
      showView('view-sports');
      document.getElementById('searchInput').value = '';
      searchQuery = '';
      this.setCategory('all');
      
      const btnBack = document.getElementById('btn-sports-back');
      if (btnBack) {
        if (currentRole === 'athlete') {
          btnBack.style.display = 'flex';
          btnBack.onclick = () => this.goBack('athlete');
        } else if (currentRole === 'coach') {
          btnBack.style.display = 'none'; // Lock navigation
        } else if (currentRole === 'club') {
          btnBack.style.display = 'flex';
          btnBack.innerHTML = '<svg class="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>العودة للوحة التحكم';
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
        
        if (t === cat) {
          el.className = 'px-6 py-3 rounded-full font-bold transition-all bg-primary text-white shadow-md whitespace-nowrap min-h-[50px]';
        } else {
          el.className = 'px-6 py-3 rounded-full font-bold transition-all bg-white text-textMuted shadow-sm hover:shadow-md whitespace-nowrap min-h-[50px]';
        }
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
      if (currentRole === 'athlete') {
        alert(`تم اختيار رياضتك بنجاح: ${sportName}!\nسيتم نقلك إلى لوحة تحكم اللاعب قريباً.`);
      } else if (currentRole === 'coach') {
        document.getElementById('coach-sport-title').innerText = `خيارات المدرب - ${sportName}`;
        showView('view-coach-options');
      } else if (currentRole === 'club') {
        this.goToClubPlayers(sportName);
      }
    }
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  // We start by displaying the login screen inherently because it is the only one not having the 'hide' class in the HTML.
  // When they click "Login", startApp.handleLogin will route them based on persistent identity.
  // Expose to global scope for HTML onclick handlers
  window.startApp = startApp;

  // Global click listener to close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('settings-dropdown');
    const btn = document.getElementById('settings-toggle-btn');
    if (dropdown && dropdown.style.display === 'block') {
      if (!dropdown.contains(e.target) && (!btn || !btn.contains(e.target))) {
        dropdown.style.display = 'none';
      }
    }
  });

  // Check the saved role immediately when the page loads
  window.onload = () => {
    startApp.init(); // Execute initial routing
  };
});
