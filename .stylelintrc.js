/**
 * Stylelint configuration
 * 
 * @see: https://stylelint.io/user-guide/configuration
 */

module.exports = {
  /*
   * The standard config based on a handful of CSS style guides
   * @see: https://github.com/stylelint/stylelint-config-standard
   */
  extends: 'stylelint-config-standard',

  plugins: [
    /*
     * The stylelint plugin to sort CSS rules content with specified order
     * @see: https://github.com/hudochenkov/stylelint-order
     */
    'stylelint-order',
  ],

  rules: {
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          /*
           * CSS Modules composition
           * @see: https://github.com/css-modules/css-modules#composition
           */
          'composes',
        ],
      },
    ],

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          /*
           * CSS Modules :global scope
           * @see: https://github.com/css-modules/css-modules#exceptions
           */
          'global',
          'local',
        ],
      },
    ],

    /* NOTE: Opinionated rule, you can disable it if you want */
    'string-quotes': 'single',

    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'at-rules',
      'rules',
    ],

    'order/properties-order': [],
  },
}