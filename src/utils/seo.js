export function setDocumentMeta(title, description) {
  document.title = title;

  const selectors = {
    description: 'meta[name="description"]',
    ogTitle: 'meta[property="og:title"]',
    ogDescription: 'meta[property="og:description"]',
    twitterTitle: 'meta[name="twitter:title"]',
    twitterDescription: 'meta[name="twitter:description"]'
  };

  const ensureMeta = (selector, attribute, value) => {
    let tag = document.head.querySelector(selector);

    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, selector.match(/"([^"]+)"/)[1]);
      document.head.appendChild(tag);
    }

    tag.setAttribute('content', value);
  };

  ensureMeta(selectors.description, 'name', description);
  ensureMeta(selectors.ogTitle, 'property', title);
  ensureMeta(selectors.ogDescription, 'property', description);
  ensureMeta(selectors.twitterTitle, 'name', title);
  ensureMeta(selectors.twitterDescription, 'name', description);
}
