// user -> projects
// user -> goals
// user -> tasks

// project -> {noOfTasks, noOfTeammates}
// task -> {projectId, priority, dueDate}
// goal -> {projectId, percentaegeCompleted}

export const MOCKED_DB = {

    projects: [
        { id: 1, userId: 1, noOfTeammates: 5, name: {en: 'Product launch_1', ro: 'Lansare produs_1'}, color: '#aa74dd' },
        { id: 2, userId: 1, noOfTeammates: 3, name: {en: 'Team brainstorming_1', ro: 'Brainstorming echipă_1'}, color: '#33c1ff' },
        { id: 3, userId: 1, noOfTeammates: 4, name: {en: 'Branding launch_1', ro: 'Lansare branding_1'}, color: '#ffbb33' },

        { id: 4, userId: 2, noOfTeammates: 6, name: {en: 'Product launch_2', ro: 'Lansare produs_2'}, color: '#8052ac' },
        { id: 5, userId: 2, noOfTeammates: 2, name: {en: 'Team brainstorming_2', ro: 'Brainstorming echipă_2'}, color: '#ca652a' },
        { id: 6, userId: 2, noOfTeammates: 8, name: {en: 'Branding launch_2', ro: 'Lansare branding_2'}, color: '#c79125' },

        { id: 7, userId: 3, noOfTeammates: 7, name: {en: 'Product launch_3', ro: 'Lansare produs_3'}, color: '#450e79' },
        { id: 8, userId: 3, noOfTeammates: 10, name: {en: 'Team brainstorming_3', ro: 'Brainstorming echipă_3'}, color: '#0f5675' },
        { id: 9, userId: 3, noOfTeammates: 12, name: {en: 'Branding launch_3', ro: 'Lansare branding_3'}, color: '#83601a' },
    ],

    tasks: [
        { id: 1, userId: 1, projectId: 1, priority: 'High' as const, dueDate: new Date('2026-01-01'), name: {en: 'Design landing page', ro: 'Proiectare pagină de destinație'} },
        { id: 2, userId: 1, projectId: 1, priority: 'Medium' as const, dueDate: new Date('2026-01-02'), name: {en: 'Develop marketing strategy', ro: 'Dezvoltare strategie de marketing'} },
        { id: 3, userId: 1, projectId: 1, priority: 'Low' as const, dueDate: new Date('2026-01-08'), name: {en: 'Create wireframes', ro: 'Creare wireframes'} },

        { id: 4, userId: 2, projectId: 2, priority: 'Medium' as const, dueDate: new Date('2026-01-03'), name: {en: 'Set up project repository', ro: 'Configurare depozit proiect'} },
        { id: 5, userId: 2, projectId: 2, priority: 'High' as const, dueDate: new Date('2026-01-06'), name: {en: 'Implement authentication system', ro: 'Implementare sistem de autentificare'} },
        { id: 6, userId: 2, projectId: 2, priority: 'Low' as const, dueDate: new Date('2026-01-08'), name: {en: 'Write unit tests', ro: 'Scriere teste unitare'} },
        
        { id: 7, userId: 3, projectId: 3, priority: 'Low' as const, dueDate: new Date('2026-01-14'), name: {en: 'Design new logo', ro: 'Proiectare logo nou'} },
        { id: 8, userId: 3, projectId: 3, priority: 'Medium' as const, dueDate: new Date('2026-01-15'), name: {en: 'Plan marketing strategy', ro: 'Planificare strategie de marketing'} },
        { id: 9, userId: 3, projectId: 3, priority: 'High' as const, dueDate: new Date('2026-01-16'), name: {en: 'Conduct user research', ro: 'Realizare cercetare utilizatori'} },
        { id: 10, userId: 3, projectId: 3, priority: 'High' as const, dueDate: new Date('2026-01-12'), name: {en: 'Develop social media campaign', ro: 'Dezvoltare campanie social media'} },
    ],

    goals: [
        { id: 1, userId: 1, projectId: 1, percentageCompleted: 73, name: {en: 'Check Emails and Messages', ro: 'Verifică emailuri și mesaje'} },
        { id: 2, userId: 1, projectId: 1, percentageCompleted: 11, name: {en: 'Prepare a brief status update to the client', ro: 'Pregătește o scurtă actualizare a stadiului pentru client'} },
        { id: 3, userId: 1, projectId: 1, percentageCompleted: 63, name: {en: 'Update project documentation', ro: 'Actualizează documentația proiectului'} },
        { id: 10, userId: 1, projectId: 1, percentageCompleted: 100, name: {en: 'Conduct team meeting to discuss project milestones', ro: 'Organizează o întâlnire de echipă pentru a discuta etapele proiectului'} },

        { id: 4, userId: 2, projectId: 2, percentageCompleted: 53, name: {en: 'Review team members progress', ro: 'Revizuiește progresul membrilor echipei'} },
        { id: 5, userId: 2, projectId: 2, percentageCompleted: 21, name: {en: 'Organize files and resources', ro: 'Organizează fișierele și resursele'} },
        { id: 6, userId: 2, projectId: 2, percentageCompleted: 43, name: {en: 'Complete project report', ro: 'Finalizează raportul proiectului'} },
        
        { id: 7, userId: 3, projectId: 3, percentageCompleted: 43, name: {en: 'Design new logo', ro: 'Proiectare logo nou'} },
        { id: 8, userId: 3, projectId: 3, percentageCompleted: 31, name: {en: 'Plan marketing strategy', ro: 'Planificare strategie de marketing'} },
        { id: 9, userId: 3, projectId: 3, percentageCompleted: 23, name: {en: 'Conduct user research', ro: 'Realizare cercetare utilizatori'} },
    ],

    reminders: [
        { id: 1, userId: 1, name: {en: 'Assess any new risks identified', ro: 'Evaluează orice riscuri noi identificate'}, dueDate: new Date('2026-01-01') },
        { id: 2, userId: 1, name: {en: 'Review quarterly budget allocation', ro: 'Revizuiește alocarea bugetului trimestrial'}, dueDate: new Date('2026-01-12') }, 
        { id: 3, userId: 1, name: {en: 'Weekly team sync meeting', ro: 'Întâlnire săptămânală de sincronizare a echipei'}, dueDate: new Date('2026-01-13') },          

        { id: 4, userId: 2, name: {en: 'Fix responsive layout bugs', ro: 'Remediază erorile de layout responsive'}, dueDate: new Date('2026-01-13') },        
        { id: 5, userId: 2, name: {en: 'Update documentation for API', ro: 'Actualizează documentația pentru API'}, dueDate: new Date('2026-01-15') },      
        { id: 6, userId: 2, name: {en: 'Push final build to staging', ro: 'Trimite build-ul final în staging'}, dueDate: new Date('2026-01-14') },       

        { id: 7, userId: 3, name: {en: 'Prepare interview questions', ro: 'Pregătește întrebări pentru interviu'}, dueDate: new Date('2026-01-14') },       
        { id: 8, userId: 3, name: {en: 'Follow up with survey participants', ro: 'Urmărește participanții la sondaj'}, dueDate: new Date('2026-01-10') },  
        { id: 9, userId: 3, name: {en: 'Social media campaign launch', ro: 'Lansare campanie pe rețelele sociale'}, dueDate: new Date('2026-01-20') },     
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