const constructUrl = (bg, last, size) => {
  return `https://${bg}_${last}_${size}.png`
}

const reduceMems = (allMembers, keyBy) => {
  const reshaped = allMembers.reduce((members, member) => {
    const { bioguide, firstName, lastName } = member
    const images = {
      sm: constructUrl(bioguide, lastName, 150),
      med: constructUrl(bioguide, lastName, 300),
    }
    const key = member[keyBy]
    
    if (keyBy === 'fullName') {
      const fullName = `${firstName} ${lastName}`
      members[fullName] = {...member, images}
    }
    
    if (keyBy === 'last') {
      members[lastName] = members[lastName] || []
      members[lastName].push({...member, images})
    }
    
    members[key] = {...member, images}
    return members
  }, {})
  return reshaped
}

const sortWithImgUrls = (allMembers) => {
  const sortAndUrls = allMembers
    .sort((m1, m2) => (m2.lastName - m1.lastName) || (m2.state - m1.state))
    .map(mem => {
      const { bioguide, lastName } = mem
      const images = {
        sm: constructUrl(bioguide, lastName, 150),
        med: constructUrl(bioguide, lastName, 300),
      }
      return {...mem, images}
    })
  return sortAndUrls
}

const checkValue = (val, check) => {
  if (!check) return true
  return val === check
}

module.exports = {
  reduceMems,
  constructUrl,
  sortWithImgUrls,
  checkValue,
}