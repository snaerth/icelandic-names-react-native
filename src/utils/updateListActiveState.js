/**
 * Adds active prop to each object in array.
 * If they exists in savedList then we set active prop as true
 *
 * @param {Array<Object>} list - Names list
 * @param {Array<Object>} savedList - Saved names list
 * @returns {Array<Object>} list
 */
export default function updateListActiveState(list, savedList) {
  return list.map(item => {
    item.active = savedList.some(s => item.name === s.name);
    return item;
  });
}
