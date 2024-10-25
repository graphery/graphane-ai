// Language=HTML
export default `
<div class="body">
  <div class="head">
    <select id="assistantSelect">
      <option value="">select an assistant</option>
    </select>
  </div>
  <div class="main">
    <div class="welcome">
      <svg class="logo" viewBox="0 0 60 60">
        <path stroke="#D80000" stroke-dasharray="0,100" stroke-width="2" fill="none" d="M24.2,26.9923 L12.2,26.9923 L6.2,16.6 L12.2,6.2077 L24.2,6.2077 L30.2,16.6 Z">
          <animate attributeName="stroke-dasharray" values="0,100; 100,0; 0,0" keyTimes="0;0.9999;1" dur="0.5s" begin="0s" fill="freeze" />
        </path>
        <path stroke="#00D800" stroke-dasharray="0,100" stroke-width="2" fill="none" d="M29.5,30 L35.5,40.3923 L47.5,40.3923 L53.5,30 L47.5,19.6077 L35.5,19.6077 Z">
          <animate attributeName="stroke-dasharray" values="0,100; 100,0; 0,0" keyTimes="0;0.9999;1" dur="0.5s" begin="0.5s" fill="freeze" />
        </path>
        <path stroke="#0000D8" stroke-dasharray="0,100" stroke-width="2" fill="none" d="M24.2,33.0077 L12.2,33.0077 L6.2,43.4 L12.2,53.7923  L24.2,53.7923  L30.2,43.4  Z">
          <animate attributeName="stroke-dasharray" values="0,100; 100,0; 0,0" keyTimes="0;0.9999;1" dur="0.5s" begin="1s" fill="freeze" />
        </path>
      </svg>
      <div class="typing-effect">
        transforms your ideas into clear visualizations   
      </div>
  </div>
  </div>
  <form class="footer boxUser">
    <textarea id="text" placeholder="what do you want?"></textarea>
    <button id="send" type="submit" disabled>Send</button> 
  </form>
</div>`;