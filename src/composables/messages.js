let messages = ref([]);

export default function useMessages() {
  function addToMessages(type, query = "") {
    messages.value.push({
      title: titles[type],
      description: `${query} ${descriptions[type]}`,
    });

    setTimeout(() => {
      messages.value.shift();
    }, 2500);
  }

  return { messages, addToMessages };
}

const titles = {
  gender: "Student was not made prefect!",
  house: "Student was not made prefect!",
  inquisitor: "Student was not made an inquisitor!",
  hacking: "Student was not made an inquisitor!",
  expulsion1: "Student could not be expelled!",
  expulsion2: "Student could not be expelled!",
  expulsion3: "Student could not be expelled!",
};

const descriptions = {
  gender: "already has a prefect of that gender.",
  house: "already has both of their prefects.",
  inquisitor: "is neither a Slytherin nor pure of blood.",
  hacking: "has been removed as an inquisitor.",
  expulsion1: "Do not try to expel this student again.",
  expulsion2: "I said do NOT try to expel this student again!",
  expulsion3: "This is the last warning. Do NOT expel this student!",
};
