/* Configuration Tailwind unique du site BATI-CA FRANCE.
   Reprise de la configuration qui était collée dans chaque page (CDN),
   avec la couleur « bronze » légèrement foncée pour la lisibilité (contraste AA).
   Compilation : voir README.md. */
module.exports = {
  content: ['./*.html', './js/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-fixed-dim': '#c8c6c5',
        'on-primary-fixed-variant': '#474747',
        'tertiary-container': '#2d2c2a',
        'surface-dim': '#dbdad9',
        'secondary-fixed-dim': '#c8c6c2',
        'secondary': '#5e5e5b',
        'on-tertiary': '#ffffff',
        'on-surface-variant': '#444748',
        'outline-variant': '#c4c7c7',
        'surface-container-highest': '#e4e2e2',
        'inverse-surface': '#303031',
        'secondary-fixed': '#e4e2dd',
        'surface-variant': '#e4e2e2',
        'primary': '#171818',
        'on-primary': '#ffffff',
        'inverse-on-surface': '#f2f0f0',
        'tertiary': '#181816',
        'surface-container-low': '#f5f3f3',
        'surface-container': '#efeded',
        'on-tertiary-container': '#969390',
        'on-background': '#1b1c1c',
        'on-tertiary-fixed': '#1c1b1a',
        'on-secondary-fixed-variant': '#474744',
        'background': '#fbf9f9',
        'on-primary-container': '#c8c6c5',
        'on-error': '#ffffff',
        'tertiary-fixed': '#e6e2de',
        'error-container': '#ffdad6',
        'on-secondary-container': '#63635f',
        'primary-container': '#2c2c2c',
        'surface-container-high': '#e9e8e7',
        'on-surface': '#1b1c1c',
        'error': '#ba1a1a',
        'outline': '#747878',
        'inverse-primary': '#c8c6c5',
        'secondary-container': '#e1dfdb',
        'surface-container-lowest': '#ffffff',
        'on-error-container': '#93000a',
        'primary-fixed': '#e4e2e1',
        'tertiary-fixed-dim': '#c9c6c3',
        'on-primary-fixed': '#1b1c1c',
        'surface-bright': '#fbf9f9',
        'surface': '#fbf9f9',
        'surface-tint': '#5f5e5e',
        'on-secondary-fixed': '#1b1c19',
        'on-secondary': '#ffffff',
        'on-tertiary-fixed-variant': '#484644',
        // Ancien bronze : #B07D62 (contraste 3,5:1 sur blanc, insuffisant pour du texte).
        'bronze': '#92634A',
        'bronze-clair': '#B07D62'
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '8px',
        xl: '12px',
        full: '9999px'
      },
      spacing: {
        'section-padding-mobile': '60px',
        'section-padding-desktop': '120px',
        'gutter': '24px',
        'margin-mobile': '20px',
        'container-max': '1280px',
        'unit': '8px'
      },
      fontFamily: {
        'body-md': ['Manrope', 'system-ui', 'sans-serif'],
        'headline-lg-mobile': ['"Playfair Display"', 'Georgia', 'serif'],
        'button': ['Manrope', 'system-ui', 'sans-serif'],
        'headline-xl': ['"Playfair Display"', 'Georgia', 'serif'],
        'label-caps': ['Manrope', 'system-ui', 'sans-serif'],
        'headline-lg': ['"Playfair Display"', 'Georgia', 'serif'],
        'headline-md': ['"Playfair Display"', 'Georgia', 'serif'],
        'body-lg': ['Manrope', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'headline-lg-mobile': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'button': ['14px', { lineHeight: '1.0', letterSpacing: '0.05em', fontWeight: '600' }],
        'headline-xl': ['60px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'label-caps': ['12px', { lineHeight: '1.0', letterSpacing: '0.1em', fontWeight: '700' }],
        'headline-lg': ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-md': ['32px', { lineHeight: '1.3', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }]
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
