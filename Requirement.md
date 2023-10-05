# NccAngularTraining

## Time sheet App

## Requirement

### Create TimeSheet App

0. Prepare for project
```
npm install

npm run prepare
```

1. Finish component design before working on TaskManagement and Project Management Feature. Follow this expample:

``` html
// <!-- Task Page -->

<app-card>
  {/*
    CardComponent 
    Input: ???
    Output: ???
  */}

  <app-task-header>
    {/* TaskHeaderComponent
       Input: ???
       Output: ???
     */}
  </app-task-header>

  <app-task-list></app-task-list>
  {/* etc... */}
  <app-task-form></app-task-form>
</app-card>

```

2. Current timesheet app:

- Sample app: http://training-timesheet.nccsoft.vn
- Swagger: http://training-api-timesheet.nccsoft.vn
- Account: `admindev/123qwe`

3. Reuse current backend api and rebuild 3 features: Authentication, Task Manager, Project Manager

- Login/Logout
- [Project Manager](http://dev.timesheet.nccsoft.vn/app/main/projects)
    - Project Create/Edit should be a separated page. Then we will have 4 child page: General/Team/Tasks/Notification. Use nested route
    - Use Step UI for 4 child pages: General/Team/Tasks/Notification
    - Project View should have one more tab, it's Team tab to show members in project. It's the same as Team in Project Create/Edit
- Add unit test for each component/service. Read more in: 
    - [Angular unit testing tutorial with examples](https://blog.logrocket.com/angular-unit-testing-tutorial-examples/), 
    - [Unit testing Angular apps](https://blogs.halodoc.io/angular-unit-testing/), 
    - [Angular: Unit Testing Jasmine, Karma](https://medium.com/swlh/angular-unit-testing-jasmine-karma-step-by-step-e3376d110ab4)

4. Feel free for choosing which design pattern, UI lib that you want but have to match:

- Great UI/UX and Try if we can make it better than the sample.
- Clear & Clean source code - Easy for understanding and maintaining.

5. Folder Structure
- Consult [Sample-Structure](https://ops.nccsoft.vn/DefaultCollection/ncc-front-end-training/_git/ncc-angular-training?path=%2F&version=GBsample-structure&_a=contents)
- https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7


### [NCC Angular basic checklist](https://github.com/angular-vietnam/100-days-of-angular)
- [100-days-of-angular](https://github.com/angular-vietnam/100-days-of-angular) - Recommended
- [ncc-angular](https://github.com/nccasia/ncc-angular)

### [How to Write Cleaner React Code](https://www.freecodecamp.org/news/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f/)
- https://angular.io/guide/styleguide#angular-coding-style-guide
- https://www.freecodecamp.org/news/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f/
- https://itnext.io/clean-code-checklist-in-angular-%EF%B8%8F-10d4db877f74
- https://ops.nccsoft.vn/DefaultCollection/ncc-front-end-training/_wiki/wikis/ncc-front-end-training.wiki?wikiVersion=GBwikiMaster&pagePath=%2FAbout%2FCoding%20Convention&pageId=1104&_a=edit
### [Working Process](https://ops.nccsoft.vn/DefaultCollection/ncc-front-end-training/_wiki/wikis/ncc-front-end-training.wiki/448/About)

[View details](https://ops.nccsoft.vn/DefaultCollection/ncc-front-end-training/_wiki/wikis/ncc-front-end-training.wiki/448/About)
