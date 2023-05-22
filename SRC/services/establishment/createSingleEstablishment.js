import Establishment from '../../establishment/Establishment';
export async function createSingleEstablishment({ name }) {
  try {
    const establishment = await Establishment.create({
      name
    });
    return establishment;
  } catch (e) {
    console.error(e);
  }
}   // Path: SRC/services/establishment/createSingleEstablishment.js