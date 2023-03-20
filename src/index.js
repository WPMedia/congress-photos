const allMembers = require('./members_of_congress.json')
const { reduceMems, sortWithImgUrls } = require('./utils')

const sortedMembers = sortWithImgUrls(allMembers)

const membersByBioguide = reduceMems(allMembers, 'bioguide')
const membersByFullName = reduceMems(allMembers, 'fullName')
const membersByLastNames = reduceMems(allMembers, 'last')

const bioguides = Object.keys(membersByBioguide)
const fullNames = Object.keys(membersByFullName)
const lastNames = Object.keys(membersByLastNames)

const memberLookup = (value, opts = {}) => {
  if (bioguides.includes(value)) return membersByBioguide[value]
  if (fullNames.includes(value)) return membersByFullName[value]
  if (lastNames.includes(value)) {
    const matchingMems = membersByLastNames[value]
    const multipleMems = matchingMems.length > 1
    if (multipleMems) {
      const { state, body, party } = opts
      const memsFromOpts = matchingMems
        .filter(mem => state ? mem.state === state : mem)
        .filter(mem => body ? mem.type === body : mem)
        .filter(mem => party ? mem.party === party : mem)
      
      if (memsFromOpts.length < 1) throw Error('There are no members matching the stated options')
      if (memsFromOpts.length === 1) return memsFromOpts[0]
      return memsFromOpts
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