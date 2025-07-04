import { computed, ref, watch } from "vue";

export function usePagination(filterorder, numb) {
  const page = ref(1);
  const itemperpage = numb;

  const list = computed(() => filterorder.value ?? []);

  const totalpage = computed(() => {
    const len = list.value.length;
    return Math.max(1, Math.ceil(len / itemperpage));
  });

  const paginationitem = computed(() => {
    const start = (page.value - 1) * itemperpage;

    return list.value.slice(start, start + itemperpage);
  });

  watch(list, () => {
    page.value = 1;
  });

  return {
    totalpage,
    page,
    itemperpage,
    paginationitem
  };
}
