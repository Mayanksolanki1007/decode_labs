/**
 * Generates a new unique numeric ID based on the existing items.
 * @param {Array} items - The array of objects containing numeric IDs.
 * @returns {number} The next available unique ID.
 */
function generateId(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return 1;
  }
  const ids = items.map(item => Number(item.id)).filter(id => !isNaN(id));
  if (ids.length === 0) {
    return 1;
  }
  return Math.max(...ids) + 1;
}

module.exports = generateId;
