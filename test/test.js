const { memberLookup, bodyLookup, members } = require('../')

console.log(memberLookup('S001184'))
console.log(memberLookup('Jennifer McClellan'))
console.log(memberLookup('McClellan'))
console.log(memberLookup('Scott', { party: 'R', body: 'sen', state: 'SC' }))

// console.log(bodyLookup('sen'))
// console.log(members)