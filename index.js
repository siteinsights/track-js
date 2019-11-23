const fetch = require('isomorphic-fetch');

class SiteInsights {
  static hasConsole() {
    return typeof console !== 'undefined' && typeof console.error === 'function';
  }

  constructor() {
    this._apiKey = null;
    this._isValid = false;
  }

  async init(config) {
    this._apiKey = config.apiKey;
    this._isValid = await this.checkValidity(config.apiKey);
  }

  async checkValidity() {
    const headers = {
      'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
      apiKey: this._apiKey
    });

    const validationResult = await fetch('https://api.siteinsights.io/validate', {
      method: 'POST',
      headers,
      body
    });

    if (validationResult.status !== 200) {
      if (SiteInsights.hasConsole()) {
        const validationResultJson = await validationResult.json();
        console.error('SiteInsights: init() validation failed.', JSON.stringify(validationResultJson));
      }
    }
    return validationResult.status === 200;
  }

  track(event, payload) {
    if (!this._apiKey) {
      if (SiteInsights.hasConsole()) {
        console.error(`SiteInsights: API Key not set. Call init({ apiKey: '...' }) first.`);
        return;
      }
    }
    if (!this._isValid) {
      if (SiteInsights.hasConsole()) {
        console.error(`SiteInsights: init() validation failed.`);
        return;
      }
    }

    const headers = {
      'Authorization': this._apiKey,
      'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
      event,
      payload
    });

    fetch('https://api.siteinsights.io/trackEvent', {
      method: 'POST',
      headers,
      body
    });
  }
}

const si = new SiteInsights();

module.exports = si;