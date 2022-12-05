import bcrypt from 'bcrypt';

// Encriptar contraseña, para el registro.
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Comparar contraseña, para el login.
export const comparePassword = async (password: string, hashPassword: string) => {
    return await bcrypt.compare(password, hashPassword);
}
