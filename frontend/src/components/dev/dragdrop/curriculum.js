export default {
  learningItems: [
    {
      iid: 1,
      name: 'Chương 1',
      children: [
        {
          iid: 2,
          name: "Bài 1"
        },
        {
          iid: 3,
          name: "Bài 2"
        },
      ],
    },
    {
      iid: 4,
      name: 'Chương 2',
      children: [
        {
          iid: 5,
        name: "Bài 3"
        },
        {
          iid: 6,
          name: "Bài 4"
        },
        {
          iid: 7,
          name: "Bài 5"
        },
      ],
    },
    {
      iid: 8,
      name: 'Chương 3',
      children: [
        {
          iid: 9,
          name: "Bài 6"
        },
        {
          iid: 10,
          name: "Bài 7"
        },
        {
          iid: 11,
          name: "Bài 8"
        },
      ],
    },
  ],
  lectureMaterials: [
    { name: 'Chương 1', iid: 1, type: 'chapter' },
    { name: 'hoangnh 2', iid: 2, type: 'video' },
    { name: 'hoangnh 3', iid: 3, type: 'document' },
    { name: 'Chương 2', iid: 4, type: 'chapter' },
    { name: 'hoangnh 5', iid: 5, type: 'text' },
    { name: 'hoangnh 6', iid: 6, type: 'video' },
    { name: 'hoangnh 7', iid: 7, type: 'video' },
    { name: 'Chương 3', iid: 8, type: 'chapter' },
    { name: 'hoangnh 9', iid: 9, type: 'text' },
    { name: 'hoangnh 10', iid: 10, type: 'video' },
    { name: 'hoangnh 11', iid: 11, type: 'video' },
  ],
};
