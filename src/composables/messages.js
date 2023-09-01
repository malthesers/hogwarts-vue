let messages = ref([]);

export default function useMessages() {
  function addToMessages(type, query = "") {
    messages.value.push({
      type: type,
      query: query,
    });

    // setTimeout(() => {
    //   messages.value.shift();
    // }, 2500);
  }

  return { messages, addToMessages };
}
