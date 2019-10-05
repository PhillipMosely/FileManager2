import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule} from '@angular/common/http';
import { jqxTreeModule } from 'jqwidgets-ng/jqxtree';
import { jqxSplitterModule } from 'jqwidgets-ng/jqxsplitter';

import { AppComponent } from './app.component';

import { SidebarModule } from './sidebar/sidebar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';
import { AuthService } from './_services/auth.service';
import { SweetAlertService } from './_services/sweetalert.service';


export function tokenGetter() {
    return localStorage.getItem('token');
 }

@NgModule({
    imports:      [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes,{
          useHash: true
        }),
        NgbModule.forRoot(),
        HttpModule,
        HttpClientModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedPluginModule,
        jqxTreeModule,
        jqxSplitterModule,
        JwtModule.forRoot({
            config: {
               tokenGetter,
               whitelistedDomains: ['localhost:5000'],
               blacklistedRoutes: ['localhost:5000/api/auth']
            }
         })
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
    ],
    providers: [
        AuthService,
        SweetAlertService
    ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
