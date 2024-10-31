import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "../views/Presentation/PresentationView.vue";
import AboutView from "../views/LandingPages/AboutUs/AboutView.vue";
import ContactView from "../views/LandingPages/ContactUs/ContactView.vue";
import AuthorView from "../views/LandingPages/Author/AuthorView.vue";
import SignInBasicView from "../views/LandingPages/SignIn/BasicView.vue";
import PageHeaders from "../layouts/sections/page-sections/page-headers/HeadersView.vue";
import PageFeatures from "../layouts/sections/page-sections/features/FeaturesView.vue";
import NavigationNavbars from "../layouts/sections/navigation/navbars/NavbarsView.vue";
import NavigationNavTabs from "../layouts/sections/navigation/nav-tabs/NavTabsView.vue";
import NavigationPagination from "../layouts/sections/navigation/pagination/PaginationView.vue";
import InputAreasInputs from "../layouts/sections/input-areas/inputs/InputsView.vue";
import InputAreasForms from "../layouts/sections/input-areas/forms/FormsView.vue";
import ACAlerts from "../layouts/sections/attention-catchers/alerts/AlertsView.vue";
import ACModals from "../layouts/sections/attention-catchers/modals/ModalsView.vue";
import ACTooltipsPopovers from "../layouts/sections/attention-catchers/tooltips-popovers/TooltipsPopoversView.vue";
import ElAvatars from "../layouts/sections/elements/avatars/AvatarsView.vue";
import ElBadges from "../layouts/sections/elements/badges/BadgesView.vue";
import ElBreadcrumbs from "../layouts/sections/elements/breadcrumbs/BreadcrumbsView.vue";
import ElButtons from "../layouts/sections/elements/buttons/ButtonsView.vue";
import ElButtonGroups from "../layouts/sections/elements/button-groups/ButtonGroupsView.vue";
import ElDropdowns from "../layouts/sections/elements/dropdowns/DropdownsView.vue";
import ElProgressBars from "../layouts/sections/elements/progress-bars/ProgressBarsView.vue";
import ElToggles from "../layouts/sections/elements/toggles/TogglesView.vue";
import ElTypography from "../layouts/sections/elements/typography/TypographyView.vue";

import ThemeParkView from "@/views/ThemeParks/ThemeParkView.vue";
import ThemeParkInfo from "@/views/ThemeParks/ThemeParkInfo.vue";
import ThemeParkErrorPage from "@/views/ErrorPages/ThemeParkErrorPage.vue";
import TicketOrderView from "@/views/TicketOrders/TicketOrderView.vue";
import TicketSelectionView from "@/views/TicketOrders/TicketSelectionView.vue";
import UsageGuideWrapper from "@/views/ThemeParks/UsageGuides/UsageGuideWrapper.vue";
import TicketResultView from "@/views/TicketOrders/TicketResultView.vue";

import AccommodationView from "@/views/Accommodations/AccommodationView.vue";

import RoomDetailView from "@/views/Rooms/RoomDetailView.vue";
import ReservationView from "@/views/Reservation/ReservationView.vue";
import ReservationResultView from "@/views/Reservation/ReservationResultView.vue";

import ReservationPage from "@/views/Payment/ReservationPage.vue";

import SignUpView from "@/views/LandingPages/SignIn/SignUp/SignUpView.vue";
import JoinCompleteView from "@/views/LandingPages/SignIn/SignUp/JoinCompleteView.vue";
import MemberView from "@/views/LandingPages/SignIn/Member/MemberView.vue";
import FindIdAuthenticationView from "@/views/LandingPages/SignIn/Member/FindMemberID/FindIdAuthenticationView.vue";
import FindIdView from "@/views/LandingPages/SignIn/Member/FindMemberID/FindIdView.vue";
import FindPwAuthenticationView from "@/views/LandingPages/SignIn/Member/FindMemberPW/FindPwAuthenticationView.vue";
import FindPwView from "@/views/LandingPages/SignIn/Member/FindMemberPW/FindPwView.vue";
import PwComplete from "@/views/LandingPages/SignIn/Member/FindMemberPW/PwComplete.vue";

import CorporateView from "@/views/LandingPages/SignIn/Corporate/CorporateView.vue";
import CorporateJoinCompleteView from "@/views/LandingPages/SignIn/Corporate/CorporateJoinCompleteView.vue";

import MypageView from "@/views/Mypage/MypageView.vue";
import InfoUpdateView from "@/views/Mypage/InfoUpdate/InfoUpdateView.vue";
import InfoCompleteView from "@/views/Mypage/InfoUpdate/InfoCompleteView.vue";
import PwUpdateView from "@/views/Mypage/InfoUpdate/PwUpdateView.vue";
import ResignView from "@/views/Mypage/Resign/ResignView.vue";
import ResignCompleteView from "@/views/Mypage/Resign/ResignCompleteView.vue";
import PwAuthView from "@/views/Mypage/InfoUpdate/PwAuthView.vue";
import InfoAuthView from "@/views/Mypage/InfoUpdate/InfoAuthView.vue";
import RoomReservationList from "@/views/Mypage/RoomReservationList/RoomReservationList.vue";
import ThemeparkReservationList from "@/views/Mypage/ThemeparkReservationList/ThemeparkReservationList.vue";

import PaymentPage from "@/views/Payment/PaymentPage.vue";
import NoticesListView from "@/views/Notices/NoticesListView.vue";
import SuggestionsListView from "@/views/Suggestions/SuggestionsListView.vue";
import NoticeDetail from "@/views/Notices/NoticeDetail.vue";
import EventsListView from "@/views/Events/EventsListView.vue";
import EventDetail from "@/views/Events/EventDetail.vue";
import TicketRefund from "@/views/TicketOrders/TicketRefund.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "presentation",
      component: PresentationView,
    },
    {
      path: "/pages/landing-pages/about-us",
      name: "about",
      component: AboutView,
    },
    {
      path: "/pages/landing-pages/contact-us",
      name: "contactus",
      component: ContactView,
    },
    {
      path: "/pages/landing-pages/author",
      name: "author",
      component: AuthorView,
    },
    {
      path: "/users/login",
      name: "login",
      component: SignInBasicView,
    },
    {
      path: "/",
      name: "logout",
      component: PresentationView,
    },
    {
      path: "/sections/page-sections/page-headers",
      name: "page-headers",
      component: PageHeaders,
    },
    {
      path: "/sections/page-sections/features",
      name: "page-features",
      component: PageFeatures,
    },
    {
      path: "/sections/navigation/navbars",
      name: "navigation-navbars",
      component: NavigationNavbars,
    },
    {
      path: "/sections/navigation/nav-tabs",
      name: "navigation-navtabs",
      component: NavigationNavTabs,
    },
    {
      path: "/sections/navigation/pagination",
      name: "navigation-pagination",
      component: NavigationPagination,
    },
    {
      path: "/sections/input-areas/inputs",
      name: "inputareas-inputs",
      component: InputAreasInputs,
    },
    {
      path: "/sections/input-areas/forms",
      name: "inputareas-forms",
      component: InputAreasForms,
    },
    {
      path: "/sections/attention-catchers/alerts",
      name: "ac-alerts",
      component: ACAlerts,
    },
    {
      path: "/sections/attention-catchers/modals",
      name: "ac-modals",
      component: ACModals,
    },
    {
      path: "/sections/attention-catchers/tooltips-popovers",
      name: "ac-tooltips-popovers",
      component: ACTooltipsPopovers,
    },
    {
      path: "/sections/elements/avatars",
      name: "el-avatars",
      component: ElAvatars,
    },
    {
      path: "/sections/elements/badges",
      name: "el-badges",
      component: ElBadges,
    },
    {
      path: "/sections/elements/breadcrumbs",
      name: "el-breadcrumbs",
      component: ElBreadcrumbs,
    },
    {
      path: "/sections/elements/buttons",
      name: "el-buttons",
      component: ElButtons,
    },
    {
      path: "/sections/elements/button-groups",
      name: "el-button-groups",
      component: ElButtonGroups,
    },
    {
      path: "/sections/elements/dropdowns",
      name: "el-dropdowns",
      component: ElDropdowns,
    },
    {
      path: "/sections/elements/progress-bars",
      name: "el-progress-bars",
      component: ElProgressBars,
    },
    {
      path: "/sections/elements/toggles",
      name: "el-toggles",
      component: ElToggles,
    },
    {
      path: "/sections/elements/typography",
      name: "el-typography",
      component: ElTypography,
    },
    // 숙박시설 디테일 페이지
    {
      path: "/accommodation/:accommodationId",
      name: "Accommodation",
      component: AccommodationView,
    },
    // 테마파크 라우팅
    {
      path: "/themepark",
      name: "ThemePark",
      component: ThemeParkView,
      redirect: { name: "ThemeParkInfo" },
      children: [
        {
          path: "",
          component: ThemeParkInfo,
          name: "ThemeParkInfo",
        },
        {
          path: "tickets",
          name: "TicketSelection",
          component: TicketSelectionView,
        },
        {
          path: "order",
          name: "TicketOrder",
          component: TicketOrderView,
          beforeEnter: (to, from, next) => {
            // 새로고침이나 직접 URL 접근인 경우
            if (from.name === undefined) {
              console.log("새로고침 시도");

              return next({ name: "ThemeParkInfo" });
            }
            return next();
          },
        },
      ],
    },
    {
      path: "/ticket/result",
      name: "TicketResult",
      component: TicketResultView,
    },
    {
      path: "/themepark/error",
      name: "ThemeParkErrorPage",
      component: ThemeParkErrorPage,
    },
    {
      path: "/usageguide/:guidePageName",
      name: "UsageGuide",
      component: UsageGuideWrapper,
      props: true,
    },
    {
      path: "/room/:roomTypeId",
      name: "Room",
      component: RoomDetailView,
    },
    {
      path: "/reservation",
      name: "Reservation",
      component: ReservationView,
    },
    {
      path: "/users/signUp",
      name: "MemberSignUp",
      component: SignUpView,
    },
    {
      path: "/users/member/info",
      name: "MemberView",
      component: MemberView,
    },
    {
      path: "/joinComplete",
      name: "JoinComplete",
      component: JoinCompleteView,
    },
    {
      path: "/users/findIdAuthentication",
      name: "FindIdAuthentication",
      component: FindIdAuthenticationView,
    },
    {
      path: "/users/findId",
      name: "FindId",
      component: FindIdView,
    },
    {
      path: "/users/FindPwAuthentication",
      name: "FindPwAuthentication",
      component: FindPwAuthenticationView,
    },
    {
      path: "/users/findPw",
      name: "FindPw",
      component: FindPwView,
    },
    {
      path: "/users/pwComplete",
      name: "PwComplete",
      component: PwComplete,
    },
    {
      path: "/corporate/signUp",
      name: "CorporateSignUp",
      component: CorporateView,
    },
    {
      path: "/reservation",
      name: "ReservationPage",
      component: ReservationPage,
    },
    {
      path: "/reservation/result",
      name: "ReservationResult",
      component: ReservationResultView,
      beforeEnter: (to, from, next) => {
        // 새로고침이나 직접 URL 접근인 경우

        if (from.name === undefined) {
          console.log("새로고침 시도");
          return next({ name: "presentation" });
        }
        return next();
      },
    },
    {
      path: "/users/mypage",
      name: "Mypage",
      component: MypageView,
    },
    {
      path: "/users/infoUpdate",
      name: "InfoUpdate",
      component: InfoUpdateView,
    },
    {
      path: "/users/updateComplete",
      name: "InfoUpdateComplete",
      component: InfoCompleteView,
    },
    {
      path: "/users/pwUpdate",
      name: "PwUpdate",
      component: PwUpdateView,
    },
    {
      path: "/users/resign",
      name: "Resign",
      component: ResignView,
    },
    {
      path: "/users/resignComplete",
      name: "ResignComplete",
      component: ResignCompleteView,
    },
    {
      path: "/payment",
      name: "PaymentPage",
      component: PaymentPage,
    },
    {
      path: "/users/mypage",
      component: MypageView,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("accessToken");
        console.log("token:", token);
        if (token) {
          next();
        } else {
          alert("로그인이 필요합니다.");
          next({ path: "/users/login" });
        }
      },
    },
    {
      path: "/noticesListView",
      name: "noticesListView",
      component: NoticesListView,
    },
    {
      path: "/suggestionsListView",
      name: "SuggestionsListView",
      component: SuggestionsListView,
    },
    {
      path: "/noticesListView/:id",
      name: "NoticeDetail",
      component: NoticeDetail,
    },
    {
      path: "/eventsListView",
      name: "EventsListView",
      component: EventsListView,
    },
    {
      path: "/eventsListView/:id",
      name: "EventDetail",
      component: EventDetail,
    },
    {
      path: "/users/mypage/pwAuth",
      name: "PwAuthView",
      component: PwAuthView,
    },
    {
      path: "/users/mypage/infoAuth",
      name: "InfoAuthView",
      component: InfoAuthView,
    },
    {
      path: "/users/roomReservationLists",
      name: "RoomReservationList",
      component: RoomReservationList,
    },
    {
      path: "/users/themeparkReservationLists",
      name: "ThemeparkReservationList",
      component: ThemeparkReservationList,
    },
    {
      path: "/users/corporateJoinComplete",
      name: "CorporateJoinCompleteView",
      component: CorporateJoinCompleteView,
    },
    {
      path: "/ticketrefund",
      name: "TicketRefund",
      component: TicketRefund,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "TicketOrderView" || to.name === "TicketSelectionView") {
    window.scrollTo(0, 0); // 해당 페이지로 이동할 때 스크롤을 맨 위로 이동
  }
  next();
});

export default router;
