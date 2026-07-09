export const getApiBaseUrl = () => {
  const envCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim() || import.meta.env.CODESPACE_NAME?.trim();

  if (envCodespaceName) {
    return `https://${envCodespaceName}-8000.app.github.dev/api`;
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const codespaceMatch = host.match(/^([a-z0-9-]+)-(\d+)\.app\.github\.dev$/i);

    if (codespaceMatch?.[1]) {
      return `https://${codespaceMatch[1]}-8000.app.github.dev/api`;
    }

    if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0') {
      return 'http://127.0.0.1:8000/api';
    }
  }

  return 'http://127.0.0.1:8000/api';
};

export const getApiUrl = (resource) => {
  const normalizedResource = resource.startsWith('/') ? resource.slice(1) : resource;
  return `${getApiBaseUrl()}/${normalizedResource}`;
};

export const getRecordsFromPayload = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
};
