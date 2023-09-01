let messages = ref([]);

export default function useMessages() {
  function addToMessages(type, query = "") {
    messages.value.push({
      type: type,
      query: query,
    });
  }

  return { messages, addToMessages };
}
