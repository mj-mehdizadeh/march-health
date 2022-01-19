export const toJSON = {
  transform: function (doc, ret) {
    const id = ret._id;
    delete ret._id;
    delete ret.__v;
    return {
      id,
      ...ret,
    };
  },
};
