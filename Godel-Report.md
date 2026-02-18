# Godel Report

## What you must deliver

# 1. Prompt & Workflow Log (Documentation)
## 1.1 A Short Document Describing How You Used AI to Build the App:

### A. Project Description

First I've created project description file with description of:

- user features  
- user flow  
- entity models  
- planned endpoints and how they will be used by the frontend  
- the planned tech stack  

---

### B. Task Templates

Then I've added 2 `.md` files:

- 1st template of how to describe backend tasks  
- 2nd how to describe frontend tasks  

(I've described the general concept and points and asked ChatGpt to help me structure these templates.)

---

### C. Task Breakdown & Progress Tracking

Then I asked copilot to:

- split this `project-description.md` file into `task.md` files  
- store them in the repo  
- also create `Progress.md` file to track which tasks have been already implemented as an early check for future implementations  

---

### D. Initial Infrastructure Planning

Then Ive added initial setup plan, describing:

- how to initiate backend  
- how to initiate frontend  
- how to initiate database  
- how to dockerize them  
- how to test initial setup  

Then I've asked copilot to split this into 2 task files:

- 1 for frontend  
- 1 for backend and database  

Then I've asked copilot to go implement the first 2 infrastructure task files to setup initial infrastructure and test that it works.

---

### E. GitHub Prompt Templates

Then I've added 2 github prompt templates:

- 1 for backend  
- 1 for frontend  

(I've described the general concept and points and asked ChatGpt to help me structure these templates.)

---

### F. Feature Implementation Cycle

Then I started to ask copilot to implement each backend and frontend feature 1 by 1 using these github-prompt-templates.

For each feature:

- Reviewed code results  
- Discussed if any changes are necessary  
- Adjusted changes  
- Checked if the app's feature is working  
- Repeated this cycle  


===================================================================================================
  
## 1.2 All key prompts you used, in order (initial, refined, fixes, refactors, tests, etc.)

=================================

### Project-task-breakdown prompt:
Analyze project-description.md, task-description templates and break whole project into atomic implementation tasks.  
Follow these strict rules:  
xxx  

Name tasks using this convention:  
01-feature-name.md  
01-endpoint-name.md  
Each task file must follow this structure:
Use Case Description  
xxxxx  
Testing Requirements  
Suggest logical dependencies between tasks. ( as example create feature/endpoint need to be implemented first, only then edit/view/delete/getlist; when frontend needs redirect from create page to yet non existent page with list of entities propose to create a mock page with just text that list is rught now empty and having that create button)  
Do not merge multiple endpoints into one backend task.  
Generate all task files content.  
After you are finished with creating task files, also create a Progress.md file inside /tasks/ folder, inside that folder we will store the names of the tasks we've already implemented. For now inside the file could be just the description of the file purpose and thats it.  


`Context here:`  
project-description.md, task-description templates  

---

### Issue:
It created 2 extra tasks I didnt ask for.  
I've asked Copilot to remove them:  
'Lets remove 01-setup-database-entities.md file, and make each backend task responsible for creating its own entity models it needs, so there's no dependency for the future tasks either. consequently update rest of the backend file name numbers.  
For the frontend let's remove the 01-setup-routing-layout.md task, we will create it later as initial infrastructure setup task. consequently update rest of the frontend file name numbers'

=================================

### Initial-infrastructure-setup-plan-prompt:
You are Senior Fullstack engineer C# + Javascript.React and you also have great knowledge of networks and DevOps.  
Analyze the initial-setup-plan file.  
Figure out if everything is clear and can be implemented.  

Split this file into 2 different tasks, similar to the template of backend-task-template.  

1 file for setting up backend+database+dockerizing them,  
2nd file for setting up frontend initial project and dockerizing it.  

Place these files into new folder /tasks/infrastructure  

`Context here:`  
Initial-setup-plan file  

=========================================

### Initial-backend-and-database-setup-prompt:
You are Senior Fullstack engineer C# + Javascript.React and you also have great knowledge of networks and DevOps.  
Analyze the initial-setup-plan file for backend and database and dockerizing them.  
Figure out if everything is clear and can be implemented.  
Provide plan how to do it, wait for confirmation  

`Context here:`
01-backend-database-docker-setup.md  

---

### Issues:
Copilot run dotnet new webapi and seemingly that created `<TargetFramework>net9.0</TargetFramework>` based latest installed SDK.  
Since its a learning project I decided to give .net9.0 a try, even though in original requirements net8.0 was planned.  
Also copilot for some reason put WebApi solution file in the root folder and not in the /backend as planned.  
So I asked  
'should we rather move the solution file from the root folder and keep the one inside /backend/CarMaintenanceTracker.Api?' and it moved the file.  
Also I've asked 'Can you verify that moved solution file has correct references to the project directories that it holds?' and Copilot found out reference discrepancies and updated them correctly.

========================================

### Initial-frontend-setup-prompt:
You are Senior Fullstack engineer C# + Javascript.React and you also have great knowledge of networks and DevOps.  
Analyze the initial-setup-plan file for frontend and dockerizing it.  
Figure out if everything is clear and can be implemented.  
Provide plan how to do it, wait for confirmation.  

`Context here:`
02-frontend-docker-setup.md  

No issues during this step  

========================================

During first attempt to implement first backend task  
'Follow instructions in implement-backend-task.prompt.md. 02'bcopilot found declared dependency in the task description that I've commanded it to resolve/correct.  
Also I've commanded Copilot not to fill Progress.md file with redudant garbage text -'make progress.md file empty, with just description of purpose of the field and section to keep track of completed tasks.  
to list of completed tasks you should add 2 tasks from /tasks/infrastructure'

========================================

### Prompt:
Follow instructions in implement-backend-task.prompt.md. 02  

`Context here:`  
backend-task-02  

---

### Issues:

Copilot has not created unit tests even though it was mentioned in the prompt-template.  
So I asked it to create unit tests:  
'Since its the first task we implement in our backend project, we need to create unit tests for this feature we've created. Can you plan where and which tests to create for this feature?'  
Also I suggested to use moq for the data layer instead of in-memory db  
'Can we stick to mocking the database for the repository layer? without having to use ef core in-memory db'  
It created unit tests for all 3 layers.  
I accepted the created unit tests and the feature files.

========================================

### Prompt:
Follow instructions in implement-frontend-task.prompt.md. 02  

`Context here:`
frontend-task-02  

---

### Issues:
Tailwind CSS and styles were not applied upon initial implementation.  
I looked for a decent markup CSS/HTML prompt and then asked:  
'Attempt to refactor this page html/css according to these requirements:  
Refactor this page using Tailwind CSS.  

**Requirements:**  
- Use a centered layout with flex and min-h-screen  
- Card-style container with max-w-md, rounded-2xl, shadow-lg, p-8  
- Use proper vertical spacing with space-y-6  
- Use modern proportions (text-lg headings, text-sm labels)  
- Primary button should be full width, bg-blue-600, hover:bg-blue-700, rounded-lg, py-2.5  
- Use neutral gray palette for text  
- Add focus states and transitions  
- Make it responsive  
- Keep markup clean and semantic  
to make page looking nicer?'

---

After the application of Tailwind CSS, they were not rendered on the page, so I asked:  

'Can you analyze the /frontend/ project and check if we have any conflicting settings of html/css markup? It seems like we have Vite default CSS overwrite in our design settings.  
Also consider how we can improve frontend app components and styling structure if professional apps typically use:  
- Consistent container width  
- Consistent padding  
- Consistent card style  
- Consistent button style  
- Consistent typography scale'

Copilot made changes, but styles still were not applied.  

---

**So I asked:**  
'In the UI, the components are still not styled, they are rendered with default HTML/CSS.  
The problem might be in the conflicting CSS files. Make sure you check all related files that impact CSS and 
HTML, including tailwind.config.js, postcss.config.js'

---

Copilot returned with:  
**Found the issue! 🎯 You're absolutely right - it's the postcss.config.js file!**  
🐛 **Issue Found**  
postcss.config.js has wrong plugin name:  
text
'@tailwindcss/postcss': {},  // ❌ Wrong!
tailwindcss: {},              // ✅ Correct

---

So then I've created extra document, which holds all the frontend folder structure and ui/css/html guidelines and put it in here: docs/frontend-architecture-guidelines.md
I looked for best frontend guidelines prompt on the web.
Then I asked copilot: 'Can you analyze and evaluate frontend project code one more time and based on this rule set see if we can refactor/improve the code somehow?'

---

**Copilot refactored code structure and files.**
Pages:
Home.tsx → src/pages/home/home-page.tsx
setup-page.tsx → setup-page.tsx
Page-Specific Form:

add-template-form.tsx → add-template-form.tsx
API Services:
src/services/maintenance-template-service.ts → src/features/templates/api/templates-api.ts
Types:
Content from src/types/maintenance-template.ts → src/features/templates/types.ts
Keep src/types/maintenance-template.ts for backward compatibility or remove after migration
etc.

---

At the end of it I also have updated the prompts/implement-frontend-task.prompt.md with:
  Read and strictly follow: docs/frontend-architecture-guidelines.md
   - Respect folder structure
   - Respect separation of concerns
   - Respect feature-based architecture
   - Do not violate forbidden patterns
   - Respect project-wide UI & Styling Rules

========================================

Then before implementing next backend task I wanted to refactor the repository pattern copilot created initially in the first backend task with simple repository for one entity.
'Analyze the /backend project and refactor approach to repository pattern in the data layer to use this pattern "Generic Repository Pattern, IRepository<T>; Repository<T> : IRepository<T>; if specific behaviours needed - IProductRepository : IRepository<Product>"
also refactor already written unit tests for task 02 based on the changes to repository pattern.'
Copilot refactored the approach, I liked the code, but it kept 'IMaintenanceTemplateRepository' instead of applying IRepository<MaintenanceTemplate>.

I asked:
'It seems like we should inject just the generic IRepository<MaintenanceTemplate> into MaintenanceTemplateService. Looks like we dont need MaintenanceTemplateRepository here? Or do you think in the future there will be some custom methods in here that should not belong in Repository<<MaintenanceTemplate>?'

Copilot provided some arguments to keep the custom separate repository:
3. Open/Closed Principle
If you inject IRepository<MaintenanceTemplate>, adding specific methods later means:
Changing the service constructor
Updating all tests
Breaking existing code
With the specific interface, you just add methods to IMaintenanceTemplateRepository without touching the service constructor.

So I decided to keep this custom repository and accepted the code.

========================================

### Prompt: Follow instructions in implement-backend-task.prompt.md. 01
Prompt: Follow instructions in implement-backend-task.prompt.md. 01

Context here:
backed-task-01

### Issues:
Copilot added unit tests, but used in-memory database insteaad of mocking. I thought we would stick with mock approach. Decided to ask Copilot  that:
'Can we using moq insteaed of in-memory db? Or it might lead to possible issues?'

---

Copilot responded:
Problems:
🔴 Complex setup (10+ lines per test)
🔴 Breaks easily when you change LINQ queries
🔴 Doesn't test actual EF Core behavior
🔴 Hard to maintain

---

I agreed with it.

Then I noticed that in the repository Copilot made methods 'Virtual', seemingly for easier mocking, and implemented overriding of these methods in the inheriting class:
public class MaintenanceTemplateRepository : Repository<MaintenanceTemplate>
{
    public override async Task<IEnumerable<MaintenanceTemplate>> GetAllAsync()
    {
        return await _dbSet.OrderByDescending(t => t.CreatedAt).ToListAsync();
    }
}

I asked to revert them from being virtual and to allow more flexible pattern to hold expression and delegate for flexible sorting and possible future filtering in the GetAllAsync method, so Copilot refactored this method:
public class Repository<T> : IRepository<T>
public class Repository<T> : IRepository<T>
{
    public async Task<IEnumerable<T>> GetAllAsync(
        Expression<Func<T, bool>>? filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null)
    {
    }
}

I accepted these changes.

From there I've updated the implement-backend-task.prompt.md to command Copilot to only use generic repository pattern approach for backend tasks.

========================================

After this the foundational prompts and guidelines were well recorded and developing tasks became rather easy and repetetive with few potential comments to Copilot to  change something.

========================================

## 1.4 The models/tools you used
Any used MCP servers or external tools (what for and how).  

`Answer:`
I only used **VS Code** for development with **GitHub Copilot** installed and using **Claude Sonnet 4.5**.  
A few times I asked **ChatGPT** to correct/structure prompts/guidelines.  

---

## 2.1 For each important step, show:
### 2.11 The prompt you used
### 2.12 The result (summary, not full code) 
### 2.13 What you accepted/changed and why
`Answer:` Included description in the section 1 above.
---

## 3. Insights
### 3.1 Short section with your observations and learnings

`Answer:`
- Context can fill up quickly if the chat with Copilot is long and involves a lot of details – stick with 1 feature per char.  
- Do not mix too much work together in one char; keep tasks separated.  
- The more details and specifications you provide, the fewer errors or deviations Copilot will make.  
- Usually seeing Copilot’s plan for implementing a feature first helps detect misunderstandings before any files are created/changed.  
- Re-using prompt-templates is extremely effective and automates the process tremendously.  

### 3.2 Which prompts worked well?

`Answer:`
- Well-structured, well-written, specific, and direct prompts gave the best results.  

### 3.3 Which prompts did not work, and why?

`Answer:`
- Sometimes prompts lacked enough details, so Copilot acted in unexpected ways.  
- The more detailed and specific the prompt, the more accurate the generated outcome.  

### 3.4 What patterns in prompting gave the best results?

`Answer:`
- Provide clear rules and expectations.  
- Ask to analyze connected files and dependencies.  
- Plan the work before doing any file creation or implementation.  
- “First ask for architecture, then ask for implementation per file” approach works consistently well.  