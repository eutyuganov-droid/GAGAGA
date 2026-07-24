(function () {
  var IP = "185.97.255.43:27735";
  var CMD = "connect " + IP;

  function showToast(msg) {
    var toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove("is-show");
    }, 1800);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (e) {
        reject(e);
      } finally {
        document.body.removeChild(ta);
      }
    });
  }

  function bindCopy(id, text, okMsg) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", function () {
      copyText(text).then(function () {
        showToast(okMsg);
        var status = document.getElementById("copyStatus");
        if (status) status.textContent = "Скопировано";
      }).catch(function () {
        showToast("Не удалось скопировать");
      });
    });
  }

  bindCopy("copyIpBtn", IP, "IP скопирован");
  bindCopy("copyCmdBtn", CMD, "Команда скопирована");

  var nav = document.querySelector(".nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("is-solid");
    else nav.classList.remove("is-solid");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero-img"));
  var idx = 0;
  if (slides.length > 1) {
    setInterval(function () {
      slides[idx].classList.remove("is-active");
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add("is-active");
    }, 7000);
  }

  var revealEls = document.querySelectorAll(
    ".city-intro, .city-mosaic figure, .life-block, .quote, .join-panel"
  );
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.style.transition = "opacity 0.8s ease, transform 0.8s ease";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "none";
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    Array.prototype.forEach.call(revealEls, function (el, i) {
      el.style.opacity = "0";
      el.style.transform = "translateY(22px)";
      el.style.transitionDelay = (i % 4) * 0.08 + "s";
      io.observe(el);
    });
  }
})();
