(function () {
  var c = window.BOT_CONFIG || {};
  var raw = String(c.whatsappNumber || "");
  var num = /\d/.test(raw) ? raw.replace(/\D/g, "") : raw;
  var btn = document.getElementById("wa");
  btn.href = "https://wa.me/" + num + "?text=" + encodeURIComponent(c.message || "");
  if (!/\d/.test(num)) console.warn("Configura whatsappNumber en js/config.js");

  // Altura real del viewport (barras móviles / navegadores internos)
  function setVh() {
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
  }
  setVh();
  window.addEventListener("resize", setVh);

  // Video: si no existe o falla, queda el poster como fondo
  var v = document.getElementById("bgvideo");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  function fallback() { v.classList.add("off"); }
  v.addEventListener("error", fallback, true);
  var src = v.querySelector("source");
  if (src) src.addEventListener("error", fallback);
  if (reduce || saveData) { v.removeAttribute("autoplay"); v.pause(); return; }
  v.muted = true;
  var p = v.play();
  if (p && p.catch) p.catch(function () {});
})();
