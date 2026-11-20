/* BATI-CA FRANCE — page Réalisations : curseurs avant/après et filtres. */
(function () {
  'use strict';
  function pret(fn) {
    if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn);
  }
  pret(function () {
    /* Curseurs glissants avant / après */
    document.querySelectorAll('[data-ba-slider]').forEach(function (slider) {
      var range = slider.querySelector('.ba-range');
      var avant = slider.querySelector('.ba-before');
      var poignee = slider.querySelector('.ba-handle');
      if (!range || !avant || !poignee) return;
      function maj() {
        var v = range.value;
        var clip = 'inset(0 ' + (100 - v) + '% 0 0)';
        avant.style.webkitClipPath = clip;
        avant.style.clipPath = clip;
        poignee.style.left = v + '%';
        range.setAttribute('aria-valuetext', v + ' % avant, ' + (100 - v) + ' % après');
      }
      range.addEventListener('input', maj);
      maj();
    });

    /* Filtres */
    var puces = document.querySelectorAll('.filter-chip');
    var cartes = document.querySelectorAll('.project-card');
    var vide = document.getElementById('empty-state');
    var annonce = document.getElementById('filter-status');
    puces.forEach(function (puce) {
      puce.addEventListener('click', function () {
        var filtre = puce.getAttribute('data-filter');
        var visibles = 0;
        puces.forEach(function (p) {
          var actif = p === puce;
          p.classList.toggle('is-active', actif);
          p.setAttribute('aria-pressed', actif ? 'true' : 'false');
        });
        cartes.forEach(function (carte) {
          var montrer = filtre === 'tous' || carte.getAttribute('data-category') === filtre;
          carte.classList.toggle('hidden', !montrer);
          if (montrer) { visibles++; carte.classList.add('active'); }
        });
        if (vide) vide.classList.toggle('hidden', visibles > 0);
        if (annonce) annonce.textContent = visibles + (visibles > 1 ? ' chantiers affichés' : ' chantier affiché');
      });
    });

    /* Lien vers un chantier (#grange-en-pierre…) : si un filtre le cache, on remet « Tous » puis on y va. */
    function allerAuChantier() {
      var id = window.location.hash.slice(1);
      if (!id) return;
      try { id = decodeURIComponent(id); } catch (e) { return; }
      var cible = document.getElementById(id);
      if (!cible || !cible.classList.contains('project-card')) return;
      if (cible.classList.contains('hidden')) {
        var tous = document.querySelector('.filter-chip[data-filter="tous"]');
        if (tous) tous.click();
        cible.scrollIntoView();
      }
    }
    window.addEventListener('hashchange', allerAuChantier);
    allerAuChantier();
  });
})();
