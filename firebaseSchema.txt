// users endpoint
/ users
    /userId
        //userInfo
/**
 * userInfo = {
    userId,
    name,
    avatar
 * }
*/

// userProfile - TODO


// stacks
/stacks
    /stackId
        /name

// userStacks
/userStacks
    /userId
        /stackId
            /name

// notes
/notes
    /noteId
        /notesInfo

/**
 * notesInfo = {
    noteId,
    content,
    userInfo
 * }
 */

// noteReplies
/noteReplies
    /noteId
        /replyId
            /noteReplyInfo

/**
 * noteReplyInfo = {
    content,
    userInfo,
    timestamp
 * }
 */

// userNotes
/userNotes
    /userId
        /noteInfo
           /notesInfo

/userCompanies
    /userId
        /companyInfo

/**
 * companyInfo = {
    name,
    location,
    companyBio,
    from,
    to,
 * }
 */


