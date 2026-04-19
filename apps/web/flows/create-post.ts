export const createPostFlow = {
  id: "create-post",
  name: "Criar Post Viral",
  type: "post",
  steps: [
    { id: "topic", question: "Qual o tema do post?", field: "topic" },
    { id: "audience", question: "Quem é o público?", field: "audience" },
  ],
};