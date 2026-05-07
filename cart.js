/**
 * CartStore — persists multiple service project configs via localStorage.
 *
 * Data shape per project:
 * {
 *   service_id:      string   (e.g. "web", "branding")
 *   service_name_en: string
 *   service_name_de: string
 *   service_url:     string   (relative URL to the service page)
 *   total_price_num: number   (0 when on-request)
 *   total_price_str: string   (e.g. "CHF 3'900")
 *   is_on_request:   boolean
 *   calc_state: {
 *     radios:     { [inputName]: value }
 *     checkboxes: { [inputName]: value[] }
 *   }
 * }
 */
var CartStore = (function () {
  var KEY = 'studio-cart';

  function getAll() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }

  function save(project) {
    var projects = getAll();
    var found = false;
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].service_id === project.service_id) {
        projects[i] = project;
        found = true;
        break;
      }
    }
    if (!found) projects.push(project);
    localStorage.setItem(KEY, JSON.stringify(projects));
  }

  function remove(service_id) {
    var projects = getAll().filter(function (p) {
      return p.service_id !== service_id;
    });
    localStorage.setItem(KEY, JSON.stringify(projects));
  }

  function clear() {
    localStorage.removeItem(KEY);
  }

  return { getAll: getAll, save: save, remove: remove, clear: clear };
})();
