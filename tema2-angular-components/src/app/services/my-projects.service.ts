import { Injectable } from "@angular/core";
import { Project, PROJECTS } from "../models/projects.model";

@Injectable({
    providedIn: 'root'
})
export class MyProjectsService {

    private projects = PROJECTS;

    getProjects() {
        return this.projects;
    }

    addProject(project: Project) {
        this.projects.push(project);
    }
}