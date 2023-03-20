const { memberLookup, bodyLookup, members } = require('../')

// Test memberLookup with a bioguide --> {}
console.log(memberLookup('S001184'))

// Test memberLookup with a full name --> {}
console.log(memberLookup('Jennifer McClellan'))

// Test memberLookup with a unique last name --> {}
console.log(memberLookup('McClellan'))

// Test memberLookup with a non-unique last name + no opts to filter --> []
console.log(memberLookup('Kelly'))

// Test memberLookup with a non-unique last name + opts to filter --> {}
console.log(memberLookup('Scott', { party: 'R', body: 'sen', state: 'SC' }))

// Test memberLookup with a non-unique last name + opts to filter --> {}
console.log(memberLookup('Kelly', { state: 'MS' }))

// Test bodyLookup with a body specified ('sen' or 'rep) --> []
// console.log(bodyLookup('sen'))

// Test members to get full list of members --> []
// console.log(members)


