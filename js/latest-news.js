// Home page: show the last N items, by date desc
const MAX_ITEMS = 4;

fetch('news.json')
  .then(res => res.json())
  .then(items => {
    const container = document.getElementById('news-container');
    if (!container) return;

    // Avoid double render if script is included twice
    if (container.dataset.rendered === 'true') return;
    container.dataset.rendered = 'true';

    // Keep original order index for stable fallback
    const withIndex = items.map((it, i) => ({ ...it, __i: i }));

    // Sort: newest date first; if no date, keep original order
    withIndex.sort((a, b) => {
      const da = a.date ? Date.parse(a.date) : NaN;
      const db = b.date ? Date.parse(b.date) : NaN;
      if (!isNaN(db) && !isNaN(da)) return db - da; // both have dates
      if (!isNaN(db)) return 1;                      // only b has date -> a after b
      if (!isNaN(da)) return -1;                     // only a has date -> a before b
      return a.__i - b.__i;                          // neither has date -> original order
    });

    const latest = withIndex.slice(0, MAX_ITEMS);

    container.innerHTML = '';

    latest.forEach(news => {
      const card = document.createElement('a');
      card.href = news.link;
      card.className = 'news-card';
      card.innerHTML = `
        <img src="${news.image}" alt="${news.title}" class="news-image">
        <div class="news-content">
          <h3>${news.title}</h3>
          <p>${news.description}</p>
        </div>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading news:', err));
