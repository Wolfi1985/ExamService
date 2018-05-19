import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../app/login/components/login.component';
import { AdminComponent } from '../app/admin/components/admin.component';
import { ExamComponent } from '../app/exams/components/exam.component';
import { StartMenuComponent } from '../app/menu/components/start-menu.component';

import { LoginService } from '../app/login/services/login.service';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }, {
        path: 'StartMenu',
        component: StartMenuComponent,
        canActivate: [LoginService]
    }
    , {
        path: 'Admin',
        component: AdminComponent,
        canActivate: [LoginService]
    }, {
        path: 'Exam',
        component: ExamComponent,
        canActivate: [LoginService]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
