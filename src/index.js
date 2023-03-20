const allMembers = require('./members_of_congress.json')
const { reduceMems, sortWithImgUrls } = require('./utils')

const sortedMembers = sortWithImgUrls(allMembers)

const membersByBioguide = reduceMems(allMembers, 'bioguide')
const membersByFullName = reduceMems(allMembers, 'fullName')
const membersByLastNames = reduceMems(allMembers, 'last')

const bioguides = Object.keys(membersByBioguide)
const fullNames = Object.keys(membersByFullName)
const lastNames = Object.keys(membersByLastNames)

const memberLookup = (value, opts) => {
  if (bioguides.includes(value)) return membersByBioguide[value]
  if (fullNames.includes(value)) return membersByFullName[value]
  if (lastNames.includes(value)) {
    const matchingMems = membersByLastNames[value]
    const multipleMems = matchingMems.length > 1
    if (multipleMems) {
      if (!opts) throw Error('Designate a body or state to find the correct member')
      const { state, body } = opts
      const memFromState = matchingMems
        .filter(mem => state ? mem.state === state : mem)
        .filter(mem => body ? mem.type === body : mem)
      
      if (memFromState.length < 1) throw Error('There are no members matching the stated options')
      return memFromState
    }
    return multipleMems
  }
}

const bodyLookup = body => {
  const membersInBody = sortedMembers.filter(mem => mem.type === body)
  return membersInBody
}

module.exports = {
  memberLookup,
  bodyLookup,
  members: sortedMembers,
}