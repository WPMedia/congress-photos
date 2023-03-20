const { memberLookup, bodyLookup, members } = require('../')

// console.log(memberLookup('S001184'))
// console.log(memberLookup(''))
// console.log(memberLookup('Jennifer McClellan'))
console.log(memberLookup('Scott', { body: 'sen', state: 'SC' }))

// console.log(bodyLookup('sen'))
console.log(members)