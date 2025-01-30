 export const  API_KEY = "AIzaSyCLxvwIcFaUvPI0tC_kSlhIsTg-sGErnVk";

 export const value_converter  = (value) =>{

    if(value>=1000000)
    {
        // to remove decimal points we use math.floor method
        return Math.floor (value/1000000) + "M";
    }
    else if(value>=1000){
        return Math.floor (value/1000) + "K";
    }
    else{
        return value;
    }
 }