function e(e){return e&&e.__esModule?e.default:e}var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},r=o.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var r={id:e,exports:{}};return n[e]=r,o.call(r.exports,r,r.exports),r.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,o){t[e]=o},o.parcelRequired7c6=r);var l=r("7Y9D8");const i={form:document.querySelector("form.form")};i.form.addEventListener("submit",(function(o){o.preventDefault();const n=Number(i.form.elements.amount.value),t=Number(i.form.elements.step.value),r=Number(i.form.elements.delay.value);let u=1,a=null;setTimeout((()=>{function o(){var o,r;(o=u,r=t,new Promise(((e,n)=>{Math.random()>.3?e({position:o,delay:r}):n({position:o,delay:r})}))).then((({position:o,delay:n})=>{e(l).Notify.success(`✅ Fulfilled promise ${o} in ${n}ms`)})).catch((({position:o,delay:n})=>{e(l).Notify.failure(`❌ Rejected promise ${o} in ${n}ms`)})),u===n&&clearInterval(a),u++}n<=0||(o(),a=setInterval(o,t))}),r)}));
//# sourceMappingURL=03-promises.b2e4e7fd.js.map
