// Arrays To Do 2

// Reverse
// Given a numerical array, reverse the order of values, in-place. 
// The reversed array should have the same length, with existing elements 
// moved to other indices so that order of elements is reversed. 
// Working 'in-place' means that you cannot use a second array – move values within the array that you are given. 
// As always, do not use built-in array functions such as splice().

// function reverseArray(arr) {
//     for (var i = 0; i < arr.length / 2; i++) {
//         // Swap values
//         var temp = arr[i];
//         arr[i] = arr[arr.length - 1 - i];
//         arr[arr.length - 1 - i] = temp;
//     }
// }

// var arr1 = [1, 2, 3, 4]
// reverseArray(arr1);
// console.log(arr1);


// Rotate
// Implement rotateArr(arr, shiftBy) that accepts array and offset. 
// Shift arr's values to the right by that amount. 'Wrap-around' any values 
// that shift off array's end to the other side, so that no data is lost. 
// Operate in-place: given ([1,2,3],1), change the array to [3,1,2]. 
// Don't use built-in functions.

// [1, 2, 3, 4, 5], move to the Right by 2
    // [4, 5, 1, 2, 3]
    
    // Loop thru the amount of rotations needed
        // To rotate to right by 1
        // 1. Create a temp variable that holds the last value
        // 2. Move all the items in the array to the right 1 index. This is a For Loop.
        // 3. Put the temp value at the beginning of the array  
       
    // var arr2 = [1, 2, 3, 4, 5]
    // rotateArr(arr2,2);
    // console.log(arr2);
    
    // Second: allow negative shiftBy (shift L, not R).
    // [1, 2, 3, 4, 5], move Left 2 -> [3, 4, 5, 1, 2]; temp = 1
    // [2, 3, 4, 5, 1]
    // Loop thru the amount of rotations needed
    // To rotate to Left by 1
    // 1. Create a temp variable that holds the First value
    // 2. Move all the items in the array to the Left 1 index. This is a For Loop.
    // 3. Put the temp value at the beginning of the array

function rotateArr(arr, moveBy) {
    // Improve efficency to get actual # of rotations needed
    var actualMovementsNeeded;
    if (moveBy > 0) {
        actualMovementsNeeded = moveBy % arr.length;
    } else {
        actualMovementsNeeded = Math.abs(moveBy) % arr.length;
    }
    if (moveBy > 0) {
        // Handle Rotations to the Right
        // Loop thru all the rotations
        for (var i = 0; i < actualMovementsNeeded; i++) {
            // Handle the single rotation
            var temp = arr[arr.length - 1];
            // Loop moves items to right 1 index
            for (var k = arr.length - 2; k >= 0; k--) {
                arr[k+1] = arr[k];
            }
            arr[0] = temp; // Put temp value at the beginning of the array
        }    
    } else {
        // Handle Rotations to the Left
        for (var i = 0; i < actualMovementsNeeded; i++) {
            var temp = arr[0];
            // Loop moves items to the Left 1 index
            for (var k = 1; k < arr.length; k++) {
                arr[k-1] = arr[k];
                // console.log(arr);
            }
            arr[arr.length - 1] = temp; // Put temp value at end of array
            // console.log("Array after this rotation:",arr);
        }
    }

}
    
    var arr2 = [1, 2, 3, 4, 5]
    rotateArr(arr2,-211);
    console.log(arr2);
    
    
    // Third: minimize memory usage. With no new array, handle arrays/shiftBys in the millions.
    
    // Fourth: minimize the touches of each element.
    
    
    
    // Filter Range
    // Alan is good at breaking secret codes. 
    // One method is to eliminate values that lie outside of a specific known range. 
    // Given arr and values min and max, retain only the array values between min and max. 
    // Work in-place: return the array you are given, with values in original order. 
    // No built-in array functions.
    
    
    // Concat
    // Replicate JavaScript's concat(). 
    // Create a standalone function that accepts two arrays. 
    // Return a new array containing the first array's elements, followed by the second array's elements. 
    // Do not alter the original arrays. 
    // Ex.: arrConcat( ['a','b'], [1,2] ) should return new array ['a','b',1,2].
    
    