// user -> projects
// user -> goals
// user -> tasks

// project -> {noOfTasks, noOfTeammates}
// task -> {projectId, priority, dueDate}
// goal -> {projectId, percentaegeCompleted}

export const MOCKED_DB = {

    projects: [
        { id: 1, userId: 1, noOfTeammates: 5, name: 'Product launch_1', color: '#aa74dd' },
        { id: 2, userId: 1, noOfTeammates: 3, name: 'Team brainstorim_1', color: '#33c1ff' },
        { id: 3, userId: 1, noOfTeammates: 4, name: 'Branding launch_1', color: '#ffbb33' },

        { id: 4, userId: 2, noOfTeammates: 6, name: 'Product launch_2', color: '#8052ac' },
        { id: 5, userId: 2, noOfTeammates: 2, name: 'Team brainstorim_2', color: '#ca652a' },
        { id: 6, userId: 2, noOfTeammates: 8, name: 'Branding launch_2', color: '#c79125' },

        { id: 7, userId: 3, noOfTeammates: 7, name: 'Product launch_3', color: '#450e79' },
        { id: 8, userId: 3, noOfTeammates: 10, name: 'Team brainstorim_3', color: '#0f5675' },
        { id: 9, userId: 3, noOfTeammates: 12, name: 'Branding launch_3', color: '#83601a' },
    ],

    tasks : [
        { id: 1, projectId: 1, priority: 'High', dueDate: new Date('2026-01-01') },
        { id: 2, projectId: 1, priority: 'Medium', dueDate: new Date('2026-01-02') },
        { id: 3, projectId: 1, priority: 'Low', dueDate: new Date('2026-01-08') },

        { id: 4, projectId: 2, priority: 'Medium', dueDate: new Date('2026-01-03') },
        { id: 5, projectId: 2, priority: 'High', dueDate: new Date('2026-01-06') },
        { id: 6, projectId: 2, priority: 'Low', dueDate: new Date('2026-01-08') },

        { id: 7, projectId: 3, priority: 'Low', dueDate: new Date('2026-01-04') },
        { id: 8, projectId: 3, priority: 'Medium', dueDate: new Date('2026-01-05') },
        { id: 9, projectId: 3, priority: 'High', dueDate: new Date('2026-01-06') },
    ],

    goals: [
        { id: 1, userId: 1, projectId: 1, percentageCompleted: 73, name: 'Check Emails and Messages'},
        { id: 2, userId: 1, projectId: 1, percentageCompleted: 11, name: 'Prepare a brief status update to the client'},
        { id: 3, userId: 1, projectId: 1, percentageCompleted: 63, name: 'Update project documentation'},
        {id: 10, userId: 1, projectId: 1, percentageCompleted: 100, name: 'Conduct team meeting to discuss project milestones'},

        { id: 4, userId: 2, projectId: 2, percentageCompleted: 53, name: 'Review team members progress'},
        { id: 5, userId: 2, projectId: 2, percentageCompleted: 21, name: 'Organize files and resources'},
        { id: 6, userId: 2, projectId: 2, percentageCompleted: 43, name: 'Complete project report'},
        
        { id: 7, userId: 3, projectId: 3, percentageCompleted: 43, name: 'Design new logo'},
        { id: 8, userId: 3, projectId: 3, percentageCompleted: 31, name: 'Plan marketing strategy'},
        { id: 9, userId: 3, projectId: 3, percentageCompleted: 23, name: 'Conduct user research'},
    ]
    //meetings: [ ... ]
    //reminders: [ ... ]
}

// functions to get all data
export function getProjects(){
    return MOCKED_DB.projects;
}

export function getTasks(){
    return MOCKED_DB.tasks;
}

export function getGoals(){
    return MOCKED_DB.goals;
}

// functions to get data by userId, projectId, taskId, goalId
export function getProjectsByUserId(userId: number) {
    return MOCKED_DB.projects.filter(project => project.userId === userId);
}

export function getTasksByProjectId(projectId: number) {
    return MOCKED_DB.tasks.filter(task => task.projectId === projectId);
}

export function getGoalsByProjectId(projectId: number) {
    return MOCKED_DB.goals.filter(goal => goal.projectId === projectId);
}

export function getGoalsByUserId(userId: number) {
    return MOCKED_DB.goals.filter(goal => goal.userId === userId);
}

// functions to get data by their unique IDs
export function getTaskById(taskId: number) {
    return MOCKED_DB.tasks.find(task => task.id === taskId);
}

export function getProjectById(projectId: number) {
    return MOCKED_DB.projects.find(project => project.id === projectId);
}

export function getGoalById(goalId: number) {
    return MOCKED_DB.goals.find(goal => goal.id === goalId);
}