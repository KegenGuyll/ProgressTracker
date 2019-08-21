export const graphDataFormat = data => {
  let payload;
  console.log(data);
  data.progress.exercise.map(item => {
    item.data.map(itemData => {
      const count = item.length;

      const response = {
        itemData,
        count
      };

      payload = {
        ...payload,
        response
      };
    });
  });

  console.log(payload);
  return payload;
};
