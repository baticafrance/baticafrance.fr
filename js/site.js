/* =====================================================================
   BATI-CA FRANCE — script commun à toutes les pages
   - consentement cookies (un seul code, choix gardé 6 mois, retrait possible)
   - Google Analytics 4 + Google Ads chargés UNIQUEMENT après accord
     (mode « de base » du Consent Mode v2)
   - suivi des conversions : demande de devis + clic sur le téléphone
   - menu mobile, menu « Prestations », formulaire de devis, animations
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- Identifiants Google (ne pas modifier sans l'accord de Namik) ---------- */
  var GA4_ID = 'G-9TTMF71Y4E';
  var ADS_ID = 'AW-17460240320';
  var CONV_DEVIS = ADS_ID + '/HEmUCP6gwbsdEMC_2IVB';
  var CONV_TELEPHONE = ADS_ID + '/I7j5CIGhwbsdEMC_2IVB';

  var CLE = 'batica-consentement';
  var COOKIE_EXPIRES = 395 * 24 * 60 * 60; // cookies Google : 13 mois au maximum
  var VERSION = 2;
  var DUREE_MS = 182 * 24 * 60 * 60 * 1000; // environ 6 mois (bonne pratique CNIL)

  /* En local (tests), on ne charge pas Google : aucune fausse statistique. */
  var EN_LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  var etat = { mesure: false, marketing: false };
  var googleCharge = false;

  function lireChoix() {
    try {
      var brut = localStorage.getItem(CLE);
      if (!brut) return null;
      var c = JSON.parse(brut);
      if (!c || c.v !== VERSION || !c.date) return null;
      if (Date.now() - c.date > DUREE_MS) return null;
      return { mesure: !!c.mesure, marketing: !!c.marketing };
    } catch (e) { return null; }
  }

  function enregistrerChoix(mesure, marketing) {
    try {
      localStorage.setItem(CLE, JSON.stringify({ v: VERSION, mesure: mesure, marketing: marketing, date: Date.now() }));
    } catch (e) { /* navigation privée : le choix ne sera pas gardé */ }
  }

  function supprimerCookiesGoogle(mesure, marketing) {
    // On n'efface que les cookies de la finalité refusée.
    var motif = (!mesure && !marketing) ? /^(_ga|_gid|_gat|_gcl|_gac)/ : (!mesure ? /^(_ga(?!c)|_gid|_gat)/ : /^(_gcl|_gac)/);
    var noms = document.cookie.split(';').map(function (c) { return c.split('=')[0].trim(); });
    var domaines = ['', location.hostname, '.' + location.hostname.replace(/^www\./, '')];
    noms.forEach(function (nom) {
      if (motif.test(nom)) {
        domaines.forEach(function (d) {
          document.cookie = nom + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
        });
      }
    });
  }

  function appliquerConsentement(mesure, marketing) {
    var avant = etat;
    etat = { mesure: mesure, marketing: marketing };

    if (!mesure && !marketing) {
      if (googleCharge) {
        gtag('consent', 'update', {
          analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
        });
      }
      if (avant.mesure || avant.marketing) supprimerCookiesGoogle(false, false);
      return;
    }

    if (!googleCharge) {
      gtag('consent', 'default', {
        analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
      });
    }
    gtag('consent', 'update', {
      analytics_storage: mesure ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied',
      ad_user_data: marketing ? 'granted' : 'denied',
      ad_personalization: marketing ? 'granted' : 'denied'
    });
    if ((avant.mesure && !mesure) || (avant.marketing && !marketing)) supprimerCookiesGoogle(mesure, marketing);

    if (!googleCharge) {
      googleCharge = true;
      gtag('js', new Date());
      if (mesure) gtag('config', GA4_ID, { cookie_expires: COOKIE_EXPIRES });
      if (marketing) gtag('config', ADS_ID, { cookie_expires: COOKIE_EXPIRES });
      if (!EN_LOCAL) {
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + (mesure ? GA4_ID : ADS_ID);
        document.head.appendChild(s);
      }
    } else {
      if (mesure && !avant.mesure) gtag('config', GA4_ID, { cookie_expires: COOKIE_EXPIRES });
      if (marketing && !avant.marketing) gtag('config', ADS_ID, { cookie_expires: COOKIE_EXPIRES });
    }
  }

  /* Suivi : chaque envoi n'a lieu que si le visiteur a accepté la finalité concernée. */
  function suivreDevis() {
    if (etat.marketing) gtag('event', 'conversion', { send_to: CONV_DEVIS });
    if (etat.mesure) gtag('event', 'generate_lead', { event_category: 'formulaire', event_label: 'demande de devis' });
  }
  function suivreTelephone() {
    if (etat.marketing) gtag('event', 'conversion', { send_to: CONV_TELEPHONE, transport_type: 'beacon' });
    if (etat.mesure) gtag('event', 'clic_telephone', { event_category: 'contact', event_label: 'appel direct', transport_type: 'beacon' });
  }
  window.BaticaSuivi = { devis: suivreDevis, telephone: suivreTelephone, etat: function () { return { mesure: etat.mesure, marketing: etat.marketing }; } };

  /* Choix déjà enregistré : on l'applique tout de suite. */
  var choixInitial = lireChoix();
  if (choixInitial) appliquerConsentement(choixInitial.mesure, choixInitial.marketing);

  /* ---------- Une fois la page chargée ---------- */
  function pret(fn) {
    if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn);
  }

  pret(function () {
    /* Le script tourne : on annule la sécurité (et on remet la classe js si la page a mis longtemps à charger). */
    if (window.baticaSecours) clearTimeout(window.baticaSecours);
    if ((' ' + document.documentElement.className + ' ').indexOf(' js ') < 0) document.documentElement.className += ' js';
    /* ----- Bandeau cookies ----- */
    var bandeau = document.getElementById('cookie-banner');
    var vueSimple = document.getElementById('cookie-simple-view');
    var vueReglages = document.getElementById('cookie-settings-view');
    var caseMesure = document.getElementById('cookie-stats');
    var caseMarketing = document.getElementById('cookie-marketing');

    function montrerBandeau(reglages) {
      if (!bandeau) return;
      var c = lireChoix() || { mesure: false, marketing: false };
      if (caseMesure) caseMesure.checked = c.mesure;
      if (caseMarketing) caseMarketing.checked = c.marketing;
      bandeau.classList.remove('hidden');
      if (vueSimple && vueReglages) {
        vueSimple.classList.toggle('hidden', !!reglages);
        vueReglages.classList.toggle('hidden', !reglages);
      }
      var titre = document.getElementById(reglages ? 'cookie-settings-title' : 'cookie-title');
      if (titre) titre.focus();
    }
    function fermerBandeau() {
      if (bandeau) bandeau.classList.add('hidden');
    }
    function choisir(mesure, marketing) {
      var avant = etat;
      var retrait = googleCharge && ((avant.mesure && !mesure) || (avant.marketing && !marketing));
      enregistrerChoix(mesure, marketing);
      if (!mesure || !marketing) supprimerCookiesGoogle(mesure, marketing); // y compris d'anciens cookies d'une visite précédente
      appliquerConsentement(mesure, marketing);
      fermerBandeau();
      if (retrait) {
        /* Google est déjà chargé sur cette page : on le coupe et on recharge la page,
           pour qu'aucun signal ne parte après le retrait de l'accord. */
        if (!mesure) window['ga-disable-' + GA4_ID] = true;
        location.reload();
      }
    }

    if (bandeau) {
      if (!choixInitial) montrerBandeau(false); else fermerBandeau();
      bandeau.addEventListener('click', function (e) {
        var b = e.target.closest('[data-cookie]');
        if (!b) return;
        var action = b.getAttribute('data-cookie');
        if (action === 'accepter') choisir(true, true);
        else if (action === 'refuser') choisir(false, false);
        else if (action === 'personnaliser') montrerBandeau(true);
        else if (action === 'enregistrer') choisir(!!(caseMesure && caseMesure.checked), !!(caseMarketing && caseMarketing.checked));
      });
    }
    document.querySelectorAll('[data-cookie-manage]').forEach(function (lien) {
      lien.addEventListener('click', function (e) { e.preventDefault(); montrerBandeau(true); });
    });

    /* ----- Menu mobile ----- */
    var bouton = document.getElementById('mobile-menu-toggle');
    var menu = document.getElementById('mobile-menu');
    var icone = document.getElementById('mobile-menu-icon');
    function fermerMenu() {
      if (!menu || !bouton) return;
      menu.classList.remove('open');
      bouton.setAttribute('aria-expanded', 'false');
      bouton.setAttribute('aria-label', 'Ouvrir le menu');
      if (icone) icone.textContent = 'menu';
    }
    if (bouton && menu) {
      bouton.addEventListener('click', function () {
        var ouvert = menu.classList.toggle('open');
        bouton.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
        bouton.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
        if (icone) icone.textContent = ouvert ? 'close' : 'menu';
      });
      menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', fermerMenu); });
    }

    /* ----- Menu « Prestations » ----- */
    document.querySelectorAll('[data-dropdown]').forEach(function (zone) {
      var declencheur = zone.querySelector('[data-dropdown-toggle]');
      if (!declencheur) return;
      function regler(ouvert) {
        zone.classList.toggle('is-open', ouvert);
        declencheur.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
      }
      declencheur.addEventListener('click', function () { regler(!zone.classList.contains('is-open')); });
      document.addEventListener('click', function (e) { if (!zone.contains(e.target)) regler(false); });
      zone.addEventListener('focusout', function (e) { if (!zone.contains(e.relatedTarget)) regler(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (menu && menu.classList.contains('open')) { fermerMenu(); if (bouton) bouton.focus(); }
      document.querySelectorAll('[data-dropdown].is-open').forEach(function (zone) {
        zone.classList.remove('is-open');
        var d = zone.querySelector('[data-dropdown-toggle]');
        if (d) { d.setAttribute('aria-expanded', 'false'); d.focus(); }
      });
    });

    /* ----- Apparition au défilement ----- */
    var blocs = document.querySelectorAll('.reveal:not(.active)');
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('active'); obs.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });
      blocs.forEach(function (b) { obs.observe(b); });
    } else {
      blocs.forEach(function (b) { b.classList.add('active'); });
    }

    /* ----- Clic sur un numéro de téléphone ----- */
    document.addEventListener('click', function (e) {
      var lien = e.target.closest('a[href^="tel:"]');
      if (lien) suivreTelephone();
      var real = e.target.closest('a[href*="realisations"]');
      if (real && etat.mesure) gtag('event', 'voir_realisations', { event_category: 'navigation' });
    });

    /* ----- Formulaire de demande de devis ----- */
    var form = document.getElementById('devis-form');
    var succes = document.getElementById('devis-form-success');
    var erreur = document.getElementById('devis-form-error');
    if (form && succes && erreur && window.fetch && window.FormData) {
      var envoyer = form.querySelector('button[type="submit"]');
      var texteBouton = envoyer ? envoyer.textContent : '';
      var champFichier = form.querySelector('input[type="file"]');
      var piege = document.getElementById('devis-site-web');
      var MAX = 10 * 1024 * 1024;
      var erreurTexte = erreur.innerHTML;

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        succes.classList.add('hidden');
        erreur.classList.add('hidden');
        erreur.innerHTML = erreurTexte;

        /* Champ piège invisible : rempli seulement par les robots. */
        if (piege && piege.value) { succes.classList.remove('hidden'); form.reset(); return; }

        if (champFichier && champFichier.files && champFichier.files[0] && champFichier.files[0].size > MAX) {
          erreur.innerHTML = 'Le fichier dépasse 10 Mo. Merci d’envoyer un fichier plus léger, ou de nous appeler au <a class="underline" href="tel:+33648162603">06 48 16 26 03</a>.';
          erreur.classList.remove('hidden');
          return;
        }

        if (envoyer) { envoyer.disabled = true; envoyer.textContent = 'Envoi en cours…'; }
        fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
          .then(function (reponse) {
            if (reponse.ok) {
              succes.classList.remove('hidden');
              form.reset();
              suivreDevis();
            } else {
              erreur.classList.remove('hidden');
            }
          })
          .catch(function () { erreur.classList.remove('hidden'); })
          .then(function () { if (envoyer) { envoyer.disabled = false; envoyer.textContent = texteBouton; } });
      });
    }
  });
})();
