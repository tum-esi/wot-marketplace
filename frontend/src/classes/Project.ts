import utils from './utils'

export class Project {

    name: string;
    id: string;
    author: string;
    shortDescription: string;
    longDescription: string;
    gitUrl: Url;
    implementationType: ImplementationType;
    topic: Array<Topic>;
    platform: Platform;
    complexity: Complexity;
    thingDescription: Object;

    constructor(name: string, author: string, shortDescription: string, longDescription: string, gitUrl: Url, implementationType: ImplementationType, topic: Array<Topic>, platform: Platform, complexity: Complexity, thingDescription: Object, id: string){
        this.name = name; 
        this.id = id;
        this.author = author;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.gitUrl = gitUrl;
        this.implementationType = implementationType;
        this.topic = topic;
        this.platform = platform;
        this.complexity = complexity;
        this.thingDescription = thingDescription;
    }
}