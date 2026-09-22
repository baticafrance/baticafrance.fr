// Gestion du consentement cookies - BATI-CA FRANCE
(function () {
    var STORAGE_KEY = 'batica-consentement'; // meme cle que le script de suivi dans le <head>

    function getConsent() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function saveConsent(mesure, marketing) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ mesure: mesure, marketing: marketing }));
        } catch (e) { /* localStorage indisponible, on ignore */ }

        // Confirme aussi directement a Google, au cas ou le script de suivi
        // du <head> ne serait pas present sur cette page.
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'analytics_storage': mesure ? 'granted' : 'denied',
                'ad_storage': marketing ? 'granted' : 'denied',
                'ad_user_data': marketing ? 'granted' : 'denied',
                'ad_personalization': marketing ? 'granted' : 'denied'
            });
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var banner = document.getElementById('cookie-banner');
        if (!banner) return;

        // Si un choix a deja ete enregistre, on ne montre pas la banniere
        if (getConsent()) {
            banner.remove();
            return;
        }

        var simpleView = document.getElementById('cookie-simple-view');
        var settingsView = document.getElementById('cookie-settings-view');
        var openSettingsBtn = document.getElementById('cookie-open-settings');
        var acceptAllBtn = document.getElementById('cookie-accept-all');
        var saveSettingsBtn = document.getElementById('cookie-save-settings');
        var refuseAllBtn = document.getElementById('cookie-refuse-all');
        var statsCheckbox = document.getElementById('cookie-stats');
        var marketingCheckbox = document.getElementById('cookie-marketing');

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
                saveConsent(true, true);
                closeBanner();
            });
        }

        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', function () {
                var mesure = statsCheckbox ? statsCheckbox.checked : false;
                var marketing = marketingCheckbox ? marketingCheckbox.checked : false;
                saveConsent(mesure, marketing);
                closeBanner();
            });
        }

        if (refuseAllBtn) {
            refuseAllBtn.addEventListener('click', function () {
                saveConsent(false, false);
                closeBanner();
            });
        }
    });
})();
