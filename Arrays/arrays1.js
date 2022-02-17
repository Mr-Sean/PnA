// Push Front
// Given an array and an additional value, insert this value at the beginning of the array. Do this without using any built-in array methods.

// function pushToFront(arr, val) {
//     // Loop backwords starting at the Back - moving values to the right
//     for (var i = arr.length - 1; i >= 0; i--) {
//         arr[i+1] = arr[i];        
//     }
//     arr[0] = val; // Insert value at Start of array
// }

// var arr1 = [8, 6, 7]
// pushToFront(arr1,5);
// console.log(arr1);


// Pop Front
// Given an array, remove and return the value at the beginning of the array. Do this without using any built-in array methods except pop().

// function popFront(arr) {
//     var returnVal = arr[0]; // the value we will return
//     // Loop thru the array - starting at Index 1 
//     for (var i = 1; i < arr.length; i++) {
//         // i=1: arr[0] = arr[1] -> arr[i-1] = arr[i]
//         arr[i-1] = arr[i];
//     }
//     arr.pop(); // Remove the last value
//     return returnVal;
// }

// var test1 = [2, 4, 6, 8];
// var result1 = popFront(test1);
// console.log(result1);
// console.log(test1);


// Insert At
// Given an array, index, and additional value, insert the value into array at given index. Do this without using built-in array methods. You can think of pushFront(arr,val) as equivalent to insertAt(arr,0,val).

function insertAt(arr, val, ind) {
    // Loop backwards - moving values to the right - stopping at the index where new value is inserted
    for (var i = arr.length - 1; i >= ind; i--) {
        arr[i+1] = arr[i];
    }
    arr[ind] = val; // Put value in at specified index
}

var test1 = [8, 6, 7, 5, 3, 0, 9];
insertAt(test1,1,5);
console.log(test1);


// Remove At (Bonus Challenge)
// Given an array and an index into array, remove and return the array value at that index. Do this without using built-in array methods except pop(). Think of popFront(arr) as equivalent to removeAt(arr,0).



// Swap Pairs (Bonus Challenge)
// Swap positions of successive pairs of values of given array. If length is odd, do not change the final element. For [1,2,3,4], return [2,1,4,3]. For example, change input ["Brendan",true,42] to [true,"Brendan",42]. As with all array challenges, do this without using any built-in array methods.



// Remove Duplicates (Bonus Challenge)
// Sara is looking to hire an awesome web developer and has received applications from various sources. Her assistant alphabetized them but noticed some duplicates. Given a sorted array, remove duplicate values. Because array elements are already in order, all duplicate values will be grouped together. As with all these array challenges, do this without using any built-in array methods.


// Second: Solve this without using any nested loops.