const setCommas = (num) => {
    num = num?.toString();
    let result = "";
    let char;
    for (let i = 1; i <= num?.length; i++) {
        char = num[num?.length - i];
        if (i % 3 === 1 && i >= 3) {
           result = "," + result; 
        }
      result = char + result; 
   }
   if (result?.length === 4) {
      result?.replace(",", "");
   }
   return result;
}

export default setCommas;