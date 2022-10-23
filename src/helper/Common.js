export function IsNullOrEmpty(value){
    return  (!value || value == undefined || value == "" || value.length == 0);
}

export function validCitizenID(value){
   if(value.length == 13){
   
    var step1 = (parseInt(value[0])*13)+(parseInt(value[1])*12)+(parseInt(value[2])*11)+(parseInt(value[3])*10)+(parseInt(value[4])*9)+(parseInt(value[5])*8)+(parseInt(value[6])*7)+(parseInt(value[7])*6)+(parseInt(value[8])*5)+(parseInt(value[9])*4)+(parseInt(value[10])*3)+(parseInt(value[11])*2);
    var step2 = step1%11;
    var step3 = 11-step2;
    if(value[12] == step3.toString()[step3.toString().length - 1]){
        return true;
    }
   }
   return false;
}




