
export const validateCitizenID = (id: string) => {
  let sum = 0
  if(id.length !== 13) return false;
  for(let i=0; i < 12; i++) {
    sum += parseFloat(id.charAt(i))*(13-i);
  }
  if((11-sum%11)%10!==parseFloat(id.charAt(12))) {
    return false
  } else {
    return true;
  }
}