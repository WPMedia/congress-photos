const memberDetails = require('./members_of_congress.json')

const constructUrl = (bg, last, size) => {
  return `https://www.fake-url.s3/${bg}_${last}_${size}.png`
}

const reduceMems = (data, objKey) => {
  const reshaped = data.reduce((members, member) => {
    const { bioguide, firstName, lastName } = member
    const images = {
      sm: constructUrl(bioguide, lastName, 150),
      med: constructUrl(bioguide, lastName, 300),
    }
    const key = member[objKey]
    
    if (objKey === 'fullName') {
      const fullName = `${firstName} ${lastName}`
      members[fullName] = {...member, images}
    }
    
    if (objKey === 'last') {
      members[lastName] = members[lastName] || []
      members[lastName].push({...member, images})
    }
    
    members[key] = {...member, images}
    return members
  }, {})
  return reshaped
}

const membersByBioguide = reduceMems(memberDetails, 'bioguide')
const membersByFullName = reduceMems(memberDetails, 'fullName')
const membersByLastNames = reduceMems(memberDetails, 'last')

const bioguides = Object.keys(membersByBioguide)
const fullNames = Object.keys(membersByFullName)
const lastNames = Object.keys(membersByLastNames)

const memberLookup = (value, st) => {
  if (bioguides.includes(value)) return membersByBioguide[value]
  if (fullNames.includes(value)) return membersByFullName[value]
  if (lastNames.includes(value)) {
    const matchingMems = membersByLastNames[value]
    const multipleMems = matchingMems.length > 1
    if (multipleMems) {
      if (!st) throw Error('Pass the state argument to find the correct member')
      const memFromState = matchingMems.find(mem => mem.state === st)
      if (memFromState.length < 1) throw Error('There are no members with the specified last name from the specified state')
      return memFromState
    }
    return multipleMems
  }
}

module.exports = {
  memberLookup,
}