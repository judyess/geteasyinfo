// reuseable functions

// takes 1 dictionary item
// returns a list of keys from one object

export default function gei(){

    // takes 1 dict item
    // returns all keys as list
    function get_keys(item) {
        const keys = Object.keys(item)
        return(keys)
}
    // takes 1 dict item
    // returns all values as list
    function get_values(item){
        const values = Object.values(item)
        return(values)
}

    // takes 1 dictionary item and 1 key
    // returns an item's key value
    function get_keyValue(item, item_key){
        const value = item[item_key]
        return(value)
}



}