import bcrypt from "bcryptjs";
const saltround = 15;

export const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltround);
};

export const comparePassword = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};
