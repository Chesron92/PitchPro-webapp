/**
 * Dit bestand bevat utility functies om het weergeven van headers en footers in pagina's te beheren
 * om dubbele headers en footers te voorkomen.
 */

/**
 * Constante die aangeeft of pagina's die al in een Layout component staan nog steeds hun eigen
 * Header en Footer moeten tonen.
 * 
 * Let op: Dit moet op false staan om dubbele headers en footers te voorkomen.
 * Als pagina's worden ingebed in de Layout component in App.tsx, moeten ze hun eigen
 * Headers en Footers niet tonen.
 */
export const SKIP_LAYOUT_COMPONENTS = true;

/**
 * Helper functie om snel te controleren of een pagina zijn eigen Header en Footer moet tonen.
 * Als de pagina al in een Layout component zit (via de routes), dan moet dit false zijn.
 */
export function shouldShowHeaderAndFooter(): boolean {
  // Alleen de landing pagina en standalone pagina's hebben hun eigen header en footer nodig
  // Voor debugging kunnen we deze functie aanpassen
  return !SKIP_LAYOUT_COMPONENTS;
} 