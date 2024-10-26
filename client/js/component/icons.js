// Language=SVG
export const welcomeLogo = `<svg class="logo" viewBox="0 0 60 60">
  <path stroke="#D80000" stroke-dasharray="0,100" stroke-width="2" fill="none" d="M24.2,26.9923 L12.2,26.9923 L6.2,16.6 L12.2,6.2077 L24.2,6.2077 L30.2,16.6 Z">
    <animate attributeName="stroke-dasharray" values="0,100; 100,0; 0,0" keyTimes="0;0.9999;1" dur="0.5s" begin="0s" fill="freeze" />
  </path>
  <path stroke="#00D800" stroke-dasharray="0,100" stroke-width="2" fill="none" d="M29.5,30 L35.5,40.3923 L47.5,40.3923 L53.5,30 L47.5,19.6077 L35.5,19.6077 Z">
    <animate attributeName="stroke-dasharray" values="0,100; 100,0; 0,0" keyTimes="0;0.9999;1" dur="0.5s" begin="0.5s" fill="freeze" />
  </path>
  <path stroke="#0000D8" stroke-dasharray="0,100" stroke-width="2" fill="none" d="M24.2,33.0077 L12.2,33.0077 L6.2,43.4 L12.2,53.7923  L24.2,53.7923  L30.2,43.4  Z">
    <animate attributeName="stroke-dasharray" values="0,100; 100,0; 0,0" keyTimes="0;0.9999;1" dur="0.5s" begin="1s" fill="freeze" />
  </path>
</svg>`;

// Language=SVG
export const logo = `<svg viewBox="0 0 60 60" style="width: 32px">
  <path stroke="#D80000" stroke-width="2" fill="none" d="M24.2,26.9923 L12.2,26.9923 L6.2,16.6 L12.2,6.2077 L24.2,6.2077 L30.2,16.6 Z" transform-origin="18.2 16.6"/>
  <path stroke="#00D800" stroke-width="2" fill="none" d="M29.5,30 L35.5,40.3923 L47.5,40.3923 L53.5,30 L47.5,19.6077 L35.5,19.6077 Z" transform-origin="41.5 30"/>
  <path stroke="#0000D8" stroke-width="2" fill="none" d="M24.2,33.0077 L12.2,33.0077 L6.2,43.4 L12.2,53.7923  L24.2,53.7923  L30.2,43.4  Z" transform-origin="18.2 43.4"/>
</svg>`;

// Language=SVG
export const animation = `<svg viewBox="0 0 60 60" style="width: 32px">
  <path stroke="#D80000" stroke-width="2" fill="none" d="M24.2,26.9923 L12.2,26.9923 L6.2,16.6 L12.2,6.2077 L24.2,6.2077 L30.2,16.6 Z" transform-origin="18.2 16.6">
    <animateTransform attributeName="transform" type="scale" keyTimes="0; 0.25; 0.5; 0.75; 1" values  ="1;    0;   1;   1;  1" dur="2s" repeatCount="indefinite" />
  </path>
  <path stroke="#00D800" stroke-width="2" fill="none" d="M29.5,30 L35.5,40.3923 L47.5,40.3923 L53.5,30 L47.5,19.6077 L35.5,19.6077 Z" transform-origin="41.5 30">
    <animateTransform attributeName="transform" type="scale" keyTimes="0; 0.25; 0.5; 0.75; 1" values  ="1;   1;   0;   1;   1" dur="2s" repeatCount="indefinite" />
  </path>
  <path stroke="#0000D8" stroke-width="2" fill="none" d="M24.2,33.0077 L12.2,33.0077 L6.2,43.4 L12.2,53.7923  L24.2,53.7923  L30.2,43.4  Z" transform-origin="18.2 43.4">
    <animateTransform attributeName="transform" type="scale" keyTimes="0; 0.25; 0.5; 0.75; 1" values  ="1;   1;   1;   0;   1;" dur="2s" repeatCount="indefinite" />
  </path>
</svg>`;

// Language=SVG
export const reload = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
  <path d="M3 14.0769C3.95037 18.0462 7.56452 21 11.878 21C16.9159 21 21 16.9706 21 12C21 7.02944 16.9159 3 11.878 3C8.35867 3 5.30478 4.96631 3.78351 7.84615"  stroke-width="1" stroke-linecap="round"/>
  <path d="M3 5V9H6"  stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Language=SVG
export const clipboard = `<svg width="22" height="22" viewBox="0 0 24 24" fill="transparent">
  <path d="M9.1875 2.625H14.8125C14.8125 2.625 15.75 2.625 15.75 3.5625V5.4375C15.75 5.4375 15.75 6.375 14.8125 6.375H9.1875C9.1875 6.375 8.25 6.375 8.25 5.4375V3.5625C8.25 3.5625 8.25 2.625 9.1875 2.625Z"  stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.25 4.5H6.375C5.87772 4.5 5.40081 4.69754 5.04917 5.04917C4.69754 5.40081 4.5 5.87772 4.5 6.375V19.5C4.5 19.9973 4.69754 20.4742 5.04917 20.8258C5.40081 21.1775 5.87772 21.375 6.375 21.375H17.625C18.1223 21.375 18.5992 21.1775 18.9508 20.8258C19.3025 20.4742 19.5 19.9973 19.5 19.5V17.625"  stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15.75 4.5H17.625C18.1223 4.5 18.5992 4.69754 18.9508 5.04917C19.3025 5.40081 19.5 5.87772 19.5 6.375V10.125V18"  stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Language=SVG
export const editor = `<svg width="22" height="22" viewBox="0 0 24 24" stroke-width="1" fill="transparent">
  <polygon points="10,1 20,1 23,5 23,18 10,18"/>
  <polyline points="8,6 1,6 1,23 14,23 14,20"/>
</svg>
`;
