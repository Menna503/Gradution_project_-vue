import { computed } from 'vue';

export function useFilterCode(sourceData, searchTerm, fields) {
  return computed(() => {
    const searchText = searchTerm.value.trim().toLowerCase();

    if (!searchText) {
      return sourceData.value;
    }

    return sourceData.value.filter(item => {
      const combined = fields
        .map(field => {
          const val = item[field];
          if (val && typeof val === 'object') {
            return String(val.name).toLowerCase();
          }
          return String(val || '').toLowerCase();
        })
        .join(' ');

      return combined.includes(searchText);
    });
  });
}
