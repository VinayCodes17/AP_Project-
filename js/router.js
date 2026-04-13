export class Router {
  constructor(routes) {
    this.routes = routes;
    this.outlet = document.getElementById('router-outlet');
    window.addEventListener('hashchange', () => this.handleRouteChange());
    this.handleRouteChange();
  }

  async handleRouteChange() {
    const hash = window.location.hash || '#/';
    const route = this.routes.find(r => r.path === hash);

    if (route) {
      await this.loadPage(route.page, route.id);
    } else {
      // Default to home if route not found
      window.location.hash = '#/';
    }
  }

  async loadPage(page, id) {
    try {
      const response = await fetch(`pages/${page}.html`);
      if (!response.ok) throw new Error('Page not found');
      const html = await response.text();
      
      this.outlet.innerHTML = html;
      this.updateActiveLinks(id);
      window.scrollTo(0, 0);

      // Trigger custom event so main.js can init page-specific logic
      const event = new CustomEvent('pageLoaded', { detail: { page: id } });
      window.dispatchEvent(event);
    } catch (err) {
      console.error(err);
      this.outlet.innerHTML = '<h1>404</h1><p>Page not found.</p>';
    }
  }

  updateActiveLinks(id) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.route === id) {
        link.classList.add('active');
      }
    });
  }
}
