// Gestion du consentement cookies - BATI-CA FRANCE
(function () {
    const STORAGE_KEY = 'bati_ca_cookie_consent';

    function getConsent() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function saveConsent(consent) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
        } catch (e) { /* localStorage indisponible, on ignore */ }
    }

    document.addEventListener('DOMContentLoaded', function () {
        const banner = document.getElementById('cookie-banner');
        if (!banner) return;

        // Si un choix a déjà été enregistré, on ne montre pas la bannière
        if (getConsent()) {
            banner.remove();
            return;
        }

        const simpleView = document.getElementById('cookie-simple-view');
        const settingsView = document.getElementById('cookie-settings-view');
        const openSettingsBtn = document.getElementById('cookie-open-settings');
        const acceptAllBtn = document.getElementById('cookie-accept-all');
        const saveSettingsBtn = document.getElementById('cookie-save-settings');
        const refuseAllBtn = document.getElementById('cookie-refuse-all');
        const statsCheckbox = document.getElementById('cookie-stats');
        const marketingCheckbox = document.getElementById('cookie-marketing');

        function closeBanner() {
            banner.remove();
        }

        if (openSettingsBtn) {
            openSettingsBtn.addEventListener('click', function () {
                simpleView.classList.add('hidden');
                settingsView.classList.remove('hidden');
            });
        }

        if (acceptAllBtn) {
            acceptAllBtn.addEventListener('click', function () {
                saveConsent({ necessary: true, stats: true, marketing: true, date: new Date().toISOString() });
                closeBanner();
            });
        }

        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', function () {
                saveConsent({
                    necessary: true,
                    stats: statsCheckbox ? statsCheckbox.checked : false,
                    marketing: marketingCheckbox ? marketingCheckbox.checked : false,
                    date: new Date().toISOString()
                });
                closeBanner();
            });
        }

        if (refuseAllBtn) {
            refuseAllBtn.addEventListener('click', function () {
                saveConsent({ necessary: true, stats: false, marketing: false, date: new Date().toISOString() });
                closeBanner();
            });
        }
    });
})();
