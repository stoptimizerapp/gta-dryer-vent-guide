const CONSENT_KEY = "gta-dryer-vent-analytics-consent";
const FIREBASE_VERSION = "12.16.0";

const firebaseConfig = {
  apiKey: "AIzaSyB3StPWcE6mEUQ_5dgHlOTteV8dgCgO0LI",
  authDomain: "gta-dryer-vent-guide.firebaseapp.com",
  projectId: "gta-dryer-vent-guide",
  storageBucket: "gta-dryer-vent-guide.firebasestorage.app",
  messagingSenderId: "543960834666",
  appId: "1:543960834666:web:2fe2af254056135b2ca013",
  measurementId: "G-X8L2T2NW9E"
};

let analyticsInstance = null;
let logAnalyticsEvent = null;
let setAnalyticsEnabled = null;
let analyticsStarted = false;
let funnelTrackingStarted = false;
let quoteViewRecorded = false;

function getConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function saveConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Analytics remains off when browser storage is unavailable.
  }
}

function clearAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  cookieNames.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.gtadryerventguide.ca; SameSite=Lax`;
  });
}

function removeConsentPanel() {
  document.querySelector("[data-analytics-consent]")?.remove();
}

function recordEvent(name, parameters = {}) {
  if (!analyticsInstance || !logAnalyticsEvent) return;
  logAnalyticsEvent(analyticsInstance, name, parameters);
}

function startFunnelTracking() {
  if (funnelTrackingStarted) return;
  funnelTrackingStarted = true;

  document.addEventListener("click", (event) => {
    const eventTarget = event.target instanceof Element ? event.target : null;
    const link = eventTarget?.closest("a");
    if (!link) return;

    const href = link.getAttribute("href") || "";
    if (href === "#quote" || href === "/#quote") {
      recordEvent("quote_cta_click", {
        link_text: link.textContent.trim().slice(0, 100),
        page_path: window.location.pathname
      });
    }

    if (link.closest(".form-fallback")) {
      recordEvent("quote_form_external_open", {
        page_path: window.location.pathname
      });
    }
  });

  const quoteSection = document.getElementById("quote");
  if (quoteSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (quoteViewRecorded || !entries.some((entry) => entry.isIntersecting)) return;
      quoteViewRecorded = true;
      recordEvent("quote_form_view", { page_path: window.location.pathname });
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(quoteSection);
  }
}

async function enableAnalytics() {
  if (analyticsInstance && setAnalyticsEnabled) {
    setAnalyticsEnabled(analyticsInstance, true);
    startFunnelTracking();
    return;
  }

  if (analyticsStarted) return;
  analyticsStarted = true;

  try {
    const appModuleUrl = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`;
    const analyticsModuleUrl = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-analytics.js`;
    const [{ initializeApp }, analyticsModule] = await Promise.all([
      import(appModuleUrl),
      import(analyticsModuleUrl)
    ]);

    if (!(await analyticsModule.isSupported())) return;
    if (getConsent() !== "granted") {
      analyticsStarted = false;
      return;
    }

    const app = initializeApp(firebaseConfig);
    analyticsInstance = analyticsModule.getAnalytics(app);
    logAnalyticsEvent = analyticsModule.logEvent;
    setAnalyticsEnabled = analyticsModule.setAnalyticsCollectionEnabled;
    setAnalyticsEnabled(analyticsInstance, true);
    startFunnelTracking();
  } catch (error) {
    analyticsStarted = false;
    console.warn("Analytics could not be initialized.", error);
  }
}

function declineAnalytics() {
  saveConsent("denied");
  if (analyticsInstance && setAnalyticsEnabled) {
    setAnalyticsEnabled(analyticsInstance, false);
  }
  clearAnalyticsCookies();
  removeConsentPanel();
}

function acceptAnalytics() {
  saveConsent("granted");
  removeConsentPanel();
  enableAnalytics();
}

function showConsentPanel() {
  removeConsentPanel();

  const panel = document.createElement("section");
  panel.className = "analytics-consent";
  panel.setAttribute("data-analytics-consent", "");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-labelledby", "analytics-consent-title");
  panel.setAttribute("aria-describedby", "analytics-consent-copy");
  panel.innerHTML = `
    <div>
      <h2 id="analytics-consent-title">Help improve this local guide?</h2>
      <p id="analytics-consent-copy">We use Firebase Analytics to understand page visits and quote-button clicks. Analytics stays off unless you choose Accept. <a href="/privacy.html#analytics">Privacy details</a></p>
    </div>
    <div class="analytics-consent-actions">
      <button class="button button-secondary" type="button" data-analytics-decline>Decline</button>
      <button class="button" type="button" data-analytics-accept>Accept analytics</button>
    </div>`;

  panel.querySelector("[data-analytics-decline]").addEventListener("click", declineAnalytics);
  panel.querySelector("[data-analytics-accept]").addEventListener("click", acceptAnalytics);
  document.body.append(panel);
}

function addPrivacyChoiceControl() {
  const policyList = [...document.querySelectorAll(".footer-links")]
    .find((list) => list.querySelector('a[href="/privacy.html"]'));
  if (!policyList || policyList.querySelector("[data-analytics-settings]")) return;

  const item = document.createElement("li");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "footer-choice-button";
  button.textContent = "Cookie settings";
  button.setAttribute("data-analytics-settings", "");
  button.addEventListener("click", showConsentPanel);
  item.append(button);
  policyList.append(item);
}

addPrivacyChoiceControl();

if (getConsent() === "granted") {
  enableAnalytics();
} else if (getConsent() !== "denied") {
  showConsentPanel();
}
