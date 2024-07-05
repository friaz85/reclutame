import { NgModule } from '@angular/core';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { NgApexchartsModule } from "ng-apexcharts";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeDemoOneComponent } from './components/pages/home-demo-one/home-demo-one.component';
import { HomeDemoTwoComponent } from './components/pages/home-demo-two/home-demo-two.component';
import { HomeDemoThreeComponent } from './components/pages/home-demo-three/home-demo-three.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { HomeoneBannerComponent } from './components/pages/home-demo-one/homeone-banner/homeone-banner.component';
import { CompaniesComponent } from './components/common/companies/companies.component';
import { CategoriesComponent } from './components/common/categories/categories.component';
import { FeaturesComponent } from './components/common/features/features.component';
import { FunfactsComponent } from './components/common/funfacts/funfacts.component';
import { PopularJobsComponent } from './components/common/popular-jobs/popular-jobs.component';
import { HowJoveWorksComponent } from './components/common/how-jove-works/how-jove-works.component';
import { JobsByLocationComponent } from './components/common/jobs-by-location/jobs-by-location.component';
import { TestimonialsComponent } from './components/common/testimonials/testimonials.component';
import { GetHiredByTopCompaniesComponent } from './components/common/get-hired-by-top-companies/get-hired-by-top-companies.component';
import { FaqComponent } from './components/common/faq/faq.component';
import { BlogComponent } from './components/common/blog/blog.component';
import { DownloadAppComponent } from './components/common/download-app/download-app.component';
import { SubscribeComponent } from './components/common/subscribe/subscribe.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { HometwoBannerComponent } from './components/pages/home-demo-two/hometwo-banner/hometwo-banner.component';
import { TalentedExpertsComponent } from './components/common/talented-experts/talented-experts.component';
import { WhyChooseUsComponent } from './components/common/why-choose-us/why-choose-us.component';
import { AboutUsComponent } from './components/common/about-us/about-us.component';
import { LeadingCompanyComponent } from './components/common/leading-company/leading-company.component';
import { PartnersComponent } from './components/common/partners/partners.component';
import { HomethreeBannerComponent } from './components/pages/home-demo-three/homethree-banner/homethree-banner.component';
import { JobsGridPageComponent } from './components/pages/jobs-grid-page/jobs-grid-page.component';
import { JobsSidebarComponent } from './components/common/jobs-sidebar/jobs-sidebar.component';
import { JobsListingPageComponent } from './components/pages/jobs-listing-page/jobs-listing-page.component';
import { JobDetailsPageComponent } from './components/pages/job-details-page/job-details-page.component';
import { CandidatesPageComponent } from './components/pages/candidates-page/candidates-page.component';
import { CandidateDetailsPageComponent } from './components/pages/candidate-details-page/candidate-details-page.component';
import { EmployersPageComponent } from './components/pages/employers-page/employers-page.component';
import { EmployerDetailsPageComponent } from './components/pages/employer-details-page/employer-details-page.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { PricingPageComponent } from './components/pages/pricing-page/pricing-page.component';
import { PricingComponent } from './components/common/pricing/pricing.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { PrivacyPolicyPageComponent } from './components/pages/privacy-policy-page/privacy-policy-page.component';
import { TermsConditionsPageComponent } from './components/pages/terms-conditions-page/terms-conditions-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { BlogSidebarComponent } from './components/common/blog-sidebar/blog-sidebar.component';
import { CategoriesPageComponent } from './components/pages/categories-page/categories-page.component';
import { CDashboardComponent } from './components/candidates-dashboard/c-dashboard/c-dashboard.component';
import { CandidatesDashboardComponent } from './components/candidates-dashboard/candidates-dashboard.component';
import { EDashboardComponent } from './components/employers-dashboard/e-dashboard/e-dashboard.component';
import { EmployersDashboardComponent } from './components/employers-dashboard/employers-dashboard.component';
import { EdCompanyProfileComponent } from './components/employers-dashboard/ed-company-profile/ed-company-profile.component';
import { EdSidebarComponent } from './components/employers-dashboard/ed-sidebar/ed-sidebar.component';
import { EdHeaderComponent } from './components/employers-dashboard/ed-header/ed-header.component';
import { EdFooterComponent } from './components/employers-dashboard/ed-footer/ed-footer.component';
import { EdPostANewJobComponent } from './components/employers-dashboard/ed-post-a-new-job/ed-post-a-new-job.component';
import { EdManageJobsComponent } from './components/employers-dashboard/ed-manage-jobs/ed-manage-jobs.component';
import { EdAllApplicantsComponent } from './components/employers-dashboard/ed-all-applicants/ed-all-applicants.component';
import { EdResumesComponent } from './components/employers-dashboard/ed-resumes/ed-resumes.component';
import { EdMessageComponent } from './components/employers-dashboard/ed-message/ed-message.component';
import { EdChangePasswordComponent } from './components/employers-dashboard/ed-change-password/ed-change-password.component';
import { CdChangePasswordComponent } from './components/candidates-dashboard/cd-change-password/cd-change-password.component';
import { CdProfileComponent } from './components/candidates-dashboard/cd-profile/cd-profile.component';
import { CdResumeComponent } from './components/candidates-dashboard/cd-resume/cd-resume.component';
import { CdBookmarksComponent } from './components/candidates-dashboard/cd-bookmarks/cd-bookmarks.component';
import { CdAppliedJobsComponent } from './components/candidates-dashboard/cd-applied-jobs/cd-applied-jobs.component';
import { CdAlertJobsComponent } from './components/candidates-dashboard/cd-alert-jobs/cd-alert-jobs.component';
import { CdMessageComponent } from './components/candidates-dashboard/cd-message/cd-message.component';
import { CdSidebarComponent } from './components/candidates-dashboard/cd-sidebar/cd-sidebar.component';
import { CdFooterComponent } from './components/candidates-dashboard/cd-footer/cd-footer.component';
import { CdHeaderComponent } from './components/candidates-dashboard/cd-header/cd-header.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeDemoOneComponent,
        HomeDemoTwoComponent,
        HomeDemoThreeComponent,
        NotFoundComponent,
        HomeoneBannerComponent,
        CompaniesComponent,
        CategoriesComponent,
        FeaturesComponent,
        FunfactsComponent,
        PopularJobsComponent,
        HowJoveWorksComponent,
        JobsByLocationComponent,
        TestimonialsComponent,
        GetHiredByTopCompaniesComponent,
        FaqComponent,
        BlogComponent,
        DownloadAppComponent,
        SubscribeComponent,
        FooterComponent,
        NavbarComponent,
        HometwoBannerComponent,
        TalentedExpertsComponent,
        WhyChooseUsComponent,
        AboutUsComponent,
        LeadingCompanyComponent,
        PartnersComponent,
        HomethreeBannerComponent,
        JobsGridPageComponent,
        JobsSidebarComponent,
        JobsListingPageComponent,
        JobDetailsPageComponent,
        CandidatesPageComponent,
        CandidateDetailsPageComponent,
        EmployersPageComponent,
        EmployerDetailsPageComponent,
        AboutPageComponent,
        PricingPageComponent,
        PricingComponent,
        FaqPageComponent,
        PrivacyPolicyPageComponent,
        TermsConditionsPageComponent,
        ContactPageComponent,
        BlogPageComponent,
        BlogDetailsPageComponent,
        BlogSidebarComponent,
        CategoriesPageComponent,
        CDashboardComponent,
        CandidatesDashboardComponent,
        EDashboardComponent,
        EmployersDashboardComponent,
        EdCompanyProfileComponent,
        EdSidebarComponent,
        EdHeaderComponent,
        EdFooterComponent,
        EdPostANewJobComponent,
        EdManageJobsComponent,
        EdAllApplicantsComponent,
        EdResumesComponent,
        EdMessageComponent,
        EdChangePasswordComponent,
        CdChangePasswordComponent,
        CdProfileComponent,
        CdResumeComponent,
        CdBookmarksComponent,
        CdAppliedJobsComponent,
        CdAlertJobsComponent,
        CdMessageComponent,
        CdSidebarComponent,
        CdFooterComponent,
        CdHeaderComponent
    ],
    imports: [
        BrowserModule,
        CarouselModule,
        AppRoutingModule,
        NgxScrollTopModule,
        NgApexchartsModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }