!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},r=n.parcelRequired7c6;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var r={id:e,exports:{}};return o[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},n.parcelRequired7c6=r);var i=r("6JpON"),a={form:document.querySelector("form.form")};a.form.addEventListener("submit",(function(n){n.preventDefault();var o=Number(a.form.elements.amount.value),t=Number(a.form.elements.step.value),r=Number(a.form.elements.delay.value),l=1;setTimeout((function(){if(!(o<=0)){r();var n=setInterval(r,t)}function r(){var r,a;(r=l,a=t,new Promise((function(e,n){Math.random()>.3?e({position:r,delay:a}):n({position:r,delay:a})}))).then((function(n){var o=n.position,t=n.delay;e(i).Notify.success("✅ Fulfilled promise ".concat(o," in ").concat(t,"ms"))})).catch((function(n){var o=n.position,t=n.delay;e(i).Notify.failure("❌ Rejected promise ".concat(o," in ").concat(t,"ms"))})),l===o&&clearInterval(n),l++}}),r)}))}();
//# sourceMappingURL=03-promises.4bbfd00c.js.map
