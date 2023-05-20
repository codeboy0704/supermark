import mockData from './mock.data.json';

function cleanData(){
    const cleanProductName = mockData.filter((el => el.Producto !== ""))
    const cleandata = cleanProductName.map((el, i) =>{
    el.Producto = el.Producto.replace("*", "").trim();
    const entries = Object.entries(el);
    const filtered = entries.filter((el) => el[1] !== "");
    const createStablisments = filtered.filter(
      (el) => el[0] !== "Producto" && el[0] !== "Medida"
    )
    const fromEntries = Object.fromEntries(createStablisments);
    const stablishments = createStablisments.map((el) => {
      const obj = {
        stablishment: el[0],
        price: el[1],
      };
      return obj;
    })
    const newObj = {
      producto: el.Producto,
      medida: el.Medida,
      establecimientos: stablishments,
    };
    return newObj; 
    })
    return cleandata
}

export default cleanData;