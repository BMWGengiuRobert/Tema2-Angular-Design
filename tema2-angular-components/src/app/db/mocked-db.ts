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

    tasks: [
        { id: 1, userId: 1, projectId: 1, priority: 'High' as const, dueDate: new Date('2026-01-01'), name: 'Design landing page' },
        { id: 2, userId: 1, projectId: 1, priority: 'Medium' as const, dueDate: new Date('2026-01-02'), name: 'Develop marketing strategy' },
        { id: 3, userId: 1, projectId: 1, priority: 'Low' as const, dueDate: new Date('2026-01-08'), name: 'Create wireframes' },

        { id: 4, userId: 2, projectId: 2, priority: 'Medium' as const, dueDate: new Date('2026-01-03'), name: 'Set up project repository' },
        { id: 5, userId: 2, projectId: 2, priority: 'High' as const, dueDate: new Date('2026-01-06'), name: 'Implement authentication system' },
        { id: 6, userId: 2, projectId: 2, priority: 'Low' as const, dueDate: new Date('2026-01-08'), name: 'Write unit tests' },

        { id: 7, userId: 3, projectId: 3, priority: 'Low' as const, dueDate: new Date('2026-01-14'), name: 'Design new logo' },
        { id: 8, userId: 3, projectId: 3, priority: 'Medium' as const, dueDate: new Date('2026-01-15'), name: 'Plan marketing strategy' },
        { id: 9, userId: 3, projectId: 3, priority: 'High' as const, dueDate: new Date('2026-01-16'), name: 'Conduct user research' },
        { id: 10, userId: 3, projectId: 3, priority: 'High' as const, dueDate: new Date('2026-01-12'), name: 'Develop social media campaign' },
    ],

    goals: [
        { id: 1, userId: 1, projectId: 1, percentageCompleted: 73, name: 'Check Emails and Messages' },
        { id: 2, userId: 1, projectId: 1, percentageCompleted: 11, name: 'Prepare a brief status update to the client' },
        { id: 3, userId: 1, projectId: 1, percentageCompleted: 63, name: 'Update project documentation' },
        { id: 10, userId: 1, projectId: 1, percentageCompleted: 100, name: 'Conduct team meeting to discuss project milestones' },

        { id: 4, userId: 2, projectId: 2, percentageCompleted: 53, name: 'Review team members progress' },
        { id: 5, userId: 2, projectId: 2, percentageCompleted: 21, name: 'Organize files and resources' },
        { id: 6, userId: 2, projectId: 2, percentageCompleted: 43, name: 'Complete project report' },

        { id: 7, userId: 3, projectId: 3, percentageCompleted: 43, name: 'Design new logo' },
        { id: 8, userId: 3, projectId: 3, percentageCompleted: 31, name: 'Plan marketing strategy' },
        { id: 9, userId: 3, projectId: 3, percentageCompleted: 23, name: 'Conduct user research' },
    ],

    reminders: [
        { id: 1, userId: 1, name: 'Assess any new risks identified', dueDate: new Date('2026-01-01') },
        { id: 2, userId: 1, name: 'Review quarterly budget allocation', dueDate: new Date('2026-01-12') }, 
        { id: 3, userId: 1, name: 'Weekly team sync meeting', dueDate: new Date('2026-01-13') },          
        { id: 10, userId: 1, name: 'Submit monthly progress report', dueDate: new Date('2026-01-14') },
        { id: 11, userId: 1, name: 'Finalize brand color palette', dueDate: new Date('2026-01-14') },  
        { id: 12, userId: 1, name: 'Sketch mobile navigation wireframes', dueDate: new Date('2026-01-14') },  
        { id: 13, userId: 1, name: 'Review client feedback on logo', dueDate: new Date('2026-01-14') },    

        { id: 4, userId: 2, name: 'Fix responsive layout bugs', dueDate: new Date('2026-01-13') },        
        { id: 5, userId: 2, name: 'Update documentation for API', dueDate: new Date('2026-01-15') },      
        { id: 6, userId: 2, name: 'Push final build to staging', dueDate: new Date('2026-01-14') },       

        { id: 7, userId: 3, name: 'Prepare interview questions', dueDate: new Date('2026-01-14') },       
        { id: 8, userId: 3, name: 'Follow up with survey participants', dueDate: new Date('2026-01-10') },  
        { id: 9, userId: 3, name: 'Social media campaign launch', dueDate: new Date('2026-01-20') },     
    ],

    //meetings: [ ... ]
}

// functions to get all data
export function getProjects() {
    return MOCKED_DB.projects;
}

export function getTasks() {
    return MOCKED_DB.tasks;
}

export function getGoals() {
    return MOCKED_DB.goals;
}

// functions to get data by userId, projectId, taskId, goalId
export function getProjectsByUserId(userId: number) {
    return MOCKED_DB.projects.filter(project => project.userId === userId);
}

export function getTasksByProjectId(projectId: number) {
    return MOCKED_DB.tasks.filter(task => task.projectId === projectId);
}

export function getTasksByUserId(userId: number) {
    return MOCKED_DB.tasks.filter(task => task.userId === userId);
}

export function getGoalsByProjectId(projectId: number) {
    return MOCKED_DB.goals.filter(goal => goal.projectId === projectId);
}

export function getGoalsByUserId(userId: number) {
    return MOCKED_DB.goals.filter(goal => goal.userId === userId);
}

export function getRemindersByUserId(userId: number) {
    return MOCKED_DB.reminders.filter(reminder => reminder.userId === userId);
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

export function getReminderById(reminderId: number) {
    return MOCKED_DB.reminders.find(reminder => reminder.id === reminderId);
}

// functions to add new data
export function addProject(project: any) {
    MOCKED_DB.projects.push(project);
}