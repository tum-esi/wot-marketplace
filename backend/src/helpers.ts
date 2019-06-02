export function publicUser(user: any) {
    return {
        username: user.userName,
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        implementations: user.implementations
    }
}

export function publicProject(project: any) {
    return {
        name: project.name,
        owner: project.owner,
        updated: project.updated,
        shortDescription: project.shortDescription,
        longDescription: project.longDescription,
        github: project.github,
        implementationType: project.implementationType,
        topic: project.topic,
        platform: project.platform,
        tags: project.tags,
        complexity: project.complexity,
        version: project.version,
        td: project.td,
    }
}

export default {publicUser, publicProject}