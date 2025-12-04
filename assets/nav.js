// header shadow on scroll
            const header = document.getElementById('tcHeader');
            const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 2);
            onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

            // search handlers
            // const btnSearch = document.getElementById('btnSearch');
            // const searchWrap = document.getElementById('searchWrap');
            // const searchInput = document.getElementById('searchInput');
            // const btnSearchClose = document.getElementById('btnSearchClose');
            // function openSearch(){ searchWrap.classList.add('open'); btnSearch.setAttribute('aria-expanded','true'); setTimeout(()=>searchInput.focus(),120); }
            // function closeSearch(){ searchWrap.classList.remove('open'); btnSearch.setAttribute('aria-expanded','false'); }
            // btnSearch.addEventListener('click', ()=>{ searchWrap.classList.contains('open')?closeSearch():openSearch(); });
            // btnSearchClose.addEventListener('click', closeSearch);

            // panel handlers (fixed toggle issues)
            const btnMenu = document.getElementById('btnMenu');
            const panel = document.getElementById('navPanel');
            const overlay = document.getElementById('panelOverlay');
            const btnPanelClose = document.getElementById('btnPanelClose');

            function lockScroll(){ document.documentElement.style.overflow = 'hidden'; document.body.style.overflow = 'hidden'; }
            function unlockScroll(){ document.documentElement.style.overflow = ''; document.body.style.overflow = ''; }

            function openPanel(){ panel.classList.add('open'); overlay.classList.add('open'); panel.setAttribute('aria-hidden','false'); overlay.setAttribute('aria-hidden','false'); btnMenu.setAttribute('aria-expanded','true'); lockScroll(); trapFocus(panel); }
            function closePanel(){ panel.classList.remove('open'); overlay.classList.remove('open'); panel.setAttribute('aria-hidden','true'); overlay.setAttribute('aria-hidden','true'); btnMenu.setAttribute('aria-expanded','false'); unlockScroll(); releaseFocus(); }

            btnMenu.addEventListener('click', ()=>{ panel.classList.contains('open')?closePanel():openPanel(); });
            btnPanelClose.addEventListener('click', closePanel);
            overlay.addEventListener('click', closePanel);

            // close on escape
            document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ if(panel.classList.contains('open')) closePanel(); if(searchWrap.classList.contains('open')) closeSearch(); } });

            // focus trap
            let prevFocused = null;
            function trapFocus(container){ prevFocused = document.activeElement; const f = container.querySelectorAll('a,button,input,select,textarea,[tabindex]'); if(!f.length) return; const first = f[0], last = f[f.length-1]; function loop(e){ if(e.key !== 'Tab') return; if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); } }
            container.addEventListener('keydown', loop);
            container._loop = loop; first.focus(); }
            function releaseFocus(){ if(panel._loop) panel.removeEventListener('keydown', panel._loop); if(prevFocused) prevFocused.focus(); }