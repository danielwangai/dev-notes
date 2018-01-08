const appState = {
    users: {
        isFetching,// when fetching a user
        error, //error fetching user
        authenticatedUserId, // points to object of the authenticated user
        isAuthed, // true if user is authenticated
        userId: {
            info: {
                userId,
                name,
                avatar,
            },
        },
    },
    stacks: {
        isFetching,
        error,
        stackId: {
            lastUpdated,
            stackInfo: {
                name,
            },
        },
    },
    userStacks: {
        isFetching,
        error,
        userId: {
            lastUpdated,
            stackIds: [stackId1, stackId2,], // will be referenced from stacks - map/filter
        },
    },
    notes: {
        isFetching,
        error,
        noteId: {
            lastUpdated, // author of the note
            noteInfo: {
                title,
                description,
                timestamp,
                userInfo,
            },
        },
    },
    userNotes: {
        isFetching,
        error,
        userId: {
            lastUpdated,
            noteIds: [],
        },
    },
    replies: {
        isFetching,
        error,
        noteId: {
            replyId: {
                description,
                timestamp,
                userInfo: { // info of replying user
                    userId,
                    avatar,
                }
            },
        },
    },
    companies: { // company listing
        isFetching,
        error,
        companyId: {
            name,
            description, // what the company does.
            location,// string - coordinates later
        }
    },
    userCompanies: {
        isFetching,
        error,
        lastUpdated,
        userId: [companyId],
    }
    /**
     * TODO
     * ADD follow/follower info
     */
}
