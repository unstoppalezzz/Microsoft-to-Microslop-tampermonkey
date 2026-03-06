// ==UserScript==
// @name         Microsoft → Microslop
// @namespace    https://github.com/unstoppalezzz/Microsoft-to-Microslop-tampermonkey
// @version      1.0
// @description  Replace "Microsoft" with "Microslop"
// @author       Unstoppalezzz
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function replaceText(node) {

        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(/Microsoft/gi, "Microslop");
        }

        else if (node.nodeType === Node.ELEMENT_NODE) {

            for (const attr of node.attributes || []) {
                if (attr.name === "href") continue;

                if (/Microsoft/i.test(attr.value)) {
                    attr.value = attr.value.replace(/Microsoft/gi, "Microslop");
                }
            }

            node.childNodes.forEach(replaceText);
        }
    }

    function start() {
        replaceText(document.body);

        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    replaceText(node);
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    window.addEventListener("DOMContentLoaded", start);
})();