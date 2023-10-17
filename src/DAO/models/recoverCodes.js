import { Schema, model } from 'mongoose';

const schema = new Schema({
  /* TODO Hashear siempre el code al igual que hacemos con el pass */
  code: { type: String, required: true },
  email: { type: String, required: true },
  expires: { type: Number, required: true },
});

export const RecoverCodesModel = model('recoverCodes', schema);
