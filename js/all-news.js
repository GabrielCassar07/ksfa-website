console.log("✅ JS file is running!");

fetch('news.json')
  .then(response => response.json())
  .then(data => {
    console.log("✅ Fetched data:", data);

    const container = document.getElementById('news-container');
    if (!container) {
      console.warn("❗ news-container not found");
      return;
    }

    data.forEach(news => {
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
  .catch(error => console.error("❗ Error loading news:", error));
