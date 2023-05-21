export function extractQueryParams(query) {
  return query
    .substr(1)
    .split('&')
    .reduce((acc, queryItem) => {
      const [key, value] = queryItem.split('=')
      return { ...acc, [key]: value }
    }, {})
}
