const birthDate = "2000-03-16";
const yearInMs = 3.15576e10;

export const getAge = () => Math.floor((new Date() - new Date(birthDate).getTime()) / yearInMs);
